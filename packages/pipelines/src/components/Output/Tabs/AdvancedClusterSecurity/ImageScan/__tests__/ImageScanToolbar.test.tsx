import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { acsImageCheckResults } from '../../../../data';
import { ACSCheckResults, ACSImageScanResult } from '../../../../types';
import ACSContextProvider from '../../AdvancedClusterSecurityContext';
import ImageScanToolbar from '../ImageScanToolbar';

describe('ImageScanToolbar', () => {
  const extraProps = {
    acsImageScanResult: {} as ACSImageScanResult,
    acsImageCheckResults: {} as ACSCheckResults,
    acsDeploymentCheckResults: {} as ACSCheckResults,
  };
  test('should render the toolbar', async () => {
    render(
      <ACSContextProvider {...extraProps}>
        <ImageScanToolbar />
      </ACSContextProvider>,
    );
    await waitFor(() => {
      screen.getByTestId('image-scan-toolbar');
    });
  });

  test('should render the selected filter as chip in toolbar', async () => {
    render(
      <ACSContextProvider {...extraProps} acsImageCheckResults={acsImageCheckResults}>
        <ImageScanToolbar />
      </ACSContextProvider>,
    );
    act(() => {
      fireEvent.click(screen.queryByText('Severity') as HTMLInputElement);
    });

    await waitFor(() => {
      screen.getByText('Important');
    });

    act(() => {
      fireEvent.click(within(screen.getByTestId('Severity-filter-Low')).getByRole('checkbox'));

      fireEvent.click(screen.getByText(/Clear all filters/));
    });

    await waitFor(() => {
      expect(screen.queryByText(/Clear all filters/)).not.toBeInTheDocument();
    });
  });
});
