// Enterprise constract types and enums.

import { TektonResultsRun } from '../../types/coreTekton';
import { TaskRunKind } from '../../types/taskrun';
import { RunStatus } from '../../utils/pipelinerun-utils';

export enum ENTERPRISE_CONTRACT_POLICY_STATUS {
  failed = 'Failed',
  successes = 'Success',
  warnings = 'Warning',
}

export type EnterpriseContractPolicy = {
  title: string;
  description: string;
  status: ENTERPRISE_CONTRACT_POLICY_STATUS;
  timestamp?: string;
  component?: string;
  msg?: string;
  collection?: string[];
  solution?: string;
};

export type EnterpriseContractRule = {
  metadata?: {
    title: string;
    description: string;
    collections: string[];
    code: string;
    // eslint-disable-next-line camelcase
    effective_on?: string;
    solution?: string;
  };
  msg: string;
};

export type ComponentEnterpriseContractResult = {
  name: string;
  success: boolean;
  containerImage: string;
  violations?: EnterpriseContractRule[];
  successes?: EnterpriseContractRule[];
  warnings?: EnterpriseContractRule[];
  signatures?: {
    keyid: string;
    metadata: {
      predicateBuildType: string;
      predicateType: string;
      type: string;
    };
    sig: string;
  }[];
};

export interface ECPolicy {
  description: string;
  publicKey: string;
  configuration: {
    collections: string[];
    exclude: string[];
  };
  sources: {
    data: string[];
    name: string;
    policy: string[];
  }[];
}

export type EnterpriseContractResult = {
  components: ComponentEnterpriseContractResult[];
  key?: string;
  policy?: ECPolicy;
  success?: boolean;
  Error?: string;
};

// Advanced cluster security types and enums.

export const ACS_STATUS = {
  Fixable: 'Fixable',
  Unavailable: 'Unavailable',
} as const;

export const ACS_SCAN_RESULTS = {
  Vulnerabilites: 'Vulnerabilites',
  Components: 'Components',
} as const;

export const ACS_SEVERITY = {
  Critical: 'Critical',
  Low: 'Low',
  Moderate: 'Moderate',
  Important: 'Important',
} as const;

export const ACS_IMAGE_CHECK_SEVERITY = {
  Critical: 'Critical',
  High: 'High',
  Medium: 'Medium',
  Low: 'Low',
} as const;

export const ACS_BREAKING_CHANGES = {
  Breaking: 'Breaking',
  NotBreaking: 'NotBreaking',
} as const;

export interface ACSImageScanSummary {
  CRITICAL: number;
  IMPORTANT: number;
  LOW: number;
  MODERATE: number;
  'TOTAL-COMPONENTS': number;
  'TOTAL-VULNERABILITIES': number;
}

export interface Vulnerability {
  cveId: string;
  cveSeverity: string;
  cveInfo: string;
  componentName: string;
  componentVersion: string;
  componentFixedVersion: string;
}

export interface ACSImageScanResult {
  result: {
    summary: ACSImageScanSummary;
    vulnerabilities: Vulnerability[];
  };
}

export interface Result {
  metadata: {
    id: string;
    additionalInfo: {
      namespace?: string;
      name: string;
      type: string;
    };
  };
  summary: ACSImageCheckSummary;
  violatedPolicies: ViolatedPolicy[];
}

export interface ACSImageCheckSummary {
  CRITICAL: number;
  HIGH: number;
  LOW: number;
  MEDIUM: number;
  TOTAL: number;
}

export interface ViolatedPolicy {
  name: string;
  severity: string;
  description: string;
  violation: string[];
  remediation: string;
  failingCheck: boolean;
}

export interface ACSCheckResults {
  results: Result[];
  summary: ACSImageCheckSummary;
}

export enum TaskRunResultsAnnotations {
  KEY = 'task.results.key',
  TYPE = 'task.results.type',
  LOCATION = 'task.results.location',
  CONTAINER = 'task.results.container',
  FORMAT = 'task.results.format',
}

export enum TaskRunResultsTypeValue {
  EC = 'ec',
  EXTERNAL_LINK = 'external-link',
  ROXCTL_IMAGE_SCAN = 'roxctl-image-scan',
  ROXCTL_IMAGE_CHECK = 'roxctl-image-check',
  ROXCTL_DEPLOYMENT_CHECK = 'roxctl-deployment-check',
}

export enum TaskRunResultsFormatValue {
  JSON = 'application/json',
  YAML = 'application/yaml',
  TEXT = 'application/text',
}

export enum TaskRunResultsLocationValue {
  LOGS = 'logs',
  RESULTS = 'results',
}

export enum TaskRunResultsKeyValue {
  SBOM = 'LINK_TO_SBOM',
  SCAN_OUTPUT = 'SCAN_OUTPUT',
}

export enum TaskType {
  sbom = 'sbom',
  ec = 'ec',
  acsImageScan = 'acsImageScan',
  acsImageCheck = 'acsImageCheck',
  acsDeploymentCheck = 'acsDeploymentCheck',
}

export type OutputGroup = {
  [key in TaskType]?: {
    taskRun: TaskRunKind | undefined;
    loading: boolean;
    data: string | object | any;
  };
} & {
  status: RunStatus;
  results: {
    loading: boolean;
    data: TektonResultsRun[] | [];
  };
};

export type OutputTaskRunGroup = {
  [key in `${TaskType}TaskRun`]?: TaskRunKind;
};
