import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockEnterpriseContractUIData } from '../../../data';
import { useToolbarContext } from '../../../Toolbar/ToolbarContext';
import { EnterpriseContractPolicy } from '../../../types';
import EnterpriseContractContextProvider, {
  useEnterpriseContractContext,
} from '../EnterpriseContractContext';

describe('EnterpriseContractContext', () => {
  const ECDataComponent = () => {
    const { filteredECResults } = useEnterpriseContractContext();

    const { state, dispatch } = useToolbarContext();
    return filteredECResults.length > 0 ? (
      <div>
        EC data loaded
        <button onClick={() => dispatch.updateNameFilter(mockEnterpriseContractUIData[0].title)}>
          Add Name filter
        </button>
        <button onClick={() => dispatch.addStatusFilter('Failed')}>Add Status filter</button>
        <button onClick={() => dispatch.addComponentFilter('test-component-filter')}>
          Add Component filter
        </button>
        <span>{state.nameFilter}</span>
        <span>{state.statusFilters.toString()}</span>
        <span>{state.componentFilters.toString()}</span>
      </div>
    ) : (
      <div>Waiting for EC</div>
    );
  };

  test('should render the children EnterpriseContractContext', async () => {
    render(
      <EnterpriseContractContextProvider
        enterpriseContractPolicies={[] as EnterpriseContractPolicy[]}
      >
        <ECDataComponent />
      </EnterpriseContractContextProvider>,
    );

    await waitFor(() => {
      screen.getByTestId('enterprise-contract');
      screen.getByText(/Waiting for EC/);
    });
  });

  test('should load the children when data is loaded', () => {
    render(
      <EnterpriseContractContextProvider enterpriseContractPolicies={mockEnterpriseContractUIData}>
        <ECDataComponent />
      </EnterpriseContractContextProvider>,
    );
    screen.getByTestId('enterprise-contract');
    screen.getByText(/EC data loaded/);
  });

  test('should re-render the children when component filter is changed', async () => {
    render(
      <EnterpriseContractContextProvider enterpriseContractPolicies={mockEnterpriseContractUIData}>
        <ECDataComponent />
      </EnterpriseContractContextProvider>,
    );

    act(() => {
      fireEvent.click(screen.getByText(/Add Component filter/));
    });

    await waitFor(() => {
      screen.getByText('test-component-filter');
    });
  });
  test('should re-render the children when nameFilter is changed', async () => {
    render(
      <EnterpriseContractContextProvider enterpriseContractPolicies={mockEnterpriseContractUIData}>
        <ECDataComponent />
      </EnterpriseContractContextProvider>,
    );

    waitFor(() => {
      screen.getByText(/Add Name filter/);
    });
    act(() => {
      fireEvent.click(screen.getByText(/Add Name filter/));
    });

    await waitFor(() => {
      screen.getByText(mockEnterpriseContractUIData[0].title);
    });
  });
  test('should re-render the children when StatusFilter is changed', async () => {
    render(
      <EnterpriseContractContextProvider enterpriseContractPolicies={mockEnterpriseContractUIData}>
        <ECDataComponent />
      </EnterpriseContractContextProvider>,
    );

    act(() => {
      fireEvent.click(screen.getByText(/Add Status filter/));
    });

    await waitFor(() => {
      screen.getByText('Failed');
    });
  });
  test('should throw error if the children component is not wrapped with ECContextProvider', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<ECDataComponent />)).toThrow(
      'useEnterpriseContractContext must be within a EnterpriseContractContextProvider',
    );
  });
});
