import { ToolBarState } from '../Toolbar/ToolBarReducer';
import { FilterChip } from '../Toolbar/types';
import {
  ACS_STATUS,
  ACSCheckResults,
  ACSImageScanResult,
  ViolatedPolicy,
  Vulnerability,
} from '../types';
import { isEmpty, toPascalCase } from './helper-utils';

export const filterData = <T extends object>(
  data: T,
  filters: string | FilterChip[],
  path: keyof T,
  convertToPascalCase?: boolean,
): boolean => {
  const value = data?.[path] as string;
  return !filters?.length || filters.includes(convertToPascalCase ? toPascalCase(value) : value);
};

// ACS Image scan filters
export const filterByStatus = (v: Vulnerability, statusFilters: FilterChip[]): boolean => {
  return !!(
    !statusFilters?.length ||
    (statusFilters.includes(ACS_STATUS.Fixable) && v.componentFixedVersion) ||
    (statusFilters.includes(ACS_STATUS.Unavailable) && !v.componentFixedVersion)
  );
};

export const filterVulnerabilities = (
  acsImageScanResult: ACSImageScanResult,
  filters: Partial<Record<keyof ToolBarState, FilterChip[]>>,
): Vulnerability[] => {
  const {
    statusFilters = [],
    cveIdFilters = [],
    componentFilters = [],
    severityFilters = [],
  } = filters;
  return !isEmpty(acsImageScanResult)
    ? acsImageScanResult?.result?.vulnerabilities?.filter(
        (vul: Vulnerability) =>
          filterByStatus(vul, statusFilters) &&
          filterData(vul, cveIdFilters, 'cveId') &&
          filterData(vul, componentFilters, 'componentName') &&
          filterData(vul, severityFilters, 'cveSeverity', true),
      )
    : [];
};

export const applyFiltersOnImageScanResult = (
  imageScanData: ACSImageScanResult,
  filters: Partial<Record<keyof ToolBarState, FilterChip[]>>,
) => {
  const vulnerabilities = imageScanData?.result?.vulnerabilities ?? [];
  const { componentFilters = [] } = filters;
  return {
    filteredacsImageScanResult: filterVulnerabilities(imageScanData, filters),
    filteredacsImageScanResultByComponents: vulnerabilities.filter((v) =>
      filterData(v, componentFilters, 'componentName'),
    ),
  };
};

const filterViolatedPoliciesByType = (
  data: ACSCheckResults,
  nameFilter: string | FilterChip[],
  severityFilters: string | FilterChip[],
): ViolatedPolicy[] => {
  return data?.results?.[0]?.violatedPolicies?.filter((policy: ViolatedPolicy) => {
    return (
      filterData(policy, severityFilters, 'severity', true) &&
      (!nameFilter ||
        policy.name.toLowerCase().indexOf((nameFilter as string).toLowerCase()) !== -1)
    );
  });
};

export const applyFiltersOnImageCheckResults = (
  acsImageCheckResults: ACSCheckResults,
  filters: {
    [key: string]: string | FilterChip[];
  },
): { filteredacsImageCheckResults: ViolatedPolicy[] } => ({
  filteredacsImageCheckResults: filterViolatedPoliciesByType(
    acsImageCheckResults,
    filters.nameFilter,
    filters.acsImageCheckSeverityFilters,
  ),
});

export const applyFiltersOnDeploymentCheckResults = (
  acsDeploymentCheckResults: ACSCheckResults,
  filters: { [key: string]: string | FilterChip[] },
): { filteredacsDeploymentCheckResults: ViolatedPolicy[] } => ({
  filteredacsDeploymentCheckResults: filterViolatedPoliciesByType(
    acsDeploymentCheckResults,
    filters.acsPolicyNameFilter,
    filters.acsDeploymentCheckSeverityFilters,
  ),
});
