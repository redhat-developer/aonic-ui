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
      creationTimestamp: string;
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
