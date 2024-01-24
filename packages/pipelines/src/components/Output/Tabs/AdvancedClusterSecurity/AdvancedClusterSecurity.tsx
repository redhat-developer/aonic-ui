import * as React from 'react';
import { Tab, Tabs, TabTitleText } from '@patternfly/react-core';
import { ACSCheckResults, ACSImageScanResult } from '../../types';
import { isEmpty } from '../../utils/helper-utils';
import ACSContextProvider from './AdvancedClusterSecurityContext';
import DeploymentCheckSummary from './DeploymentCheck/DeploymentCheckSummary';
import DeploymentCheckTable from './DeploymentCheck/DeploymentCheckTable';
import DeploymentCheckTitle from './DeploymentCheck/DeploymentCheckTitle';
import DeploymentCheckToolbar from './DeploymentCheck/DeploymentCheckToolbar';
import ImageCheckSummary from './ImageCheck/ImageCheckSummary';
import ImageCheckTable from './ImageCheck/ImageCheckTable';
import ImageCheckTitle from './ImageCheck/ImageCheckTitle';
import ImageCheckToolbar from './ImageCheck/ImageCheckToolbar';
import ImageScanSummary from './ImageScan/ImageScanSummary';
import ImageScanTable from './ImageScan/ImageScanTable';
import ImageScanTitle from './ImageScan/ImageScanTitle';
import ImageScanToolbar from './ImageScan/ImageScanToolbar';

type AdvancedClusterSecurityProps = {
  acsImageScanResult: ACSImageScanResult;
  acsImageCheckResults: ACSCheckResults;
  acsDeploymentCheckResults: ACSCheckResults;
};
const AdvancedClusterSecurity: React.FC<AdvancedClusterSecurityProps> = (acsProps) => {
  const { acsImageScanResult, acsImageCheckResults, acsDeploymentCheckResults } = acsProps;
  const showACSTab =
    [acsImageScanResult, acsImageCheckResults, acsDeploymentCheckResults].filter((a) => !isEmpty(a))
      .length > 0;

  if (!showACSTab) {
    return null;
  }

  return (
    <ACSContextProvider {...acsProps}>
      <Tabs defaultActiveKey={0} data-testid="acs-tabs">
        {!isEmpty(acsImageScanResult) && (
          <Tab eventKey={0} title={<TabTitleText>Image Scan</TabTitleText>}>
            <div style={{ marginTop: 'var(--pf-v5-global--spacer--sm)' }}>
              <ImageScanTitle />
              <ImageScanSummary />
              <ImageScanToolbar />
              <ImageScanTable />
            </div>
          </Tab>
        )}
        {!isEmpty(acsImageCheckResults) && (
          <Tab eventKey={1} title={<TabTitleText>Image Check</TabTitleText>}>
            <div style={{ marginTop: 'var(--pf-v5-global--spacer--sm)' }}>
              <ImageCheckTitle />
              <ImageCheckSummary />
              <ImageCheckToolbar />
              <ImageCheckTable />
            </div>
          </Tab>
        )}
        {!isEmpty(acsDeploymentCheckResults) && (
          <Tab eventKey={2} title={<TabTitleText>Deployment Check</TabTitleText>}>
            <div style={{ marginTop: 'var(--pf-v5-global--spacer--sm)' }}>
              <DeploymentCheckTitle />
              <DeploymentCheckSummary />
              <DeploymentCheckToolbar />
              <DeploymentCheckTable />
            </div>
          </Tab>
        )}
      </Tabs>
    </ACSContextProvider>
  );
};
export default AdvancedClusterSecurity;
