import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { acsDeploymentCheck, acsImageCheckResults, acsImageScanResult } from '../../../data';
import { ACSCheckResults, ACSImageScanResult } from '../../../types';
import AdvancedClusterSecurity from '../AdvancedClusterSecurity';

describe('AdvancedClusterSSecurity', () => {
  test('should return null if not data is avaiable', () => {
    const props = {
      acsImageScanResult: {} as ACSImageScanResult,
      acsImageCheckResults: {} as ACSCheckResults,
      acsDeploymentCheckResults: {} as ACSCheckResults,
    };
    render(<AdvancedClusterSecurity {...props} />);
    expect(screen.queryByTestId('acs-tabs')).toBeNull();
  });

  test('should not render the tabs that does not have any data to render', () => {
    const props = {
      acsImageScanResult: acsImageScanResult,
      acsImageCheckResults: {} as ACSCheckResults,
      acsDeploymentCheckResults: {} as ACSCheckResults,
    };
    render(<AdvancedClusterSecurity {...props} />);

    expect(screen.queryByTestId('acs-tabs')).toBeInTheDocument();
    expect(screen.getByText(/Image Scan/)).toBeInTheDocument();
    expect(screen.queryByText(/Image Check/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Deployment Check/)).not.toBeInTheDocument();
  });

  test('should render all the loaded tabs', () => {
    const props = {
      acsImageScanResult: acsImageScanResult,
      acsImageCheckResults: acsImageCheckResults,
      acsDeploymentCheckResults: acsDeploymentCheck,
    };
    render(<AdvancedClusterSecurity {...props} />);

    expect(screen.queryByTestId('acs-tabs')).toBeInTheDocument();
    expect(screen.getByText(/Image Scan/)).toBeInTheDocument();
    expect(screen.getByText(/Image Check/)).toBeInTheDocument();
    expect(screen.getByText(/Deployment Check/)).toBeInTheDocument();
  });
});
