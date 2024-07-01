import { GetNextPage, TektonResultsOptions } from '../types/tekton-results';
import { getTaskRuns } from '../utils/tekton-results-utils';
import { TaskRunKind } from '../types';
import { useTektonResultsRuns } from './useTektonResultsRuns';
import { FetchUtilsType } from '../types/k8s';

export const useTRTaskRuns = (
  namespace: string,
  tektonResultsBaseURL: string,
  fetchUtils: FetchUtilsType,
  options?: TektonResultsOptions,
  cacheKey?: string,
): [TaskRunKind[], boolean, unknown, GetNextPage] =>
  useTektonResultsRuns<TaskRunKind>(
    getTaskRuns,
    namespace,
    tektonResultsBaseURL,
    fetchUtils,
    options,
    cacheKey,
  );
