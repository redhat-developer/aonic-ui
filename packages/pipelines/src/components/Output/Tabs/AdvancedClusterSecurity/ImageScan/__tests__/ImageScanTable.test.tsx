import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { acsImageScanResult } from '../../../../data';
import { ACSCheckResults, ACSImageScanResult } from '../../../../types';
import ACSContextProvider from '../../AdvancedClusterSecurityContext';
import ImageScanTable from '../ImageScanTable';

describe('ImageScanTable', () => {
  const extraProps = {
    acsImageScanResult: {} as ACSImageScanResult,
    acsImageCheckResults: {} as ACSCheckResults,
    acsDeploymentCheckResults: {} as ACSCheckResults,
  };
  test('should render the empty state', () => {
    render(
      <ACSContextProvider {...extraProps}>
        <ImageScanTable />
      </ACSContextProvider>,
    );

    fireEvent.click(screen.getByText('Clear all filters'));

    waitFor(() => {
      screen.getByTestId('image-scan-table');
      screen.getByTestId('table-empty-state');
    });
  });

  test('should render the ImageScanTable', () => {
    render(
      <ACSContextProvider {...extraProps} acsImageScanResult={acsImageScanResult}>
        <ImageScanTable />
      </ACSContextProvider>,
    );

    fireEvent.click(screen.getByText(/Severity/));

    waitFor(() => {
      screen.getByTestId('image-scan-table');
    });
  });
});
