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

export type CveIdFilterType = {
  data: Record<string, number | string>;
};
const CveIdFilter: React.FC<CveIdFilterType> = ({ data: CveIdFilterObj = {} }) => {
  const {
    state: { cveIdFilters },
    dispatch: { addCveIdFilter, removeCveIdFilter },
    onDeleteChip,
  } = useToolbarContext();
  const [CveIdFilterExpanded, setCveIdFilterExpanded] = React.useState(false);

  const onStatusToggleClick = () => {
    setCveIdFilterExpanded(!CveIdFilterExpanded);
  };

  const statusToggle = (tRef: React.Ref<MenuToggleElement>) => (
    <MenuToggle
      ref={tRef}
      onClick={onStatusToggleClick}
      isExpanded={CveIdFilterExpanded}
      data-testid="cve-filter-menu"
      style={
        {
          width: '200px',
        } as React.CSSProperties
      }
    >
      CVE ID {cveIdFilters?.length > 0 && <Badge isRead>{cveIdFilters.length}</Badge>}
    </MenuToggle>
  );

  return (
    <ToolbarFilter
      chips={cveIdFilters}
      categoryName={{
        key: ToolBarFilterId.acsImageScanCveID,
        name: 'CVE ID',
      }}
      deleteChip={onDeleteChip}
    >
      <Select
        isScrollable
        aria-label="Filter by CVE ID"
        toggle-aria-label="CVE filter menu"
        isOpen={CveIdFilterExpanded}
        onOpenChange={(nextOpen: boolean) => setCveIdFilterExpanded(nextOpen)}
        toggle={statusToggle}
        onSelect={(event, selection) => {
          const checked = (event?.target as HTMLInputElement).checked;
          checked ? addCveIdFilter(String(selection)) : removeCveIdFilter(String(selection));
        }}
      >
        <SelectList>
          {Object.keys(CveIdFilterObj)
            .sort()
            .reverse()
            .map((filter) => (
              <SelectOption
                key={filter}
                value={filter}
                aria-label={filter}
                data-testid={`cve-filter-${filter}`}
                isSelected={cveIdFilters.includes(filter)}
                hasCheckbox
              >
                <Flex grow={{ default: 'grow' }}>
                  <FlexItem>
                    {filter} <Badge isRead>{CveIdFilterObj[filter]}</Badge>
                  </FlexItem>
                </Flex>
              </SelectOption>
            ))}
        </SelectList>
      </Select>
    </ToolbarFilter>
  );
};
export default CveIdFilter;
