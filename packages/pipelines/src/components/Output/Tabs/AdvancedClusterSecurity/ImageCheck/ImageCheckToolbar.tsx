import * as React from 'react';
import { Toolbar, ToolbarContent, ToolbarItem } from '@patternfly/react-core';
import ImageCheckSeverityFilter from '../../../Toolbar/ImageCheckSeverityFilter';
import NameFilter from '../../../Toolbar/NameFilter';
import StatusFilter from '../../../Toolbar/StatusFilter';
import { useToolbarContext } from '../../../Toolbar/ToolbarContext';
import { SubTab } from '../../../Toolbar/types';
import { getCheckSeverity } from '../../../utils/acs-image-check-utils';
import { getFixableCveByStatus } from '../../../utils/acs-image-scan-utils';
import { useACSContext } from '../AdvancedClusterSecurityContext';

const ImageCheckToolbar: React.FC = () => {
  const { acsImageCheckResults, filteredacsImageScanResultByComponents } = useACSContext();

  const {
    state: { nameFilter },
    dispatch: { updateNameFilter },
  } = useToolbarContext();

  const { onClearAllFilters } = useToolbarContext();
  const statusFilterObj = getFixableCveByStatus(filteredacsImageScanResultByComponents);
  const severityObj = getCheckSeverity(acsImageCheckResults);

  return (
    <Toolbar
      style={{ marginTop: "var(--pf-t--global--spacer--sm)" }}
      className="pf-m-toggle-group-container"
      clearAllFilters={() => onClearAllFilters(SubTab.imageCheck)}
      data-testid="image-check-toolbar"
    >
      <ToolbarContent>
        <ToolbarItem>
          <StatusFilter data={statusFilterObj} toggleName="Status" />
        </ToolbarItem>
        <ToolbarItem>
          <ImageCheckSeverityFilter keyValueObject={severityObj} />
        </ToolbarItem>
        <ToolbarItem>
          <NameFilter filter={nameFilter} updateFilter={updateNameFilter} />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};
export default ImageCheckToolbar;
