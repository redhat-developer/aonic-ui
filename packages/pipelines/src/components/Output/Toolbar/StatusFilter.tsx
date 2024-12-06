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
  ToolbarFilter,
} from '@patternfly/react-core';
import { useToolbarContext } from './ToolbarContext';
import { ToolBarFilterId } from './types';

export type StatusFilterType = {
  data: Record<string, number | string>;
  toggleName?: string;
};
const StatusFilter: React.FC<StatusFilterType> = ({ data: statusFilterObj, toggleName }) => {
  const {
    state: { statusFilters },
    dispatch: { addStatusFilter, removeStatusFilter },
    onDeleteChip,
  } = useToolbarContext();
  const [statusFilterExpanded, setStatusFilterExpanded] = React.useState(false);

  const onStatusToggleClick = () => {
    setStatusFilterExpanded(!statusFilterExpanded);
  };

  const statusToggle = (tRef: React.Ref<MenuToggleElement>) => (
    <MenuToggle
      ref={tRef}
      onClick={onStatusToggleClick}
      isExpanded={statusFilterExpanded}
      style={
        {
          width: '200px',
        } as React.CSSProperties
      }
      data-testid="status-filter-menu"
    >
      {toggleName || 'Filter by Status'}{' '}
      {statusFilters?.length > 0 && <Badge isRead>{statusFilters.length}</Badge>}
    </MenuToggle>
  );

  return (
    <ToolbarFilter
      labels={statusFilters}
      categoryName={ToolBarFilterId.status}
      deleteLabel={onDeleteChip}
    >
      <Select
        aria-label="Status"
        toggle-aria-label="Status filter menu"
        isOpen={statusFilterExpanded}
        onOpenChange={(nextOpen: boolean) => setStatusFilterExpanded(nextOpen)}
        toggle={statusToggle}
        onSelect={(event, selection) => {
          const checked = (event?.target as HTMLInputElement).checked;
          checked ? addStatusFilter(String(selection)) : removeStatusFilter(String(selection));
        }}
      >
        <SelectList>
          {Object.keys(statusFilterObj).map((filter) => (
            <SelectOption
              key={filter}
              value={filter}
              aria-label={filter}
              data-testid={`status-filter-${filter}`}
              isSelected={statusFilters.includes(filter)}
              hasCheckbox
            >
              <Flex
                justifyContent={{
                  default: 'justifyContentSpaceBetween',
                }}
              >
                <FlexItem>{filter}</FlexItem>
                <FlexItem>{statusFilterObj[filter]}</FlexItem>
              </Flex>
            </SelectOption>
          ))}
        </SelectList>
      </Select>
    </ToolbarFilter>
  );
};
export default StatusFilter;
