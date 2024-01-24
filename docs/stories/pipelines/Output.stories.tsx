import '@patternfly/react-core/dist/styles/base.css';
import { Output } from '@aonic-ui/pipelines/src';
import {
  acsDeploymentCheck,
  acsImageCheckResults,
  acsImageScanResult,
  mockEnterpriseContractUIData,
} from '@aonic-ui/pipelines/src/components/Output/data';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Pipelines/Output',
  component: Output,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    pipelineRunStatus: { control: 'select', options: ['Failed', 'Succeeded'] },
  },
} satisfies Meta<typeof Output>;
export default meta;

type Story = StoryObj<typeof meta>;

export const OutputTab: Story = {
  args: {
    acsImageScanResult,
    acsImageCheckResults,
    enterpriseContractPolicies: mockEnterpriseContractUIData,
    acsDeploymentCheckResults: acsDeploymentCheck,
    results: [{ name: 'result-1', value: 'value' }],
    pipelineRunName: 'pipelineRunName',
    pipelineRunStatus: 'Succeeded',
  },
  parameters: {},
};

export const OutputTabEC: Story = {
  args: {
    enterpriseContractPolicies: mockEnterpriseContractUIData,
    results: [{ name: 'result-1', value: 'value' }],
    pipelineRunName: 'pipelineRunName',
    pipelineRunStatus: 'Succeeded',
  },
  parameters: {},
};

export const OutputTabACS: Story = {
  args: {
    acsImageScanResult,
    acsImageCheckResults,
    acsDeploymentCheckResults: acsDeploymentCheck,
    results: [{ name: 'result-1', value: 'value' }],
    pipelineRunName: 'pipelineRunName',
    pipelineRunStatus: 'Succeeded',
  },
  parameters: {},
};

export const OutputTabResults: Story = {
  args: {
    results: [{ name: 'result-1', value: 'value' }],
    pipelineRunName: 'pipelineRunName',
    pipelineRunStatus: 'Succeeded',
  },
  parameters: {},
};
