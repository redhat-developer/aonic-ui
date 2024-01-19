import * as React from 'react';
import {
  Badge,
  MenuToggle,
  MenuToggleElement,
  Select,
  SelectList,
  SelectOption,
  ToolbarFilter,
} from '@patternfly/react-core';
import { useToolbarContext } from './ToolbarContext';
import { ToolBarFilterId } from './types';

export interface ComponentFilterProps<T extends object, K extends keyof T> {
  data: T[];
  path: K;
  title?: string;
}

const ComponentFilter = <T extends object>({
  data,
  path,
  title,
}: ComponentFilterProps<T, keyof T>) => {
  const {
    state: { componentFilters },
    dispatch: { addComponentFilter, resetComponentFilter, removeComponentFilter },
    onDeleteChip,
  } = useToolbarContext();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const componentFilterObj = React.useMemo(() => {
    return data?.length > 0
      ? data?.reduce((acc: Record<string, number>, obj: T) => {
          const value = obj[path] as string;
          if (acc[value]) {
            acc[value] += 1;
          } else {
            acc[value] = 1;
          }
          return acc;
        }, {})
      : {};
  }, [data, path]);

  const onToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const onDeleteChipComponentGroup = React.useCallback(() => {
    resetComponentFilter();
  }, [resetComponentFilter]);

  const toggle = (toggleRef: React.Ref<MenuToggleElement>) => (
    <MenuToggle
      ref={toggleRef}
      isExpanded={isOpen}
      onClick={onToggleClick}
      data-testid="component-filter-menu"
      style={
        {
          width: '200px',
        } as React.CSSProperties
      }
    >
      {title ?? 'Filter by components'}
      {componentFilters.length > 0 && <Badge isRead>{componentFilters.length}</Badge>}
    </MenuToggle>
  );

  return (
    <ToolbarFilter
      chips={componentFilters}
      categoryName={ToolBarFilterId.component}
      deleteChip={onDeleteChip}
      deleteChipGroup={onDeleteChipComponentGroup}
    >
      <Select
        isScrollable
        toggle-aria-label="Component filter menu"
        aria-label="Component"
        isOpen={isOpen}
        onOpenChange={(nextOpen: boolean) => setIsOpen(nextOpen)}
        toggle={toggle}
        onSelect={(event, selection) => {
          const checked = (event?.target as HTMLInputElement).checked;
          checked
            ? addComponentFilter(String(selection))
            : removeComponentFilter(String(selection));
        }}
      >
        <SelectList>
          {Object.keys(componentFilterObj)
            .sort()
            .map((filter) => (
              <SelectOption
                hasCheckbox
                key={filter}
                value={filter}
                isSelected={componentFilters.includes(filter)}
              >
                {filter}
              </SelectOption>
            ))}
        </SelectList>
      </Select>
    </ToolbarFilter>
  );
};
export default ComponentFilter;
