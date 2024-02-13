import { renderHook, waitFor } from '@testing-library/react';
import { SampleOutputPipelineRunData } from '../../../../__fixtures__/taskruns';
import { RunStatus } from '../../../../utils/pipelinerun-utils';
import {
  acsDeploymentCheck,
  acsImageCheckResults,
  acsImageScanResult,
  mockEnterpriseContractJSON,
} from '../../data';
import { usePipelineRunOutput } from '../usePipelineRunOutput';

const { pipelineRun, taskRuns = [] } = SampleOutputPipelineRunData;
describe('usePipelineRunOutput', () => {
  test('should return default value', async () => {
    const { result } = renderHook(() =>
      usePipelineRunOutput(
        pipelineRun,
        taskRuns,
        jest.fn(() => Promise.resolve('')),
      ),
    );

    await waitFor(() => {
      const { results, status, ec, acsImageScan, acsImageCheck, acsDeploymentCheck } =
        result.current;

      expect(status).toBe(RunStatus.Running);
      expect(results.loading).toBe(true);
      expect(ec?.data).toHaveLength(0);
      expect(acsImageScan?.data).toHaveLength(0);
      expect(acsImageCheck?.data).toHaveLength(0);
      expect(acsDeploymentCheck?.data).toHaveLength(0);
    });
  });

  test('should return actual data', async () => {
    const getLogs = (podName: string) => {
      let data: string = '';

      if (podName.includes('ec-task')) {
        data = JSON.stringify(mockEnterpriseContractJSON);
      } else if (podName.includes('image-scan')) {
        data = JSON.stringify(acsImageScanResult);
      } else if (podName.includes('image-check')) {
        data = JSON.stringify(acsImageCheckResults);
      } else if (podName.includes('deployment-check')) {
        data = JSON.stringify(acsDeploymentCheck);
      }
      return Promise.resolve(data);
    };
    const { result } = renderHook(() => usePipelineRunOutput(pipelineRun, taskRuns, getLogs));

    await waitFor(() => {
      const { results, status, ec, acsImageScan, acsImageCheck, acsDeploymentCheck } =
        result.current;

      expect(status).toBe(RunStatus.Running);
      expect(results.loading).toBe(true);
      expect(ec?.data).toHaveLength(3);
      expect(acsImageScan?.data?.result.vulnerabilities).toHaveLength(154);
      expect(acsImageCheck?.data?.results).toHaveLength(1);
      expect(acsDeploymentCheck?.data?.results).toHaveLength(1);
    });
  });
});
