import { acsDeploymentCheck, acsImageCheckResults } from '../../data';
import { ACSCheckResults, ViolatedPolicy } from '../../types';
import {
  getACSCheckIssues,
  getBreakingChangeCount,
  getCheckSeverity,
} from '../acs-image-check-utils';

describe('AcsImageCheckUtils', () => {
  describe('getCheckSeverity', () => {
    test('should return default value if severity is not passed', () => {
      const severityMap = getCheckSeverity({} as ACSCheckResults);

      expect(severityMap).toEqual({ Critical: 0, High: 0, Medium: 0, Low: 0 });
    });

    test('should return valid severity map', () => {
      const severityMap = getCheckSeverity(acsImageCheckResults);
      expect(severityMap).toEqual({ Critical: 0, High: 1, Medium: 0, Low: 1 });

      const deploymentCheckSeverityMap = getCheckSeverity(acsDeploymentCheck);
      expect(deploymentCheckSeverityMap).toEqual({
        Critical: 0,
        High: 0,
        Medium: 2,
        Low: 0,
      });
    });
  });

  describe('getBreakingChangeCount', () => {
    test('should return default value if policy array is empty', () => {
      expect(getBreakingChangeCount([] as ViolatedPolicy[])).toEqual({
        Breaking: 0,
        NotBreaking: 0,
      });
    });

    test('should return violated policy breaking count', () => {
      expect(getBreakingChangeCount(acsImageCheckResults.results[0].violatedPolicies)).toEqual({
        Breaking: 1,
        NotBreaking: 1,
      });
    });
  });

  describe('getACSCheckIssues', () => {
    test('should return false if the default value', () => {
      expect(getACSCheckIssues({} as ACSCheckResults, {} as ACSCheckResults)).toBe(false);
    });

    test('should return true if there are any issues found in image check and deployment check', () => {
      expect(getACSCheckIssues(acsImageCheckResults, acsDeploymentCheck)).toBe(true);
    });
  });
});
