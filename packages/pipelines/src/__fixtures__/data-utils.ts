import { TektonResourceLabel, TektonResultsRun } from '../types/coreTekton';
import { PipelineTask } from '../types/pipeline';
import { PipelineRunKind, Condition } from '../types/pipelinerun';
import { TaskRunKind } from '../types/taskrun';
import { RunStatus, SucceedConditionReason } from '../utils/pipelinerun-utils';

const samplePipelineRun: PipelineRunKind = {
  apiVersion: 'tekton.dev/v1',
  kind: 'PipelineRun',
  metadata: {
    annotations: {
      'pipeline.openshift.io/started-by': 'kube-admin',
      'chains.tekton.dev/signed': 'false',
    },
    labels: {
      'backstage.io/kubernetes-id': 'test-backstage',
      'tekton.dev/pipeline': 'pipeline-test',
      'app.kubernetes.io/instance': 'abs',
      'app.kubernetes.io/name': 'ghg',
      'operator.tekton.dev/operand-name': 'ytui',
      'pipeline.openshift.io/runtime-version': 'hjkhk',
      'pipeline.openshift.io/type': 'hhu',
      'pipeline.openshift.io/runtime': 'node',
    },
    name: 'pipelinerun-with-scanner-task',
    namespace: 'deb-test',
    resourceVersion: '117337',
    uid: '0a091bbf-3813-48d3-a6ce-fc43644a9b24',
    creationTimestamp: '2023-04-11T12:31:56Z',
  },
  spec: {
    pipelineRef: {
      name: 'pipeline-test',
    },
    serviceAccountName: 'pipeline',
    workspaces: [],
  },
  status: {
    completionTime: '2023-04-11T06:49:05Z',
    conditions: [
      {
        lastTransitionTime: '2023-03-30T07:05:13Z',
        message: 'Tasks Completed: 3 (Failed: 0, Cancelled 0), Skipped: 0',
        reason: 'Succeeded',
        status: 'True',
        type: 'Succeeded',
      },
    ],
    pipelineSpec: {
      tasks: [
        {
          name: 'scan-task',
          params: [],
          taskRef: {
            kind: 'ClusterTask',
            name: 'scan-task',
          },
          workspaces: [],
        },
      ],
      workspaces: [],
    },
    results: [
      {
        name: 'SCAN_OUTPUT',
        value:
          '{"vulnerabilities":{\n"critical": 13,\n"high": 29,\n"medium": 32,\n"low": 3,\n"unknown": 0},\n"unpatched_vulnerabilities": {\n"critical": 0,\n"high": 1,\n"medium": 0,\n"low":1}\n}\n',
      },
    ],
    startTime: '2023-04-11T05:49:05Z',
  },
};

export const sampleTaskRun: TaskRunKind = {
  apiVersion: 'tekton.dev/v1',
  kind: 'TaskRun',
  metadata: {
    name: 'ec-taskrun',
    labels: {
      'tekton.dev/pipelineRun': 'pipelinerun-with-scanner-task',
      'tekton.dev/pipelineTask': 'ec-task',
    },
    annotations: {
      'chains.tekton.dev/signed': 'true',
      'pipeline.openshift.io/preferredName': 'pipelineRun-ec-task',
      'pipeline.openshift.io/started-by': 'kube:admin',
      'pipeline.tekton.dev/release': 'a2f17f6',
      'task.results.format': 'application/json',
      'task.output.location': 'logs',
      'task.results.type': 'ec',
      name: 'pipelineRun-ec-task-t237ev',
      uid: '764d0a6c-a4f6-419c-a3c3-585c2a9eb67c',
    },
  },
  spec: {
    serviceAccountName: 'pipeline',
    taskRef: {
      kind: 'Task',
      name: 'ec-task',
    },
    timeout: '1h0m0s',
  },
  status: {
    completionTime: '2023-11-08T08:18:25Z',
    conditions: [
      {
        lastTransitionTime: '2023-11-08T08:18:25Z',
        message: 'All Steps have completed executing',
        reason: 'Succeeded',
        status: 'True',
        type: 'Succeeded',
      },
    ],
    podName: 'pipelineRun-ec-task-t237ev-pod',
  },
};

const samplePod = {
  metadata: {
    name: 'pipeline-test-wbvtlk-tkn-pod',
    namespace: 'karthik',
    uid: 'bd868fde-1b37-4168-a780-f1772c5924e3',
    resourceVersion: '379524',
    labels: {
      'tekton.dev/clusterTask': 'tkn',
      'tekton.dev/memberOf': 'tasks',
      'tekton.dev/pipeline': 'test-pipeline',
      'tekton.dev/pipelineRun': 'pipeline-test-wbvtlk',
      'tekton.dev/pipelineTask': 'tkn',
      'tekton.dev/taskRun': 'test-pipeline-8e09zm-task1',
    },
  },
  spec: {
    volumes: [
      {
        name: 'tekton-internal-workspace',
        emptyDir: {},
      },
    ],
    containers: [
      {
        name: 'step-tkn',
      },
    ],
  },
  status: {
    phase: 'Succeeded',
    conditions: [],
    startTime: new Date('2023-12-08T12:19:29Z'),
  },
};

type DataStateConditions =
  | RunStatus
  | SucceedConditionReason
  | 'STATUS_WITHOUT_CONDITIONS'
  | 'STATUS_WITH_EMPTY_CONDITIONS';

