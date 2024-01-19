import * as React from 'react';
import {
  Badge,
  Flex,
  FlexItem,
  MenuToggle,
  MenuToggleElement,
  Select,
  SelectList,
  SelectOption,
  ToolbarChipGroup,
  ToolbarFilter,
} from '@patternfly/react-core';
import { useToolbarContext } from './ToolbarContext';
import { FilterChip } from './types';

export type SelectFilterType = {
  toggleName: string;
  categoryName: string | ToolbarChipGroup; // Fix me with types
  data: Record<string, number | string>;
  filters: FilterChip[];
  addFilter: (item: string | FilterChip) => void;
  removeFilter: (item: string | FilterChip) => void;
};

const SelectFilter: React.FC<SelectFilterType> = ({
  toggleName,
  categoryName,
  data: selectFilterObj,
  filters,
  addFilter,
  removeFilter,
}) => {
  const { onDeleteChip } = useToolbarContext();
  const [selectFilterExpanded, setSelectFilterExpanded] = React.useState(false);

  const onStatusToggleClick = () => {
    setSelectFilterExpanded(!selectFilterExpanded);
  };

  const statusToggle = (tRef: React.Ref<MenuToggleElement>) => (
    <MenuToggle
      ref={tRef}
      onClick={onStatusToggleClick}
      isExpanded={selectFilterExpanded}
      data-testid={`${(typeof categoryName === 'string'
        ? categoryName
        : categoryName.name
      )?.toLowerCase()}-filter-menu`}
      style={
        {
          width: '200px',
        } as React.CSSProperties
      }
    >
      {toggleName} {filters?.length > 0 && <Badge isRead>{filters.length}</Badge>}
    </MenuToggle>
  );

  return (
    <ToolbarFilter chips={filters} categoryName={categoryName} deleteChip={onDeleteChip}>
      <Select
        aria-label={toggleName}
        toggle-aria-label={`${toggleName} filter menu`}
        isOpen={selectFilterExpanded}
        onOpenChange={(nextOpen: boolean) => setSelectFilterExpanded(nextOpen)}
        toggle={statusToggle}
        onSelect={(event, selection) => {
          const checked = (event?.target as HTMLInputElement).checked;
          checked ? addFilter(String(selection)) : removeFilter(String(selection));
        }}
      >
        <SelectList>
          {Object.keys(selectFilterObj).map((filter) => (
            <SelectOption
              key={filter}
              value={filter}
              aria-label={filter}
              data-testid={`${
                typeof categoryName === 'string' ? categoryName : categoryName.name
              }-filter-${filter}`}
              isSelected={filters.includes(filter)}
              hasCheckbox
            >
              <Flex
                justifyContent={{
                  default: 'justifyContentSpaceBetween',
                }}
              >
                <FlexItem>{filter}</FlexItem>
                <FlexItem>{selectFilterObj[filter]}</FlexItem>
              </Flex>
            </SelectOption>
          ))}
        </SelectList>
      </Select>
    </ToolbarFilter>
  );
};
export default SelectFilter;
