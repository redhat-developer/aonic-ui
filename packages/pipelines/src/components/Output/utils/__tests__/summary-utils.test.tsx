import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { acsImageScanResult } from '../../data';
import {
  ACS_BREAKING_CHANGES,
  ACS_SCAN_RESULTS,
  ACS_SEVERITY,
  ACS_STATUS,
  ENTERPRISE_CONTRACT_POLICY_STATUS,
} from '../../types';
import {
  getACStatusLabel,
  getBreakingChangeStatus,
  getCVEFixableStatus,
  getCVEScanResults,
  getECStatusLabel,
  getRuleStatus,
  getSeverityIcon,
  getSeverityWithIcon,
  SummaryTextAndCount,
} from '../summary-utils';

describe('Summary utils', () => {
  describe('getRuleStatus', () => {
    test('should render success status icon', () => {
      render(<>{getRuleStatus(ENTERPRISE_CONTRACT_POLICY_STATUS.successes)}</>);
      expect(screen.queryByTestId('success-icon')).toBeInTheDocument();
    });

    test('should render failed status icon', () => {
      render(<>{getRuleStatus(ENTERPRISE_CONTRACT_POLICY_STATUS.failed)}</>);
      expect(screen.queryByTestId('failed-icon')).toBeInTheDocument();
    });

    test('should render warning status icon', () => {
      render(<>{getRuleStatus(ENTERPRISE_CONTRACT_POLICY_STATUS.warnings)}</>);
      expect(screen.queryByTestId('warning-icon')).toBeInTheDocument();
    });

    test('should render default status icon', () => {
      render(<>{getRuleStatus('default' as ENTERPRISE_CONTRACT_POLICY_STATUS)}</>);
      expect(screen.queryByText('-')).toBeInTheDocument();
    });
  });

  describe('getECStatusLabel', () => {
    test('should not render if the status is emtpy', () => {
      expect(getECStatusLabel('' as ENTERPRISE_CONTRACT_POLICY_STATUS)).toBeNull();
    });

    test('should render success icon', () => {
      render(<>{getECStatusLabel(ENTERPRISE_CONTRACT_POLICY_STATUS.successes)}</>);
      expect(screen.queryByTestId('success-icon')).toBeInTheDocument();
    });
  });

  describe('getACStatusLabel', () => {
    test('should not render if the status is emtpy', () => {
      expect(getACStatusLabel(false)).toBeNull();
    });

    test('should render issues found label', () => {
      render(<>{getACStatusLabel(true)}</>);
      expect(screen.queryByTestId('issues-found-label')).toBeInTheDocument();
    });
  });
  describe('getSeverityIcon', () => {
    test('should render missing icon', () => {
      render(<>{getSeverityIcon('')}</>);
      expect(screen.queryByTestId('missing-icon')).toBeInTheDocument();
    });

    test('should render critical icon', () => {
      render(<>{getSeverityIcon('Critical')}</>);
      expect(screen.queryByTestId('critical-icon')).toBeInTheDocument();
    });
    test('should render high icon', () => {
      render(<>{getSeverityIcon('High')}</>);
      expect(screen.queryByTestId('important-or-high-icon')).toBeInTheDocument();
    });
    test('should render moderate icon', () => {
      render(<>{getSeverityIcon('Moderate')}</>);
      expect(screen.queryByTestId('moderate-or-medium-icon')).toBeInTheDocument();
    });

    test('should render low icon', () => {
      render(<>{getSeverityIcon('Low')}</>);
      expect(screen.queryByTestId('low-icon')).toBeInTheDocument();
    });
  });

  describe('getSeverityWithIcon', () => {
    test('should render getSeverityWithIcon', () => {
      render(<>{getSeverityWithIcon(ACS_SEVERITY.Critical)}</>);

      expect(screen.queryByTestId('critical-icon')).toBeInTheDocument();
    });
  });
  describe('getBreakingChangeStatus', () => {
    test('should render Missing value for invalid values', () => {
      render(<>{getBreakingChangeStatus(ACS_SEVERITY.Critical, { Critical: 1 })}</>);
      expect(screen.queryByText('Missing')).toBeInTheDocument();
    });

    test('should render breaking changes value', () => {
      render(
        <>
          {getBreakingChangeStatus(ACS_BREAKING_CHANGES.Breaking, {
            Breaking: 1,
          })}
        </>,
      );
      expect(screen.queryByText('violations breaks build')).toBeInTheDocument();
    });

    test('should render not breaking changes value', () => {
      render(
        <>
          {getBreakingChangeStatus(ACS_BREAKING_CHANGES.NotBreaking, {
            NotBreaking: 1,
          })}
        </>,
      );
      expect(screen.queryByText('violations not breaking builds')).toBeInTheDocument();
    });
  });

  describe('getCVEFixableStatus', () => {
    test('should render Missing value for invalid values', () => {
      render(<>{getCVEFixableStatus(ACS_SEVERITY.Critical, { Critical: 1 })}</>);
      expect(screen.queryByText('Missing')).toBeInTheDocument();
    });

    test('should render fixable changes value', () => {
      render(
        <>
          {getCVEFixableStatus(ACS_STATUS.Fixable, {
            Fixable: 1,
          })}
        </>,
      );
      expect(screen.queryByText('vulnerabilities with available fixes')).toBeInTheDocument();
    });

    test('should render vulnerabilites without fixes changes value', () => {
      render(
        <>
          {getCVEFixableStatus(ACS_STATUS.Unavailable, {
            Unavailable: 1,
          })}
        </>,
      );
      expect(screen.queryByText('vulnerabilities without fixes')).toBeInTheDocument();
    });
  });

  describe('getCVEScanResults', () => {
    test('should render missing value', () => {
      render(<>{getCVEScanResults(ACS_SEVERITY.Critical, acsImageScanResult.result.summary)}</>);
      expect(screen.queryByText('Missing')).toBeInTheDocument();
    });

    test('should render missing value', () => {
      render(
        <>
          {getCVEScanResults(ACS_SCAN_RESULTS.Vulnerabilites, acsImageScanResult.result.summary)}
        </>,
      );
      expect(screen.queryByText('vulnerabilities')).toBeInTheDocument();
    });

    test('should render missing value', () => {
      render(
        <>{getCVEScanResults(ACS_SCAN_RESULTS.Components, acsImageScanResult.result.summary)}</>,
      );
      expect(screen.queryByText('components')).toBeInTheDocument();
    });
  });

  describe('SummaryTextAndCount', () => {
    test('should render only the text', () => {
      render(<SummaryTextAndCount text="summary-text" />);

      expect(screen.queryByText('summary-text')).toBeInTheDocument();
    });

    test('should render only the text and count', () => {
      render(<SummaryTextAndCount text="summary-text" count={20} />);

      expect(screen.queryByText('summary-text')).toBeInTheDocument();
      expect(screen.queryByText('20')).toBeInTheDocument();
    });
  });
});
