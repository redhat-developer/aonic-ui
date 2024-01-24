import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { mockEnterpriseContractUIData } from '../../../data';
import EnterpriseContract from '../EnterpriseContract';

describe('Enterprise Contract', () => {
  test('should render empty state table if Enterprise contract data is not available', async () => {
    render(<EnterpriseContract enterpriseContractPolicies={[]} />);
    const enterpriseContractCard = screen.queryByTestId('enterprise-contract');
    expect(enterpriseContractCard).toBeInTheDocument();
    expect(
      within(enterpriseContractCard as HTMLElement).queryByTestId('table-empty-state'),
    ).toBeInTheDocument();
  });

  test('should render table with data if Enterprise contract data is available', async () => {
    render(<EnterpriseContract enterpriseContractPolicies={mockEnterpriseContractUIData} />);
    const enterpriseContractCard = screen.queryByTestId('enterprise-contract');

    expect(enterpriseContractCard).toBeInTheDocument();
    expect(
      within(enterpriseContractCard as HTMLElement).queryByTestId('table-empty-state'),
    ).not.toBeInTheDocument();

    expect(screen.queryAllByTestId('row')).toHaveLength(10);
  });

  test('should filter the EC policy table by status', async () => {
    render(<EnterpriseContract enterpriseContractPolicies={mockEnterpriseContractUIData} />);

    act(() => {
      fireEvent.click(screen.queryByTestId('status-filter-menu') as HTMLElement);
    });

    act(() => {
      fireEvent.click(within(screen.getByTestId('status-filter-Success')).getByRole('checkbox'));
    });

    await waitFor(() => {
      expect(screen.queryAllByTestId('row')).toHaveLength(8);
    });
  });
});
