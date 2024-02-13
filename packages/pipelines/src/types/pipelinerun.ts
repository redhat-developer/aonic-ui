import { TektonResultsRun } from './coreTekton';
import { K8sResourceCommon, ObjectMetadata } from './k8s';
import { PipelineKind, PipelineSpec, WhenExpression } from './pipeline';
import { TaskRunStatus } from './taskrun';

export type PLRTaskRunStep = {
  container: string;
  imageID?: string;
  name: string;
  waiting?: {
    reason: string;
  };
  running?: {
    startedAt: string;
  };
  terminated?: {
    containerID: string;
    exitCode: number;
    finishedAt: string;
    reason: string;
    startedAt: string;
    message?: string;
  };
};

export type PLRTaskRunData = {
  pipelineTaskName: string;
  status: TaskRunStatus;
};

type PLRTaskRuns = {
  [taskRunName: string]: PLRTaskRunData;
};

export type VolumeTypeSecret = {
  secretName: string;
  items?: {
    key: string;
    path: string;
  }[];
};

export type VolumeTypeConfigMaps = {
  name: string;
  items?: {
    key: string;
    path: string;
  }[];
};

export type VolumeTypePVC = {
  claimName: string;
};

export type PersistentVolumeClaimType = {
  persistentVolumeClaim: VolumeTypePVC;
};

export type VolumeClaimTemplateType = {
  volumeClaimTemplate: VolumeTypeClaim;
};
export type VolumeTypeClaim = {
  metadata?: ObjectMetadata;
  spec: {
    accessModes: string[];
    resources: {
      requests: {
        storage: string;
      };
    };
    storageClassName?: string;
    volumeMode?: string;
  };
};

export type Condition = {
  type: string;
  status: string;
  reason?: string;
  message?: string;
  binding?: string;
  lastTransitionTime?: string;
};

export type PipelineRunEmbeddedResourceParam = { name: string; value: string };
export type PipelineRunEmbeddedResource = {
  name: string;
  resourceSpec: {
    params: PipelineRunEmbeddedResourceParam[];
    type: string;
  };
};
export type PipelineRunReferenceResource = {
  name: string;
  resourceRef: {
    name: string;
  };
};

export type PipelineRunResource = PipelineRunReferenceResource | PipelineRunEmbeddedResource;

export type PipelineRunWorkspace = {
  name: string;
  [volumeType: string]:
    | VolumeTypeSecret
    | VolumeTypeConfigMaps
    | VolumeTypePVC
    | VolumeTypeClaim
    | {};
};

export type PipelineRunParam = {
  name: string;
  value: string | string[];
  input?: string;
  output?: string;
  resource?: object;
};

export type PipelineRunStatus = {
  succeededCondition?: string;
  creationTimestamp?: string;
  conditions?: Condition[];
  startTime?: string;
  completionTime?: string;
  taskRuns?: PLRTaskRuns;
  pipelineSpec: PipelineSpec;
  skippedTasks?: {
    name: string;
    reason?: string;
    whenExpressions?: WhenExpression[];
  }[];
  results?: TektonResultsRun[];
};

export type PipelineRunKind = K8sResourceCommon & {
  spec: {
    pipelineRef?: { name: string; resolver?: string };
    pipelineSpec?: PipelineSpec;
    params?: PipelineRunParam[];
    workspaces?: PipelineRunWorkspace[];
    taskRunTemplate?: {
      serviceAccountName?: string;
    };
    timeout?: {
      pipeline: string;
      tasks: string;
      finally: string;
    };
    // Only used in a single case - cancelling a pipeline; should not be copied between PLRs
    status?: 'StoppedRunFinally' | 'CancelledRunFinally' | 'PipelineRunPending';
  };
  status?: PipelineRunStatus;
};

export type PipelineWithLatest = PipelineKind & {
  latestRun?: PipelineRunKind;
};
