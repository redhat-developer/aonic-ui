import { DataType, TektonResultsOptions } from '../../types/tekton-results';
import { createTektonResultsSummaryUrl } from '../tekton-results-utils';

describe('createTektonResultsSummaryUrl', () => {
  const tektonResultsBaseURL = 'tekton-results.example.com';

  it('should construct URL with default base URL', async () => {
    const options: TektonResultsOptions = {
      summary: 'summary-value',
      groupBy: 'group-by-value',
      limit: 50,
      pageSize: 30,
      data_type: DataType.TaskRun,
    };

    const url = await createTektonResultsSummaryUrl('namespace', tektonResultsBaseURL, options);

    expect(url).toBe(
      'https://tekton-results.example.com/apis/results.tekton.dev/v1alpha2/parents/namespace/results/-/records/summary?summary=summary-value&group_by=group-by-value&page_size=50&filter=data_type+%3D%3D+%22tekton.dev%2Fv1beta1.TaskRun%22',
    );
  });

  it('should use default values when some options are not provided', async () => {
    const options: TektonResultsOptions = {
      summary: 'summary-value',
    };

    const url = await createTektonResultsSummaryUrl('namespace', tektonResultsBaseURL, options);

    expect(url).toBe(
      'https://tekton-results.example.com/apis/results.tekton.dev/v1alpha2/parents/namespace/results/-/records/summary?summary=summary-value&page_size=30&filter=data_type+%3D%3D+%22%22',
    );
  });

  it('should construct URL with nextPageToken', async () => {
    const options: TektonResultsOptions = {
      summary: 'summary-value',
      groupBy: 'group-by-value',
      limit: 50,
      pageSize: 30,
      data_type: DataType.TaskRun,
    };

    const url = await createTektonResultsSummaryUrl(
      'namespace',
      tektonResultsBaseURL,
      options,
      'next-page-token',
    );

    expect(url).toBe(
      'https://tekton-results.example.com/apis/results.tekton.dev/v1alpha2/parents/namespace/results/-/records/summary?summary=summary-value&group_by=group-by-value&page_size=50&page_token=next-page-token&filter=data_type+%3D%3D+%22tekton.dev%2Fv1beta1.TaskRun%22',
    );
  });
});
