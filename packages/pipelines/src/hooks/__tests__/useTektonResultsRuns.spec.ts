import { renderHook, waitFor } from '@testing-library/react';
import { mockTRPipelineRuns } from '../__data__/mock-PipelineRun-data-TR';
import { getPipelineRuns } from '../../utils/tekton-results-utils';
import { useTektonResultsRuns } from '../useTektonResultsRuns';
import {
  ConsoleProxyFetchJSON,
  FetchUtilsType,
  commonFetchJSON,
  commonFetchText,
} from '../../types/k8s';

jest.mock('../../utils/tekton-results-utils', () => ({
  getPipelineRuns: jest.fn(),
}));

const mockGetPipelineRuns = getPipelineRuns as jest.Mock;
const createMockCommonFetchJson = (): jest.MockedFunction<commonFetchJSON> => {
  const mockFn = jest.fn() as unknown as jest.MockedFunction<commonFetchJSON>;
  mockFn.put = jest.fn();
  mockFn.post = jest.fn();
  mockFn.patch = jest.fn();
  mockFn.delete = jest.fn();
  return mockFn;
};

const mockCommonFetchJson = createMockCommonFetchJson();
const mockCommonFetchText: jest.MockedFunction<commonFetchText> =
  jest.fn() as jest.MockedFunction<commonFetchText>;
const mockConsoleProxyFetchJSON: jest.MockedFunction<ConsoleProxyFetchJSON> =
  jest.fn() as jest.MockedFunction<ConsoleProxyFetchJSON>;
const mockConsoleProxyFetchLog: jest.MockedFunction<ConsoleProxyFetchJSON> =
  jest.fn() as jest.MockedFunction<ConsoleProxyFetchJSON>;
const mockFetchUtils: FetchUtilsType = {
  hooks: {
    useK8sWatchResource: jest.fn(),
  },
  resourceFetchers: {
    commonFetchText: mockCommonFetchText,
    commonFetchJson: mockCommonFetchJson,
    consoleProxyFetchJSON: mockConsoleProxyFetchJSON,
    consoleProxyFetchLog: mockConsoleProxyFetchLog,
  },
};

describe('useTektonResultsRuns', () => {
  const tektonResultsBaseURL = 'https://tekton-results.example.com';
  const isTektonResultEnabled = true;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return pipeline runs successfully', async () => {
    const namespace = 'test-namespace';
    const options = { limit: 2 };
    const cacheKey = 'test-cache-key';
    mockGetPipelineRuns.mockResolvedValue([mockTRPipelineRuns, { nextPageToken: undefined }]);

    const { result } = renderHook(() =>
      useTektonResultsRuns(
        mockGetPipelineRuns,
        namespace,
        {
          fetchUtils: mockFetchUtils,
          tektonResultsBaseURL,
          isTektonResultEnabled,
        },
        options,
        cacheKey,
      ),
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
    const errorMessage = 'Failed to fetch data';

    mockGetPipelineRuns.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() =>
      useTektonResultsRuns(
        mockGetPipelineRuns,
        namespace,
        {
          fetchUtils: mockFetchUtils,
          tektonResultsBaseURL,
          isTektonResultEnabled,
        },
        options,
        cacheKey,
      ),
    );

    await waitFor(() => expect(result.current[1]).toBe(false));

    expect(result.current[0]).toEqual([]);
    expect(result.current[1]).toBe(false);
    expect(result.current[2]).toEqual(new Error(errorMessage));
    expect(result.current[3]).toBeInstanceOf(Function);
  });
});
