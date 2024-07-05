import React from 'react';
import { PipelineRunKind } from '../types';
import { GetNextPage, Selector } from '../types/tekton-results';
import { PipelineRunModel } from '../models';
import { useRuns } from './useRuns';
import { getGroupVersionKindForModel } from '../utils/common-utils';
import { TektonConfiguration } from '../types/k8s';

export const usePipelineRuns = (
  namespace: string,
  config: TektonConfiguration,
  options?: {
    selector?: Selector;
    limit?: number;
  },
  cacheKey?: string,
): [PipelineRunKind[], boolean, unknown, GetNextPage] =>
  useRuns<PipelineRunKind>(
    getGroupVersionKindForModel(PipelineRunModel),
    namespace,
    config,
    options,
    cacheKey,
  );

export const usePipelineRun = (
  namespace: string,
  pipelineRunName: string,
  config: TektonConfiguration,
  cacheKey?: string,
): [PipelineRunKind, boolean, string] => {
  const result = usePipelineRuns(
    namespace,
    config,
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
