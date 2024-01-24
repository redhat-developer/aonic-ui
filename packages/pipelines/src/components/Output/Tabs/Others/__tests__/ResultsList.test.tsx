import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ResultsList from '../ResultsList';

describe('ResultsList', () => {
  test('should return null', () => {
    render(
      <ResultsList results={[]} pipelineRunName="pipelinerun-1" pipelineRunStatus="Succeeded" />,
    );
    expect(screen.queryByTestId('results-table')).not.toBeInTheDocument();
  });

  test('should return results table', () => {
    render(
      <ResultsList
        results={[{ name: 'test', value: 'value' }]}
        pipelineRunName="pipelinerun-1"
        pipelineRunStatus="Succeeded"
      />,
    );
    expect(screen.queryByTestId('results-table')).toBeInTheDocument();
  });

  test('should return link results table', () => {
    render(
      <ResultsList
        results={[{ name: 'test', value: 'https://www.test.com' }]}
        pipelineRunName="pipelinerun-1"
        pipelineRunStatus="Succeeded"
      />,
    );
    screen.getByRole('link', { name: 'result link' });
  });

  test('should return empty state for failed pipelinerun', () => {
    render(
      <ResultsList
        results={[{ name: 'test', value: 'https://www.test.com' }]}
        pipelineRunName="pipelinerun-1"
        pipelineRunStatus="Failed"
      />,
    );
    screen.getByText('pipelinerun-1 results not available due to failure');
  });
});
