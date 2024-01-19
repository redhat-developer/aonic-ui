import * as React from 'react';
import { Table, Tbody, Td, Th, Thead, ThProps, Tr } from '@patternfly/react-table';
import FilteredEmptyState from '../../Toolbar/FilteredEmptyState';
import { useToolbarContext } from '../../Toolbar/ToolbarContext';
import { EnterpriseContractPolicy } from '../../types';
import { getSortColumnFuntion } from '../../utils/helper-utils';
import { useEnterpriseContractContext } from './EnterpriseContractContext';
import { EnterpriseContractRow } from './EnterpriseContractRow';

const COLUMN_ORDER: string[] = ['', 'title', 'status', 'msg'];

export const EnterpriseContractTable: React.FC = () => {
  const [activeSortIndex, setActiveSortIndex] = React.useState<number>(2);
  const [activeSortDirection, setActiveSortDirection] = React.useState<'asc' | 'desc'>('asc');
  const { filteredECResults } = useEnterpriseContractContext();
  const { onClearAllFilters } = useToolbarContext();
  const sortedECResult = React.useMemo(() => {
    return filteredECResults?.sort(
      getSortColumnFuntion(COLUMN_ORDER[activeSortIndex], activeSortDirection),
    );
  }, [activeSortDirection, activeSortIndex, filteredECResults]);

  const getSortParams = (columnIndex: number): ThProps['sort'] => ({
    sortBy: {
      index: activeSortIndex,
      direction: activeSortDirection,
    },
    onSort: (_event, index, direction) => {
      setActiveSortIndex(index);
      setActiveSortDirection(direction);
    },
    columnIndex,
  });

  return (
    <Table variant="compact" data-testid="ec-policy-table">
      <Thead>
        <Tr>
          <Th width={10} />
          <Th width={30} sort={getSortParams(1)}>
            Rules
          </Th>
          <Th width={10} sort={getSortParams(2)}>
            Status
          </Th>
          <Th width={30}>Message</Th>
        </Tr>
      </Thead>
      {sortedECResult?.length > 0 ? (
        sortedECResult?.map((rule: EnterpriseContractPolicy, i: number) => (
          <EnterpriseContractRow rowIndex={i} key={i} data={rule} />
        ))
      ) : (
        <Tbody>
          <Tr>
            <Td colSpan={8}>
              <FilteredEmptyState onClearAllFilters={onClearAllFilters} />
            </Td>
          </Tr>
        </Tbody>
      )}
    </Table>
  );
};
