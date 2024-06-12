import { renderHook, waitFor } from '@testing-library/react';
import { mockTRPipelineRuns } from '../__data__/mock-PipelineRun-data-TR';
import { getPipelineRuns } from '../../utils/tekton-results-utils';
import { useTektonResultsRuns } from '../useTektonResultsRuns';

jest.mock('../../utils/tekton-results-utils', () => ({
  getPipelineRuns: jest.fn(),
}));

const mockGetPipelineRuns = getPipelineRuns as jest.Mock;

describe('useTektonResultsRuns', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return pipeline runs successfully', async () => {
    const namespace = 'test-namespace';
    const options = { limit: 2 };
    const cacheKey = 'test-cache-key';
    const tektonResultsBaseURL = 'https://tekton-results.example.com';

    mockGetPipelineRuns.mockResolvedValue([mockTRPipelineRuns, { nextPageToken: undefined }]);

    const { result } = renderHook(() =>
      useTektonResultsRuns(getPipelineRuns, namespace, options, cacheKey, tektonResultsBaseURL),
    );

    await waitFor(() => expect(result.current[1]).toBe(true));

    expect(result.current[0]).toEqual(mockTRPipelineRuns);
    expect(result.current[1]).toBe(true);
    expect(result.current[2]).toBeUndefined();
    expect(result.current[3]).toBeInstanceOf(Function);
  });

  it('should handle errors during data fetch', async () => {
    const namespace = 'test-namespace';
    const options = { limit: 2 };
    const cacheKey = 'test-cache-key';
    const tektonResultsBaseURL = 'https://tekton-results.example.com';
    const errorMessage = 'Failed to fetch data';

    mockGetPipelineRuns.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() =>
      useTektonResultsRuns(getPipelineRuns, namespace, options, cacheKey, tektonResultsBaseURL),
    );

    await waitFor(() => expect(result.current[1]).toBe(false));

    expect(result.current[0]).toEqual([]);
    expect(result.current[1]).toBe(false);
    expect(result.current[2]).toEqual(new Error(errorMessage));
    expect(result.current[3]).toBeInstanceOf(Function);
  });
});
