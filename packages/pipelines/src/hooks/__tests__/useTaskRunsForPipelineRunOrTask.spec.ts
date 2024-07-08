import { renderHook } from '@testing-library/react';
import { useTaskRunsForPipelineRunOrTask } from '../useTaskRunsForPipelineRunOrTask';
import { useTaskRuns } from '../useTaskRuns';
import { testTaskRuns } from '../__data__/mock-TaskRun-data';
import {
  FetchUtilsType,
  commonFetchJSON,
  commonFetchText,
  ConsoleProxyFetchJSON,
} from '../../types/k8s';

jest.mock('../useTaskRuns', () => ({
  useTaskRuns: jest.fn(),
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

describe('useTaskRunsForPipelineRunOrTask', () => {
  const mockUseTaskRuns = useTaskRuns as jest.Mock;
  const tektonResultsBaseURL = 'https://tekton-results.example.com';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return sorted task runs, loaded state, error, and getNextPage', () => {
    const namespace = 'test-namespace';
    const pipelineRunName = 'test-pipeline-run';
    const taskName = 'test-task';
    const cacheKey = 'test-cache-key';
    const isTektonResultEnabled = true;

    mockUseTaskRuns.mockReturnValue([testTaskRuns, true, null, jest.fn()]);

    const { result } = renderHook(() =>
      useTaskRunsForPipelineRunOrTask(
        namespace,
        {
          fetchUtils: mockFetchUtils,
          tektonResultsBaseURL,
          isTektonResultEnabled,
        },
        pipelineRunName,
        taskName,
        cacheKey,
      ),
    );

    expect(mockUseTaskRuns).toHaveBeenCalledWith(
      namespace,
      {
        fetchUtils: mockFetchUtils,
        tektonResultsBaseURL,
        isTektonResultEnabled,
      },
      {
        selector: {
          matchLabels: { 'tekton.dev/pipelineRun': pipelineRunName },
        },
      },
      cacheKey,
    );

    const [taskRuns, loaded, error] = result.current;

    expect(taskRuns).toEqual(
      testTaskRuns.sort((a, b) => {
        if (a?.status?.completionTime) {
          return b?.status?.completionTime &&
            new Date(a?.status?.completionTime) > new Date(b?.status?.completionTime)
            ? 1
            : -1;
        }
        return b?.status?.startTime &&
          new Date(a?.status?.startTime ?? '') > new Date(b?.status?.startTime ?? '')
          ? 1
          : -1;
      }),
    );
    expect(loaded).toEqual(true);
    expect(error).toEqual(null);
  });

  it('should return task runs with taskName selector when pipelineRunName is not provided', () => {
    const namespace = 'test-namespace';
    const taskName = 'test-task';
    const cacheKey = 'test-cache-key';
    const isTektonResultEnabled = true;

    mockUseTaskRuns.mockReturnValue([testTaskRuns, true, null, jest.fn()]);

    renderHook(() =>
      useTaskRunsForPipelineRunOrTask(
        namespace,
        {
          fetchUtils: mockFetchUtils,
          tektonResultsBaseURL,
          isTektonResultEnabled,
        },
        undefined,
        taskName,
        cacheKey,
      ),
    );

    expect(mockUseTaskRuns).toHaveBeenCalledWith(
      namespace,
      {
        fetchUtils: mockFetchUtils,
        tektonResultsBaseURL,
        isTektonResultEnabled,
      },
      {
        selector: {
          matchLabels: { 'tekton.dev/pipelineTask': taskName },
        },
      },
      cacheKey,
    );
  });

  it('should return task runs without selector when taskName is not provided', () => {
    const namespace = 'test-namespace';
    const cacheKey = 'test-cache-key';
    const isTektonResultEnabled = true;

    mockUseTaskRuns.mockReturnValue([testTaskRuns, true, null, jest.fn()]);

    renderHook(() =>
      useTaskRunsForPipelineRunOrTask(
        namespace,
        {
          fetchUtils: mockFetchUtils,
          tektonResultsBaseURL,
          isTektonResultEnabled,
        },
        undefined,
        undefined,
        cacheKey,
      ),
    );

    expect(mockUseTaskRuns).toHaveBeenCalledWith(
      namespace,
      {
        fetchUtils: mockFetchUtils,
        tektonResultsBaseURL,
        isTektonResultEnabled,
      },
      undefined,
      cacheKey,
    );
  });

  it('should return task runs without selector when neither pipelineRunName nor taskName is provided', () => {
    const namespace = 'test-namespace';
    const isTektonResultEnabled = true;

    mockUseTaskRuns.mockReturnValue([testTaskRuns, true, null, jest.fn()]);

    renderHook(() =>
      useTaskRunsForPipelineRunOrTask(namespace, {
        fetchUtils: mockFetchUtils,
        tektonResultsBaseURL,
        isTektonResultEnabled,
      }),
    );

    expect(mockUseTaskRuns).toHaveBeenCalledWith(
      namespace,
      {
        fetchUtils: mockFetchUtils,
        tektonResultsBaseURL,
        isTektonResultEnabled,
      },
      undefined,
      undefined,
    );
  });
});
