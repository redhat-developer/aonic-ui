import { acsDeploymentCheck, acsImageCheckResults, acsImageScanResult } from '../../data';
import {
  ACS_IMAGE_CHECK_SEVERITY,
  ACS_SEVERITY,
  ACS_STATUS,
  ACSImageScanResult,
  ViolatedPolicy,
} from '../../types';
import {
  applyFiltersOnDeploymentCheckResults,
  applyFiltersOnImageCheckResults,
  applyFiltersOnImageScanResult,
  filterByStatus,
  filterData,
  filterVulnerabilities,
} from '../acs-filter-utils';

describe('ACS filter utils', () => {
  describe('applyFiltersOnImageCheckResults', () => {
    test('should return the data if the filters are not set', () => {
      const { filteredacsImageCheckResults: filteredResult } = applyFiltersOnImageCheckResults(
        acsImageCheckResults,
        {},
      );

      expect(filteredResult).toHaveLength(acsImageCheckResults.results[0].violatedPolicies.length);

      const { filteredacsImageCheckResults } = applyFiltersOnImageCheckResults(
        acsImageCheckResults,
        {
          nameFilter: '',
          acsImageCheckSeverityFilters: [],
        },
      );

      expect(filteredacsImageCheckResults).toHaveLength(
        acsImageCheckResults.results[0].violatedPolicies.length,
      );
    });

    test('should apply severity filters and return filtered data', () => {
      const { filteredacsImageCheckResults } = applyFiltersOnImageCheckResults(
        acsImageCheckResults,
        {
          nameFilter: '',
          acsImageCheckSeverityFilters: [ACS_IMAGE_CHECK_SEVERITY.High],
        },
      );

      expect(filteredacsImageCheckResults).toHaveLength(1);
    });

    test('should apply name filter and return filtered data', () => {
      const { filteredacsImageCheckResults } = applyFiltersOnImageCheckResults(
        acsImageCheckResults,
        {
          nameFilter: 'Fixable',
          acsImageCheckSeverityFilters: [],
        },
      );

      expect(filteredacsImageCheckResults).toHaveLength(1);
    });
  });

  describe('applyFiltersOnImageScanResults', () => {
    test('should apply severity filters and return empty data', () => {
      const { filteredacsImageScanResult } = applyFiltersOnImageScanResult(
        {} as ACSImageScanResult,
        {
          statusFilters: [],
        },
      );

      expect(filteredacsImageScanResult).toHaveLength(0);
    });
    test('should apply severity filters and return filtered data', () => {
      const { filteredacsImageScanResult } = applyFiltersOnImageScanResult(acsImageScanResult, {
        severityFilters: [ACS_SEVERITY.Important],
      });

      expect(filteredacsImageScanResult).toHaveLength(1);
    });
  });

  describe('applyFiltersOnDeploymentCheckResults', () => {
    test('should apply severity filters and return filtered data', () => {
      const { filteredacsDeploymentCheckResults } = applyFiltersOnDeploymentCheckResults(
        acsDeploymentCheck,
        {
          acsPolicyNameFilter: 'No resource requests or limits specified',
          acsDeploymentCheckSeverityFilters: [ACS_IMAGE_CHECK_SEVERITY.Medium],
        },
      );

      expect(filteredacsDeploymentCheckResults).toHaveLength(1);
    });
  });

  describe('FilterData', () => {
    const violatedPolicies = acsImageCheckResults.results[0].violatedPolicies;

    test('should return true the filters are empty', () => {
      expect(filterData({ severity: 'high' }, ['high'], 'severity')).toBe(true);
    });
    test('should return true the filters are empty', () => {
      expect(
        filterData(violatedPolicies[0], [ACS_IMAGE_CHECK_SEVERITY.High], 'severity', true),
      ).toBe(true);
    });

    test('should filter the policies by high severity ', () => {
      const filterPolicies = violatedPolicies.filter((vp: ViolatedPolicy) =>
        filterData(vp, [ACS_IMAGE_CHECK_SEVERITY.High], 'severity', true),
      );

      expect(filterPolicies).toHaveLength(1);
    });
  });

  describe('filterVulnerabilities', () => {
    test('should return empty array for invalid data', () => {
      const invalidACSImageScanData = {
        result: {
          summary: acsImageScanResult.result.summary,
        },
      } as ACSImageScanResult;

      expect(
        filterVulnerabilities(invalidACSImageScanData, {
          statusFilters: [ACS_STATUS.Fixable],
        }),
      ).toHaveLength(0);

      expect(
        filterVulnerabilities({} as ACSImageScanResult, {
          statusFilters: [ACS_STATUS.Fixable],
        }),
      ).toHaveLength(0);
    });
    test('should filter vulnerabilities by status', () => {
      expect(
        filterVulnerabilities(acsImageScanResult, {
          statusFilters: [ACS_STATUS.Fixable],
        }),
      ).toHaveLength(11);

      expect(
        filterVulnerabilities(acsImageScanResult, {
          statusFilters: [ACS_STATUS.Unavailable],
        }),
      ).toHaveLength(143);

      expect(
        filterVulnerabilities(acsImageScanResult, {
          statusFilters: [],
        }),
      ).toHaveLength(154);
    });

    test('should filter by severity', () => {
      expect(
        filterVulnerabilities(acsImageScanResult, {
          severityFilters: [ACS_SEVERITY.Critical],
        }),
      ).toHaveLength(0);

      expect(
        filterVulnerabilities(acsImageScanResult, {
          severityFilters: [ACS_SEVERITY.Important],
        }),
      ).toHaveLength(1);
    });

    test('should filter by cveIdFilters', () => {
      expect(
        filterVulnerabilities(acsImageScanResult, {
          cveIdFilters: ['CVE-2005-2945'],
        }),
      ).toHaveLength(1);
    });
  });

  describe('filterByStatus', () => {
    test('should filter by status', () => {
      expect(
        filterByStatus(acsImageScanResult.result.vulnerabilities[0], [ACS_STATUS.Fixable]),
      ).toBe(true);
    });
  });
});
