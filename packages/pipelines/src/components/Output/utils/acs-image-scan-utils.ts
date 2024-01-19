import { ACS_SEVERITY, ACS_STATUS, ACSImageScanResult, Vulnerability } from '../types';

export const getFixableCveByStatus = (vulnerabilities: Vulnerability[]) => {
  const statusFilter = {
    [ACS_STATUS.Fixable]: 0,
    [ACS_STATUS.Unavailable]: 0,
  };
  return vulnerabilities?.reduce((acc, vul) => {
    if (vul.componentFixedVersion) {
      acc[ACS_STATUS.Fixable] += 1;
    } else {
      acc[ACS_STATUS.Unavailable] += 1;
    }
    return acc;
  }, statusFilter);
};

export const getCVESeverity = (acsImageScanResult: ACSImageScanResult): Record<string, number> => {
  const summary = acsImageScanResult?.result?.summary;

  const severityMap: Record<string, number> = {
    [ACS_SEVERITY.Critical]: summary?.CRITICAL ?? 0,
    [ACS_SEVERITY.Important]: summary?.IMPORTANT ?? 0,
    [ACS_SEVERITY.Moderate]: summary?.MODERATE ?? 0,
    [ACS_SEVERITY.Low]: summary?.LOW ?? 0,
  };

  return severityMap;
};

export const getCVEIdCount = (acsImageScanResult: ACSImageScanResult) => {
  return acsImageScanResult?.result?.vulnerabilities?.reduce(
    (acc, data) => {
      if (acc[data.cveId]) {
        acc[data.cveId] += 1;
      } else {
        acc[data.cveId] = 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );
};

export const getImageScanIssues = (acsImageScanResult: ACSImageScanResult): boolean => {
  const { Critical, Important } = getCVESeverity(acsImageScanResult);
  return Critical > 0 || Important > 0;
};
