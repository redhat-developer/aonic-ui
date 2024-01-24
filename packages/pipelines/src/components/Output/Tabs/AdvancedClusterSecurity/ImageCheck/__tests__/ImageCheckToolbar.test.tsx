import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ACSCheckResults, ACSImageScanResult } from '../../../../types';
import ACSContextProvider from '../../AdvancedClusterSecurityContext';
import ImageCheckToolbar from '../ImageCheckToolbar';

describe('ImageCheckTable', () => {
  const extraProps = {
    acsImageScanResult: {} as ACSImageScanResult,
    acsImageCheckResults: {} as ACSCheckResults,
    acsDeploymentCheckResults: {} as ACSCheckResults,
  };
  test('should render the toolbar', async () => {
    render(
      <ACSContextProvider {...extraProps}>
        <ImageCheckToolbar />
      </ACSContextProvider>,
    );
    await waitFor(() => {
      screen.getByTestId('image-check-toolbar');
    });
  });

  test('should render the selected filter as chip in toolbar', async () => {
    render(
      <ACSContextProvider {...extraProps}>
        <ImageCheckToolbar />
      </ACSContextProvider>,
    );

    act(() => {
      fireEvent.input(screen.queryByPlaceholderText('Filter by name...') as HTMLInputElement, {
        target: { value: 'testing-name' },
      });
    });

    await waitFor(() => {
      screen.getByText('testing-name');
    });

    act(() => {
      fireEvent.click(screen.getByText(/Clear all filters/));
    });

    await waitFor(() => {
      expect(screen.queryByText('testing-name')).not.toBeInTheDocument();
    });
  });
});
