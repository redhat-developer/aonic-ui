import { acsImageCheckResults } from '../../data';
import { ACS_SEVERITY, ENTERPRISE_CONTRACT_POLICY_STATUS } from '../../types';
import { getSortColumnFuntion, isEmpty, toPascalCase } from '../helper-utils';

describe('helper-utils', () => {
  describe('getSortColumnFuntion', () => {
    test('should sort the status', () => {
      const statuses = [
        { status: ENTERPRISE_CONTRACT_POLICY_STATUS.warnings },
        { status: ENTERPRISE_CONTRACT_POLICY_STATUS.warnings },
        { status: ENTERPRISE_CONTRACT_POLICY_STATUS.failed },
        { status: ENTERPRISE_CONTRACT_POLICY_STATUS.successes },
      ];
      expect(
        statuses
          .slice()
          .sort(getSortColumnFuntion('status', 'asc'))
          .map((s) => s.status),
      ).toEqual(['Failed', 'Warning', 'Warning', 'Success']);

      expect(
        statuses
          .slice()
          .sort(getSortColumnFuntion('status', 'desc'))
          .map((s) => s.status),
      ).toEqual(['Success', 'Warning', 'Warning', 'Failed']);
    });

    test('should sort the cveSeverity', () => {
      const severityMap = [
        { cveSeverity: ACS_SEVERITY.Critical },
        { cveSeverity: ACS_SEVERITY.Moderate },
        { cveSeverity: ACS_SEVERITY.Important },
        { cveSeverity: ACS_SEVERITY.Important },
        { cveSeverity: ACS_SEVERITY.Low },
      ];
      expect(
        severityMap
          .slice()
          .sort(getSortColumnFuntion('cveSeverity', 'asc'))
          .map((s) => s.cveSeverity),
      ).toEqual(['Critical', 'Important', 'Important', 'Moderate', 'Low']);

      expect(
        severityMap
          .slice()
          .sort(getSortColumnFuntion('cveSeverity', 'desc'))
          .map((s) => s.cveSeverity),
      ).toEqual(['Low', 'Moderate', 'Important', 'Important', 'Critical']);
    });

    test('should sort the failingCheck', () => {
      expect(
        acsImageCheckResults.results[0].violatedPolicies
          .slice()
          .sort(getSortColumnFuntion('failingCheck', 'asc'))
          .map((s) => s.failingCheck),
      ).toEqual([true, false]);

      expect(
        acsImageCheckResults.results[0].violatedPolicies
          .slice()
          .sort(getSortColumnFuntion('failingCheck', 'desc'))
          .map((s) => s.failingCheck),
      ).toEqual([false, true]);

      expect(
        [
          ...acsImageCheckResults.results[0].violatedPolicies,
          acsImageCheckResults.results[0].violatedPolicies[0],
        ]
          .slice()
          .sort(getSortColumnFuntion('failingCheck', 'desc'))
          .map((s) => s.failingCheck),
      ).toEqual([false, true, true]);

      expect(
        [
          ...acsImageCheckResults.results[0].violatedPolicies,
          acsImageCheckResults.results[0].violatedPolicies[0],
        ]
          .slice()
          .sort(getSortColumnFuntion('failingCheck', 'asc'))
          .map((s) => s.failingCheck),
      ).toEqual([true, true, false]);
    });

    test('should sort the value by alphabetical order', () => {
      const names = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
      expect(
        names
          .slice()
          .sort(getSortColumnFuntion('name', 'asc'))
          .map((s) => s.name),
      ).toEqual(['a', 'b', 'c']);

      expect(
        names
          .slice()
          .sort(getSortColumnFuntion('name', 'desc'))
          .map((s) => s.name),
      ).toEqual(['c', 'b', 'a']);

      expect(
        [...names, { name: {} as string }]
          .slice()
          .sort(getSortColumnFuntion('name', 'desc'))
          .map((s) => s.name),
      ).toEqual(['c', 'b', 'a', {}]);
    });
  });

  describe('toPascalCase', () => {
    test('should return the string in pascalCase', () => {
      expect(toPascalCase('convert-to-pascal')).toBe('ConvertToPascal');
      expect(toPascalCase('convert to pascal')).toBe('ConvertToPascal');
      expect(toPascalCase('CONVERT TO PASCAL')).toBe('ConvertToPascal');
      expect(toPascalCase('CONVERTTOPASCAL')).toBe('Converttopascal');
    });
  });

  describe('isEmpty', () => {
    test('should return if the passed input is empty object', () => {
      expect(isEmpty({})).toBe(true);
      expect(isEmpty({ key: 'value' })).toBe(false);
    });
  });
});
