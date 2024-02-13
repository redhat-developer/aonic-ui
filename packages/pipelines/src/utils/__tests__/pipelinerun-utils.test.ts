import { testPipelineRuns, DataState } from '../../__fixtures__/pipelinerun';
import { PipelineRunKind } from '../../types/pipelinerun';
import { RunStatus, pipelineRunStatus } from '../pipelinerun-utils';

describe('pipelinerun-utils', () => {
  test('should return Succeeded status', () => {
    expect(pipelineRunStatus(testPipelineRuns[DataState.SUCCEEDED])).toBe(RunStatus.Succeeded);
  });
  test('should return Running status', () => {
    expect(pipelineRunStatus(testPipelineRuns[DataState.RUNNING])).toBe(RunStatus.Running);
  });
  test('should return Pending status', () => {
    expect(pipelineRunStatus(testPipelineRuns[DataState.PENDING])).toBe(RunStatus.Pending);
  });

  test('should return Failed status', () => {
    expect(pipelineRunStatus(testPipelineRuns[DataState.STOPPING])).toBe(RunStatus.Failed);
  });
  test('should return Failed status', () => {
    expect(pipelineRunStatus(testPipelineRuns[DataState.FAILED])).toBe(RunStatus.Failed);
  });
  test('should return Cancelling status', () => {
    expect(pipelineRunStatus(testPipelineRuns[DataState.CANCELLING])).toBe(RunStatus.Cancelling);
  });
  test('should return Cancelled status', () => {
    expect(pipelineRunStatus(testPipelineRuns[DataState.CANCELLED])).toBe(RunStatus.Cancelled);
  });

  test('should return Cancelled status', () => {
    expect(pipelineRunStatus(testPipelineRuns[DataState.STOPPED])).toBe(RunStatus.Cancelled);
  });

  test('should return Skipped status', () => {
    expect(pipelineRunStatus(testPipelineRuns[DataState.SKIPPED])).toBe(RunStatus.Skipped);
  });

  test('should return Pending status', () => {
    expect(pipelineRunStatus(testPipelineRuns[DataState.EXCEEDED_NODE_RESOURCES])).toBe(
      RunStatus.Pending,
    );
  });

  test('should return Pending status', () => {
    expect(pipelineRunStatus(testPipelineRuns[DataState.STATUS_WITHOUT_CONDITIONS])).toBe(
      RunStatus.Pending,
    );
  });

  test('should return Running status for unknown reason', () => {
    expect(pipelineRunStatus(testPipelineRuns[DataState.STATUS_WITH_UNKNOWN_REASON])).toBe(
      RunStatus.Running,
    );
  });
  test('should return Pending status for unknown reason', () => {
    expect(pipelineRunStatus(testPipelineRuns[DataState.STATUS_WITH_EMPTY_CONDITIONS])).toBe(
      RunStatus.Pending,
    );
  });
  test('should return Pending status for unknown reason', () => {
    expect(pipelineRunStatus({} as PipelineRunKind)).toBe(RunStatus.Pending);
  });
});
