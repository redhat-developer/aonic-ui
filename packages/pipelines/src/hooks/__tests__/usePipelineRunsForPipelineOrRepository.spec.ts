import { renderHook } from '@testing-library/react';
import { usePipelineRunsForPipelineOrRepository } from '../usePipelineRunsForPipelineOrRepository';
import { usePipelineRuns } from '../usePipelineRuns';

jest.mock('../usePipelineRuns', () => ({
  usePipelineRuns: jest.fn(),
}));

describe('usePipelineRunsForPipelineOrRepository', () => {
  const mockUsePipelineRuns = usePipelineRuns as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return pipeline runs for Pipeline', () => {
    const namespace = 'test-namespace';
    const options = { name: 'test-pipeline', kind: 'Pipeline' };
    const cacheKey = 'test-cache-key';
    const selector = { matchLabels: { 'tekton.dev/pipeline': 'test-pipeline' } };
    const isTektonResultEnabled = true;

    mockUsePipelineRuns.mockReturnValue([[], true, null, jest.fn()]);

    renderHook(() =>
      usePipelineRunsForPipelineOrRepository(namespace, options, cacheKey, isTektonResultEnabled),
    );

    expect(mockUsePipelineRuns).toHaveBeenCalledWith(
      namespace,
      { selector },
      cacheKey,
      isTektonResultEnabled,
    );
  });

  it('should return pipeline runs for Repository', () => {
    const namespace = 'test-namespace';
    const options = { name: 'test-repo', kind: 'Repository' };
    const cacheKey = 'test-cache-key';
    const selector = {
      matchLabels: {
        'pipelinesascode.tekton.dev/repository': 'test-repo',
      },
    };
    const isTektonResultEnabled = true;

    mockUsePipelineRuns.mockReturnValue([[], true, null, jest.fn()]);

    renderHook(() =>
      usePipelineRunsForPipelineOrRepository(namespace, options, cacheKey, isTektonResultEnabled),
    );

    expect(mockUsePipelineRuns).toHaveBeenCalledWith(
      namespace,
      { selector },
      cacheKey,
      isTektonResultEnabled,
    );
  });

  it('should return pipeline runs with empty selector for unknown kind', () => {
    const namespace = 'test-namespace';
    const options = { name: 'test-unknown', kind: 'Unknown' };
    const cacheKey = 'test-cache-key';
    const selector = {};
    const isTektonResultEnabled = true;

    mockUsePipelineRuns.mockReturnValue([[], true, null, jest.fn()]);

    renderHook(() =>
      usePipelineRunsForPipelineOrRepository(namespace, options, cacheKey, isTektonResultEnabled),
    );

    expect(mockUsePipelineRuns).toHaveBeenCalledWith(
      namespace,
      { selector },
      cacheKey,
      isTektonResultEnabled,
    );
  });
});
