import { acsImageScanResult } from '../../data';
import { ACSImageScanResult } from '../../types';
import {
  getCVEIdCount,
  getCVESeverity,
  getFixableCveByStatus,
  getImageScanIssues,
} from '../acs-image-scan-utils';

describe('AcsImageScanUtils', () => {
  describe('getFixableCveByStatus', () => {
    test('should return default cve count by status', () => {
      expect(getFixableCveByStatus([])).toEqual({
        Fixable: 0,
        Unavailable: 0,
      });
    });

    test('should return default cve count by status', () => {
      expect(getFixableCveByStatus(acsImageScanResult?.result?.vulnerabilities)).toEqual({
        Fixable: 11,
        Unavailable: 143,
      });
    });
  });

  describe('getCVESeverity', () => {
    test('should return default cve severity', () => {
      expect(getCVESeverity({} as ACSImageScanResult)).toEqual({
        Critical: 0,
        Important: 0,
        Low: 0,
        Moderate: 0,
      });
    });

    test('should return cve severity', () => {
      expect(getCVESeverity(acsImageScanResult)).toEqual({
        Critical: 0,
        Important: 1,
        Low: 61,
        Moderate: 40,
      });
    });
  });

  describe('getCVEIdCount', () => {
    test('should return undefined for invalid value', () => {
      expect(getCVEIdCount({} as ACSImageScanResult)).toBeUndefined();
    });
    test('should return default cve count', () => {
      expect(getCVEIdCount(acsImageScanResult)).toEqual(
        expect.objectContaining({
          'CVE-2018-1000654': 1,
          'CVE-2018-1000879': 1,
          'CVE-2018-1000880': 1,
          'CVE-2018-19211': 2,
          'CVE-2018-19217': 2,
          'CVE-2018-20225': 1,
        }),
      );
    });
  });

  describe('getImageScanIssues', () => {
    test('should return false for invalid value', () => {
      expect(getImageScanIssues({} as ACSImageScanResult)).toBe(false);
    });

    test('should return true if there are any issues in the imageScanResult', () => {
      expect(getImageScanIssues(acsImageScanResult)).toBe(true);
    });
  });
});
