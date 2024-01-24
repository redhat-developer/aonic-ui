import '@patternfly/react-core/dist/styles/base.css';
import { ResultsList } from '@aonic-ui/pipelines/src';
import { acsImageCheckResults } from '@aonic-ui/pipelines/src/components/Output/data';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Pipelines/Output/Cards/Others',
  component: ResultsList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof ResultsList>;
export default meta;

type Story = StoryObj<typeof meta>;

export const OtherTab: Story = {
  args: {
    results: [
      { name: 'result-key', value: 'results-value' },
      { name: 'result-key-2', value: 'http://www.google.com' },
      {
        name: 'result-key-3',
        value: JSON.stringify(acsImageCheckResults),
      },
    ],
    pipelineRunName: 'pipelinerun-name',
    pipelineRunStatus: 'Succeeded',
  },
  parameters: {},
};
