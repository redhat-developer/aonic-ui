import * as React from 'react';
import { ToolBarActionDispatch, ToolBarState, useToolBarReducer } from './ToolBarReducer';
import { FilterChip, FilterChipGroup, SubTab, ToolBarFilterId, ToolBarFilterProps } from './types';

type ToolBarContextType = {
  state: ToolBarState;
  dispatch: ToolBarActionDispatch;
} & ToolBarFilterProps;

export const ToolbarContext = React.createContext<ToolBarContextType | null>(null);

const ToolbarContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useToolBarReducer();

  const clearImageScanFilters = React.useCallback(() => {
    dispatch.resetCveIdFilter();
    dispatch.resetComponentFilter();
    dispatch.resetStatusFilter();
    dispatch.resetSeverityFilter();
  }, [dispatch]);

  const clearImageCheckFilters = React.useCallback(() => {
    dispatch.resetNameFilter();
    dispatch.resetImageCheckSeverityFilter();
  }, [dispatch]);

  const clearDeploymentCheckFilters = React.useCallback(() => {
    dispatch.resetDeploymentCheckSeverityFilter();
    dispatch.resetAcsPoliceNameFilter();
  }, [dispatch]);

  const onDeleteChip = React.useCallback(
    (category: FilterChipGroup, chip: string | FilterChip) => {
      switch (category) {
        case ToolBarFilterId.name:
          dispatch.resetNameFilter();
          return;

        case ToolBarFilterId.status:
          dispatch.removeStatusFilter(chip);
          return;

        case ToolBarFilterId.severity:
        case ToolBarFilterId.acsImageScanSeverity:
          dispatch.removeSeverityFilter(chip);
          return;

        case ToolBarFilterId.component:
          dispatch.removeComponentFilter(chip);
          return;

        case ToolBarFilterId.acsImageScanCveID:
          dispatch.removeCveIdFilter(chip);
          return;

        case ToolBarFilterId.acsImageCheckSeverity:
          dispatch.removeImageCheckSeverityFilter(chip);
          return;

        case ToolBarFilterId.acsDeploymentCheckSeverity:
          dispatch.removeDeploymentCheckSeverityFilter(chip);
          return;

        case ToolBarFilterId.acsDeploymentCheckPolicyName:
          dispatch.resetAcsPoliceNameFilter();
          return;

        case ToolBarFilterId.removeAll:
          dispatch.resetAllFilters();
          return;

        default:
          return;
      }
    },
    [dispatch],
  );

  const onClearAllFilters = React.useCallback(
    (type?: SubTab) => {
      switch (type) {
        case SubTab.imageScan:
          clearImageScanFilters();
          return;

        case SubTab.imageCheck:
          clearImageCheckFilters();
          return;

        case SubTab.deploymentCheck:
          clearDeploymentCheckFilters();
          return;

        default:
          onDeleteChip(ToolBarFilterId.removeAll, ToolBarFilterId.removeAll);
      }
    },
    [onDeleteChip, clearDeploymentCheckFilters, clearImageCheckFilters, clearImageScanFilters],
  );

  const toolBarValue = React.useMemo(() => {
    return {
      onDeleteChip,
      onClearAllFilters,
      state,
      dispatch,
    };
  }, [onDeleteChip, onClearAllFilters, state, dispatch]);

  return <ToolbarContext.Provider value={toolBarValue}>{children}</ToolbarContext.Provider>;
};

export default ToolbarContextProvider;

export const useToolbarContext = (): ToolBarContextType => {
  const context = React.useContext<ToolBarContextType | null>(ToolbarContext);

  if (context === null) {
    throw new Error('useToolbarContext must be within a ToolbarContextProvider');
  }

  return context;
};
