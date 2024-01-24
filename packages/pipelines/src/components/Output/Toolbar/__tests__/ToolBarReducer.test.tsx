import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  ToolBarActionKind,
  ToolBarReducer,
  ToolBarState,
  useToolBarReducer,
} from '../ToolBarReducer';
import { FilterChip } from '../types';

describe('useToolBarReducer', () => {
  const TestInputFilter: React.FC<{
    nameFilter: string;
    updateNameFilter: (payload: string) => void;
    resetNameFilter: () => void;
  }> = ({ nameFilter, updateNameFilter, resetNameFilter }) => (
    <div>
      {nameFilter.length > 0 ? <p>{nameFilter}</p> : <p>Waiting for user to type...</p>}
      <input data-testid="name-input-filter" onChange={(e) => updateNameFilter(e.target.value)} />
      <button onClick={resetNameFilter}>Reset Name</button>
    </div>
  );

  const TestSelectFilter: React.FC<{
    filters: string | FilterChip[];
    addFilters: (payload: FilterChip) => void;
    removeFilters: (payload: FilterChip) => void;
    resetFilters: () => void;
  }> = ({ filters, addFilters, removeFilters, resetFilters }) => (
    <div>
      {filters.length > 0 ? <p>{filters.toString()}</p> : <p>Waiting for user to select...</p>}
      <button onClick={() => addFilters(`filter-${String(filters.length + 1)}`)}>
        Add Filters
      </button>

      <button onClick={() => removeFilters(filters[filters.length - 1])}>Remove Filters</button>

      <button onClick={() => resetFilters()}>Reset Filters</button>
    </div>
  );

  const performNameFilterTests = async () => {
    expect(screen.getByText(/Waiting/i)).toBeInTheDocument();

    fireEvent.input(screen.queryByTestId('name-input-filter') as HTMLElement, {
      target: { value: 'testing-name' },
    });

    await waitFor(() => {
      expect(screen.queryByText(/Waiting/i)).not.toBeInTheDocument();
      expect(screen.getByText(/testing-name/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Reset Name'));

    await waitFor(() => {
      expect(screen.queryByText(/Waiting/i)).toBeInTheDocument();
    });
  };

  const performSelectFilterTests = async () => {
    expect(screen.getByText(/Waiting/i)).toBeInTheDocument();

    const addFilters = screen.getByText('Add Filters');
    const removeFilters = screen.getByText('Remove Filters');
    const resetFilters = screen.getByText('Reset Filters');

    fireEvent.click(addFilters);

    waitFor(() => {
      expect(screen.queryByText(/Waiting/i)).not.toBeInTheDocument();
      expect(screen.getByText(/filter-1/i)).toBeInTheDocument();
    });

    fireEvent.click(addFilters);

    await waitFor(() => {
      expect(screen.getByText(/filter-1,filter-2/i)).toBeInTheDocument();
    });

    fireEvent.click(removeFilters);

    await waitFor(() => {
      expect(screen.queryByText(/filter-2/i)).not.toBeInTheDocument();
    });

    fireEvent.click(resetFilters);

    await waitFor(() => {
      expect(screen.queryByText(/Waiting/i)).toBeInTheDocument();
    });
  };

  test('should show the namefilter after the user is typed', async () => {
    const NameFilter = () => {
      const [{ nameFilter }, { resetNameFilter, updateNameFilter }] = useToolBarReducer();

      return <TestInputFilter {...{ nameFilter, resetNameFilter, updateNameFilter }} />;
    };
    render(<NameFilter />);
    await performNameFilterTests();
  });

  test('should show the policyname filter after the user is typed', async () => {
    const PolicyNameFilter = () => {
      const [{ acsPolicyNameFilter }, { resetAcsPoliceNameFilter, updateAcsPoliceNameFilter }] =
        useToolBarReducer();

      return (
        <TestInputFilter
          {...{
            nameFilter: acsPolicyNameFilter,
            resetNameFilter: resetAcsPoliceNameFilter,
            updateNameFilter: updateAcsPoliceNameFilter,
          }}
        />
      );
    };
    render(<PolicyNameFilter />);
    await performNameFilterTests();
  });
  test('should show the status filters and be able to add/remove/reset filters', async () => {
    const StatusFilter = () => {
      const [{ statusFilters }, { addStatusFilter, removeStatusFilter, resetStatusFilter }] =
        useToolBarReducer();
      return (
        <TestSelectFilter
          {...{
            filters: statusFilters,
            addFilters: addStatusFilter,
            removeFilters: removeStatusFilter,
            resetFilters: resetStatusFilter,
          }}
        />
      );
    };
    render(<StatusFilter />);
    await performSelectFilterTests();
  });

  test('should show the severity filters and be able to add/remove/reset filters', async () => {
    const StatusFilter = () => {
      const [
        { severityFilters },
        { addSeverityFilter, removeSeverityFilter, resetSeverityFilter },
      ] = useToolBarReducer();
      return (
        <TestSelectFilter
          {...{
            filters: severityFilters,
            addFilters: addSeverityFilter,
            removeFilters: removeSeverityFilter,
            resetFilters: resetSeverityFilter,
          }}
        />
      );
    };
    render(<StatusFilter />);
    await performSelectFilterTests();
  });

  test('should show the component filters and be able to add/remove/reset filters', async () => {
    const StatusFilter = () => {
      const [
        { componentFilters },
        { addComponentFilter, removeComponentFilter, resetComponentFilter },
      ] = useToolBarReducer();
      return (
        <TestSelectFilter
          {...{
            filters: componentFilters,
            addFilters: addComponentFilter,
            removeFilters: removeComponentFilter,
            resetFilters: resetComponentFilter,
          }}
        />
      );
    };
    render(<StatusFilter />);
    await performSelectFilterTests();
  });

  test('should show the cveId filters and be able to add/remove/reset filters', async () => {
    const StatusFilter = () => {
      const [{ cveIdFilters }, { addCveIdFilter, removeCveIdFilter, resetCveIdFilter }] =
        useToolBarReducer();
      return (
        <TestSelectFilter
          {...{
            filters: cveIdFilters,
            addFilters: addCveIdFilter,
            removeFilters: removeCveIdFilter,
            resetFilters: resetCveIdFilter,
          }}
        />
      );
    };
    render(<StatusFilter />);
    await performSelectFilterTests();
  });

  test('should show the acsImageCheckSeverityFilters filters and be able to add/remove/reset filters', async () => {
    const StatusFilter = () => {
      const [
        { acsImageCheckSeverityFilters },
        {
          addImageCheckSeverityFilter,
          removeImageCheckSeverityFilter,
          resetImageCheckSeverityFilter,
        },
      ] = useToolBarReducer();
      return (
        <TestSelectFilter
          {...{
            filters: acsImageCheckSeverityFilters,
            addFilters: addImageCheckSeverityFilter,
            removeFilters: removeImageCheckSeverityFilter,
            resetFilters: resetImageCheckSeverityFilter,
          }}
        />
      );
    };
    render(<StatusFilter />);
    await performSelectFilterTests();
  });

  test('should show the acsDeploymentCheckSeverityFilters filters and be able to add/remove/reset filters', async () => {
    const StatusFilter = () => {
      const [
        { acsDeploymentCheckSeverityFilters },
        {
          addDeploymentCheckSeverityFilter,
          removeDeploymentCheckSeverityFilter,
          resetDeploymentCheckSeverityFilter,
        },
      ] = useToolBarReducer();
      return (
        <TestSelectFilter
          {...{
            filters: acsDeploymentCheckSeverityFilters,
            addFilters: addDeploymentCheckSeverityFilter,
            removeFilters: removeDeploymentCheckSeverityFilter,
            resetFilters: resetDeploymentCheckSeverityFilter,
          }}
        />
      );
    };
    render(<StatusFilter />);
    await performSelectFilterTests();
  });
  test('should reset all the filters', async () => {
    const StatusFilter = () => {
      const [
        { nameFilter, acsDeploymentCheckSeverityFilters },
        {
          updateNameFilter,
          resetNameFilter,
          addDeploymentCheckSeverityFilter,
          removeDeploymentCheckSeverityFilter,
          resetDeploymentCheckSeverityFilter,
          resetAllFilters,
        },
      ] = useToolBarReducer();
      return (
        <>
          <TestInputFilter {...{ nameFilter, resetNameFilter, updateNameFilter }} />
          <TestSelectFilter
            {...{
              filters: acsDeploymentCheckSeverityFilters,
              addFilters: addDeploymentCheckSeverityFilter,
              removeFilters: removeDeploymentCheckSeverityFilter,
              resetFilters: resetDeploymentCheckSeverityFilter,
            }}
          />
          <button onClick={resetAllFilters}>Reset all</button>
        </>
      );
    };
    render(<StatusFilter />);

    expect(screen.queryAllByText(/Waiting/i)).toHaveLength(2);

    const addFilters = screen.getByText('Add Filters');
    fireEvent.click(addFilters);

    waitFor(() => {
      expect(screen.getByText(/filter-1/i)).toBeInTheDocument();
    });

    fireEvent.click(addFilters);

    await waitFor(() => {
      expect(screen.getByText(/filter-1,filter-2/i)).toBeInTheDocument();
    });

    fireEvent.input(screen.queryByTestId('name-input-filter') as HTMLElement, {
      target: { value: 'testing-name' },
    });

    await waitFor(() => {
      expect(screen.getByText(/testing-name/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Reset all'));

    await waitFor(() => {
      expect(screen.queryAllByText(/Waiting/i)).toHaveLength(2);
    });
  });
});

describe('ToolBarReducer', () => {
  const initialState: ToolBarState = {
    nameFilter: '',
    statusFilters: [],
    severityFilters: [],
    componentFilters: [],
    cveIdFilters: [],
    acsPolicyNameFilter: '',
    acsImageCheckSeverityFilters: [],
    acsDeploymentCheckSeverityFilters: [],
  };
  test('should return correct state', () => {
    const { componentFilters } = ToolBarReducer(initialState, {
      type: ToolBarActionKind.addComponentFilter,
      payload: 'test-filter',
    });

    expect(componentFilters).toEqual(['test-filter']);

    const { componentFilters: cFilters } = ToolBarReducer(initialState, {
      type: ToolBarActionKind.removeComponentFilter,
      payload: 'test-filter',
    });

    expect(cFilters).toEqual([]);
  });

  test('should return default state for noop action', () => {
    const { componentFilters } = ToolBarReducer(initialState, {
      type: 'invalid' as ToolBarActionKind,
      payload: 'test-filter',
    });

    expect(componentFilters).toEqual([]);
  });
});