const runConditions: { [key in DataStateConditions]?: Condition | {} } = {
  [RunStatus['In Progress']]: { status: 'Unknown', type: 'Succeeded' },
  [RunStatus.Running]: { status: 'Unknown', reason: 'Running', type: 'Succeeded' },
  [RunStatus.Succeeded]: {
    lastTransitionTime: '2023-03-30T07:05:13Z',
    message: 'Tasks Completed: 3 (Failed: 0, Cancelled 0), Skipped: 0',
    reason: 'Succeeded',
    status: 'True',
    type: 'Succeeded',
  },
  [RunStatus.Failed]: {
    lastTransitionTime: '2023-03-30T07:05:13Z',
    message: 'Tasks Completed: 1 (Failed: 1, Cancelled 0), Skipped: 0',
    reason: 'Failed',
    status: 'False',
    type: 'Succeeded',
  },

  [RunStatus.Pending]: {
    status: 'Unknown',
    reason: 'CreateContainerConfigError',
    type: 'Succeeded',
  },
  [RunStatus.Skipped]: {
    type: 'Succeeded',
    status: 'Unknown',
    reason: 'ConditionCheckFailed',
  },
  [RunStatus.Cancelling]: {
    type: 'Succeeded',
    status: 'Unknown',
    reason: 'CancelledRunFinally',
  },
  [RunStatus.Cancelled]: {
    type: 'Succeeded',
    status: 'Unknown',
    reason: 'Cancelled',
  },
  [RunStatus.PipelineNotStarted]: {
    type: 'Succeeded',
    status: 'Unknown',
    reason: 'Succeeded',
  },
  [RunStatus.Unknown]: {
    status: 'Unknown',
    reason: 'Unknown',
    type: 'Succeeded',
  },
  [SucceedConditionReason.PipelineRunStopping]: {
    type: 'Succeeded',
    status: 'Unknown',
    reason: 'PipelineRunStopping',
  },
  [SucceedConditionReason.PipelineRunStopped]: {
    type: 'Succeeded',
    status: 'Unknown',
    reason: 'StoppedRunFinally',
  },
  [SucceedConditionReason.ExceededNodeResources]: {
    status: 'Unknown',
    reason: 'ExceededNodeResources',
    type: 'ExceededNodeResources',
  },
  STATUS_WITHOUT_CONDITIONS: {},
  STATUS_WITH_EMPTY_CONDITIONS: {},
};

const sampleTask: (name: string) => PipelineTask = (name: string) => ({
  name,
  params: [],
  taskRef: {
    kind: 'ClusterTask',
    name,
  },
});

type ResourceConfig = {
  name: string;
  status: DataStateConditions;
  labels?: { [key: string]: string };
  annotations?: { [key: string]: string };
  results?: TektonResultsRun[];
};

export type mockPipelineRunConfig = ResourceConfig & {
  spec?: any;
  tasks: ResourceConfig[];
  createTaskRuns?: boolean;
  createPods?: boolean;
};

export const createPipelineRunData = (
  config: mockPipelineRunConfig,
): { pipelineRun: PipelineRunKind; taskRuns?: TaskRunKind[]; pods?: any[] } => {
  const tasks: PipelineTask[] = [];
  const taskRuns: TaskRunKind[] = [];
  const pods: any[] = [];

  const { name, status, spec } = config;

  const _createPipelineRun = (plrname: string) => {
    return {
      ...samplePipelineRun,
      metadata: {
        ...samplePipelineRun.metadata,
        name: plrname,
        labels: {
          ...samplePipelineRun?.metadata?.labels,
          [TektonResourceLabel.pipelinerun]: plrname,
        },
      },
      spec: {
        ...samplePipelineRun.spec,
        tasks: tasks.length > 0 ? tasks : [sampleTask('sample-task')],
        ...spec,
      },
      status: {
        ...samplePipelineRun.status,
        conditions: status === 'STATUS_WITH_EMPTY_CONDITIONS' ? [] : [runConditions[status]],
      },
    } as PipelineRunKind;
  };

  const _createPod = (task: PipelineTask): void => {
    const taskRunName = `${task.name}-run`;
    const podName = `${name}-${task.name}-pod`;

    const taskRunPod = {
      ...samplePod,
      metadata: {
        ...samplePod?.metadata,
        name: podName,
        labels: {
          ...sampleTaskRun?.metadata?.labels,
          [TektonResourceLabel.pipelinerun]: name,
          [TektonResourceLabel.pipelineTask]: task?.name,
          [TektonResourceLabel.task]: task?.name,
          [TektonResourceLabel.taskrun]: taskRunName,
        },
      },
    };
    pods.push(taskRunPod);
  };

  const _createTaskRun = (task: PipelineTask, taskConfig: ResourceConfig): void => {
    const taskRunName = `${task.name}-run`;
    const podName = `${name}-${task.name}-pod`;

    const { status, labels, annotations, results } = taskConfig;

    const taskRun = {
      ...sampleTaskRun,
      metadata: {
        ...sampleTaskRun?.metadata,
        name: taskRunName,
        labels: {
          ...sampleTaskRun?.metadata?.labels,
          [TektonResourceLabel.pipelinerun]: name,
          [TektonResourceLabel.pipelineTask]: task?.name,
          ...(labels ? labels : {}),
        },
        annotations: {
          ...sampleTaskRun?.metadata?.labels,
          ...(annotations ? annotations : {}),
        },
      },
      spec: task,
      status: {
        ...sampleTaskRun.status,
        conditions: [runConditions[status] as Condition],
        ...(results ? { results } : { results: [] }),
        podName,
      },
    };
    taskRuns.push(taskRun);
  };

  config.tasks.forEach((t, i) => {
    const task = sampleTask(t.name);
    tasks.push(sampleTask(t.name));
    config.createTaskRuns && _createTaskRun(task, t);
    config.createPods && _createPod(task);
  });

  return {
    pipelineRun: _createPipelineRun(config.name),
    taskRuns,
    pods,
  };
};
