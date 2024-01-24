import {
  ACS_SEVERITY,
  ENTERPRISE_CONTRACT_POLICY_STATUS,
  EnterpriseContractPolicy,
  ViolatedPolicy,
  Vulnerability,
} from '../types';

const STATUS_SORT_ORDER: string[] = [
  ENTERPRISE_CONTRACT_POLICY_STATUS.failed,
  ENTERPRISE_CONTRACT_POLICY_STATUS.warnings,
  ENTERPRISE_CONTRACT_POLICY_STATUS.successes,
];

const CVE_SEVERITY_SORT_ORDER: string[] = [
  ACS_SEVERITY.Critical,
  ACS_SEVERITY.Important,
  ACS_SEVERITY.Moderate,
  ACS_SEVERITY.Low,
];

type sortColumnRecord =
  | EnterpriseContractPolicy
  | Vulnerability
  | ViolatedPolicy
  | Record<string, string>;

export const getSortColumnFuntion = (
  key: string,
  activeSortDirection: string | undefined,
): ((a: sortColumnRecord, b: sortColumnRecord) => number) => {
  const currentKey = key as keyof sortColumnRecord;
  switch (currentKey) {
    case 'status':
      return (a: sortColumnRecord, b: sortColumnRecord): number => {
        const aValue = STATUS_SORT_ORDER.indexOf(a[currentKey]);
        const bValue = STATUS_SORT_ORDER.indexOf(b[currentKey]);
        if (aValue < bValue) {
          return activeSortDirection === 'asc' ? -1 : 1;
        } else if (aValue > bValue) {
          return activeSortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      };

    case 'cveSeverity':
      return (a: sortColumnRecord, b: sortColumnRecord): number => {
        const aValue = CVE_SEVERITY_SORT_ORDER.indexOf(toPascalCase(a[currentKey]));
        const bValue = CVE_SEVERITY_SORT_ORDER.indexOf(toPascalCase(b[currentKey]));

        if (aValue < bValue) {
          return activeSortDirection === 'asc' ? -1 : 1;
        } else if (aValue > bValue) {
          return activeSortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      };

    case 'failingCheck':
      return (a: sortColumnRecord, b: sortColumnRecord): number => {
        const aValue = a[currentKey];
        const bValue = b[currentKey];

        if (Number(aValue) > Number(bValue)) {
          return activeSortDirection === 'asc' ? -1 : 1;
        } else if (aValue < bValue) {
          return activeSortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      };

    default:
      return (a: sortColumnRecord, b: sortColumnRecord): number => {
        const aValue = a[currentKey];
        const bValue = b[currentKey];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          if (activeSortDirection === 'asc') {
            return (aValue as string).localeCompare(bValue as string);
          }
          return (bValue as string).localeCompare(aValue as string);
        }
        return 0;
      };
  }
};

export const toPascalCase = (string: string): string =>
  `${string}`
    .toLowerCase()
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(new RegExp(/\s+(.)(\w*)/, 'g'), (_, $2, $3) => `${$2.toUpperCase() + $3}`)
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());

export const isEmpty = <T extends object>(obj: T): boolean => Object.keys(obj).length === 0;
