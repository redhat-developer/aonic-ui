import '@patternfly/react-core/dist/styles/base.css';
import { EnterpriseContract } from '@aonic-ui/pipelines/src';
import { mockEnterpriseContractUIData } from '@aonic-ui/pipelines/src/components/Output/data';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Pipelines/Output/Cards/EnterpriseContract',
  component: EnterpriseContract,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    enterpriseContractPolicies: {},
  },
} satisfies Meta<typeof EnterpriseContract>;
export default meta;

type Story = StoryObj<typeof meta>;

export const ECCard: Story = {
  args: {
    enterpriseContractPolicies: mockEnterpriseContractUIData,
  },
  parameters: {},
};
