import * as React from 'react';
import { EnterpriseContractPolicy } from '../../types';
import EnterpriseContractContextProvider from './EnterpriseContractContext';
import EnterpriseContractSummary from './EnterpriseContractSummary';
import { EnterpriseContractTable } from './EnterpriseContractTable';
import EnterpriseContractTitle from './EnterpriseContractTitle';
import EnterpriseContractToolbar from './EnterpriseContractToolbar';

type EnterpriseContractProps = {
  enterpriseContractPolicies: EnterpriseContractPolicy[];
};

const EnterpriseContract: React.FC<EnterpriseContractProps> = ({ enterpriseContractPolicies }) => {
  return (
    <EnterpriseContractContextProvider
      data-testid="enterprise-contract"
      enterpriseContractPolicies={enterpriseContractPolicies}
    >
      <EnterpriseContractTitle />
      <EnterpriseContractSummary />
      <EnterpriseContractToolbar />
      <EnterpriseContractTable />
    </EnterpriseContractContextProvider>
  );
};
export default EnterpriseContract;
