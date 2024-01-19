import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { mockEnterpriseContractUIData } from '../../../data';
import EnterpriseContractContextProvider from '../EnterpriseContractContext';
import { EnterpriseContractTable } from '../EnterpriseContractTable';

describe('EnterpriseContractTable', () => {
  test('should render the empty state', () => {
    render(
      <EnterpriseContractContextProvider enterpriseContractPolicies={[]}>
        <EnterpriseContractTable />
      </EnterpriseContractContextProvider>,
    );

    waitFor(() => {
      screen.getByTestId('ec-policy-table');
      screen.getByTestId('table-empty-state');
    });
  });

  test('should render the EnterpriseContractTable', async () => {
    render(
      <EnterpriseContractContextProvider enterpriseContractPolicies={mockEnterpriseContractUIData}>
        <EnterpriseContractTable />
      </EnterpriseContractContextProvider>,
    );

    screen.getByTestId('ec-policy-table');
  });

  test('should sort the table by status', async () => {
    render(
      <EnterpriseContractContextProvider
        enterpriseContractPolicies={[
          mockEnterpriseContractUIData[0],
          mockEnterpriseContractUIData[1],
        ]}
      >
        <EnterpriseContractTable />
      </EnterpriseContractContextProvider>,
    );

    act(() => {
      fireEvent.click(screen.getByText(/Status/));
    });

    await waitFor(() => {
      within(screen.getByTestId('ec-row-0')).getByTestId('success-icon');
    });

    act(() => {
      fireEvent.click(screen.getByText(/Status/));
    });

    await waitFor(() => {
      within(screen.getByTestId('ec-row-0')).getByTestId('failed-icon');
    });
  });
});
