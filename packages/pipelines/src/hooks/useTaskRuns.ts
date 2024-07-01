import React from 'react';
import { TaskRunKind, TektonResourceLabel } from '../types';
import { TaskRunModel } from '../models';
import { GetNextPage, Selector } from '../types/tekton-results';
import { useRuns } from './useRuns';
import { getGroupVersionKindForModel } from '../utils/common-utils';
import { FetchUtilsType } from '../types/k8s';

export const getTaskRunsOfPipelineRun = (
  taskRuns: TaskRunKind[],
  pipelineRunName: string,
): TaskRunKind[] => {
  return taskRuns.filter(
    (taskRun) => taskRun!.metadata!?.labels![TektonResourceLabel.pipelinerun] === pipelineRunName,
  );
};

export const useTaskRuns = (
  fetchUtils: FetchUtilsType,
  namespace: string,
  tektonResultsBaseURL: string,
  isTektonResultEnabled: boolean,
  options?: {
    selector?: Selector;
    limit?: number;
  },
  cacheKey?: string,
): [TaskRunKind[], boolean, unknown, GetNextPage] =>
  useRuns<TaskRunKind>(
    fetchUtils,
    getGroupVersionKindForModel(TaskRunModel),
    namespace,
    tektonResultsBaseURL,
    isTektonResultEnabled,
    options,
    cacheKey,
  );

export const useTaskRun = (
  fetchUtils: FetchUtilsType,
  namespace: string,
  taskRunName: string,
  tektonResultsBaseURL: string,
  isTektonResultEnabled: boolean,
  cacheKey?: string,
): [TaskRunKind, boolean, string] => {
  const result = useTaskRuns(
    fetchUtils,
    namespace,
    tektonResultsBaseURL,
    isTektonResultEnabled,
    React.useMemo(
      () => ({
        name: taskRunName,
        limit: 1,
      }),
      [taskRunName],
    ),
    cacheKey,
  ) as unknown as [TaskRunKind[], boolean, string];

  return React.useMemo(
    () => [result[0]?.[0], result[1], result[0]?.[0] ? '' : result[2]],
    [result],
  );
};
