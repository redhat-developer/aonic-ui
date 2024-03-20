import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { acsImageCheckResults } from '../../../../data';
import { ACSCheckResults, ACSImageScanResult } from '../../../../types';
import ACSContextProvider from '../../AdvancedClusterSecurityContext';
import ImageCheckTable from '../ImageCheckTable';

describe('ImageCheckTable', () => {
  const extraProps = {
    acsImageScanResult: {} as ACSImageScanResult,
    acsImageCheckResults: {} as ACSCheckResults,
    acsDeploymentCheckResults: {} as ACSCheckResults,
  };
  test('should render the empty state', () => {
    render(
      <ACSContextProvider {...extraProps}>
        <ImageCheckTable />
      </ACSContextProvider>,
    );

    fireEvent.click(screen.getByText('Clear all filters'));

    waitFor(() => {
      screen.getByTestId('deployment-check-table');
      screen.getByTestId('table-empty-state');
    });
  });

  test('should render the ImageCheckTable', () => {
    render(
      <ACSContextProvider {...extraProps} acsImageCheckResults={acsImageCheckResults}>
        <ImageCheckTable />
      </ACSContextProvider>,
    );

    fireEvent.click(screen.getByText(/Breaks build/));

    waitFor(() => {
      screen.getByTestId('image-check-table');
    });
  });


  test('should render the ImageCheckTable even if the results are not available', async () => {
    render(
      <ACSContextProvider
        {...extraProps}
        acsImageCheckResults={{ summary: acsImageCheckResults.summary } as ACSCheckResults}
      >
        <ImageCheckTable />
      </ACSContextProvider>,
    );

   await waitFor(() => {
      screen.getByTestId('image-check-table');
    });
  });
});
