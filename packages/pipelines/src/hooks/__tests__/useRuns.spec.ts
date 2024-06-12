import { renderHook } from '@testing-library/react';
import {
  getGroupVersionKindForModel,
  useK8sWatchResource,
} from '@openshift-console/dynamic-plugin-sdk';
import { mockK8sPipelineRuns } from '../__data__/mock-PipelineRun-data-k8s';
import { mockTRPipelineRuns } from '../__data__/mock-PipelineRun-data-TR';
import { useRuns } from '../useRuns';
import { useTRPipelineRuns } from '../useTRPipelineRuns';

jest.mock('../useTRPipelineRuns', () => ({
  useTRPipelineRuns: jest.fn(),
}));

describe('useRuns', () => {
  const mockUseK8sWatchResource = useK8sWatchResource as jest.Mock;
  const mockUseTRPipelineRuns = useTRPipelineRuns as jest.Mock;
  const mockGetGroupVersionKindForModel = getGroupVersionKindForModel as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return pipeline runs from both k8s and tekton results if TR is enabled', () => {
    const groupVersionKind = { group: 'tekton.dev', version: 'v1', kind: 'PipelineRun' };
    const namespace = 'test-namespace';
    const cacheKey = 'test-cache-key';

    mockUseK8sWatchResource.mockReturnValue([mockK8sPipelineRuns, true, null]);
    mockGetGroupVersionKindForModel.mockReturnValue({
      group: 'tekton.dev',
      version: 'v1',
      kind: 'PipelineRun',
    });
    mockUseTRPipelineRuns.mockReturnValue([mockTRPipelineRuns, true, null, jest.fn()]);

    const { result: trResult } = renderHook(() =>
      useRuns(groupVersionKind, namespace, undefined, cacheKey, true),
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
    mockGetGroupVersionKindForModel.mockReturnValue({
      group: 'tekton.dev',
      version: 'v1',
      kind: 'PipelineRun',
    });
    mockUseTRPipelineRuns.mockReturnValue([mockTRPipelineRuns, true, null, jest.fn()]);

    const { result: trResult } = renderHook(() =>
      useRuns(groupVersionKind, namespace, undefined, cacheKey, false),
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
    mockGetGroupVersionKindForModel.mockReturnValue({
      group: 'tekton.dev',
      version: 'v1',
      kind: 'PipelineRun',
    });
    mockUseTRPipelineRuns.mockReturnValue([
      [],
      false,
      new Error('Failed to fetch Tekton Results'),
      jest.fn(),
    ]);

    const { result: trResult } = renderHook(() =>
      useRuns(groupVersionKind, namespace, undefined, cacheKey, true),
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
    mockGetGroupVersionKindForModel.mockReturnValue({
      group: 'tekton.dev',
      version: 'v1',
      kind: 'PipelineRun',
    });
    mockUseTRPipelineRuns.mockReturnValue([mockTRPipelineRuns, true, null, jest.fn()]);

    const { result: trResult } = renderHook(() =>
      useRuns(groupVersionKind, namespace, undefined, cacheKey, true),
    );

    expect(trResult.current[0].length).toBe(2); // Only Tekton Results
    expect(trResult.current[1]).toEqual(true);
    expect(trResult.current[2]).toBeNull();
  });
});
