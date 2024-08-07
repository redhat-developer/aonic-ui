import * as React from 'react';
import { GetNextPage, RecordsList, TektonResultsOptions } from '../types/tekton-results';
import { K8sResourceCommon, TektonConfiguration } from '../types/k8s';

const defaultGetNextPage: GetNextPage = () => {};

export const useTektonResultsRuns = <Kind extends K8sResourceCommon>(
  getRuns: (
    namespace: string,
    config: TektonConfiguration,
    options?: TektonResultsOptions,
    nextPageToken?: string,
    cacheKey?: string,
  ) => Promise<[Kind[], RecordsList, boolean?]>,
  namespace: string,
  config: TektonConfiguration,
  options?: TektonResultsOptions,
  cacheKey?: string,
): [Kind[], boolean, unknown, GetNextPage] => {
  const [nextPageToken, setNextPageToken] = React.useState<string>();
  const [localCacheKey, setLocalCacheKey] = React.useState(cacheKey);

  if (cacheKey !== localCacheKey) {
    // force update local cache key
    setLocalCacheKey(cacheKey);
  }

  const [result, setResult] = React.useState<[Kind[], boolean, unknown, GetNextPage]>([
    [],
    false,
    undefined,
    defaultGetNextPage,
  ]);

  // reset token if namespace or options change
  React.useEffect(() => {
    setNextPageToken(undefined);
  }, [namespace, options, cacheKey]);

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    let disposed = false;
    (async () => {
      try {
        const tkPipelineRuns = await getRuns(
          namespace,
          config,
          options,
          nextPageToken,
          localCacheKey,
        );
        if (!disposed) {
          const token = tkPipelineRuns[1].nextPageToken;
          const callInflight = !!tkPipelineRuns?.[2];
          const loaded = !callInflight;
          if (!callInflight) {
            setResult((cur) => [
              nextPageToken ? [...cur[0], ...tkPipelineRuns[0]] : tkPipelineRuns[0],
              loaded,
              undefined,
              token
                ? (() => {
                    // ensure we can only call this once
                    let executed = false;
                    return () => {
                      if (!disposed && !executed) {
                        executed = true;
                        // trigger the update
                        setNextPageToken(token);
                      }
                    };
                  })()
                : defaultGetNextPage,
            ]);
          }
        }
      } catch (e) {
        if (!disposed) {
          if (nextPageToken) {
            setResult((cur) => [cur[0], cur[1], e, defaultGetNextPage]);
          } else {
            setResult([[], false, e, defaultGetNextPage]);
          }
        }
      }
    })();
    return () => {
      disposed = true;
    };
  }, [namespace, options, nextPageToken, localCacheKey, getRuns]);
  return result;
};
