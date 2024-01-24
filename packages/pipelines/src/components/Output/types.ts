// Enterprise constract types and enums.

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
