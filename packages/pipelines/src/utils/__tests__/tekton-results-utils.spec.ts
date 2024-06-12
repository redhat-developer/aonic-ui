import { k8sGet } from '@openshift-console/dynamic-plugin-sdk';
import { DataType, TektonResultsOptions } from '../../types/tekton-results';
import { createTektonResultsSummaryUrl, getTektonResultsAPIUrl } from '../tekton-results-utils';

jest.mock('../tekton-results-utils', () => ({
  ...jest.requireActual('../tekton-results-utils'),
  getTektonResultsAPIUrl: jest.fn(),
}));

const mockK8sGet = k8sGet as jest.Mock;
const mockGetTektonResultsAPIUrl = getTektonResultsAPIUrl as jest.Mock;

describe('createTektonResultsSummaryUrl', () => {
  beforeEach(() => {
    mockGetTektonResultsAPIUrl.mockClear();
    mockK8sGet.mockClear();
  });

  it('should construct URL with default base URL', async () => {
    mockGetTektonResultsAPIUrl.mockResolvedValue(
      'tekton-results-api-service.openshift-pipelines.svc.cluster.local:8080',
    );

    const options: TektonResultsOptions = {
      summary: 'summary-value',
      groupBy: 'group-by-value',
      limit: 50,
      pageSize: 30,
      data_type: DataType.TaskRun,
    };

    const url = await createTektonResultsSummaryUrl('namespace', options);

    expect(url).toBe(
      'https://tekton-results-api-service.openshift-pipelines.svc.cluster.local:8080/apis/results.tekton.dev/v1alpha2/parents/namespace/results/-/records/summary?summary=summary-value&group_by=group-by-value&page_size=50&filter=data_type+%3D%3D+%22tekton.dev%2Fv1beta1.TaskRun%22',
    );
  });

  it('should construct URL with custom base URL', async () => {
    const options: TektonResultsOptions = {
      summary: 'summary-value',
      groupBy: 'group-by-value',
      limit: 50,
      pageSize: 30,
      data_type: DataType.TaskRun,
    };

    const url = await createTektonResultsSummaryUrl(
      'namespace',
      options,
      undefined,
      'tekton-results-api-service.openshift-pipelines.svc.cluster.local:8080',
    );

    expect(url).toBe(
      'https://tekton-results-api-service.openshift-pipelines.svc.cluster.local:8080/apis/results.tekton.dev/v1alpha2/parents/namespace/results/-/records/summary?summary=summary-value&group_by=group-by-value&page_size=50&filter=data_type+%3D%3D+%22tekton.dev%2Fv1beta1.TaskRun%22',
    );
  });

  it('should use default values when some options are not provided', async () => {
    mockGetTektonResultsAPIUrl.mockResolvedValue(
      'tekton-results-api-service.openshift-pipelines.svc.cluster.local:8080',
    );

    const options: TektonResultsOptions = {
      summary: 'summary-value',
    };

    const url = await createTektonResultsSummaryUrl('namespace', options);

    expect(url).toBe(
      'https://tekton-results-api-service.openshift-pipelines.svc.cluster.local:8080/apis/results.tekton.dev/v1alpha2/parents/namespace/results/-/records/summary?summary=summary-value&page_size=30&filter=data_type+%3D%3D+%22%22',
    );
  });

  it('should construct URL with nextPageToken', async () => {
    mockGetTektonResultsAPIUrl.mockResolvedValue(
      'tekton-results-api-service.openshift-pipelines.svc.cluster.local:8080',
    );

    const options: TektonResultsOptions = {
      summary: 'summary-value',
      groupBy: 'group-by-value',
      limit: 50,
      pageSize: 30,
      data_type: DataType.TaskRun,
    };

    const url = await createTektonResultsSummaryUrl('namespace', options, 'next-page-token');

    expect(url).toBe(
      'https://tekton-results-api-service.openshift-pipelines.svc.cluster.local:8080/apis/results.tekton.dev/v1alpha2/parents/namespace/results/-/records/summary?summary=summary-value&group_by=group-by-value&page_size=50&page_token=next-page-token&filter=data_type+%3D%3D+%22tekton.dev%2Fv1beta1.TaskRun%22',
    );
  });
});
