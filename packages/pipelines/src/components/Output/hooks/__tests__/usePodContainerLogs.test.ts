import { renderHook, waitFor } from '@testing-library/react';
import { SampleOutputPipelineRunData } from '../../../../__fixtures__/taskruns';
import { TaskRunKind } from '../../../../types';
import { mockEnterpriseContractJSON } from '../../data';
import { usePodContainerLogs } from '../usePodContainerLogs';

const [sbomTaskRun, ecTaskRun] = SampleOutputPipelineRunData.taskRuns ?? [];
describe('usePodContainerLogs', () => {
  test('should return the default value and loading state', async () => {
    const { result } = renderHook(() =>
      usePodContainerLogs(
        sbomTaskRun,
        jest.fn(() => Promise.resolve('')),
      ),
    );
    await waitFor(() => {
      const { data, loading } = result.current;

      expect(data).toBe('');
      expect(loading).toBe(true);
    });
  });

  test('should return the default value and loading state', async () => {
    const getLogs = (): Promise<string> =>
      new Promise((resolve) => resolve(JSON.stringify(mockEnterpriseContractJSON)));

    const { result } = renderHook(() => usePodContainerLogs(ecTaskRun, getLogs));

    await waitFor(() => {
      const { data, loading } = result.current;
      expect(JSON.parse(data).components).toHaveLength(3);
      expect(loading).toBe(false);
    });
  });

  test('should call the getLogs function with podName and containerName', async () => {
    const logsFetcher = jest.fn(() => Promise.resolve(''));
    const { result } = renderHook(() => usePodContainerLogs(ecTaskRun, logsFetcher));

    await waitFor(() => {
      const { data, loading } = result.current;

      expect(logsFetcher).toHaveBeenCalledWith('test-plr-ec-task-pod', 'step-report');
      expect(data).toBe('');
      expect(loading).toBe(true);
    });
  });
  test('should handle the error when non-promise function is passed as getLogs', async () => {
    const errorFunction = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(errorFunction);

    const logsFetcher = jest.fn();
    renderHook(() => usePodContainerLogs(ecTaskRun, logsFetcher));
    await waitFor(() => {
      expect(errorFunction).toHaveBeenCalledWith(
        'Something went wrong while fetching logs',
        expect.anything(),
      );
    });
  });

  test('should handle the error when getLogs errors out', async () => {
    const errorFunction = jest.fn();
    jest.spyOn(console, 'warn').mockClear().mockImplementation(errorFunction);

    const logsFetcher = jest.fn(() => Promise.reject('failed to fetch'));
    renderHook(() => usePodContainerLogs(ecTaskRun, logsFetcher));
    await waitFor(() => {
      expect(errorFunction).toHaveBeenCalledWith(
        'Error while fetching data from pod logs',
        'failed to fetch',
      );
    });
  });

  test('should handle the invalid taskrun', async () => {
    const logsFetcher = jest.fn(() => Promise.resolve(''));
    const { result } = renderHook(() => usePodContainerLogs({} as TaskRunKind, logsFetcher));
    await waitFor(() => {
      const { data, loading } = result.current;
      expect(data).toBe('');
      expect(loading).toBe(true);
    });
  });

  test('should not call setState hooks when component is unmounted', async () => {
    const logsFetcher = jest.fn(() => Promise.resolve(JSON.stringify(mockEnterpriseContractJSON)));
    const { result, unmount } = renderHook(() => usePodContainerLogs(ecTaskRun, logsFetcher));
    unmount();

    await waitFor(() => {
      const { data, loading } = result.current;
      expect(data).toBe('');
      expect(loading).toBe(true);
    });
  });

  test('should not throw errors when component is unmounted', async () => {
    const errorFunction = jest.fn();
    jest.spyOn(console, 'warn').mockClear().mockImplementation(errorFunction);

    const logsFetcher = jest.fn(() => Promise.reject('failed to fetch'));
    const { unmount } = renderHook(() => usePodContainerLogs(ecTaskRun, logsFetcher));
    unmount();
    await waitFor(() => {
      expect(errorFunction).toHaveBeenCalledTimes(0);
    });
  });
});
