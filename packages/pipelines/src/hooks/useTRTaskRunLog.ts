import React from 'react';
import { getTaskRunLog } from '../utils/tekton-results-utils';
import { FetchUtilsType } from '../types/k8s';

export const useTRTaskRunLog = (
  namespace: string,
  taskRunName: string,
  tektonResultsBaseURL: string,
  fetchUtils: FetchUtilsType,
): [string | null, boolean, unknown] => {
  const [result, setResult] = React.useState<[string | null, boolean, unknown]>([
    null,
    false,
    undefined,
  ]);
  React.useEffect(() => {
    let disposed = false;
    if (namespace && taskRunName) {
      (async () => {
        try {
          const log = await getTaskRunLog(namespace, taskRunName, tektonResultsBaseURL, fetchUtils);
          if (!disposed) {
            setResult([log, true, undefined]);
          }
        } catch (e) {
          if (!disposed) {
            setResult([null, false, e]);
          }
        }
      })();
    }
    return () => {
      disposed = true;
    };
  }, [namespace, taskRunName]);
  return result;
};
