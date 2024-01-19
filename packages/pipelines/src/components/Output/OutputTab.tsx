import * as React from 'react';
import OutputTabCard from './OutputTabCard';
import AdvancedClusterSecurity from './Tabs/AdvancedClusterSecurity/AdvancedClusterSecurity';
import EnterpriseContract from './Tabs/EnterpriseContract/EnterpriseContract';
import ResultsList, { ResultsListProps } from './Tabs/Others/ResultsList';
import { ACSCheckResults, ACSImageScanResult, EnterpriseContractPolicy } from './types';
import { getACSCheckIssues } from './utils/acs-image-check-utils';
import { getImageScanIssues } from './utils/acs-image-scan-utils';
import { getEnterpriseContractStatus } from './utils/ec-utils';
import { isEmpty } from './utils/helper-utils';
import { getACStatusLabel, getECStatusLabel } from './utils/summary-utils';

type OutputTabProps = {
  enterpriseContractPolicies?: EnterpriseContractPolicy[];
  acsImageScanResult?: ACSImageScanResult;
  acsImageCheckResults?: ACSCheckResults;
  acsDeploymentCheckResults?: ACSCheckResults;
} & ResultsListProps;

const OutputTab: React.FC<OutputTabProps> = ({
  enterpriseContractPolicies = [],
  acsImageCheckResults = {} as ACSCheckResults,
  acsImageScanResult = {} as ACSImageScanResult,
  acsDeploymentCheckResults = {} as ACSCheckResults,
  results,
  pipelineRunName,
  pipelineRunStatus,
}) => {
  const acsIssuesFound =
    getImageScanIssues(acsImageScanResult) ||
    getACSCheckIssues(acsImageCheckResults, acsDeploymentCheckResults);

  const showECCard = enterpriseContractPolicies?.length > 0;
  const showACSCard =
    [acsImageScanResult, acsImageCheckResults, acsDeploymentCheckResults].filter((a) => !isEmpty(a))
      .length > 0;

  const showOnlyResults = !showECCard && !showACSCard;
  const ResultsComponent = () => (
    <ResultsList
      results={results}
      pipelineRunName={pipelineRunName}
      pipelineRunStatus={pipelineRunStatus}
    />
  );
  return (
    <>
      {showECCard && (
        <OutputTabCard
          title="Enterprise Contract"
          badge={getECStatusLabel(getEnterpriseContractStatus(enterpriseContractPolicies))}
          isOpen={true}
        >
          <EnterpriseContract enterpriseContractPolicies={enterpriseContractPolicies} />
        </OutputTabCard>
      )}
      {showACSCard && (
        <OutputTabCard
          title="Advanced Cluster Security"
          badge={getACStatusLabel(acsIssuesFound)}
          isOpen={!showECCard}
        >
          <AdvancedClusterSecurity
            acsImageScanResult={acsImageScanResult}
            acsImageCheckResults={acsImageCheckResults}
            acsDeploymentCheckResults={acsDeploymentCheckResults}
          />
        </OutputTabCard>
      )}
      {results.length > 0 && showOnlyResults ? (
        <ResultsComponent data-testid="ec" />
      ) : results.length > 0 ? (
        <OutputTabCard data-testid="results-card" title="Others" isOpen={showOnlyResults}>
          <ResultsComponent />
        </OutputTabCard>
      ) : null}
    </>
  );
};
export default OutputTab;
