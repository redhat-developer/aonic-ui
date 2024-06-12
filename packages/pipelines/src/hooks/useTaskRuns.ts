import React from 'react';
import { getGroupVersionKindForModel } from '@openshift-console/dynamic-plugin-sdk';
import { TaskRunKind, TektonResourceLabel } from '../types';
import { TaskRunModel } from '../models';
import { GetNextPage, Selector } from '../types/tekton-results';
import { useRuns } from './useRuns';

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
  options?: {
    selector?: Selector;
    limit?: number;
  },
  cacheKey?: string,
  isTektonResultEnabled?: boolean,
): [TaskRunKind[], boolean, unknown, GetNextPage] =>
  useRuns<TaskRunKind>(
    getGroupVersionKindForModel(TaskRunModel),
    namespace,
    options,
    cacheKey,
    isTektonResultEnabled,
  );

export const useTaskRun = (
  namespace: string,
  taskRunName: string,
  cacheKey?: string,
  isTektonResultEnabled?: boolean,
): [TaskRunKind, boolean, string] => {
  const result = useTaskRuns(
    namespace,
    React.useMemo(
      () => ({
        name: taskRunName,
        limit: 1,
      }),
      [taskRunName],
    ),
    cacheKey,
    isTektonResultEnabled,
  ) as unknown as [TaskRunKind[], boolean, string];

  return React.useMemo(
    () => [result[0]?.[0], result[1], result[0]?.[0] ? '' : result[2]],
    [result],
  );
};
