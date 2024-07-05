import React from 'react';
import { TaskRunKind, TektonResourceLabel } from '../types';
import { TaskRunModel } from '../models';
import { GetNextPage, Selector } from '../types/tekton-results';
import { useRuns } from './useRuns';
import { getGroupVersionKindForModel } from '../utils/common-utils';
import { TektonConfiguration } from '../types/k8s';

export const getTaskRunsOfPipelineRun = (
  taskRuns: TaskRunKind[],
  pipelineRunName: string,
): TaskRunKind[] => {
  return taskRuns.filter(
    (taskRun) => taskRun!.metadata!?.labels![TektonResourceLabel.pipelinerun] === pipelineRunName,
  );
};

export const useTaskRuns = (
  namespace: string,
  config: TektonConfiguration,
  options?: {
    selector?: Selector;
    limit?: number;
  },
  cacheKey?: string,
): [TaskRunKind[], boolean, unknown, GetNextPage] =>
  useRuns<TaskRunKind>(
    getGroupVersionKindForModel(TaskRunModel),
    namespace,
    config,
    options,
    cacheKey,
  );

export const useTaskRun = (
  namespace: string,
  taskRunName: string,
  config: TektonConfiguration,
  cacheKey?: string,
): [TaskRunKind, boolean, string] => {
  const result = useTaskRuns(
    namespace,
    config,
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
