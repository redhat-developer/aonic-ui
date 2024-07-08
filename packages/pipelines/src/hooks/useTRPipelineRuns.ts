import { GetNextPage, TektonResultsOptions } from '../types/tekton-results';
import { getPipelineRuns } from '../utils/tekton-results-utils';
import { PipelineRunKind } from '../types';
import { useTektonResultsRuns } from './useTektonResultsRuns';
import { TektonConfiguration } from '../types/k8s';

export const useTRPipelineRuns = (
  namespace: string,
  config: TektonConfiguration,
  options?: TektonResultsOptions,
  cacheKey?: string,
): [PipelineRunKind[], boolean, unknown, GetNextPage] =>
  useTektonResultsRuns<PipelineRunKind>(getPipelineRuns, namespace, config, options, cacheKey);
