import React from 'react';
import { PipelineRunKind } from '../types';
import { GetNextPage, Selector } from '../types/tekton-results';
import { RepositoryFields, RepositoryLabels } from '../types/repository';
import { usePipelineRuns } from './usePipelineRuns';
import { TektonConfiguration } from '../types/k8s';

export const usePipelineRunsForPipelineOrRepository = (
  ns: string,
  config: TektonConfiguration,
  options?: { name: string; kind: string },
  cacheKey?: string,
): [PipelineRunKind[], boolean, unknown, GetNextPage] => {
  const selector: Selector = React.useMemo(() => {
    if (options?.kind === 'Pipeline') {
      return { matchLabels: { 'tekton.dev/pipeline': options?.name } };
    }
    if (options?.kind === 'Repository') {
      return {
        matchLabels: {
          [RepositoryLabels[RepositoryFields.REPOSITORY]]: options?.name,
        },
      };
    }
    return {} as Selector;
  }, [options?.kind, options?.name]);

  const [pipelineRuns, loaded, error, getNextPage] = usePipelineRuns(
    ns,
    config,
    selector && {
      selector,
    },
    cacheKey,
  );

  return React.useMemo(
    () => [pipelineRuns, loaded, error, getNextPage],
    [pipelineRuns, loaded, error, getNextPage],
  );
};
