import { TektonResultsRun, TektonTaskSpec } from './coreTekton';
import { K8sResourceCommon } from './k8s';
import { PipelineTaskParam, PipelineTaskRef } from './pipeline';
import {
  Condition,
  PLRTaskRunStep,
  VolumeTypeConfigMaps,
  VolumeTypePVC,
  VolumeTypeSecret,
} from './pipelinerun';
import { TaskKind } from './task';

export type TaskRunWorkspace = {
  name: string;
  volumeClaimTemplate?: any;
  persistentVolumeClaim?: VolumeTypePVC;
  configMap?: VolumeTypeConfigMaps;
  emptyDir?: {};
  secret?: VolumeTypeSecret;
  subPath?: string;
};

export type TaskRunStatus = {
  completionTime?: string;
  conditions?: Condition[];
  podName?: string;
  startTime?: string;
  steps?: PLRTaskRunStep[];
  results?: TektonResultsRun[];
  taskResults?: TektonResultsRun[];
  taskSpec?: TaskKind['spec'];
};

export type TaskRunKind = K8sResourceCommon & {
  spec: {
    taskRef?: PipelineTaskRef;
    taskSpec?: TektonTaskSpec;
    serviceAccountName?: string;
    params?: PipelineTaskParam[];
    timeout?: string;
    workspaces?: TaskRunWorkspace[];
  };
  status?: TaskRunStatus;
};
