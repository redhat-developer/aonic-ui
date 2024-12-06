import * as React from 'react';
import { Card, CardBody, CardTitle, Flex, FlexItem } from '@patternfly/react-core';
import { ENTERPRISE_CONTRACT_POLICY_STATUS } from '../../types';
import { getResultsSummary } from '../../utils/ec-utils';
import { getRuleStatus, SummaryTextAndCount } from '../../utils/summary-utils';
import { useEnterpriseContractContext } from './EnterpriseContractContext';

const EnterpriseContractSummary: React.FC = () => {
  const { enterpriseContractPolicies } = useEnterpriseContractContext();

  const resultSummary = React.useMemo(
    () => getResultsSummary(enterpriseContractPolicies),
    [enterpriseContractPolicies],
  );

  return (
    <Card
      style={{
        borderRadius: 0,
        width: '250px',
        marginBottom: 'var(--pf-t--global--spacer--sm)',
      }}
      isCompact
    >
      <CardTitle>Summary</CardTitle>
      <CardBody>
        <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }}>
          <Flex direction={{ default: 'column' }}>
            <FlexItem>
              <SummaryTextAndCount
                text={getRuleStatus(ENTERPRISE_CONTRACT_POLICY_STATUS.failed)}
                count={resultSummary[ENTERPRISE_CONTRACT_POLICY_STATUS.failed]}
              />
            </FlexItem>
            <FlexItem>
              <SummaryTextAndCount
                text={getRuleStatus(ENTERPRISE_CONTRACT_POLICY_STATUS.warnings)}
                count={resultSummary[ENTERPRISE_CONTRACT_POLICY_STATUS.warnings]}
              />
            </FlexItem>
          </Flex>
          <Flex direction={{ default: 'column' }}>
            <FlexItem>
              <SummaryTextAndCount
                text={getRuleStatus(ENTERPRISE_CONTRACT_POLICY_STATUS.successes)}
                count={resultSummary[ENTERPRISE_CONTRACT_POLICY_STATUS.successes]}
              />
            </FlexItem>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};
export default EnterpriseContractSummary;
