/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import {
  ALL_NAMESPACES_KEY,
  DELETED_RESOURCE_IN_K8S_ANNOTATION,
  RESOURCE_LOADED_FROM_RESULTS_ANNOTATION,
} from '../const';
import { PipelineRunKind, TaskRunKind } from '../types';
import { DataType, RecordsList, TektonResultsOptions } from '../types/tekton-results';
import {
  FetchUtilsType,
  K8sResourceCommon,
  MatchExpression,
  MatchLabels,
  Selector,
  TektonConfiguration,
} from '../types/k8s';

const MINIMUM_PAGE_SIZE = 5;
const MAXIMUM_PAGE_SIZE = 10000;

const throw404 = () => {
  // eslint-disable-next-line no-throw-literal
  throw { code: 404 };
};

// decoding result base64
export const decodeValue = (value: string) => atob(value);

export const decodeValueJson = (value: string) => {
  const decodedValue = value ? JSON.parse(decodeValue(value)) : null;
  let resourceDeletedInK8sAnnotation;
  if (_.has(decodedValue?.metadata, 'deletionTimestamp')) {
    delete decodedValue?.metadata?.deletionTimestamp;
    resourceDeletedInK8sAnnotation = {
      [DELETED_RESOURCE_IN_K8S_ANNOTATION]: 'true',
    };
  }
  const decodedValueWithTRAnnotation = decodedValue
    ? {
        ...decodedValue,
        metadata: {
          ...decodedValue?.metadata,
          annotations: {
            ...decodedValue?.metadata?.annotations,
            [RESOURCE_LOADED_FROM_RESULTS_ANNOTATION]: 'true',
            ...resourceDeletedInK8sAnnotation,
          },
        },
      }
    : null;
  return decodedValueWithTRAnnotation;
};

// filter functions
export const AND = (...expressions: string[]) => expressions.filter((x) => x).join(' && ');
export const OR = (...expressions: string[]) => {
  const filteredExpressions = expressions.filter((x) => x);
  const filter = filteredExpressions.join(' || ');
  return filteredExpressions.length > 1 ? `(${filter})` : filter;
};

const EXP = (left: string, right: string, operator: string) => `${left} ${operator} ${right}`;
export const EQ = (left: string, right: string) => EXP(left, `"${right}"`, '==');
export const NEQ = (left: string, right: string) => EXP(left, `"${right}"`, '!=');

export const labelsToFilter = (labels?: MatchLabels): string =>
  labels
    ? AND(
        ...Object.keys(labels).map((label) =>
          EQ(`data.metadata.labels["${label}"]`, labels[label]),
        ),
      )
    : '';

export const nameFilter = (name?: string): string =>
  name ? AND(`data.metadata.name.startsWith("${name.trim().toLowerCase()}")`) : '';

export const expressionsToFilter = (expressions: Omit<MatchExpression, 'value'>[]): string =>
  AND(
    ...expressions
      .map((expression) => {
        switch (expression.operator) {
          case 'Exists':
            return `data.metadata.labels.contains("${expression.key}")`;
          case 'DoesNotExist':
            return `!data.metadata.labels.contains("${expression.key}")`;
          case 'NotIn':
            return expression.values!?.length > 0
              ? AND(
                  ...expression.values!.map((value) =>
                    NEQ(`data.metadata.labels["${expression.key}"]`, value),
                  ),
                )
              : '';
          case 'In':
            return expression.values!?.length > 0
              ? `data.metadata.labels["${
                  expression.key
                }"] in [${expression.values!.map((value) => `"${value}"`)}]`
              : '';
          case 'Equals':
            return expression.values?.[0]
              ? EQ(`data.metadata.labels["${expression.key}"]`, expression.values?.[0])
              : '';
          case 'NotEquals':
          case 'NotEqual':
            return expression.values?.[0]
              ? NEQ(`data.metadata.labels["${expression.key}"]`, expression.values?.[0])
              : '';
          case 'GreaterThan':
            return expression.values?.[0]
              ? EXP(`data.metadata.labels["${expression.key}"]`, expression.values?.[0], '>')
              : '';
          case 'LessThan':
            return expression.values?.[0]
              ? EXP(`data.metadata.labels["${expression.key}"]`, expression.values?.[0], '<')
              : '';
          default:
            throw new Error(
              `Tekton results operator '${expression.operator}' conversion not implemented.`,
            );
        }
      })
      .filter((x) => x),
  );

