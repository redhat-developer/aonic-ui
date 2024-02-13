import React from 'react';
import { TaskRunKind } from '../../../types/taskrun';
import { TaskRunResultsAnnotations } from '../types';

const getTaskRunContainer = (obj: TaskRunKind | undefined): string =>
  obj?.metadata?.annotations?.[TaskRunResultsAnnotations.CONTAINER] ?? 'step-report';

export const usePodContainerLogs = (
  taskRun: TaskRunKind | undefined,
  getLogs: (podName: string, containerName: string) => Promise<string>,
): { data: string; loading: boolean } => {
  const [data, setData] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(true);

  const podName = taskRun?.status?.podName;
  const containerName = getTaskRunContainer(taskRun);

  React.useEffect(() => {
    let unmount = false;
    if (podName) {
      try {
        getLogs?.(podName, containerName)
          .then((res) => {
            if (unmount) return;
            setData(res);
            setLoading(false);
          })
          .catch((err) => {
            if (unmount) return;

            setLoading(false);
            // eslint-disable-next-line no-console
            console.warn('Error while fetching data from pod logs', err);
          });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Something went wrong while fetching logs', e);
      }
    }
    return () => {
      unmount = true;
    };
  }, [getLogs, containerName, podName]);

  return { data, loading };
};
