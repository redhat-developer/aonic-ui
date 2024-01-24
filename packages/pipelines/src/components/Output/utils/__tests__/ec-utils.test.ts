import { mockEnterpriseContractUIData } from '../../data';
import { EnterpriseContractPolicy } from '../../types';
import { getEnterpriseContractStatus, getResultsSummary } from '../ec-utils';

describe('EC utils', () => {
  describe('getResultsSummary', () => {
    const defaultEmptyValue = {
      Failed: 0,
      Success: 0,
      Warning: 0,
    };
    test('should return default value for invalid values', () => {
      expect(getResultsSummary({} as EnterpriseContractPolicy[])).toEqual(defaultEmptyValue);
      expect(getResultsSummary([])).toEqual(defaultEmptyValue);
    });

    test('should return result summary for EC policy value', () => {
      expect(getResultsSummary(mockEnterpriseContractUIData)).toEqual({
        Failed: 1,
        Success: 8,
        Warning: 1,
      });
    });
  });

  describe('getEnterpriseContractStatus', () => {
    test('should return empty string value for invalid input', () => {
      expect(getEnterpriseContractStatus([])).toBe('');
    });

    test('should return correct status for enterprise contract value', () => {
      expect(getEnterpriseContractStatus(mockEnterpriseContractUIData)).toBe('Failed');

      expect(getEnterpriseContractStatus(mockEnterpriseContractUIData.slice(1))).toBe('Warning');

      expect(getEnterpriseContractStatus(mockEnterpriseContractUIData.slice(9))).toBe('Success');
    });
  });
});
