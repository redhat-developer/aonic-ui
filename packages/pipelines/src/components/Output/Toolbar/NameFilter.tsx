import * as React from 'react';
import { debounce, SearchInput, ToolbarLabelGroup, ToolbarFilter } from '@patternfly/react-core';
import { useToolbarContext } from './ToolbarContext';
import { ToolBarFilterId } from './types';

const NameFilter: React.FC<{
  placeholder?: string;
  ariaLabel?: string;
  categoryName?: string | ToolbarLabelGroup;
  filter: string;
  updateFilter: (item: string) => void;
}> = ({ filter: nameFilter, updateFilter, placeholder, ariaLabel, categoryName }) => {
  const { onDeleteChip } = useToolbarContext();

  return (
    <ToolbarFilter
      labels={nameFilter?.length ? ([nameFilter] as string[]) : []}
      categoryName={categoryName || ToolBarFilterId.name}
      deleteLabel={onDeleteChip}
    >
      <SearchInput
        name={categoryName ? categoryName.toString() : 'Name'}
        data-testid="name-input-filter"
        type="search"
        aria-label={ariaLabel ? ariaLabel : 'name filter'}
        placeholder={placeholder ? placeholder : 'Filter by name...'}
        onChange={debounce((_, name: string) => updateFilter(name), 300)}
        value={nameFilter?.length > 0 ? nameFilter : undefined}
      />
    </ToolbarFilter>
  );
};
export default NameFilter;
