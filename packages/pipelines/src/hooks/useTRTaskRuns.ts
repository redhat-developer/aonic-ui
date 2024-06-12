import { GetNextPage, TektonResultsOptions } from '../types/tekton-results';
import { getTaskRuns } from '../utils/tekton-results-utils';
import { TaskRunKind } from '../types';
import { useTektonResultsRuns } from './useTektonResultsRuns';

export const useTRTaskRuns = (
  namespace: string,
  options?: TektonResultsOptions,
  cacheKey?: string,
  tektonResultsBaseURL?: string,
): [TaskRunKind[], boolean, unknown, GetNextPage] =>
  useTektonResultsRuns<TaskRunKind>(
    getTaskRuns,
    namespace,
    options,
    cacheKey,
    tektonResultsBaseURL,
  );
