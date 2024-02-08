import jsyaml from 'js-yaml';
import { TektonResourceLabel } from '../../../types';
import { TaskRunKind } from '../../../types/taskrun';
import {
  ACSCheckResults,
  ACSImageScanResult,
  ComponentEnterpriseContractResult,
  ENTERPRISE_CONTRACT_POLICY_STATUS,
  EnterpriseContractPolicy,
  EnterpriseContractResult,
  EnterpriseContractRule,
  OutputTaskRunGroup,
  TaskRunResultsAnnotations,
  TaskRunResultsFormatValue,
  TaskRunResultsKeyValue,
  TaskRunResultsTypeValue,
} from '../types';

const checkTypeAnnotation = (tr: TaskRunKind | undefined, type: TaskRunResultsTypeValue): boolean =>
  tr?.metadata?.annotations?.[TaskRunResultsAnnotations.TYPE] === type;

export const isSbomTaskRun = (tr: TaskRunKind | undefined): boolean =>
  tr?.metadata?.annotations?.[TaskRunResultsAnnotations.KEY] === TaskRunResultsKeyValue.SBOM;

export const isECTaskRun = (tr: TaskRunKind | undefined): boolean =>
  checkTypeAnnotation(tr, TaskRunResultsTypeValue.EC);

export const isACSImageScanTaskRun = (tr: TaskRunKind | undefined): boolean =>
  checkTypeAnnotation(tr, TaskRunResultsTypeValue.ROXCTL_IMAGE_SCAN);

export const isACSImageCheckTaskRun = (tr: TaskRunKind | undefined): boolean =>
  checkTypeAnnotation(tr, TaskRunResultsTypeValue.ROXCTL_IMAGE_CHECK);

export const isACSDeploymentCheckTaskRun = (tr: TaskRunKind | undefined): boolean =>
  checkTypeAnnotation(tr, TaskRunResultsTypeValue.ROXCTL_DEPLOYMENT_CHECK);

export const getTaskrunsOutputGroup = (
  pipelineRunName: string | undefined,
  taskruns: TaskRunKind[],
): OutputTaskRunGroup => {
  const getPLRTaskRunByType = (
    check: (tr: TaskRunKind | undefined) => boolean,
  ): TaskRunKind | undefined =>
    taskruns?.find(
      (tr: TaskRunKind) =>
        tr?.metadata?.labels?.[TektonResourceLabel.pipelinerun] === pipelineRunName && check(tr),
    );

  return {
    sbomTaskRun: getPLRTaskRunByType(isSbomTaskRun),
    ecTaskRun: getPLRTaskRunByType(isECTaskRun),
    acsImageScanTaskRun: getPLRTaskRunByType(isACSImageScanTaskRun),
    acsImageCheckTaskRun: getPLRTaskRunByType(isACSImageCheckTaskRun),
    acsDeploymentCheckTaskRun: getPLRTaskRunByType(isACSDeploymentCheckTaskRun),
  };
};

export const hasExternalLink = (sbomTaskRun: TaskRunKind | undefined): boolean =>
  sbomTaskRun?.metadata?.annotations?.[TaskRunResultsAnnotations.TYPE] ===
  TaskRunResultsTypeValue.EXTERNAL_LINK;

export const getSbomLink = (sbomTaskRun: TaskRunKind | undefined): string | undefined =>
  (sbomTaskRun?.status?.results || sbomTaskRun?.status?.taskResults)?.find(
    (r: any) => r.name === TaskRunResultsKeyValue.SBOM,
  )?.value;

type ProcessedData = EnterpriseContractResult | ACSCheckResults | ACSImageScanResult | string;
export const formatData = (format: string, data: string) => {
  const processData = (d: string): ProcessedData => {
    const data = jsyaml.load(d) as ProcessedData;
    return typeof data === 'object' && data !== null ? data : '';
  };
  switch (format) {
    case TaskRunResultsFormatValue.JSON:
    case TaskRunResultsFormatValue.YAML:
    case TaskRunResultsFormatValue.TEXT:
      return processData(data);
    default:
      return '';
  }
};

export const mapEnterpriseContractResultData = (
  ecResult: EnterpriseContractResult,
): EnterpriseContractPolicy[] => {
  const components = ecResult
    ? ecResult.components?.filter((comp: ComponentEnterpriseContractResult) => {
        return !(
          comp.violations &&
          comp.violations?.length === 1 &&
          !comp.violations[0].metadata &&
          comp.violations[0].msg.includes('404 Not Found')
        );
      }) ?? []
    : [];

  return components?.reduce(
    (acc: EnterpriseContractPolicy[], compResult: ComponentEnterpriseContractResult) => {
      compResult?.violations?.forEach((v: EnterpriseContractRule) => {
        const rule: EnterpriseContractPolicy = {
          title: v.metadata?.title ?? '',
          description: v.metadata?.description ?? '',
          status: ENTERPRISE_CONTRACT_POLICY_STATUS.failed,
          timestamp: v.metadata?.effective_on,
          component: compResult.name,
          msg: v.msg,
          collection: v.metadata?.collections,
          solution: v.metadata?.solution,
        };
        acc.push(rule);
      });
      compResult?.warnings?.forEach((w: EnterpriseContractRule) => {
        const rule: EnterpriseContractPolicy = {
          title: w.metadata?.title ?? '',
          description: w.metadata?.description ?? '',
          status: ENTERPRISE_CONTRACT_POLICY_STATUS.warnings,
          timestamp: w.metadata?.effective_on,
          component: compResult.name,
          msg: w.msg,
          collection: w.metadata?.collections,
        };
        acc.push(rule);
      });
      compResult?.successes?.forEach((s: EnterpriseContractRule) => {
        const rule: EnterpriseContractPolicy = {
          title: s.metadata?.title ?? '',
          description: s.metadata?.description ?? '',
          status: ENTERPRISE_CONTRACT_POLICY_STATUS.successes,
          component: compResult.name,
          collection: s.metadata?.collections,
        };
        acc.push(rule);
      });

      return acc;
    },
    [],
  );
};
