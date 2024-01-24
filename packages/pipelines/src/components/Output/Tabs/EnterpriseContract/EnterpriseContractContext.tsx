import * as React from 'react';
import { useToolbarContext } from '../../Toolbar/ToolbarContext';
import withToolbar from '../../Toolbar/WithToolbar';
import { EnterpriseContractPolicy } from '../../types';

export type ECContextType = {
  enterpriseContractPolicies: EnterpriseContractPolicy[];
  filteredECResults: EnterpriseContractPolicy[];
};

export const EnterpriseContractContext = React.createContext<ECContextType | null>(null);

const EnterpriseContractContextProvider: React.FC<{
  children: React.ReactNode;
  enterpriseContractPolicies: EnterpriseContractPolicy[];
}> = withToolbar(({ enterpriseContractPolicies, children }) => {
  const {
    state: { nameFilter, statusFilters },
  } = useToolbarContext();

  const filteredECResults = React.useMemo(() => {
    return enterpriseContractPolicies?.filter(
      (rule: EnterpriseContractPolicy) =>
        (!nameFilter || rule.title.toLowerCase().indexOf(nameFilter.toLowerCase()) !== -1) &&
        (!statusFilters.length || statusFilters.includes(rule.status)),
    );
  }, [enterpriseContractPolicies, nameFilter, statusFilters]);

  return (
    <EnterpriseContractContext.Provider
      value={{
        enterpriseContractPolicies,
        filteredECResults,
      }}
    >
      <div data-testid="enterprise-contract">{children}</div>
    </EnterpriseContractContext.Provider>
  );
});

export default EnterpriseContractContextProvider;

export const useEnterpriseContractContext = (): ECContextType => {
  const context = React.useContext<ECContextType | null>(EnterpriseContractContext);

  if (context === null) {
    throw new Error(
      'useEnterpriseContractContext must be within a EnterpriseContractContextProvider',
    );
  }

  return context;
};
