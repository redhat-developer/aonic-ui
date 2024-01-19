import '@testing-library/jest-dom';
import { Toolbar, ToolbarContent } from '@patternfly/react-core';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import ComponentFilter, { ComponentFilterProps } from '../ComponentFilter';
import ToolbarContextProvider, { useToolbarContext } from '../ToolbarContext';

describe('ComponentFilter', () => {
  const ComponentFilterComponent: React.FC<ComponentFilterProps<Record<string, string>, string>> = (
    props,
  ) => {
    const { onClearAllFilters } = useToolbarContext();
    return (
      <Toolbar className="pf-m-toggle-group-container" clearAllFilters={() => onClearAllFilters()}>
        <ToolbarContent>
          <ComponentFilter {...props} />
        </ToolbarContent>
      </Toolbar>
    );
  };

  const toggleCheckBoxByValue = (text: string) => {
    act(() => {
      fireEvent.click(screen.getByText(/Filter by components/));
    });

    waitFor(() => {
      screen.getByRole('checkbox', { name: text });
    });

    act(() => {
      fireEvent.click(screen.getByRole('checkbox', { name: text }));
    });
  };

  test('should render ComponentFilter', async () => {
    render(
      <ToolbarContextProvider>
        <ComponentFilterComponent path="key" data={[]} />
      </ToolbarContextProvider>,
    );

    screen.getByTestId('component-filter-menu');
  });

  test('should be able to select and clear the filters', async () => {
    render(
      <ToolbarContextProvider>
        <ComponentFilterComponent
          path="key"
          data={[{ key: 'option-1' }, { key: 'option-2' }, { key: 'option-3' }]}
        />
      </ToolbarContextProvider>,
    );

    toggleCheckBoxByValue('option-3');

    waitFor(() => {
      screen.getByText('Clear all filters');
    });

    act(() => {
      fireEvent.click(screen.getByText('Clear all filters'));
    });

    waitFor(() => {
      expect(screen.queryByText('option-3')).not.toBeInTheDocument();
      expect(screen.queryByText(/Filter by components/)).toBeInTheDocument();
    });
  });

  test('should be able to select and unselect the filters', async () => {
    render(
      <ToolbarContextProvider>
        <ComponentFilterComponent
          path="key"
          data={[{ key: 'option-1' }, { key: 'option-2' }, { key: 'option-3' }]}
        />
      </ToolbarContextProvider>,
    );

    toggleCheckBoxByValue('option-3');

    await waitFor(() => {
      expect(screen.queryAllByText('option-3')).toHaveLength(2);
      expect(screen.queryByText('Clear all filters')).toBeInTheDocument();
    });

    toggleCheckBoxByValue('option-3');

    await waitFor(() => {
      expect(screen.queryByText('option-3')).not.toBeInTheDocument();
      expect(screen.queryByText('Clear all filters')).not.toBeInTheDocument();
      expect(screen.queryByText(/Filter by components/)).toBeInTheDocument();
    });
  });

  test('should be able to select and clear the chip group', async () => {
    render(
      <ToolbarContextProvider>
        <ComponentFilterComponent
          path="key"
          data={[{ key: 'component-1' }, { key: 'component-1' }, { key: 'component-2' }]}
        />
      </ToolbarContextProvider>,
    );

    toggleCheckBoxByValue('component-2');

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Close chip group Component' }));
    });

    waitFor(() => {
      expect(screen.queryByText('component-2')).not.toBeInTheDocument();
      expect(screen.queryByText(/Filter by components/)).toBeInTheDocument();
    });
  });
});
