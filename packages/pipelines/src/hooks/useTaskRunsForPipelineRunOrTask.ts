import React from 'react';
import { TaskRunKind, TektonResourceLabel } from '../types';
import { GetNextPage, Selector } from '../types/tekton-results';
import { useTaskRuns } from './useTaskRuns';
import { FetchUtilsType } from '../types/k8s';

export const useTaskRunsForPipelineRunOrTask = (
  fetchUtils: FetchUtilsType,
  namespace: string,
  tektonResultsBaseURL: string,
  isTektonResultEnabled: boolean,
  pipelineRunName?: string,
  taskName?: string,
  cacheKey?: string,
): [TaskRunKind[], boolean, unknown, GetNextPage] => {
  const selector = React.useMemo(() => {
    if (pipelineRunName) {
      return {
        matchLabels: { [TektonResourceLabel.pipelinerun]: pipelineRunName },
      };
    }
    if (taskName) {
      return { matchLabels: { [TektonResourceLabel.pipelineTask]: taskName } };
    }
    return undefined as unknown as Selector;
  }, [taskName, pipelineRunName]);

  const [taskRuns, loaded, error, getNextPage] = useTaskRuns(
    fetchUtils,
    namespace,
    tektonResultsBaseURL,
    isTektonResultEnabled,
    selector && {
      selector,
    },
    cacheKey,
  );
  const sortedTaskRuns = React.useMemo(
    () =>
      taskRuns?.sort((a, b) => {
        if (a?.status?.completionTime) {
          return b?.status?.completionTime &&
            new Date(a?.status?.completionTime) > new Date(b?.status?.completionTime)
            ? 1
            : -1;
        }
        return b?.status?.startTime ||
          new Date(a?.status?.startTime ?? '') > new Date(b?.status?.startTime ?? '')
          ? 1
          : -1;
      }),
    [taskRuns],
  );

  return React.useMemo(
    () => [sortedTaskRuns, loaded, error, getNextPage],
    [sortedTaskRuns, loaded, error, getNextPage],
  );
};
