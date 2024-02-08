import { SampleOutputPipelineRunData } from '../../../../__fixtures__/taskruns';
import { TaskRunKind } from '../../../../types';
import { mockEnterpriseContractJSON } from '../../data';
import { EnterpriseContractResult, TaskRunResultsFormatValue } from '../../types';
import {
  formatData,
  getSbomLink,
  getTaskrunsOutputGroup,
  hasExternalLink,
  isACSDeploymentCheckTaskRun,
  isACSImageCheckTaskRun,
  isACSImageScanTaskRun,
  isECTaskRun,
  isSbomTaskRun,
  mapEnterpriseContractResultData,
} from '../data-transformer-utils';

const { pipelineRun, taskRuns = [] } = SampleOutputPipelineRunData;
const [
  sbomTaskrun,
  ecTaskrun,
  acsImageScanTaskrun,
  acsImageCheckTaskrun,
  acsDeploymentCheckTaskrun,
  sbomTaskrunWithExternalLink,
] = taskRuns ?? [];
describe('isSbomTaskRun', () => {
  test('should return false for invalid values', () => {
    expect(isSbomTaskRun({} as TaskRunKind)).toBe(false);
  });

  test('should return true for value values', () => {
    expect(isSbomTaskRun(sbomTaskrun)).toBe(true);
  });
});

describe('isECTaskRun', () => {
  test('should return false for invalid values', () => {
    expect(isECTaskRun({} as TaskRunKind)).toBe(false);
  });

  test('should return true for value values', () => {
    expect(isECTaskRun(ecTaskrun)).toBe(true);
  });
});

describe('isACSImageScanTaskRun', () => {
  test('should return false for invalid values', () => {
    expect(isACSImageScanTaskRun({} as TaskRunKind)).toBe(false);
  });

  test('should return true for value values', () => {
    expect(isACSImageScanTaskRun(acsImageScanTaskrun)).toBe(true);
  });
});

describe('isACSImageCheckTaskRun', () => {
  test('should return false for invalid values', () => {
    expect(isACSImageCheckTaskRun({} as TaskRunKind)).toBe(false);
  });

  test('should return true for value values', () => {
    expect(isACSImageCheckTaskRun(acsImageCheckTaskrun)).toBe(true);
  });
});

describe('isACSDeploymentCheckTaskRun', () => {
  test('should return false for invalid values', () => {
    expect(isACSDeploymentCheckTaskRun({} as TaskRunKind)).toBe(false);
  });
  test('should return true for value values', () => {
    expect(isACSDeploymentCheckTaskRun(acsDeploymentCheckTaskrun)).toBe(true);
  });
});

describe('getTaskrunsOutputGroup', () => {
  test('should not return the output group taskruns for invalid pipelinerun', () => {
    const outputGroup = getTaskrunsOutputGroup('invalid-pipelinerun', taskRuns);

    expect(outputGroup.sbomTaskRun).toBeUndefined();
    expect(outputGroup.ecTaskRun).toBeUndefined();
    expect(outputGroup.acsImageScanTaskRun).toBeUndefined();
    expect(outputGroup.acsImageCheckTaskRun).toBeUndefined();
    expect(outputGroup.acsDeploymentCheckTaskRun).toBeUndefined();
  });

  test('should return be all the output group taskruns', () => {
    const outputGroup = getTaskrunsOutputGroup(pipelineRun.metadata?.name, taskRuns);

    expect(outputGroup.sbomTaskRun).toBeDefined();
    expect(outputGroup.ecTaskRun).toBeDefined();
    expect(outputGroup.acsImageScanTaskRun).toBeDefined();
    expect(outputGroup.acsImageCheckTaskRun).toBeDefined();
    expect(outputGroup.acsDeploymentCheckTaskRun).toBeDefined();
  });
});

describe('hasExternalLink', () => {
  test('should return false for internal sbomTaskrun', () => {
    expect(hasExternalLink(sbomTaskrun)).toBe(false);
  });
  test('should return true for external sbomTaskrun', () => {
    expect(hasExternalLink(sbomTaskrunWithExternalLink)).toBe(true);
  });
});

describe('getSbomLink', () => {
  test('should return undefined if no link is set', () => {
    expect(getSbomLink(sbomTaskrun)).toBeUndefined();
  });
  test('should return the sbom link', () => {
    expect(getSbomLink(sbomTaskrunWithExternalLink)).toBe(
      'http://quay.io/test/image:build-8e536-1692702836',
    );
  });
});
describe('formatData', () => {
  test('should format the application/json data', () => {
    const json = { apiVersion: 'v1', kind: 'Test', metadata: { name: 'test' } };

    expect(formatData(TaskRunResultsFormatValue.JSON, JSON.stringify(json))).toMatchObject(
      expect.objectContaining({
        kind: 'Test',
      }),
    );
  });

  test('should format the application/yaml data', () => {
    const yaml = `apiVersion: v1
kind: Test
metdata: 
    name: test`;

    expect(formatData(TaskRunResultsFormatValue.YAML, yaml)).toMatchObject(
      expect.objectContaining({
        kind: 'Test',
      }),
    );
  });

  test('should format the application/text data', () => {
    const text = `text output data`;
    expect(formatData(TaskRunResultsFormatValue.TEXT, text)).toBe('');
  });

  test('should return empty string for unsupported type', () => {
    const text = `text output data`;
    expect(formatData('application/unsupported', text)).toBe('');
  });
});

describe('mapEnterpriseContractResultData', () => {
  test('should process the information and return the array', () => {
    expect(mapEnterpriseContractResultData({} as EnterpriseContractResult)).toHaveLength(0);
  });
  test('should process the information and return the array', () => {
    expect(mapEnterpriseContractResultData(mockEnterpriseContractJSON)).toHaveLength(3);
  });
});
