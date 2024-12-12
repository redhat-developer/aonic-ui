import * as React from 'react';
import { Card, CardBody, CardTitle, Flex, FlexItem } from '@patternfly/react-core';
import { ACS_SCAN_RESULTS, ACS_SEVERITY, ACS_STATUS, ACSImageScanResult } from '../../../types';
import { getFixableCveByStatus } from '../../../utils/acs-image-scan-utils';
import {
  getCVEFixableStatus,
  getCVEScanResults,
  getSeverityWithIcon,
  SummaryTextAndCount,
} from '../../../utils/summary-utils';
import { useACSContext } from '../AdvancedClusterSecurityContext';

const ImageScanSummary: React.FC = () => {
  const { acsImageScanResult } = useACSContext();

  const getResultsSummary = (data: ACSImageScanResult) => ({
    Critical: data.result?.summary?.CRITICAL ?? 0,
    Important: data.result?.summary?.IMPORTANT ?? 0,
    Moderate: data.result?.summary?.MODERATE ?? 0,
    Low: data.result?.summary?.LOW ?? 0,
  });

  const resultSummary = React.useMemo(
    () => getResultsSummary(acsImageScanResult),
    [acsImageScanResult],
  );

  const cveSummary = getFixableCveByStatus(acsImageScanResult.result?.vulnerabilities);

  return (
    <Flex flex={{ default: 'flex_1' }} justifyContent={{ default: 'justifyContentSpaceEvenly' }}>
      <FlexItem grow={{ default: 'grow' }}>
        <Card
          isCompact
          style={{ borderRadius: 0, marginBottom: 'var(--pf-t--global--spacer--sm)' }}
        >
          <CardTitle>CVEs by severity</CardTitle>
          <CardBody>
            <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }}>
              <Flex direction={{ default: 'column' }}>
                <FlexItem>
                  <SummaryTextAndCount
                    text={getSeverityWithIcon(ACS_SEVERITY.Critical)}
                    count={resultSummary[ACS_SEVERITY.Critical]}
                  />
                </FlexItem>
                <FlexItem>
                  <SummaryTextAndCount
                    text={getSeverityWithIcon(ACS_SEVERITY.Moderate)}
                    count={resultSummary[ACS_SEVERITY.Moderate]}
                  />
                </FlexItem>
              </Flex>
              <Flex direction={{ default: 'column' }}>
                <FlexItem>
                  <SummaryTextAndCount
                    text={getSeverityWithIcon(ACS_SEVERITY.Important)}
                    count={resultSummary[ACS_SEVERITY.Important]}
                  />
                </FlexItem>
                <FlexItem>
                  <SummaryTextAndCount
                    text={getSeverityWithIcon(ACS_SEVERITY.Low)}
                    count={resultSummary[ACS_SEVERITY.Low]}
                  />
                </FlexItem>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </FlexItem>
      <FlexItem grow={{ default: 'grow' }}>
        <Card isCompact style={{ borderRadius: 0 }}>
          <CardTitle>CVEs by status</CardTitle>
          <CardBody>
            <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }}>
              <Flex direction={{ default: 'column' }}>
                <FlexItem>
                  <SummaryTextAndCount text={getCVEFixableStatus(ACS_STATUS.Fixable, cveSummary)} />
                </FlexItem>
                <FlexItem>
                  <SummaryTextAndCount
                    text={getCVEFixableStatus(ACS_STATUS.Unavailable, cveSummary)}
                  />
                </FlexItem>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </FlexItem>

      <FlexItem grow={{ default: 'grow' }}>
        <Card isCompact style={{ borderRadius: 0 }}>
          <CardTitle>Total scan results</CardTitle>
          <CardBody>
            <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }}>
              <Flex direction={{ default: 'column' }}>
                <FlexItem>
                  <SummaryTextAndCount
                    text={getCVEScanResults(
                      ACS_SCAN_RESULTS.Vulnerabilites,
                      acsImageScanResult.result?.summary,
                    )}
                  />
                </FlexItem>
                <FlexItem>
                  <FlexItem>
                    <SummaryTextAndCount
                      text={getCVEScanResults(
                        ACS_SCAN_RESULTS.Components,
                        acsImageScanResult.result?.summary,
                      )}
                    />
                  </FlexItem>
                </FlexItem>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </FlexItem>
    </Flex>
  );
};
export default ImageScanSummary;
