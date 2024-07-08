import { GetNextPage, TektonResultsOptions } from '../types/tekton-results';
import { getTaskRuns } from '../utils/tekton-results-utils';
import { TaskRunKind } from '../types';
import { useTektonResultsRuns } from './useTektonResultsRuns';
import { TektonConfiguration } from '../types/k8s';

export const useTRTaskRuns = (
  namespace: string,
  config: TektonConfiguration,
  options?: TektonResultsOptions,
  cacheKey?: string,
): [TaskRunKind[], boolean, unknown, GetNextPage] =>
  useTektonResultsRuns<TaskRunKind>(getTaskRuns, namespace, config, options, cacheKey);
