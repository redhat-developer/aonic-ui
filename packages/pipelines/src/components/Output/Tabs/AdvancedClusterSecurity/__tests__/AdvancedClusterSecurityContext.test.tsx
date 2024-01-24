import { render, screen } from '@testing-library/react';
import { acsImageScanResult } from '../../../data';
import { ACSCheckResults, ACSImageScanResult } from '../../../types';
import ACSContextProvider, { useACSContext } from '../AdvancedClusterSecurityContext';

describe('EnterpriseContractContext', () => {
  const props = {
    acsImageScanResult: {} as ACSImageScanResult,
    acsImageCheckResults: {} as ACSCheckResults,
    acsDeploymentCheckResults: {} as ACSCheckResults,
  };
  const ACSDataComponent = () => {
    const { acsImageScanResult } = useACSContext();

    return acsImageScanResult?.result?.vulnerabilities ? (
      <div>ACS data loaded</div>
    ) : (
      <div>Waiting for ACS data</div>
    );
  };

  test('should render the children EnterpriseContractContext', () => {
    render(
      <ACSContextProvider {...props}>
        <ACSDataComponent />
      </ACSContextProvider>,
    );
    screen.getByText(/Waiting for ACS data/);
  });

  test('should load the children when data is loaded', () => {
    render(
      <ACSContextProvider {...props} acsImageScanResult={acsImageScanResult}>
        <ACSDataComponent />
      </ACSContextProvider>,
    );
    screen.getByText(/ACS data loaded/);
  });

  test('should throw error if the children component is not wrapped with ECContextProvider', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<ACSDataComponent />)).toThrow(
      'useACSContext must be within a ACSContextProvider',
    );
  });
});
