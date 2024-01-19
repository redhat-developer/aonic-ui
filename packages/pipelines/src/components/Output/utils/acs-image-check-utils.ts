import {
  ACS_BREAKING_CHANGES,
  ACS_IMAGE_CHECK_SEVERITY,
  ACSCheckResults,
  ViolatedPolicy,
} from '../types';

export const getCheckSeverity = (acsImageScanResult: ACSCheckResults): Record<string, number> => {
  const { summary } = acsImageScanResult;
  const severityMap: Record<string, number> = {
    [ACS_IMAGE_CHECK_SEVERITY.Critical]: summary?.CRITICAL ?? 0,
    [ACS_IMAGE_CHECK_SEVERITY.High]: summary?.HIGH ?? 0,
    [ACS_IMAGE_CHECK_SEVERITY.Medium]: summary?.MEDIUM ?? 0,
    [ACS_IMAGE_CHECK_SEVERITY.Low]: summary?.LOW ?? 0,
  };

  return severityMap;
};

export const getBreakingChangeCount = (violatedPolicies: ViolatedPolicy[]) => {
  const statusFilter = {
    [ACS_BREAKING_CHANGES.Breaking]: 0,
    [ACS_BREAKING_CHANGES.NotBreaking]: 0,
  };
  return violatedPolicies?.reduce((acc, vul) => {
    if (vul.failingCheck) {
      acc[ACS_BREAKING_CHANGES.Breaking] += 1;
    } else {
      acc[ACS_BREAKING_CHANGES.NotBreaking] += 1;
    }
    return acc;
  }, statusFilter);
};

export const getACSCheckIssues = (
  acsImageCheckResults: ACSCheckResults,
  acsDeploymentCheckResults: ACSCheckResults,
): boolean => {
  const violatedPolicies = [
    ...(acsImageCheckResults?.results?.[0].violatedPolicies ?? []),
    ...(acsDeploymentCheckResults?.results?.[0].violatedPolicies ?? []),
  ];

  const { Breaking } = getBreakingChangeCount(violatedPolicies);

  const { Critical, High } = getCheckSeverity(acsImageCheckResults);
  const { Critical: depCheckCritical, High: depCheckHigh } =
    getCheckSeverity(acsDeploymentCheckResults);
  return Breaking + Critical + High + depCheckCritical + depCheckHigh > 0;
};
