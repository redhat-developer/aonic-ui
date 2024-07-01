import React from 'react';
import { PipelineRunKind } from '../types';
import { GetNextPage, Selector } from '../types/tekton-results';
import { PipelineRunModel } from '../models';
import { useRuns } from './useRuns';
import { getGroupVersionKindForModel } from '../utils/common-utils';
import { FetchUtilsType } from '../types/k8s';

export const usePipelineRuns = (
  fetchUtils: FetchUtilsType,
  namespace: string,
  tektonResultsBaseURL: string,
  isTektonResultEnabled: boolean,
  options?: {
    selector?: Selector;
    limit?: number;
  },
  cacheKey?: string,
): [PipelineRunKind[], boolean, unknown, GetNextPage] =>
  useRuns<PipelineRunKind>(
    fetchUtils,
    getGroupVersionKindForModel(PipelineRunModel),
    namespace,
    tektonResultsBaseURL,
    isTektonResultEnabled,
    options,
    cacheKey,
  );

export const usePipelineRun = (
  fetchUtils: FetchUtilsType,
  namespace: string,
  pipelineRunName: string,
  tektonResultsBaseURL: string,
  isTektonResultEnabled: boolean,
  cacheKey?: string,
): [PipelineRunKind, boolean, string] => {
  const result = usePipelineRuns(
    fetchUtils,
    namespace,
    tektonResultsBaseURL,
    isTektonResultEnabled,
    React.useMemo(
      () => ({
        name: pipelineRunName,
        limit: 1,
      }),
      [pipelineRunName],
    ),
    cacheKey,
  ) as unknown as [PipelineRunKind[], boolean, string];

  return React.useMemo(
    () => [result[0]?.[0], result[1], result[0]?.[0] ? '' : result[2]],
    [result],
  );
};
