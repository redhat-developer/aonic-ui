import * as React from 'react';
import { Table, Tbody, Td, Th, Thead, ThProps, Tr } from '@patternfly/react-table';
import FilteredEmptyState from '../../../Toolbar/FilteredEmptyState';
import { useToolbarContext } from '../../../Toolbar/ToolbarContext';
import { SubTab } from '../../../Toolbar/types';
import { ViolatedPolicy } from '../../../types';
import { getSortColumnFuntion } from '../../../utils/helper-utils';
import { useACSContext } from '../AdvancedClusterSecurityContext';
import { DeploymentCheckRow } from './DeploymentCheckRow';

const COLUMN_ORDER: string[] = ['', 'name', 'severity', 'failingCheck'];

const DeploymentCheckTable = () => {
  const [activeSortIndex, setActiveSortIndex] = React.useState<number>(2);
  const [activeSortDirection, setActiveSortDirection] = React.useState<'asc' | 'desc'>('asc');

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

  const { filteredacsDeploymentCheckResults } = useACSContext();
  const { onClearAllFilters } = useToolbarContext();

  const sortedAcsData = React.useMemo(
    () =>
      (filteredacsDeploymentCheckResults ?? []).sort(
        getSortColumnFuntion(COLUMN_ORDER[activeSortIndex], activeSortDirection),
      ),
    [activeSortDirection, activeSortIndex, filteredacsDeploymentCheckResults],
  );

  return (
    <Table variant="compact" data-testid="deployment-check-table">
      <Thead>
        <Tr>
          <Th width={20} sort={getSortParams(1)}>
            Name
          </Th>
          <Th width={10} sort={getSortParams(2)}>
            Severity
          </Th>
          <Th width={15} sort={getSortParams(3)}>
            Breaks build
          </Th>

          <Th width={20}>Description</Th>
          <Th width={20}>Violation</Th>
          <Th width={20}>Remediation</Th>
        </Tr>
      </Thead>
      {sortedAcsData?.length > 0 ? (
        sortedAcsData.map((violoatedPolicy: ViolatedPolicy, i: number) => {
          return <DeploymentCheckRow rowIndex={i} key={i} data={violoatedPolicy} />;
        })
      ) : (
        <Tbody>
          <Tr>
            <Td colSpan={8}>
              <FilteredEmptyState
                onClearAllFilters={() => onClearAllFilters(SubTab.deploymentCheck)}
              />
            </Td>
          </Tr>
        </Tbody>
      )}
    </Table>
  );
};
export default DeploymentCheckTable;
