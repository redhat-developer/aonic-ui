import { ProxyRequest } from './tekton-results';

export type K8sResourceIdentifier = {
  apiGroup?: string;
  apiVersion: string;
  kind: string;
};

/**
 * K8s status object used when Kubernetes cannot handle a request.
 */

export type K8sStatus = K8sResourceIdentifier & {
  code: number;
  message: string;
  reason: string;
  status: 'Success' | 'Failure';
};

export type OwnerReference = {
  apiVersion: string;
  kind: string;
  name: string;
  uid: string;
  controller?: boolean;
  blockOwnerDeletion?: boolean;
};

export enum Operator {
  Exists = 'Exists',
  DoesNotExist = 'DoesNotExist',
  In = 'In',
  NotIn = 'NotIn',
  Equals = 'Equals',
  NotEqual = 'NotEqual',
  GreaterThan = 'GreaterThan',
  LessThan = 'LessThan',
  NotEquals = 'NotEquals',
}

export type MatchLabels = {
  [key: string]: string;
};

export type Selector = Partial<{
  matchLabels: MatchLabels;
  matchExpressions: MatchExpression[];
  [key: string]: unknown;
}>;

export type MatchExpression = {
  key: string;
  operator: Operator | string;
  values?: string[];
  value?: string;
};

export type ObjectMetadata = {
  annotations?: { [key: string]: string };
  clusterName?: string;
  creationTimestamp?: string;
  deletionGracePeriodSeconds?: number;
  deletionTimestamp?: string;
  finalizers?: string[];
  generateName?: string;
  generation?: number;
  labels?: { [key: string]: string };
  managedFields?: any[];
  name?: string;
  namespace?: string;
  ownerReferences?: object[];
  resourceVersion?: string;
  uid?: string;
};

export type K8sResourceCommon = K8sResourceIdentifier &
  Partial<{
    metadata: Partial<{
      annotations: Record<string, string>;
      clusterName: string;
      creationTimestamp: string | Date;
      deletionGracePeriodSeconds: number;
      deletionTimestamp: string;
      finalizers: string[];
      generateName: string;
      generation: number;
      labels: Record<string, string>;
      managedFields: unknown[];
      name: string;
      namespace: string;
      ownerReferences: OwnerReference[];
      resourceVersion: string;
      uid: string;
    }>;
    spec: {
      selector?: Selector | MatchLabels;
      [key: string]: unknown;
    };
    status: { [key: string]: unknown };
    data: { [key: string]: unknown };
  }>;

export declare type K8sModelCommon = K8sResourceIdentifier & {
  plural: string;
  propagationPolicy?: 'Foreground' | 'Background';
  verbs?: K8sVerb[];
  shortNames?: string[];
  crd?: boolean;
  namespaced?: boolean;
};
export type K8sResourceKind = K8sResourceCommon & {
  spec?: {
    [key: string]: any;
  };
  status?: { [key: string]: any };
  data?: { [key: string]: any };
};

export type K8sGroupVersionKind = {
  group?: string;
  version: string;
  kind: string;
};

type K8sVerb =
  | 'create'
  | 'get'
  | 'list'
  | 'update'
  | 'patch'
  | 'delete'
  | 'deletecollection'
  | 'watch'
  | 'impersonate';

enum BadgeType {
  DEV = 'Dev Preview',
  TECH = 'Tech Preview',
}
export type K8sModel = K8sModelCommon & {
  abbr: string;
  kind: string;
  label: string;
  labelKey?: string;
  labelPlural: string;
  labelPluralKey?: string;
  plural: string;
  propagationPolicy?: 'Foreground' | 'Background';

  id?: string;
  crd?: boolean;
  apiVersion: string;
  apiGroup?: string;
  namespaced?: boolean;
  selector?: Selector;
  labels?: { [key: string]: string };
  annotations?: { [key: string]: string };
  verbs?: K8sVerb[];
  shortNames?: string[];
  badge?: BadgeType;
  color?: string;

  // Legacy option for supporing plural names in URL paths when `crd: true`.
  // This should not be set for new models, but is needed to avoid breaking
  // existing links as we transition to using the API group in URL paths.
  legacyPluralURL?: boolean;
};

