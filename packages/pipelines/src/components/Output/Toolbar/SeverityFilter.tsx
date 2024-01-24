import * as React from 'react';
import SelectFilter from './SelectFilter';
import { useToolbarContext } from './ToolbarContext';
import { ToolBarFilterId } from './types';

type SeverityFilterType = {
  keyValueObject: Record<string, number | string>;
  displayName?: string;
};

const SeverityFilter: React.FC<SeverityFilterType> = ({ keyValueObject: severityFilterObj }) => {
  const {
    state: { severityFilters },
    dispatch: { addSeverityFilter, removeSeverityFilter },
  } = useToolbarContext();

  return (
    <SelectFilter
      toggleName="Severity"
      categoryName={ToolBarFilterId.severity}
      filters={severityFilters}
      addFilter={addSeverityFilter}
      removeFilter={removeSeverityFilter}
      data={severityFilterObj}
    />
  );
};
export default SeverityFilter;
