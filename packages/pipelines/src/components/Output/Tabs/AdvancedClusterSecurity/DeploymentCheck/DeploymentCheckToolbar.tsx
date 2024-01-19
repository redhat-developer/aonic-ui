import * as React from 'react';
import { Toolbar, ToolbarContent, ToolbarItem } from '@patternfly/react-core';
import DeploymentCheckSeverityFilter from '../../../Toolbar/DeploymentCheckSeverityFilter';
import NameFilter from '../../../Toolbar/NameFilter';
import { useToolbarContext } from '../../../Toolbar/ToolbarContext';
import { SubTab, ToolBarFilterId } from '../../../Toolbar/types';
import { getCheckSeverity } from '../../../utils/acs-image-check-utils';
import { useACSContext } from '../AdvancedClusterSecurityContext';

const DeploymentCheckToolbar: React.FC = () => {
  const { acsDeploymentCheckResults } = useACSContext();

  const {
    state: { acsPolicyNameFilter },
    dispatch: { updateAcsPoliceNameFilter },
    onClearAllFilters,
  } = useToolbarContext();

  const severityObj = getCheckSeverity(acsDeploymentCheckResults);

  return (
    <Toolbar
      className="pf-m-toggle-group-container"
      clearAllFilters={() => onClearAllFilters(SubTab.deploymentCheck)}
      data-testid="deployment-check-toolbar"
    >
      <ToolbarContent>
        <ToolbarItem>
          <DeploymentCheckSeverityFilter keyValueObject={severityObj} />
        </ToolbarItem>
        <ToolbarItem>
          <NameFilter
            categoryName={{
              key: ToolBarFilterId.acsDeploymentCheckPolicyName,
              name: 'Name',
            }}
            filter={acsPolicyNameFilter}
            updateFilter={updateAcsPoliceNameFilter}
          />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};
export default DeploymentCheckToolbar;
