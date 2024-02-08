import * as React from 'react';
import OutputCard from './OutputCard';
import AdvancedClusterSecurity from './Tabs/AdvancedClusterSecurity/AdvancedClusterSecurity';
import EnterpriseContract from './Tabs/EnterpriseContract/EnterpriseContract';
import ResultsList, { ResultsListProps } from './Tabs/Others/ResultsList';
import { ACSCheckResults, ACSImageScanResult, EnterpriseContractPolicy } from './types';
import { getACSCheckIssues } from './utils/acs-image-check-utils';
import { getImageScanIssues } from './utils/acs-image-scan-utils';
import { getEnterpriseContractStatus } from './utils/ec-utils';
import { isEmpty } from './utils/helper-utils';
import { getACStatusLabel, getECStatusLabel } from './utils/summary-utils';

export type OutputProps = {
  enterpriseContractPolicies?: EnterpriseContractPolicy[];
  acsImageScanResult?: ACSImageScanResult;
  acsImageCheckResults?: ACSCheckResults;
  acsDeploymentCheckResults?: ACSCheckResults;
} & ResultsListProps;

/**
 * Output component supports EC, ACS policy reports and pipelinerun results.
 * @param OutputProps
 * @returns
 */
const Output: React.FC<OutputProps> = ({
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
        <OutputCard
          title="Enterprise Contract"
          badge={getECStatusLabel(getEnterpriseContractStatus(enterpriseContractPolicies))}
          isOpen={true}
        >
          <EnterpriseContract enterpriseContractPolicies={enterpriseContractPolicies} />
        </OutputCard>
      )}
      {showACSCard && (
        <OutputCard
          title="Advanced Cluster Security"
          badge={getACStatusLabel(acsIssuesFound)}
          isOpen={!showECCard}
        >
          <AdvancedClusterSecurity
            acsImageScanResult={acsImageScanResult}
            acsImageCheckResults={acsImageCheckResults}
            acsDeploymentCheckResults={acsDeploymentCheckResults}
          />
        </OutputCard>
      )}
      {results.length > 0 && showOnlyResults ? (
        <ResultsComponent data-testid="ec" />
      ) : results.length > 0 ? (
        <OutputCard data-testid="results-card" title="Others" isOpen={showOnlyResults}>
          <ResultsComponent />
        </OutputCard>
      ) : null}
    </>
  );
};
export default Output;