export const selectorToFilter = (selector: Selector) => {
  let filter = '';
  if (selector) {
    const { matchLabels, matchExpressions, filterByName } = selector;

    if (filterByName) {
      filter = AND(filter, nameFilter(filterByName as string));
    }

    if (matchLabels || matchExpressions) {
      if (matchLabels) {
        filter = AND(filter, labelsToFilter(matchLabels));
      }
      if (matchExpressions) {
        filter = AND(filter, expressionsToFilter(matchExpressions));
      }
    } else {
      filter = labelsToFilter(selector as MatchLabels);
    }
  }
  return filter;
};

// Devs should be careful to not cache a response that may not be complete.
// In most situtations, caching is unnecessary.
// Only cache a response that returns a single complete record as lists can change over time.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let CACHE: { [key: string]: [any[], RecordsList] } = {};
export const clearCache = () => {
  CACHE = {};
};
const InFlightStore: { [key: string]: boolean } = {};
let cachedTektonResultsAPI: string;

export const createTektonResultsUrl = async (
  namespace: string,
  dataType: DataType,
  filter?: string,
  options?: TektonResultsOptions,
  nextPageToken?: string,
  tektonResultsBaseURL?: string,
): Promise<string> => {
  const namespaceToSearch = namespace && namespace !== ALL_NAMESPACES_KEY ? namespace : '-';
  const URL = `https://${tektonResultsBaseURL}/apis/results.tekton.dev/v1alpha2/parents/${namespaceToSearch}/results/-/records?${new URLSearchParams(
    {
      // default sort should always be by `create_time desc`
      // order_by: 'create_time desc', not supported yet
      page_size: `${Math.max(
        MINIMUM_PAGE_SIZE,
        Math.min(
          MAXIMUM_PAGE_SIZE,
          options?.limit !== undefined && options?.limit >= 0
            ? options.limit
            : options?.pageSize ?? 30,
        ),
      )}`,
      ...(nextPageToken ? { page_token: nextPageToken } : {}),
      filter: AND(
        EQ('data_type', dataType.toString()),
        filter ?? '',
        selectorToFilter(options?.selector ?? {}),
        options?.filter ?? '',
      ),
    },
  ).toString()}`;
  return URL;
};

export const getFilteredRecord = async <R extends K8sResourceCommon>(
  namespace: string,
  dataType: DataType,
  tektonResultsBaseURL: string,
  fetchUtils: FetchUtilsType,
  filter?: string,
  options?: TektonResultsOptions,
  nextPageToken?: string,
  cacheKey?: string,
): Promise<[R[], RecordsList, boolean?]> => {
  if (cacheKey) {
    const result = CACHE[cacheKey];
    if (result) {
      return result;
    }
    if (InFlightStore[cacheKey]) {
      return [
        [],
        {
          nextPageToken: undefined,
          records: [],
        },
        true,
      ];
    }
    InFlightStore[cacheKey] = true;
  }
  const value = await (async (): Promise<[R[], RecordsList]> => {
    try {
      const url = await createTektonResultsUrl(
        namespace,
        dataType,
        filter,
        options,
        nextPageToken,
        tektonResultsBaseURL,
      );
      let list: RecordsList = fetchUtils?.resourceFetchers?.consoleProxyFetchJSON
        ? await fetchUtils?.resourceFetchers?.consoleProxyFetchJSON({
            url,
            method: 'GET',
            allowInsecure: true,
          })
        : await fetchUtils?.resourceFetchers?.commonFetchJson(url);
      if (options?.limit && options?.limit >= 0) {
        list = {
          nextPageToken: undefined,
          records: list.records.slice(0, options?.limit),
        };
      }
      return [list.records.map((result) => decodeValueJson(result.data.value)), list];
    } catch (e: any) {
      // return an empty response if we get a 404 error
      if (e?.code === 404) {
        return [
          [],
          {
            nextPageToken: undefined,
            records: [],
          },
        ] as [R[], RecordsList];
      }
      throw e;
    }
  })();

  if (cacheKey) {
    InFlightStore[cacheKey] = false;
    CACHE[cacheKey] = value;
  }
  return value;
};

