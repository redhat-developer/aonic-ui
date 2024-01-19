import { PipelinesButton } from '@aonic-ui/pipelines/src';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PipelinesButton> = {
  component: PipelinesButton,
};

export default meta;

type Story = StoryObj<typeof PipelinesButton>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => (
    <PipelinesButton
      {...props}
      label="Hello"
      onClick={(): void => {
        // eslint-disable-next-line no-alert -- alert for demo
        alert('Hello from Turborepo!');
      }}
    />
  ),
  name: 'Pipelines Button',
  args: {
    label: 'Hello',
  },
};
