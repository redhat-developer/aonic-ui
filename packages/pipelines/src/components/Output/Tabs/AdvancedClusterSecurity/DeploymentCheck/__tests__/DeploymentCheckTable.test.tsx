import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { acsDeploymentCheck } from '../../../../data';
import { ACSCheckResults, ACSImageScanResult } from '../../../../types';
import ACSContextProvider from '../../AdvancedClusterSecurityContext';
import DeploymentCheckTable from '../DeploymentCheckTable';

describe('DeploymentCheckTable', () => {
  const extraProps = {
    acsImageScanResult: {} as ACSImageScanResult,
    acsImageCheckResults: {} as ACSCheckResults,
  };
  test('should render the empty state', async () => {
    render(
      <ACSContextProvider {...extraProps} acsDeploymentCheckResults={{} as ACSCheckResults}>
        <DeploymentCheckTable />
      </ACSContextProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByText('Clear all filters'));
    });

    await waitFor(() => {
      screen.getByTestId('deployment-check-table');
      screen.getByTestId('table-empty-state');
    });
  });

  test('should render the DeploymentCheckTable', async () => {
    render(
      <ACSContextProvider {...extraProps} acsDeploymentCheckResults={acsDeploymentCheck}>
        <DeploymentCheckTable />
      </ACSContextProvider>,
    );

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Severity' }));
    });

    await waitFor(() => {
      screen.getByTestId('deployment-check-table');
    });
  });
});
