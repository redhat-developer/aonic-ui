import * as React from 'react';
import { useToolbarContext } from '../../Toolbar/ToolbarContext';
import withToolbar from '../../Toolbar/WithToolbar';
import { ACSCheckResults, ACSImageScanResult, ViolatedPolicy, Vulnerability } from '../../types';
import {
  applyFiltersOnDeploymentCheckResults,
  applyFiltersOnImageCheckResults,
  applyFiltersOnImageScanResult,
} from '../../utils/acs-filter-utils';

export type ACSContextType = {
  acsImageScanResult: ACSImageScanResult;
  filteredacsImageScanResult: Vulnerability[];
  filteredacsImageScanResultByComponents: Vulnerability[];

  acsImageCheckResults: ACSCheckResults;
  filteredacsImageCheckResults: ViolatedPolicy[];

  acsDeploymentCheckResults: ACSCheckResults;
  filteredacsDeploymentCheckResults: ViolatedPolicy[];
};

export const ACSContext = React.createContext<ACSContextType | null>(null);

const ACSContextProvider: React.FC<{
  children: React.ReactNode;
  acsImageScanResult: ACSImageScanResult;
  acsImageCheckResults: ACSCheckResults;
  acsDeploymentCheckResults: ACSCheckResults;
}> = withToolbar(
  ({ acsImageScanResult, acsImageCheckResults, acsDeploymentCheckResults, children }) => {
    const {
      state: {
        nameFilter,
        cveIdFilters,
        componentFilters,
        statusFilters,
        severityFilters,
        acsImageCheckSeverityFilters,
        acsPolicyNameFilter,
        acsDeploymentCheckSeverityFilters,
      },
    } = useToolbarContext();

    const { filteredacsImageScanResult, filteredacsImageScanResultByComponents } =
      applyFiltersOnImageScanResult(acsImageScanResult, {
        componentFilters,
        statusFilters,
        cveIdFilters,
        severityFilters,
      });

    const { filteredacsImageCheckResults } = applyFiltersOnImageCheckResults(acsImageCheckResults, {
      acsImageCheckSeverityFilters,
      nameFilter,
    });

    const { filteredacsDeploymentCheckResults } = applyFiltersOnDeploymentCheckResults(
      acsDeploymentCheckResults,
      {
        acsDeploymentCheckSeverityFilters,
        acsPolicyNameFilter,
      },
    );
    return (
      <ACSContext.Provider
        value={{
          acsImageScanResult,
          filteredacsImageScanResult,
          filteredacsImageScanResultByComponents,

          acsImageCheckResults,
          filteredacsImageCheckResults,

          acsDeploymentCheckResults,
          filteredacsDeploymentCheckResults,
        }}
      >
        {children}
      </ACSContext.Provider>
    );
  },
);

export default ACSContextProvider;

export const useACSContext = (): ACSContextType => {
  const context = React.useContext<ACSContextType | null>(ACSContext);

  if (context === null) {
    throw new Error('useACSContext must be within a ACSContextProvider');
  }

  return context;
};
