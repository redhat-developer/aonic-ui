import * as React from 'react';
import { Toolbar, ToolbarContent, ToolbarItem } from '@patternfly/react-core';
import NameFilter from '../../Toolbar/NameFilter';
import StatusFilter from '../../Toolbar/StatusFilter';
import { useToolbarContext } from '../../Toolbar/ToolbarContext';
import { getResultsSummary } from '../../utils/ec-utils';
import { useEnterpriseContractContext } from './EnterpriseContractContext';

const EnterpriseContractToolbar: React.FC = () => {
  const { filteredECResults } = useEnterpriseContractContext();

  const {
    state: { nameFilter },
    dispatch: { updateNameFilter },
    onClearAllFilters,
  } = useToolbarContext();

  const statusFilterObj = getResultsSummary(filteredECResults);

  return (
    <Toolbar className="pf-m-toggle-group-container" clearAllFilters={onClearAllFilters}>
      <ToolbarContent>
        <ToolbarItem>
          <StatusFilter data={statusFilterObj} />
        </ToolbarItem>

        <ToolbarItem widths={{ default: '300px' }} className="pf-v5-u-ml-0">
          <NameFilter
            filter={nameFilter}
            updateFilter={updateNameFilter}
            placeholder="Search"
            ariaLabel="rule search filter"
          />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};
export default EnterpriseContractToolbar;
