import { TektonResultsRun } from '../../../types/coreTekton';
import { PipelineRunKind } from '../../../types/pipelinerun';
import { TaskRunKind } from '../../../types/taskrun';
import { pipelineRunStatus, RunStatus } from '../../../utils/pipelinerun-utils';
import {
  EnterpriseContractResult,
  OutputGroup,
  TaskRunResultsAnnotations,
  TaskRunResultsFormatValue,
} from '../types';
import {
  formatData,
  getTaskrunsOutputGroup,
  mapEnterpriseContractResultData,
} from '../utils/data-transformer-utils';
import { usePodContainerLogs } from './usePodContainerLogs';

export const usePipelineRunOutput = (
  pipelineRun: PipelineRunKind,
  taskRuns: TaskRunKind[],
  getLogs: (podName: string, containerName: string) => Promise<string>,
): OutputGroup => {
  const { acsImageScanTaskRun, acsImageCheckTaskRun, acsDeploymentCheckTaskRun, ecTaskRun } =
    getTaskrunsOutputGroup(pipelineRun?.metadata?.name, taskRuns);

  const getTaskRunFormat = (obj: TaskRunKind | undefined): string =>
    obj?.metadata?.annotations?.[TaskRunResultsAnnotations.FORMAT] ??
    TaskRunResultsFormatValue.TEXT;

  const { data: ecValue, loading: ecLoading } = usePodContainerLogs(ecTaskRun, getLogs);
  const { data: acsImageScanValue, loading: acsImageScanLoading } = usePodContainerLogs(
    acsImageScanTaskRun,
    getLogs,
  );
  const { data: acsValue, loading: acsImageCheckLoading } = usePodContainerLogs(
    acsImageCheckTaskRun,
    getLogs,
  );
  const { data: acsDcValue, loading: acsDeploymentCheckLoading } = usePodContainerLogs(
    acsDeploymentCheckTaskRun,
    getLogs,
  );

  const ecTaskFormat = getTaskRunFormat(ecTaskRun);
  const acsImageScanFormat = getTaskRunFormat(acsImageScanTaskRun);
  const acsImageCheckFormat = getTaskRunFormat(acsImageCheckTaskRun);
  const acsDeploymentCheckFormat = getTaskRunFormat(acsDeploymentCheckTaskRun);

  const acsImageScanData = formatData(acsImageScanFormat, acsImageScanValue ?? '');
  const acsImageCheckData = formatData(acsImageCheckFormat, acsValue ?? '');
  const acsDeploymentCheckData = formatData(acsDeploymentCheckFormat, acsDcValue ?? '');

  const ecData = mapEnterpriseContractResultData(
    formatData(ecTaskFormat, ecValue ?? ([] as any)) as EnterpriseContractResult,
  );

  return {
    status: pipelineRunStatus(pipelineRun),
    results: {
      loading: pipelineRunStatus(pipelineRun) !== RunStatus.Succeeded,
      data: ((pipelineRun?.status?.pipelineResults || pipelineRun?.status?.results) ??
        []) as TektonResultsRun[],
    },
    ec: {
      data: ecData,
      loading: ecLoading,
      taskRun: ecTaskRun,
    },
    acsImageScan: {
      data: acsImageScanData,
      loading: acsImageScanLoading,
      taskRun: acsImageScanTaskRun,
    },
    acsImageCheck: {
      data: acsImageCheckData,
      loading: acsImageCheckLoading,
      taskRun: acsImageCheckTaskRun,
    },
    acsDeploymentCheck: {
      data: acsDeploymentCheckData,
      loading: acsDeploymentCheckLoading,
      taskRun: acsDeploymentCheckTaskRun,
    },
  };
};
