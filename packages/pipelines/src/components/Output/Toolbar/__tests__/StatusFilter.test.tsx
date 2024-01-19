import '@testing-library/jest-dom';
import { Toolbar, ToolbarContent } from '@patternfly/react-core';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import StatusFilter, { StatusFilterType } from '../StatusFilter';
import ToolbarContextProvider, { useToolbarContext } from '../ToolbarContext';

describe('StatusFilter', () => {
  const StatusFilterComponent: React.FC<StatusFilterType> = (props) => {
    const { onClearAllFilters } = useToolbarContext();
    return (
      <Toolbar className="pf-m-toggle-group-container" clearAllFilters={() => onClearAllFilters()}>
        <ToolbarContent>
          <StatusFilter toggleName="Filter by status" {...props} />
        </ToolbarContent>
      </Toolbar>
    );
  };

  const toggleCheckBoxByValue = (text: string) => {
    act(() => {
      fireEvent.click(screen.getByText(/Filter by status/));
    });

    waitFor(() => {
      screen.getByText(text);
    });

    act(() => {
      fireEvent.click(screen.getByText(text));
      fireEvent.click(screen.getByText(/Filter by status/));
    });
  };

  test('should render StatusFilter', async () => {
    render(
      <ToolbarContextProvider>
        <StatusFilterComponent toggleName={''} data={{ key1: 'value1', key2: 'value2' }} />
      </ToolbarContextProvider>,
    );

    screen.getByTestId('status-filter-menu');
  });

  test('should be able to select and clear the filters', async () => {
    render(
      <ToolbarContextProvider>
        <StatusFilterComponent data={{ key1: 'value1', key2: 'value2' }} />
      </ToolbarContextProvider>,
    );

    toggleCheckBoxByValue('value2');

    await waitFor(() => {
      screen.getByText('Clear all filters');
    });

    act(() => {
      fireEvent.click(screen.getByText('Clear all filters'));
    });

    waitFor(() => {
      expect(screen.queryByText('value2')).not.toBeInTheDocument();
      expect(screen.queryByText(/Filter by status/)).toBeInTheDocument();
    });
  });

  test('should be able to select and unselect the filters', async () => {
    render(
      <ToolbarContextProvider>
        <StatusFilterComponent data={{ key1: 'value1', key2: 'value2' }} />
      </ToolbarContextProvider>,
    );

    toggleCheckBoxByValue('value2');

    await waitFor(() => {
      expect(screen.queryByText('value2')).not.toBeInTheDocument();
      expect(screen.queryByText('Clear all filters')).toBeInTheDocument();
    });

    await toggleCheckBoxByValue('value2');

    waitFor(() => {
      expect(screen.queryByText('value2')).not.toBeInTheDocument();
      expect(screen.queryByText('Clear all filters')).not.toBeInTheDocument();

      expect(screen.queryByText(/Filter by status/)).toBeInTheDocument();
    });
  });

  test('should be able to select and clear the chip group', async () => {
    render(
      <ToolbarContextProvider>
        <StatusFilterComponent data={{ key1: 'value1', key2: 'value2' }} />
      </ToolbarContextProvider>,
    );

    act(() => {
      fireEvent.click(screen.getByText(/Filter by status/));
    });

    waitFor(() => {
      screen.getByText('key2');
    });

    act(() => {
      fireEvent.click(screen.getByText(/key2/));
    });

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'close key2' }));
    });

    waitFor(() => {
      expect(screen.queryByText('component-2')).not.toBeInTheDocument();
      expect(screen.queryByText(/Filter by status/)).toBeInTheDocument();
    });
  });
});
