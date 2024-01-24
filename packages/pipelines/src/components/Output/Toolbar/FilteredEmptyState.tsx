import React from 'react';
import {
  Bullseye,
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateHeader,
  EmptyStateIcon,
  EmptyStateVariant,
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons/dist/js/icons';

const FilteredEmptyState: React.FC<{
  onClearAllFilters: () => void;
}> = ({ onClearAllFilters }) => {
  return (
    <Bullseye data-testid="table-empty-state">
      <EmptyState variant={EmptyStateVariant.sm}>
        <EmptyStateHeader
          icon={<EmptyStateIcon icon={SearchIcon} />}
          titleText="No results found"
          headingLevel="h2"
        />
        <EmptyStateBody>Clear all filters and try again.</EmptyStateBody>
        <EmptyStateFooter>
          <EmptyStateActions>
            <Button onClick={onClearAllFilters} variant="link">
              Clear all filters
            </Button>
          </EmptyStateActions>
        </EmptyStateFooter>
      </EmptyState>
    </Bullseye>
  );
};
export default FilteredEmptyState;
