import { ENTERPRISE_CONTRACT_POLICY_STATUS, EnterpriseContractPolicy } from '../types';

export const getResultsSummary = (ECs: EnterpriseContractPolicy[]): Record<string, number> => {
  const statusFilter = {
    [ENTERPRISE_CONTRACT_POLICY_STATUS.successes]: 0,
    [ENTERPRISE_CONTRACT_POLICY_STATUS.warnings]: 0,
    [ENTERPRISE_CONTRACT_POLICY_STATUS.failed]: 0,
  };
  return (Array.isArray(ECs) ? ECs : [])?.reduce((acc, ec) => {
    if (acc[ec.status]) {
      acc[ec.status] += 1;
    } else {
      acc[ec.status] = 1;
    }
    return acc;
  }, statusFilter);
};

const EC_STATUS_ORDER: ENTERPRISE_CONTRACT_POLICY_STATUS[] = [
  ENTERPRISE_CONTRACT_POLICY_STATUS.successes,
  ENTERPRISE_CONTRACT_POLICY_STATUS.warnings,
  ENTERPRISE_CONTRACT_POLICY_STATUS.failed,
];

export const getEnterpriseContractStatus = (
  enterpriseContractPolicies: EnterpriseContractPolicy[],
): ENTERPRISE_CONTRACT_POLICY_STATUS =>
  enterpriseContractPolicies.reduce((orderedStatus, { status }) => {
    const statusSeverity = EC_STATUS_ORDER.indexOf(status) || 0;
    if (statusSeverity > EC_STATUS_ORDER.indexOf(orderedStatus)) {
      return status;
    }
    return orderedStatus;
  }, '' as ENTERPRISE_CONTRACT_POLICY_STATUS);
