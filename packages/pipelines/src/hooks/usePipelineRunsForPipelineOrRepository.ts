import React from 'react';
import { PipelineRunKind } from '../types';
import { GetNextPage, Selector } from '../types/tekton-results';
import { RepositoryFields, RepositoryLabels } from '../types/repository';
import { usePipelineRuns } from './usePipelineRuns';

export const usePipelineRunsForPipelineOrRepository = (
  ns: string,
  options?: { name: string; kind: string },
  cacheKey?: string,
  isTektonResultEnabled?: boolean,
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
    selector && {
      selector,
    },
    cacheKey,
    isTektonResultEnabled,
  );

  return React.useMemo(
    () => [pipelineRuns, loaded, error, getNextPage],
    [pipelineRuns, loaded, error, getNextPage],
  );
};
