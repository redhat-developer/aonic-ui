import React from 'react';
import { differenceBy, uniqBy } from 'lodash-es';
import { PipelineRunModel } from '../models';
import { GetNextPage, Selector } from '../types/tekton-results';
import { EQ } from '../utils/tekton-results-utils';
import { getGroupVersionKindForModel, useDeepCompareMemoize } from '../utils/common-utils';
import { useTRPipelineRuns } from './useTRPipelineRuns';
import { useTRTaskRuns } from './useTRTaskRuns';
import { FetchUtilsType, K8sGroupVersionKind, K8sResourceCommon } from '../types/k8s';

export const useRuns = <Kind extends K8sResourceCommon>(
  fetchUtils: FetchUtilsType,
  groupVersionKind: K8sGroupVersionKind,
  namespace: string,
  tektonResultsBaseURL: string,
  isTektonResultEnabled: boolean,
  options?: {
    selector?: Selector;
    limit?: number;
    name?: string;
  },
  cacheKey?: string,
): [Kind[], boolean, unknown, GetNextPage] => {
  const etcdRunsRef = React.useRef<Kind[]>([]);
  const optionsMemo = useDeepCompareMemoize(options);
  const isList = !optionsMemo?.name;
  const limit = optionsMemo?.limit;
  // do not include the limit when querying etcd because result order is not sorted
  const watchOptions = React.useMemo(() => {
    // reset cached runs as the options have changed
    etcdRunsRef.current = [];
    return {
      groupVersionKind,
      namespace: namespace && namespace !== '-' ? namespace : undefined,
      isList,
      selector: optionsMemo?.selector,
      name: optionsMemo?.name,
    };
  }, [groupVersionKind, namespace, optionsMemo, isList]);
  const [resources, loaded, error] = fetchUtils.hooks.useK8sWatchResource(watchOptions);
  // if a pipeline run was removed from etcd, we want to still include it in the return value without re-querying tekton-results
  const etcdRuns = React.useMemo(() => {
    if (!loaded || error) {
      return [];
    }
    const resourcesArray = (isList ? resources : [resources]) as Kind[];

    return resourcesArray;
  }, [isList, resources, loaded, error]);

  const runs = React.useMemo(() => {
    if (!etcdRuns) {
      return etcdRuns;
    }
    let value = etcdRunsRef.current
      ? [
          ...etcdRuns,
          // identify the runs that were removed
          ...differenceBy(etcdRunsRef.current, etcdRuns, (plr) => plr?.metadata?.name),
        ]
      : [...etcdRuns];
    value.sort((a, b) =>
      (b?.metadata?.creationTimestamp ?? '').localeCompare(a?.metadata?.creationTimestamp ?? ''),
    );
    if (limit && limit < value.length) {
      value = value.slice(0, limit);
    }
    return value;
  }, [etcdRuns, limit]);

  // cache the last set to identify removed runs
  etcdRunsRef.current = runs;

  // Query tekton results if there's no limit or we received less items from etcd than the current limit
  const queryTr =
    isTektonResultEnabled &&
    (!limit ||
      (namespace &&
        ((runs && loaded && optionsMemo?.limit && optionsMemo.limit > runs.length) || error)));

  const trOptions: typeof optionsMemo = React.useMemo(() => {
    if (optionsMemo?.name) {
      const { name, ...rest } = optionsMemo;
      return {
        ...rest,
        filter: EQ('data.metadata.name', name),
      };
    }
    return optionsMemo;
  }, [optionsMemo]);

  // tekton-results includes items in etcd, therefore options must use the same limit
  // these duplicates will later be de-duped

  const [trResources, trLoaded, trError, trGetNextPage] = isTektonResultEnabled
    ? ((groupVersionKind?.kind === getGroupVersionKindForModel(PipelineRunModel)?.kind
        ? useTRPipelineRuns
        : useTRTaskRuns)(
        queryTr ? namespace : '',
        tektonResultsBaseURL,
        fetchUtils,
        trOptions,
        cacheKey,
      ) as [[], boolean, unknown, GetNextPage])
    : [[], true, undefined, undefined];

  return React.useMemo(() => {
    const rResources =
      runs && trResources
        ? uniqBy([...runs, ...trResources], (r) => r?.metadata?.uid)
        : runs || trResources;
    return [
      rResources,
      !!rResources?.[0] || (loaded && trLoaded),
      namespace
        ? queryTr
          ? isList
            ? trError && error
            : // when searching by name, return an error if we have no result
              trError && (trLoaded && !trResources.length ? error : undefined)
          : error
        : undefined,
      trGetNextPage || (() => undefined),
    ];
  }, [runs, trResources, trLoaded, namespace, queryTr, isList, trError, error, trGetNextPage]);
};
