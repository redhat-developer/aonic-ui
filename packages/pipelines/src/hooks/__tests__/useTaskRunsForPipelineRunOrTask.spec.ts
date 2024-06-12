import { renderHook } from '@testing-library/react';
import { useTaskRunsForPipelineRunOrTask } from '../useTaskRunsForPipelineRunOrTask';
import { useTaskRuns } from '../useTaskRuns';
import { testTaskRuns } from '../__data__/mock-TaskRun-data';

jest.mock('../useTaskRuns', () => ({
  useTaskRuns: jest.fn(),
}));

describe('useTaskRunsForPipelineRunOrTask', () => {
  const mockUseTaskRuns = useTaskRuns as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return task runs, loaded state, error, and getNextPage', () => {
    const namespace = 'test-namespace';
    const pipelineRunName = 'test-pipeline-run';
    const taskName = 'test-task';
    const cacheKey = 'test-cache-key';
    const isTektonResultEnabled = true;

    mockUseTaskRuns.mockReturnValue([testTaskRuns, true, null, jest.fn()]);

    const { result } = renderHook(() =>
      useTaskRunsForPipelineRunOrTask(
        namespace,
        pipelineRunName,
        taskName,
        cacheKey,
        isTektonResultEnabled,
      ),
    );

    expect(mockUseTaskRuns).toHaveBeenCalledWith(
      namespace,
      {
        selector: {
          matchLabels: { 'tekton.dev/pipelineRun': pipelineRunName },
        },
      },
      cacheKey,
      isTektonResultEnabled,
    );

    const [taskRuns, loaded, error] = result.current;

    expect(taskRuns).toEqual(testTaskRuns);
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
        undefined,
        taskName,
        cacheKey,
        isTektonResultEnabled,
      ),
    );

    expect(mockUseTaskRuns).toHaveBeenCalledWith(
      namespace,
      {
        selector: {
          matchLabels: { 'tekton.dev/pipelineTask': taskName },
        },
      },
      cacheKey,
      isTektonResultEnabled,
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
        undefined,
        undefined,
        cacheKey,
        isTektonResultEnabled,
      ),
    );

    expect(mockUseTaskRuns).toHaveBeenCalledWith(
      namespace,
      undefined,
      cacheKey,
      isTektonResultEnabled,
    );
  });

  it('should return task runs without selector when neither pipelineRunName nor taskName is provided', () => {
    const namespace = 'test-namespace';

    mockUseTaskRuns.mockReturnValue([testTaskRuns, true, null, jest.fn()]);

    renderHook(() => useTaskRunsForPipelineRunOrTask(namespace));

    expect(mockUseTaskRuns).toHaveBeenCalledWith(namespace, undefined, undefined, undefined);
  });
});
