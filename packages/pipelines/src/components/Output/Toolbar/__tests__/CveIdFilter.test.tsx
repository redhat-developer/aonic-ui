import '@testing-library/jest-dom';
import { Toolbar, ToolbarContent } from '@patternfly/react-core';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import CveIdFilter, { CveIdFilterType } from '../CveIdFilter';
import ToolbarContextProvider, { useToolbarContext } from '../ToolbarContext';

describe('CveIdFilter', () => {
  const CveIdFilterComponent: React.FC<CveIdFilterType> = (props) => {
    const { onClearAllFilters } = useToolbarContext();
    return (
      <Toolbar className="pf-m-toggle-group-container" clearAllFilters={() => onClearAllFilters()}>
        <ToolbarContent>
          <CveIdFilter {...props} />
        </ToolbarContent>
      </Toolbar>
    );
  };

  const toggleCheckboxByValue = async (text: string) => {
    act(() => {
      fireEvent.click(within(screen.getByTestId('cve-filter-menu')).getByText(/CVE ID/));
    });

    await waitFor(() => {
      screen.getByText(text);
    });

    act(() => {
      fireEvent.click(screen.getByText(text));
      fireEvent.click(within(screen.getByTestId('cve-filter-menu')).getByText(/CVE ID/));
    });

    await waitFor(() => {
      expect(screen.queryByText(text)).not.toBeInTheDocument();
    });
  };
  test('should render CveIdFilter', async () => {
    render(
      <ToolbarContextProvider>
        <CveIdFilterComponent data={{}} />
      </ToolbarContextProvider>,
    );

    screen.getByTestId('cve-filter-menu');
  });

  test('should be able to select and clear the filters', async () => {
    render(
      <ToolbarContextProvider>
        <CveIdFilterComponent data={{ key1: 'option-1', key2: 'option-2', key3: 'option-3' }} />
      </ToolbarContextProvider>,
    );

    act(() => {
      fireEvent.click(screen.getByText(/CVE ID/));
    });

    waitFor(() => {
      screen.getByText('option-3');
    });

    act(() => {
      fireEvent.click(screen.getByText(/option-3/));
    });

    waitFor(() => {
      screen.getByText('Clear all filters');
    });

    act(() => {
      fireEvent.click(screen.getByText('Clear all filters'));
    });

    waitFor(() => {
      expect(screen.queryByText('option-3')).not.toBeInTheDocument();
      expect(screen.queryByText(/CVE ID/)).toBeInTheDocument();
    });
  });

  test('should be able to select and unselect the filters', async () => {
    render(
      <ToolbarContextProvider>
        <CveIdFilterComponent data={{ id1: 'count-1', id2: 'count-2', id3: 'count-3' }} />
      </ToolbarContextProvider>,
    );

    toggleCheckboxByValue('count-2');

    await waitFor(() => {
      expect(
        within(screen.queryByTestId('cve-filter-menu') as HTMLButtonElement).queryByText('count-2'),
      ).not.toBeInTheDocument();
      expect(screen.queryByText('Clear all filters')).toBeInTheDocument();
    });

    await toggleCheckboxByValue('count-2');

    waitFor(() => {
      expect(screen.queryByText('count-2')).not.toBeInTheDocument();
      expect(screen.queryByText(/CVE ID/)).toBeInTheDocument();
    });
  });
  test('should be able to select and clear the chip group', async () => {
    render(
      <ToolbarContextProvider>
        <CveIdFilterComponent data={{ id1: 'count-1', id2: 'count-2', id3: 'count-3' }} />
      </ToolbarContextProvider>,
    );

    await toggleCheckboxByValue('count-2');

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Close id2' }));
    });

    waitFor(() => {
      expect(screen.queryByText('count-2')).not.toBeInTheDocument();
      expect(screen.queryByText(/CVE ID/)).toBeInTheDocument();
    });
  });
});
