import * as React from 'react';
import { Table, Tbody, Td, Th, Thead, ThProps, Tr } from '@patternfly/react-table';
import FilteredEmptyState from '../../../Toolbar/FilteredEmptyState';
import { useToolbarContext } from '../../../Toolbar/ToolbarContext';
import { SubTab } from '../../../Toolbar/types';
import { Vulnerability } from '../../../types';
import { getSortColumnFuntion } from '../../../utils/helper-utils';
import { useACSContext } from '../AdvancedClusterSecurityContext';
import { ImageScanRow } from './ImageScanRow';

const COLUMN_ORDER: string[] = ['', 'cveId', 'cveSeverity', 'componentName'];

const ImageScanTable = () => {
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

  const { filteredacsImageScanResult } = useACSContext();
  const { onClearAllFilters } = useToolbarContext();

  const sortedAcsData = React.useMemo(() => {
    return filteredacsImageScanResult.sort(
      getSortColumnFuntion(COLUMN_ORDER[activeSortIndex], activeSortDirection),
    );
  }, [activeSortDirection, activeSortIndex, filteredacsImageScanResult]);

  return (
    <Table variant="compact" data-testid="image-scan-table">
      <Thead>
        <Tr>
          <Th width={20} sort={getSortParams(1)}>
            CVE ID
          </Th>
          <Th width={20} sort={getSortParams(2)}>
            Severity
          </Th>
          <Th width={20} sort={getSortParams(3)}>
            Component
          </Th>
          <Th width={20}>Component version</Th>
          <Th width={20}>Fixed in version</Th>
        </Tr>
      </Thead>
      {sortedAcsData?.length > 0 ? (
        sortedAcsData.map((vulnerability: Vulnerability, i: number) => (
          <ImageScanRow rowIndex={i} key={i} data={vulnerability} />
        ))
      ) : (
        <Tbody>
          <Tr>
            <Td colSpan={8}>
              <FilteredEmptyState onClearAllFilters={() => onClearAllFilters(SubTab.imageScan)} />
            </Td>
          </Tr>
        </Tbody>
      )}
    </Table>
  );
};
export default ImageScanTable;
