import { renderHook } from '@testing-library/react';
import { mockK8sPipelineRuns } from '../__data__/mock-PipelineRun-data-k8s';
import { mockTRPipelineRuns } from '../__data__/mock-PipelineRun-data-TR';
import { useRuns } from '../useRuns';
import { useTRPipelineRuns } from '../useTRPipelineRuns';
import {
  ConsoleProxyFetchJSON,
  FetchUtilsType,
  commonFetchJSON,
  commonFetchText,
} from '../../types/k8s';

jest.mock('../useTRPipelineRuns', () => ({
  useTRPipelineRuns: jest.fn(),
}));

const mockUseK8sWatchResource = jest.fn();

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
    useK8sWatchResource: mockUseK8sWatchResource,
  },
  resourceFetchers: {
    commonFetchText: mockCommonFetchText,
    commonFetchJson: mockCommonFetchJson,
    consoleProxyFetchJSON: mockConsoleProxyFetchJSON,
    consoleProxyFetchLog: mockConsoleProxyFetchLog,
  },
};

describe('useRuns', () => {
  const mockUseTRPipelineRuns = useTRPipelineRuns as jest.Mock;
  const tektonResultsBaseURL = 'https://tekton-results.example.com';
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return pipeline runs from both k8s and tekton results if TR is enabled', () => {
    const groupVersionKind = { group: 'tekton.dev', version: 'v1', kind: 'PipelineRun' };
    const namespace = 'test-namespace';
    const cacheKey = 'test-cache-key';
    mockUseK8sWatchResource.mockReturnValue([mockK8sPipelineRuns, true, null]);
    mockUseTRPipelineRuns.mockReturnValue([mockTRPipelineRuns, true, null, jest.fn()]);
    const { result: trResult } = renderHook(() =>
      useRuns(
        groupVersionKind,
        namespace,
        {
          fetchUtils: mockFetchUtils,
          tektonResultsBaseURL,
          isTektonResultEnabled: true,
        },
        undefined,
        cacheKey,
      ),
    );

    expect(trResult.current[0].length).toBe(4); // 2 k8s resources + 2 from tekton-results
    expect(trResult.current[1]).toEqual(true);
    expect(trResult.current[2]).toBeNull();
  });

  it('should return pipeline runs from k8s if TR is disabled', () => {
    const groupVersionKind = { group: 'tekton.dev', version: 'v1', kind: 'PipelineRun' };
    const namespace = 'test-namespace';
    const cacheKey = 'test-cache-key';

    mockUseK8sWatchResource.mockReturnValue([mockK8sPipelineRuns, true, null]);
    mockUseTRPipelineRuns.mockReturnValue([mockTRPipelineRuns, true, null, jest.fn()]);

    const { result: trResult } = renderHook(() =>
      useRuns(
        groupVersionKind,
        namespace,
        {
          fetchUtils: mockFetchUtils,
          tektonResultsBaseURL,
          isTektonResultEnabled: false,
        },
        undefined,
        cacheKey,
      ),
    );

    expect(trResult.current[0].length).toBe(2); // 2 from tekton-results
    expect(trResult.current[1]).toEqual(true);
    expect(trResult.current[2]).toBeNull();
  });

  it('should handle failed response from Tekton Results gracefully', () => {
    const groupVersionKind = { group: 'tekton.dev', version: 'v1', kind: 'PipelineRun' };
    const namespace = 'test-namespace';
    const cacheKey = 'test-cache-key';

    mockUseK8sWatchResource.mockReturnValue([mockK8sPipelineRuns, true, null]);
    mockUseTRPipelineRuns.mockReturnValue([
      [],
      false,
      new Error('Failed to fetch Tekton Results'),
      jest.fn(),
    ]);

    const { result: trResult } = renderHook(() =>
      useRuns(
        groupVersionKind,
        namespace,
        {
          fetchUtils: mockFetchUtils,
          tektonResultsBaseURL,
          isTektonResultEnabled: true,
        },
        undefined,
        cacheKey,
      ),
    );

    expect(trResult.current[0].length).toBe(2); // Only k8s resources
    expect(trResult.current[1]).toEqual(true);
    expect(trResult.current[2]).toBeNull();
  });

  it('should return only Tekton Results if k8s data is archived', () => {
    const groupVersionKind = { group: 'tekton.dev', version: 'v1', kind: 'PipelineRun' };
    const namespace = 'test-namespace';
    const cacheKey = 'test-cache-key';

    mockUseK8sWatchResource.mockReturnValue([[], true, null]);
    mockUseTRPipelineRuns.mockReturnValue([mockTRPipelineRuns, true, null, jest.fn()]);

    const { result: trResult } = renderHook(() =>
      useRuns(
        groupVersionKind,
        namespace,
        {
          fetchUtils: mockFetchUtils,
          tektonResultsBaseURL,
          isTektonResultEnabled: true,
        },
        undefined,
        cacheKey,
      ),
    );

    expect(trResult.current[0].length).toBe(2); // Only Tekton Results
    expect(trResult.current[1]).toEqual(true);
    expect(trResult.current[2]).toBeNull();
  });
});
