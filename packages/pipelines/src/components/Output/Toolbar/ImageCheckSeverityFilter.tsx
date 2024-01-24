import * as React from 'react';
import SelectFilter from './SelectFilter';
import { useToolbarContext } from './ToolbarContext';
import { ToolBarFilterId } from './types';

type SeverityFilterType = {
  keyValueObject: Record<string, number | string>;
  displayName?: string;
};

const ImageCheckSeverityFilter: React.FC<SeverityFilterType> = ({
  keyValueObject: severityFilterObj,
}) => {
  const {
    state: { acsImageCheckSeverityFilters },
    dispatch: { addImageCheckSeverityFilter, removeImageCheckSeverityFilter },
  } = useToolbarContext();

  return (
    <SelectFilter
      toggleName="Severity"
      categoryName={{
        key: ToolBarFilterId.acsImageCheckSeverity,
        name: 'Severity',
      }}
      filters={acsImageCheckSeverityFilters}
      addFilter={addImageCheckSeverityFilter}
      removeFilter={removeImageCheckSeverityFilter}
      data={severityFilterObj}
    />
  );
};
export default ImageCheckSeverityFilter;
