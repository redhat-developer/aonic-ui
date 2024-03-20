import * as React from 'react';
import { Card, CardBody, CardTitle, Flex, FlexItem } from '@patternfly/react-core';
import { ACS_BREAKING_CHANGES, ACS_IMAGE_CHECK_SEVERITY } from '../../../types';
import { getBreakingChangeCount } from '../../../utils/acs-image-check-utils';
import {
  getBreakingChangeStatus,
  getCheckSeveritySummary,
  getSeverityWithIcon,
  SummaryTextAndCount,
} from '../../../utils/summary-utils';
import { useACSContext } from '../AdvancedClusterSecurityContext';

const DeploymentCheckSummary: React.FC = () => {
  const { acsDeploymentCheckResults } = useACSContext();

  const resultSummary = React.useMemo(
    () => getCheckSeveritySummary(acsDeploymentCheckResults),
    [acsDeploymentCheckResults],
  );

  const breakingChangesSummary = React.useMemo(
    () => getBreakingChangeCount(acsDeploymentCheckResults?.results?.[0]?.violatedPolicies),
    [acsDeploymentCheckResults],
  );

  return (
    <Flex justifyContent={{ default: 'justifyContentSpaceEvenly' }}>
      <FlexItem grow={{ default: 'grow' }}>
        <Card isCompact style={{ marginBottom: 'var(--pf-v5-global--spacer--sm)' }}>
          <CardTitle>Violations by severity</CardTitle>
          <CardBody>
            <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }}>
              <Flex direction={{ default: 'column' }}>
                <FlexItem>
                  <SummaryTextAndCount
                    text={getSeverityWithIcon(ACS_IMAGE_CHECK_SEVERITY.Critical)}
                    count={resultSummary[ACS_IMAGE_CHECK_SEVERITY.Critical]}
                  />
                </FlexItem>
                <FlexItem>
                  <SummaryTextAndCount
                    text={getSeverityWithIcon(ACS_IMAGE_CHECK_SEVERITY.Medium)}
                    count={resultSummary[ACS_IMAGE_CHECK_SEVERITY.Medium]}
                  />
                </FlexItem>
              </Flex>
              <Flex direction={{ default: 'column' }}>
                <FlexItem>
                  <SummaryTextAndCount
                    text={getSeverityWithIcon(ACS_IMAGE_CHECK_SEVERITY.High)}
                    count={resultSummary[ACS_IMAGE_CHECK_SEVERITY.High]}
                  />
                </FlexItem>
                <FlexItem>
                  <SummaryTextAndCount
                    text={getSeverityWithIcon(ACS_IMAGE_CHECK_SEVERITY.Low)}
                    count={resultSummary[ACS_IMAGE_CHECK_SEVERITY.Low]}
                  />
                </FlexItem>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </FlexItem>
      <FlexItem grow={{ default: 'grow' }}>
        <Card isCompact>
          <CardTitle>Failing policy checks</CardTitle>
          <CardBody>
            <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }}>
              <Flex direction={{ default: 'column' }}>
                <FlexItem>
                  <SummaryTextAndCount
                    text={getBreakingChangeStatus(
                      ACS_BREAKING_CHANGES.Breaking,
                      breakingChangesSummary,
                    )}
                  />
                </FlexItem>
                <FlexItem>
                  <SummaryTextAndCount
                    text={getBreakingChangeStatus(
                      ACS_BREAKING_CHANGES.NotBreaking,
                      breakingChangesSummary,
                    )}
                  />
                </FlexItem>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </FlexItem>
    </Flex>
  );
};
export default DeploymentCheckSummary;
