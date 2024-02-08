import { PipelineRunKind } from '../types/pipelinerun';
import { RunStatus, SucceedConditionReason } from '../utils/pipelinerun-utils';
import { mockPipelineRunConfig, createPipelineRunData } from './data-utils';

const pipelineRunConfig: mockPipelineRunConfig = {
  name: 'test',
  status: RunStatus.Running,
  tasks: [
    { name: 'scan-task', status: RunStatus.Succeeded },
    { name: 'sbom-task', status: RunStatus.Succeeded },
  ],
};

const { pipelineRun, taskRuns, pods } = createPipelineRunData(pipelineRunConfig);

export const scanPipelineRun = pipelineRun;
export const scanTaskRuns = taskRuns;
export const scanTaskRunPods = pods;

export enum DataState {
  RUNNING = 'Running',
  SUCCEEDED = 'Succeeded',
  FAILED = 'Failed',
  SKIPPED = 'Skipped',
  PENDING = 'PipelineRunPending',
  STOPPED = 'StoppedRunFinally',
  CANCELLED = 'CancelledRunFinally',
  CANCELLING = 'PipelineRunCancelling',
  STOPPING = 'PipelineRunStopping',

  /*Custom data state to test various scnearios*/
  STATUS_WITHOUT_CONDITIONS = 'StatusWithoutCondition',
  EXCEEDED_NODE_RESOURCES = 'ExceededNodeResources',
  STATUS_WITH_EMPTY_CONDITIONS = 'StatusWithEmptyCondition',
  STATUS_WITH_UNKNOWN_REASON = 'StatusWithUnknownReason',
}

type TestPipelineRuns = { [key in Partial<DataState>]: PipelineRunKind };

const sampleTasks = [
  { name: 'build-task', status: RunStatus.Succeeded },
  { name: 'scan-task', status: RunStatus.Succeeded },
  { name: 'sbom-task', status: RunStatus.Succeeded },
];

export const testPipelineRuns: TestPipelineRuns = {
  [DataState.RUNNING]: createPipelineRunData({
    name: 'test-plr-running',
    status: RunStatus.Running,
    tasks: sampleTasks,
  }).pipelineRun,
  [DataState.PENDING]: createPipelineRunData({
    name: 'test-plr-pending',
    status: RunStatus.Pending,
    tasks: sampleTasks,
  }).pipelineRun,
  [DataState.SUCCEEDED]: createPipelineRunData({
    name: 'test-plr-succeeded',
    status: RunStatus.Succeeded,
    tasks: sampleTasks,
  }).pipelineRun,
  [DataState.FAILED]: createPipelineRunData({
    name: 'test-plr-failed',
    status: RunStatus.Failed,
    tasks: sampleTasks,
  }).pipelineRun,

  [DataState.CANCELLING]: createPipelineRunData({
    name: 'test-plr-cancelling',
    status: RunStatus.Running,
    spec: { status: 'CancelledRunFinally' },
    tasks: sampleTasks,
  }).pipelineRun,
  [DataState.CANCELLED]: createPipelineRunData({
    name: 'test-plr-cancelled',
    status: RunStatus.Cancelled,
    spec: { status: 'CancelledRunFinally' },
    tasks: sampleTasks,
  }).pipelineRun,
  [DataState.STOPPING]: createPipelineRunData({
    name: 'test-plr-cancelled',
    status: SucceedConditionReason.PipelineRunStopping,
    tasks: sampleTasks,
  }).pipelineRun,
  [DataState.SKIPPED]: createPipelineRunData({
    name: 'test-plr-skipped',
    status: RunStatus.Skipped,
    tasks: sampleTasks,
  }).pipelineRun,
  [DataState.STOPPED]: createPipelineRunData({
    name: 'test-plr-stopping',
    status: SucceedConditionReason.PipelineRunStopped,
    tasks: sampleTasks,
  }).pipelineRun,
  [DataState.EXCEEDED_NODE_RESOURCES]: createPipelineRunData({
    name: 'test-plr-exceeded-node-resources',
    status: SucceedConditionReason.ExceededNodeResources,
    tasks: sampleTasks,
  }).pipelineRun,
  [DataState.STATUS_WITHOUT_CONDITIONS]: createPipelineRunData({
    name: 'test-plr-without-conditions',
    status: 'STATUS_WITHOUT_CONDITIONS',
    tasks: sampleTasks,
  }).pipelineRun,
  [DataState.STATUS_WITH_UNKNOWN_REASON]: createPipelineRunData({
    name: 'test-plr-with-unknown-reason',
    status: RunStatus.Unknown,
    tasks: sampleTasks,
  }).pipelineRun,
  [DataState.STATUS_WITH_EMPTY_CONDITIONS]: createPipelineRunData({
    name: 'test-plr-with-empty-conditions',
    status: 'STATUS_WITH_EMPTY_CONDITIONS',
    tasks: sampleTasks,
  }).pipelineRun,
};