export type QueryParams = {
  watch?: string;
  labelSelector?: string;
  fieldSelector?: string;
  resourceVersion?: string;
  [key: string]: string | undefined;
};

export type Options = {
  ns?: string;
  name?: string;
  path?: string;
  queryParams?: QueryParams;
  cluster?: string;
};

export type K8sGet = <R extends K8sResourceCommon>(options: {
  model: K8sModel;
  name: string;
  ns?: string;
  path?: string;
  queryParams?: QueryParams;
  requestInit?: RequestInit;
}) => Promise<R>;

export type WatchK8sResult<R extends K8sResourceCommon | K8sResourceCommon[]> = [R, boolean, any];

export type UseK8sWatchResource = <R extends K8sResourceCommon | K8sResourceCommon[]>(
  initResource: WatchK8sResource | null,
) => WatchK8sResult<R>;

declare type BaseOptions = {
  name?: string;
  ns?: string;
  path?: string;
  queryParams?: QueryParams;
};
declare type OptionsGet = BaseOptions & {
  model: K8sModel;
  requestInit?: RequestInit;
};

export type commonFetchJSON = {
  <TResult>(
    url: string,
    requestInit?: RequestInit | undefined,
    timeout?: number | undefined,
    isK8sAPIRequest?: boolean | undefined,
  ): Promise<TResult>;
  put<TResult_1>(
    url: string,
    data: unknown,
    requestInit?: RequestInit | undefined,
    timeout?: number | undefined,
    isK8sAPIRequest?: boolean | undefined,
  ): Promise<TResult_1>;
  post<TResult_2>(
    url: string,
    data: unknown,
    requestInit?: RequestInit | undefined,
    timeout?: number | undefined,
    isK8sAPIRequest?: boolean | undefined,
  ): Promise<TResult_2>;
  patch<TResult_3>(
    url: string,
    data: unknown,
    requestInit?: RequestInit | undefined,
    timeout?: number | undefined,
    isK8sAPIRequest?: boolean | undefined,
  ): Promise<TResult_3>;
  delete<TResult_4>(
    url: string,
    data?: unknown,
    requestInit?: RequestInit | undefined,
    timeout?: number | undefined,
    isK8sAPIRequest?: boolean | undefined,
  ): Promise<TResult_4>;
};

export type commonFetchText = (
  url: string,
  requestInit?: RequestInit | undefined,
  timeout?: number | undefined,
  isK8sAPIRequest?: boolean | undefined,
) => Promise<string>;

export type K8sGetResource = <R extends K8sResourceCommon>(options: OptionsGet) => Promise<R>;

export type FetchUtilsType = {
  hooks: { useK8sWatchResource: UseK8sWatchResource; k8sGet?: K8sGetResource };
  resourceFetchers: {
    commonFetchText: commonFetchText;
    commonFetchJson: commonFetchJSON;
    consoleProxyFetchJSON?: ConsoleProxyFetchJSON;
    consoleProxyFetchLog?: ConsoleProxyFetchJSON;
  };
};

export type TektonConfiguration = {
  fetchUtils: FetchUtilsType;
  tektonResultsBaseURL: string;
  isTektonResultEnabled: boolean;
};

export declare type Never<T> = {
  [K in keyof T]?: never;
};

export declare type EitherNotBoth<TypeA, TypeB> = (TypeA & Never<TypeB>) | (TypeB & Never<TypeA>);

export declare type K8sResourceKindReference = string;

export declare type WatchK8sResource = EitherNotBoth<
  {
    kind: K8sResourceKindReference;
  },
  {
    groupVersionKind: K8sGroupVersionKind;
  }
> & {
  name?: string;
  namespace?: string;
  isList?: boolean;
  selector?: Selector;
  namespaced?: boolean;
  limit?: number;
  fieldSelector?: string;
  optional?: boolean;
  partialMetadata?: boolean;
};

export type ConsoleProxyFetchJSON = <T>(proxyRequest: ProxyRequest) => Promise<T>;
