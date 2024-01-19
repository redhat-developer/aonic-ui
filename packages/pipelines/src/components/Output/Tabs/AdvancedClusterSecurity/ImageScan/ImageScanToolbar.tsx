import * as React from 'react';
import { Toolbar, ToolbarContent, ToolbarItem } from '@patternfly/react-core';
import ComponentFilter from '../../../Toolbar/ComponentFilter';
import CVEIDFilter from '../../../Toolbar/CveIdFilter';
import SeverityFilter from '../../../Toolbar/SeverityFilter';
import StatusFilter from '../../../Toolbar/StatusFilter';
import { useToolbarContext } from '../../../Toolbar/ToolbarContext';
import { SubTab } from '../../../Toolbar/types';
import {
  getCVEIdCount,
  getCVESeverity,
  getFixableCveByStatus,
} from '../../../utils/acs-image-scan-utils';
import { useACSContext } from '../AdvancedClusterSecurityContext';

const ImageScanToolbar: React.FC = () => {
  const { acsImageScanResult: acsImageScanResult, filteredacsImageScanResultByComponents } =
    useACSContext();

  const { onClearAllFilters } = useToolbarContext();
  const statusFilterObj = getFixableCveByStatus(filteredacsImageScanResultByComponents);
  const severityObj = getCVESeverity(acsImageScanResult);
  const cveIdObj = getCVEIdCount(acsImageScanResult);
  return (
    <Toolbar
      className="pf-m-toggle-group-container"
      clearAllFilters={() => onClearAllFilters(SubTab.imageScan)}
      data-testid="image-scan-toolbar"
    >
      <ToolbarContent>
        <ToolbarItem className="pf-v5-u-ml-0">
          <CVEIDFilter data={cveIdObj} />
        </ToolbarItem>
        <ToolbarItem>
          <ComponentFilter
            data={acsImageScanResult?.result?.vulnerabilities || []}
            path="componentName"
          />
        </ToolbarItem>
        <ToolbarItem>
          <StatusFilter data={statusFilterObj} toggleName="Status" />
        </ToolbarItem>
        <ToolbarItem>
          <SeverityFilter keyValueObject={severityObj} />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};
export default ImageScanToolbar;
