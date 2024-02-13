import { createPipelineRunData, mockPipelineRunConfig } from '../utils/data-utils';
import { RunStatus } from '../utils/pipelinerun-utils';

const pipelineRunConfig: mockPipelineRunConfig = {
  name: 'test-plr',
  status: RunStatus.Running,
  tasks: [
    {
      name: 'sbom-task',
      status: RunStatus.Succeeded,
      annotations: {
        'task.output.location': 'results',
        'task.results.format': 'application/text',
        'task.results.key': 'LINK_TO_SBOM',
      },
    },
    {
      name: 'ec-task',
      status: RunStatus.Succeeded,
      annotations: {
        'task.results.type': 'ec',
        'task.results.format': 'application/json',
        'task.output.location': 'logs',
        'task.output.container': 'step-report',
      },
    },
    {
      name: 'acs-image-scan-task',
      status: RunStatus.Succeeded,
      annotations: {
        'task.results.type': 'roxctl-image-scan',
        'task.results.format': 'application/json',
        'task.output.location': 'logs',
        'task.output.container': 'step-report',
      },
    },
    {
      name: 'acs-image-check-task',
      status: RunStatus.Succeeded,
      annotations: {
        'task.results.type': 'roxctl-image-check',
        'task.results.format': 'application/json',
        'task.output.location': 'logs',
        'task.output.container': 'step-report',
      },
    },
    {
      name: 'acs-deployment-check-task',
      status: RunStatus.Succeeded,
      annotations: {
        'task.results.type': 'roxctl-deployment-check',
        'task.results.format': 'application/json',
        'task.output.location': 'logs',
        'task.output.container': 'step-report',
      },
    },
    {
      name: 'sbom-with-external-link-task',
      status: RunStatus.Succeeded,
      annotations: {
        'task.output.location': 'results',
        'task.results.type': 'external-link',
        'task.results.format': 'application/text',
        'task.results.key': 'LINK_TO_SBOM',
      },
      results: [
        {
          name: 'LINK_TO_SBOM',
          type: 'string',
          value: 'http://quay.io/test/image:build-8e536-1692702836',
        },
      ],
    },
  ],
  createTaskRuns: true,
  createPods: true,
};

const { pipelineRun, taskRuns, pods } = createPipelineRunData(pipelineRunConfig);

export const SampleOutputPipelineRunData = {
  pipelineRun,
  taskRuns,
  pods,
};
