import { Condition, PipelineRunKind } from '../types/pipelinerun';

export enum SucceedConditionReason {
  PipelineRunStopped = 'StoppedRunFinally',
  PipelineRunCancelled = 'CancelledRunFinally',
  TaskRunCancelled = 'TaskRunCancelled',
  Cancelled = 'Cancelled',
  PipelineRunStopping = 'PipelineRunStopping',
  PipelineRunPending = 'PipelineRunPending',
  TaskRunStopping = 'TaskRunStopping',
  CreateContainerConfigError = 'CreateContainerConfigError',
  ExceededNodeResources = 'ExceededNodeResources',
  ExceededResourceQuota = 'ExceededResourceQuota',
  ConditionCheckFailed = 'ConditionCheckFailed',
}

export enum RunStatus {
  Succeeded = 'Succeeded',
  Failed = 'Failed',
  Running = 'Running',
  'In Progress' = 'In Progress',
  FailedToStart = 'FailedToStart',
  PipelineNotStarted = 'Starting',
  WithoutStatusConditions = 'WithoutStatusConditions',
  NeedsMerge = 'PR needs merge',
  Skipped = 'Skipped',
  Cancelled = 'Cancelled',
  Cancelling = 'Cancelling',
  Pending = 'Pending',
  Idle = 'Idle',
  TestWarning = 'Test Warnings',
  TestFailed = 'Test Failures',
  Unknown = 'Unknown',
}

export const conditionsRunStatus = (conditions: Condition[], specStatus?: string): RunStatus => {
  if (!conditions?.length) {
    return RunStatus.Pending;
  }

  const cancelledCondition = conditions.find((c) => c.reason === 'Cancelled');
  const succeedCondition = conditions.find((c) => c.type === 'Succeeded');

  if (!succeedCondition || !succeedCondition.status) {
    return RunStatus.Pending;
  }

  const status =
    succeedCondition.status === 'True'
      ? RunStatus.Succeeded
      : succeedCondition.status === 'False'
        ? RunStatus.Failed
        : RunStatus.Running;

  if (
    [
      `${SucceedConditionReason.PipelineRunStopped}`,
      `${SucceedConditionReason.PipelineRunCancelled}`,
    ].includes(specStatus ?? '') &&
    !cancelledCondition
  ) {
    return RunStatus.Cancelling;
  }

  if (!succeedCondition.reason || succeedCondition.reason === status) {
    return status;
  }

  switch (succeedCondition.reason) {
    case SucceedConditionReason.PipelineRunStopped:
    case SucceedConditionReason.PipelineRunCancelled:
    case SucceedConditionReason.TaskRunCancelled:
    case SucceedConditionReason.Cancelled:
      return RunStatus.Cancelled;
    case SucceedConditionReason.PipelineRunStopping:
    case SucceedConditionReason.TaskRunStopping:
      return RunStatus.Failed;
    case SucceedConditionReason.CreateContainerConfigError:
    case SucceedConditionReason.ExceededNodeResources:
    case SucceedConditionReason.ExceededResourceQuota:
    case SucceedConditionReason.PipelineRunPending:
      return RunStatus.Pending;
    case SucceedConditionReason.ConditionCheckFailed:
      return RunStatus.Skipped;
    default:
      return status;
  }
};

export const pipelineRunStatus = (pipelineRun: PipelineRunKind): RunStatus =>
  conditionsRunStatus(pipelineRun?.status?.conditions ?? [], pipelineRun?.spec?.status);
