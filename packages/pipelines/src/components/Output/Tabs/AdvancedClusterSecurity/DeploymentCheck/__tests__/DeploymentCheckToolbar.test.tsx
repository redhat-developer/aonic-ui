import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ACSCheckResults, ACSImageScanResult } from '../../../../types';
import ACSContextProvider from '../../AdvancedClusterSecurityContext';
import DeploymentCheckToolbar from '../DeploymentCheckToolbar';

describe('DeploymentCheckTable', () => {
  const extraProps = {
    acsImageScanResult: {} as ACSImageScanResult,
    acsImageCheckResults: {} as ACSCheckResults,
    acsDeploymentCheckResults: {} as ACSCheckResults,
  };
  test('should render the toolbar', async () => {
    render(
      <ACSContextProvider {...extraProps}>
        <DeploymentCheckToolbar />
      </ACSContextProvider>,
    );
    await waitFor(() => {
      screen.getByTestId('deployment-check-toolbar');
    });
  });

  test('should render the selected filter as chip in toolbar', async () => {
    render(
      <ACSContextProvider {...extraProps}>
        <DeploymentCheckToolbar />
      </ACSContextProvider>,
    );

    fireEvent.input(screen.queryByPlaceholderText('Filter by name...') as HTMLInputElement, {
      target: { value: 'testing-name' },
    });

    await waitFor(() => {
      screen.getByText('testing-name');
    });

    fireEvent.click(screen.getByText(/Clear all filters/));

    await waitFor(() => {
      expect(screen.queryByText('testing-name')).not.toBeInTheDocument();
    });
  });
});
