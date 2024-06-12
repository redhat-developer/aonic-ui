import { GetNextPage, TektonResultsOptions } from '../types/tekton-results';
import { getPipelineRuns } from '../utils/tekton-results-utils';
import { PipelineRunKind } from '../types';
import { useTektonResultsRuns } from './useTektonResultsRuns';

export const useTRPipelineRuns = (
  namespace: string,
  options?: TektonResultsOptions,
  cacheKey?: string,
  tektonResultsBaseURL?: string,
): [PipelineRunKind[], boolean, unknown, GetNextPage] =>
  useTektonResultsRuns<PipelineRunKind>(
    getPipelineRuns,
    namespace,
    options,
    cacheKey,
    tektonResultsBaseURL,
  );
