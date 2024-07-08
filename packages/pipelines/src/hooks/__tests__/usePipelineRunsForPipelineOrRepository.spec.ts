import { renderHook } from '@testing-library/react';
import { usePipelineRunsForPipelineOrRepository } from '../usePipelineRunsForPipelineOrRepository';
import { usePipelineRuns } from '../usePipelineRuns';
import {
  ConsoleProxyFetchJSON,
  FetchUtilsType,
  commonFetchJSON,
  commonFetchText,
} from '../../types/k8s';

jest.mock('../usePipelineRuns', () => ({
  usePipelineRuns: jest.fn(),
}));

const createMockCommonFetchJson = (): jest.MockedFunction<commonFetchJSON> => {
  const mockFn = jest.fn() as unknown as jest.MockedFunction<commonFetchJSON>;

  // Add the additional methods to the mock function
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

describe('usePipelineRunsForPipelineOrRepository', () => {
  const mockUsePipelineRuns = usePipelineRuns as jest.Mock;
  const tektonResultsBaseURL = 'https://tekton-results.example.com';

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
      usePipelineRunsForPipelineOrRepository(
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

    expect(mockUsePipelineRuns).toHaveBeenCalledWith(
      namespace,
      {
        fetchUtils: mockFetchUtils,
        tektonResultsBaseURL,
        isTektonResultEnabled,
      },
      { selector },
      cacheKey,
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
      usePipelineRunsForPipelineOrRepository(
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

    expect(mockUsePipelineRuns).toHaveBeenCalledWith(
      namespace,
      {
        fetchUtils: mockFetchUtils,
        tektonResultsBaseURL,
        isTektonResultEnabled,
      },
      { selector },
      cacheKey,
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
      usePipelineRunsForPipelineOrRepository(
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

    expect(mockUsePipelineRuns).toHaveBeenCalledWith(
      namespace,
      {
        fetchUtils: mockFetchUtils,
        tektonResultsBaseURL,
        isTektonResultEnabled,
      },
      { selector },
      cacheKey,
    );
  });
});
