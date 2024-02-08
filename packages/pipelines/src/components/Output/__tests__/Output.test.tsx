import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { RunStatus } from '../../../utils/pipelinerun-utils';
import {
  acsDeploymentCheck,
  acsImageCheckResults,
  acsImageScanResult,
  mockEnterpriseContractUIData,
} from '../data';
import Output from '../Output';

describe('OutputTab', () => {
  test('should render OutputTab with enterprise contract', () => {
    render(
      <Output
        enterpriseContractPolicies={mockEnterpriseContractUIData}
        results={[]}
        pipelineRunName="pipelinerun-1"
        pipelineRunStatus={RunStatus.Succeeded}
      />,
    );

    screen.getByText('Enterprise Contract');

    expect(screen.queryByText('Others')).not.toBeInTheDocument();

    expect(screen.queryByTestId('results-table')).not.toBeInTheDocument();
  });

  test('should render OutputTab with adavanced cluster security data', () => {
    render(
      <Output
        acsImageScanResult={acsImageScanResult}
        results={[]}
        pipelineRunName="pipelinerun-1"
        pipelineRunStatus={RunStatus.Succeeded}
      />,
    );

    screen.getByText('Advanced Cluster Security');
    expect(screen.queryByText('Others')).not.toBeInTheDocument();
    expect(screen.queryByTestId('results-table')).not.toBeInTheDocument();
  });

  test('should not render issues found badge in adavanced cluster security tab', () => {
    render(
      <Output
        acsImageScanResult={{
          ...acsImageScanResult,
          result: {
            ...acsImageScanResult.result,
            summary: {
              ...acsImageScanResult.result.summary,
              CRITICAL: 0,
              IMPORTANT: 0,
            },
          },
        }}
        acsImageCheckResults={{
          ...acsImageCheckResults,
          summary: {
            ...acsImageCheckResults.summary,
            CRITICAL: 0,
            HIGH: 0,
          },
          results: [
            {
              ...acsImageCheckResults.results[0],
              violatedPolicies: [acsImageCheckResults.results[0].violatedPolicies[1]],
            },
          ],
        }}
        acsDeploymentCheckResults={{
          ...acsDeploymentCheck,
          summary: {
            ...acsDeploymentCheck.summary,
            CRITICAL: 0,
            HIGH: 0,
          },
          results: [
            {
              ...acsDeploymentCheck.results[0],
              violatedPolicies: [acsDeploymentCheck.results[0].violatedPolicies[1]],
            },
          ],
        }}
        results={[{ name: 'result-name', value: 'result-value' }]}
        pipelineRunName="pipelinerun-1"
        pipelineRunStatus={RunStatus.Succeeded}
      />,
    );

    screen.getByText('Advanced Cluster Security');
    expect(screen.queryByText('Issues found')).not.toBeInTheDocument();
    screen.getByText('Others');
  });

  test('should not render OutputTab with results section', () => {
    render(
      <Output
        results={[]}
        pipelineRunName="pipelinerun-1"
        pipelineRunStatus={RunStatus.Succeeded}
      />,
    );
    expect(screen.queryByTestId('results-table')).not.toBeInTheDocument();
  });

  test('should render OutputTab with results section', () => {
    render(
      <Output
        results={[{ name: 'result-name', value: 'result-value' }]}
        pipelineRunName="pipelinerun-1"
        pipelineRunStatus={RunStatus.Succeeded}
      />,
    );
    screen.getByText('result-value');
    screen.getByTestId('results-table');
  });
});
