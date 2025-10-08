import React from 'react';
import { Status } from '@aonic-ui/core/src';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Status> = {
  title: 'Core/Status',
  component: Status,
  parameters: {
    docs: {
      description: {
        component:
          'A component for displaying status messages with appropriate icons and colors. Supports various status types including success, error, warning, pending, and running states.',
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: [
        'New',
        'Idle',
        'Pending',
        'PipelineNotStarted',
        'In Progress',
        'Progress',
        'Progressing',
        'Installing',
        'InstallReady',
        'Replacing',
        'Running',
        'Updating',
        'Upgrading',
        'PendingInstall',
        'Cancelled',
        'Deleting',
        'Expired',
        'Not Ready',
        'Cancelling',
        'Terminating',
        'Superseded',
        'Uninstalling',
        'Warning',
        'RequiresApproval',
        'ImagePullBackOff',
        'Error',
        'Failed',
        'Failure',
        'CrashLoopBackOff',
        'ErrImagePull',
        'Completed',
        'Succeeded',
        'Synced',
        'Skipped',
        'Paused',
        'Stopped',
        'Unknown',
        null,
      ],
      description: 'The status string to display',
    },
    iconOnly: {
      control: 'boolean',
      description: 'If true, only displays the icon without text',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name for the component',
    },
    displayStatusText: {
      control: 'text',
      description: 'Custom text to display instead of the status value',
    },
    dataTestId: {
      control: 'text',
      description: 'Test ID for testing purposes',
    },
    iconClassName: {
      control: 'text',
      description: 'Additional CSS class name for the icon',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Status>;

// Success States
export const Success: Story = {
  args: {
    status: 'Completed',
  },
};

export const Succeeded: Story = {
  args: {
    status: 'Succeeded',
  },
};

export const Synced: Story = {
  args: {
    status: 'Synced',
  },
};

// Error States
export const Error: Story = {
  args: {
    status: 'Error',
  },
};

export const Failed: Story = {
  args: {
    status: 'Failed',
  },
};

export const CrashLoopBackOff: Story = {
  args: {
    status: 'CrashLoopBackOff',
  },
};

// Warning States
export const Warning: Story = {
  args: {
    status: 'Warning',
  },
};

export const RequiresApproval: Story = {
  args: {
    status: 'RequiresApproval',
  },
};

// Running States
export const Running: Story = {
  args: {
    status: 'Running',
  },
};

export const InProgress: Story = {
  args: {
    status: 'In Progress',
  },
};

export const Installing: Story = {
  args: {
    status: 'Installing',
  },
};

// Pending States
export const Pending: Story = {
  args: {
    status: 'Pending',
  },
};

export const New: Story = {
  args: {
    status: 'New',
  },
};

export const Idle: Story = {
  args: {
    status: 'Idle',
  },
};

// Cancelled States
export const Cancelled: Story = {
  args: {
    status: 'Cancelled',
  },
};

export const Deleting: Story = {
  args: {
    status: 'Deleting',
  },
};

export const Expired: Story = {
  args: {
    status: 'Expired',
  },
};

// Special States
export const Skipped: Story = {
  args: {
    status: 'Skipped',
  },
};

export const Paused: Story = {
  args: {
    status: 'Paused',
  },
};

export const Stopped: Story = {
  args: {
    status: 'Stopped',
  },
};

export const Unknown: Story = {
  args: {
    status: 'Unknown',
  },
};

// Icon Only Variants
export const IconOnlySuccess: Story = {
  args: {
    status: 'Completed',
    iconOnly: true,
  },
};

export const IconOnlyError: Story = {
  args: {
    status: 'Error',
    iconOnly: true,
  },
};

export const IconOnlyWarning: Story = {
  args: {
    status: 'Warning',
    iconOnly: true,
  },
};

export const IconOnlyRunning: Story = {
  args: {
    status: 'Running',
    iconOnly: true,
  },
};

export const IconOnlyPending: Story = {
  args: {
    status: 'Pending',
    iconOnly: true,
  },
};

// Custom Display Text
export const CustomDisplayText: Story = {
  args: {
    status: 'Running',
    displayStatusText: 'Custom Status Text',
  },
};

// With Custom Styling
export const WithCustomClassName: Story = {
  args: {
    status: 'Completed',
    className: 'custom-status-class',
  },
};

export const WithCustomIconClassName: Story = {
  args: {
    status: 'Warning',
    iconClassName: 'custom-icon-class',
  },
};

// Null/Empty Status
export const NullStatus: Story = {
  args: {
    status: null,
  },
};

// All Status Types Showcase
export const AllStatusTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3>Success States</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Status status="Completed" />
        <Status status="Succeeded" />
        <Status status="Synced" />
      </div>

      <h3>Error States</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Status status="Error" />
        <Status status="Failed" />
        <Status status="CrashLoopBackOff" />
        <Status status="ImagePullBackOff" />
      </div>

      <h3>Warning States</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Status status="Warning" />
        <Status status="RequiresApproval" />
      </div>

      <h3>Running States</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Status status="Running" />
        <Status status="In Progress" />
        <Status status="Installing" />
        <Status status="Updating" />
      </div>

      <h3>Pending States</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Status status="Pending" />
        <Status status="New" />
        <Status status="Idle" />
      </div>

      <h3>Cancelled States</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Status status="Cancelled" />
        <Status status="Deleting" />
        <Status status="Expired" />
      </div>

      <h3>Special States</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Status status="Skipped" />
        <Status status="Paused" />
        <Status status="Stopped" />
        <Status status="Unknown" />
      </div>
    </div>
  ),
};

// Icon Only Showcase
export const IconOnlyShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3>Icon Only Variants</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Status status="Completed" iconOnly />
        <Status status="Error" iconOnly />
        <Status status="Warning" iconOnly />
        <Status status="Running" iconOnly />
        <Status status="Pending" iconOnly />
        <Status status="Skipped" iconOnly />
        <Status status="Paused" iconOnly />
        <Status status="Stopped" iconOnly />
        <Status status="Unknown" iconOnly />
      </div>
    </div>
  ),
};