const getFilteredPipelineRuns = (
  namespace: string,
  filter: string,
  config: TektonConfiguration,
  options?: TektonResultsOptions,
  nextPageToken?: string,
  cacheKey?: string,
) =>
  getFilteredRecord<PipelineRunKind>(
    namespace,
    DataType.PipelineRun,
    config.tektonResultsBaseURL,
    config.fetchUtils,
    filter,
    options,
    nextPageToken,
    cacheKey,
  );

const getFilteredTaskRuns = (
  namespace: string,
  filter: string,
  config: TektonConfiguration,
  options?: TektonResultsOptions,
  nextPageToken?: string,
  cacheKey?: string,
) =>
  getFilteredRecord<TaskRunKind>(
    namespace,
    DataType.TaskRun,
    config.tektonResultsBaseURL,
    config.fetchUtils,
    filter,
    options,
    nextPageToken,
    cacheKey,
  );

export const getPipelineRuns = (
  namespace: string,
  config: TektonConfiguration,
  options?: TektonResultsOptions,
  nextPageToken?: string,
  // supply a cacheKey only if the PipelineRun is complete and response will never change in the future
  cacheKey?: string,
) => getFilteredPipelineRuns(namespace, '', config, options, nextPageToken, cacheKey);

export const getTaskRuns = (
  namespace: string,
  config: TektonConfiguration,
  options?: TektonResultsOptions,
  nextPageToken?: string,
  // supply a cacheKey only if the TaskRun is complete and response will never change in the future
  cacheKey?: string,
) => getFilteredTaskRuns(namespace, '', config, options, nextPageToken, cacheKey);

export const createTektonResultsSummaryUrl = async (
  namespace: string,
  tektonResultsBaseURL: string,
  options?: TektonResultsOptions,
  nextPageToken?: string,
): Promise<string> => {
  const namespaceToSearch = namespace && namespace !== ALL_NAMESPACES_KEY ? namespace : '-';
  const URL = `https://${tektonResultsBaseURL}/apis/results.tekton.dev/v1alpha2/parents/${namespaceToSearch}/results/-/records/summary?${new URLSearchParams(
    {
      summary: `${options?.summary}`,
      ...(options?.groupBy ? { group_by: `${options.groupBy}` } : {}),
      // default sort should always be by `create_time desc`
      // order_by: 'create_time desc', not supported yet
      page_size: `${Math.max(
        MINIMUM_PAGE_SIZE,
        Math.min(
          MAXIMUM_PAGE_SIZE,
          options?.limit !== undefined && options?.limit >= 0
            ? options.limit
            : options?.pageSize ?? 30,
        ),
      )}`,
      ...(nextPageToken ? { page_token: nextPageToken } : {}),
      filter: AND(
        EQ('data_type', options?.data_type?.toString() ?? ''),
        options?.filter ?? '',
        selectorToFilter(options?.selector ?? {}),
      ),
    },
  ).toString()}`;
  return URL;
};

const getLog = async (taskRunPath: string, config: TektonConfiguration) => {
  const url = `https://${config.tektonResultsBaseURL}/apis/results.tekton.dev/v1alpha2/parents/${taskRunPath.replace(
    '/records/',
    '/logs/',
  )}`;
  return config.fetchUtils?.resourceFetchers?.consoleProxyFetchLog
    ? await config.fetchUtils?.resourceFetchers?.consoleProxyFetchLog({
        url,
        method: 'GET',
        allowInsecure: true,
      })
    : config.fetchUtils.resourceFetchers.commonFetchText(url);
};

export const getTaskRunLog = (
  namespace: string,
  taskRunName: string,
  config: TektonConfiguration,
): Promise<string> =>
  getFilteredRecord<any>(
    namespace,
    DataType.Log,
    config.tektonResultsBaseURL,
    config.fetchUtils,
    AND(EQ(`data.spec.resource.kind`, 'TaskRun'), EQ(`data.spec.resource.name`, taskRunName)),
    { limit: 1 },
    undefined,
    undefined,
  ).then((x) =>
    x?.[1]?.records.length > 0
      ? getLog(x?.[1]?.records[0].name, config).then((response: unknown) => {
          return response as string;
        })
      : throw404(),
  );
