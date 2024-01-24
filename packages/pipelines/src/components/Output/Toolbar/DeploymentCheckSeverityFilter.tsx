import * as React from 'react';
import SelectFilter from './SelectFilter';
import { useToolbarContext } from './ToolbarContext';
import { ToolBarFilterId } from './types';

type SeverityFilterType = {
  keyValueObject: Record<string, number | string>;
};

const DeploymentCheckSeverityFilter: React.FC<SeverityFilterType> = ({
  keyValueObject: severityFilterObj,
}) => {
  const {
    state: { acsDeploymentCheckSeverityFilters },
    dispatch: { addDeploymentCheckSeverityFilter, removeDeploymentCheckSeverityFilter },
  } = useToolbarContext();

  return (
    <SelectFilter
      toggleName="Severity"
      categoryName={{
        key: ToolBarFilterId.acsDeploymentCheckSeverity,
        name: 'Severity',
      }}
      filters={acsDeploymentCheckSeverityFilters}
      addFilter={addDeploymentCheckSeverityFilter}
      removeFilter={removeDeploymentCheckSeverityFilter}
      data={severityFilterObj}
    />
  );
};
export default DeploymentCheckSeverityFilter;
