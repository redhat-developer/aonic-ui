import '@testing-library/jest-dom';
import { Toolbar, ToolbarContent } from '@patternfly/react-core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import NameFilter from '../NameFilter';
import ToolbarContextProvider, { useToolbarContext } from '../ToolbarContext';

describe('NameFilter', () => {
  const NameFilterComponent: React.FC<{
    placeholder?: string;
    ariaLabel?: string;
    categoryName?: string;
  }> = (props) => {
    const { state, dispatch, onClearAllFilters } = useToolbarContext();
    return (
      <Toolbar className="pf-m-toggle-group-container" clearAllFilters={() => onClearAllFilters()}>
        <ToolbarContent>
          <NameFilter
            {...props}
            filter={state.nameFilter ?? []}
            updateFilter={dispatch.updateNameFilter}
          />
        </ToolbarContent>
      </Toolbar>
    );
  };

  test('should render NameFilter', async () => {
    render(
      <ToolbarContextProvider>
        <NameFilterComponent />
      </ToolbarContextProvider>,
    );

    screen.getByTestId('name-input-filter');
  });
  test('should render NameFilter', async () => {
    render(
      <ToolbarContextProvider>
        <NameFilterComponent
          categoryName="Name"
          ariaLabel="name filter"
          placeholder="search by name"
        />
      </ToolbarContextProvider>,
    );

    fireEvent.input(screen.queryByPlaceholderText('search by name') as HTMLInputElement, {
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
