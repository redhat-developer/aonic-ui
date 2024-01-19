import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import ToolbarContextProvider, { useToolbarContext } from '../ToolbarContext';
import { SubTab, ToolBarFilterId } from '../types';

describe('ToolbarContext', () => {
  const ToolBar = () => {
    const {
      state: { nameFilter },
      dispatch: { updateNameFilter },
      onClearAllFilters,
      onDeleteChip,
    } = useToolbarContext();

    return (
      <>
        <input
          data-testid="name-input-filter"
          value={nameFilter}
          onChange={(e) => {
            updateNameFilter(e.target.value);
          }}
        />
        <div data-testid="nameFilter">{nameFilter}</div>

        <button
          data-testid="remove-all-chips"
          onClick={() => {
            Object.values(ToolBarFilterId).map((id) => onDeleteChip(id, ''));
            onDeleteChip('reset', '');
          }}
        >
          Remove chip
        </button>

        <button
          data-testid="reset-all-filters"
          onClick={() => {
            onClearAllFilters(SubTab.imageScan);
            onClearAllFilters(SubTab.imageCheck);
            onClearAllFilters(SubTab.deploymentCheck);
            onClearAllFilters();
          }}
        >
          Reset Filters
        </button>
      </>
    );
  };
  const ToolBarComponent = () => (
    <ToolbarContextProvider>
      <ToolBar />
    </ToolbarContextProvider>
  );

  test('should throw error if the component is not wrapped by ToolbarContextProvider', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<ToolBar />)).toThrow(
      'useToolbarContext must be within a ToolbarContextProvider',
    );
  });

  test('should be able to access the toolbar state and dispatch methods', async () => {
    render(<ToolBarComponent />);

    act(() => {
      fireEvent.input(screen.queryByTestId('name-input-filter') as HTMLInputElement, {
        target: { value: 'Testing toolbar state' },
      });
    });

    await waitFor(() => {
      expect(
        within(screen.queryByTestId('nameFilter') as HTMLDivElement).queryByText(
          'Testing toolbar state',
        ),
      ).toBeInTheDocument();
    });
  });

  test('should be able to reset/update all the values', async () => {
    render(<ToolBarComponent />);

    act(() => {
      fireEvent.input(screen.queryByTestId('name-input-filter') as HTMLInputElement, {
        target: { value: 'Testing toolbar state' },
      });
    });
    const nameFilterElement = screen.queryByTestId('nameFilter') as HTMLDivElement;
    await waitFor(() => {
      expect(within(nameFilterElement).queryByText('Testing toolbar state')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.queryByTestId('reset-all-filters') as HTMLButtonElement);
    });
    await waitFor(() => {
      expect(
        within(nameFilterElement).queryByText('Testing toolbar state'),
      ).not.toBeInTheDocument();
    });
  });

  test('should be able to delete single value', async () => {
    render(<ToolBarComponent />);

    act(() => {
      fireEvent.input(screen.queryByTestId('name-input-filter') as HTMLInputElement, {
        target: { value: 'Testing toolbar state' },
      });
    });
    const nameFilterElement = screen.queryByTestId('nameFilter') as HTMLDivElement;
    await waitFor(() => {
      expect(within(nameFilterElement).queryByText('Testing toolbar state')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.queryByTestId('remove-all-chips') as HTMLButtonElement);
    });
    await waitFor(() => {
      expect(
        within(nameFilterElement).queryByText('Testing toolbar state'),
      ).not.toBeInTheDocument();
    });
  });
});
