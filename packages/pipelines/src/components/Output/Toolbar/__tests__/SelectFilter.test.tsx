import '@testing-library/jest-dom';
import { Toolbar, ToolbarContent } from '@patternfly/react-core';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import SelectFilter, { SelectFilterType } from '../SelectFilter';
import ToolbarContextProvider, { useToolbarContext } from '../ToolbarContext';
import { ToolBarFilterId } from '../types';

describe('SelectFilter', () => {
  const SelectFilterComponent: React.FC<Pick<SelectFilterType, 'data' | 'categoryName'>> = (
    props,
  ) => {
    const { state, dispatch, onClearAllFilters } = useToolbarContext();
    return (
      <Toolbar className="pf-m-toggle-group-container" clearAllFilters={() => onClearAllFilters()}>
        <ToolbarContent>
          <SelectFilter
            {...props}
            filters={state.severityFilters}
            addFilter={dispatch.addSeverityFilter}
            removeFilter={dispatch.removeSeverityFilter}
            toggleName="Filter by severity"
            data={props.data}
          />
        </ToolbarContent>
      </Toolbar>
    );
  };

  const toggleSeverityCheckbox = async () => {
    act(() => {
      fireEvent.click(screen.getByText(/Filter by severity/));
    });

    await waitFor(() => {
      screen.getByText('value2');
    });

    act(() => {
      fireEvent.click(screen.getByText(/value2/));
    });
  };

  test('should render selectFilter', async () => {
    render(
      <ToolbarContextProvider>
        <SelectFilterComponent
          categoryName={ToolBarFilterId.severity}
          data={{ key: 'value1', key1: 'value2' }}
        />
      </ToolbarContextProvider>,
    );

    screen.getByTestId('severity-filter-menu');
  });

  test('should render selectFilter with categoryObject', async () => {
    render(
      <ToolbarContextProvider>
        <SelectFilterComponent
          categoryName={{ key: 'category-name', name: 'Severity' }}
          data={{ key: 'value1', key1: 'value2' }}
        />
      </ToolbarContextProvider>,
    );

    screen.getByTestId('severity-filter-menu');
  });

  test('should be able to select and unselect the filters', async () => {
    render(
      <ToolbarContextProvider>
        <SelectFilterComponent
          categoryName={ToolBarFilterId.severity}
          data={{ key: 'value1', key1: 'value2' }}
        />
      </ToolbarContextProvider>,
    );

    toggleSeverityCheckbox();

    waitFor(() => {
      expect(screen.queryByText('value2')).not.toBeInTheDocument();
    });

    toggleSeverityCheckbox();

    waitFor(() => {
      expect(screen.queryByText('value2')).not.toBeInTheDocument();
      expect(screen.queryByText(/Filter by severity/)).toBeInTheDocument();
    });
  });
  test('should be able to select and clear the filters', async () => {
    render(
      <ToolbarContextProvider>
        <SelectFilterComponent
          categoryName={ToolBarFilterId.severity}
          data={{ key: 'value1', key1: 'value2' }}
        />
      </ToolbarContextProvider>,
    );

    act(() => {
      fireEvent.click(screen.getByText(/Filter by severity/));
    });

    await waitFor(() => {
      screen.getByText('value2');
    });

    act(() => {
      fireEvent.click(screen.getByText(/value2/));
    });

    await waitFor(() => {
      screen.getByText('Clear all filters');
    });

    act(() => {
      fireEvent.click(screen.getByText('Clear all filters'));
    });

    waitFor(() => {
      expect(screen.queryByText('value2')).not.toBeInTheDocument();
      expect(screen.queryByText(/Filter by severity/)).toBeInTheDocument();
    });
  });
});
