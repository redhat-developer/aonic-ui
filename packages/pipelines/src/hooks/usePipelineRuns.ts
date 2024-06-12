import React from 'react';
import { getGroupVersionKindForModel } from '@openshift-console/dynamic-plugin-sdk';
import { PipelineRunKind } from '../types';
import { GetNextPage, Selector } from '../types/tekton-results';
import { PipelineRunModel } from '../models';
import { useRuns } from './useRuns';

export const usePipelineRuns = (
  namespace: string,
  options?: {
    selector?: Selector;
    limit?: number;
  },
  cacheKey?: string,
  isTektonResultEnabled?: boolean,
): [PipelineRunKind[], boolean, unknown, GetNextPage] =>
  useRuns<PipelineRunKind>(
    getGroupVersionKindForModel(PipelineRunModel),
    namespace,
    options,
    cacheKey,
    isTektonResultEnabled,
  );

export const usePipelineRun = (
  namespace: string,
  pipelineRunName: string,
  cacheKey?: string,
  isTektonResultEnabled?: boolean,
): [PipelineRunKind, boolean, string] => {
  const result = usePipelineRuns(
    namespace,
    React.useMemo(
      () => ({
        name: pipelineRunName,
        limit: 1,
      }),
      [pipelineRunName],
    ),
    cacheKey,
    isTektonResultEnabled,
  ) as unknown as [PipelineRunKind[], boolean, string];

  return React.useMemo(
    () => [result[0]?.[0], result[1], result[0]?.[0] ? '' : result[2]],
    [result],
  );
};
