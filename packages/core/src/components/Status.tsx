import React from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import WarningIcon from '@mui/icons-material/Warning';

import { styled } from '@mui/material/styles';

import OffIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import UnknownIcon from '@mui/icons-material/HelpOutline';
import AngleDoubleRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import BanIcon from '@mui/icons-material/NotInterestedOutlined';
import PauseIcon from '@mui/icons-material/PauseCircleOutlineOutlined';

import { StatusIconAndText } from './StatusIconAndText';

const iconSx = {
  height: '0.8em',
  width: '0.8em',
  position: 'relative',
  top: '0.125em',
  flexShrink: 0,
  mr: 0.6,
};

const DASH = '-';

const StyledCheckCircleIcon = styled(CheckCircleIcon)(({ theme }) => ({
  color: theme.palette.success.main,
}));

const StyledErrorIcon = styled(ErrorIcon)(({ theme }) => ({
  color: theme.palette.error.main,
}));

const StyledHourglassEmptyIcon = styled(HourglassEmptyIcon)(({ theme }) => ({
  color: theme.palette.warning.main,
}));

const StyledPlayCircleOutlineIcon = styled(PlayCircleOutlineIcon)(({ theme }) => ({
  color: theme.palette.info.main,
}));

const StyledWarningIcon = styled(WarningIcon)(({ theme }) => ({
  color: theme.palette.warning.main,
}));

const StatusIcon = ({
  statusKey,
  className,
}: {
  statusKey: 'ok' | 'pending' | 'running' | 'warning' | 'error';
  className?: string;
}) => {
  const commonProps = { className, sx: iconSx };

  switch (statusKey) {
    case 'ok':
      return <StyledCheckCircleIcon {...commonProps} />;
    case 'pending':
      return <StyledHourglassEmptyIcon {...commonProps} />;
    case 'running':
      return <StyledPlayCircleOutlineIcon {...commonProps} />;
    case 'warning':
      return <StyledWarningIcon {...commonProps} />;
    case 'error':
      return <StyledErrorIcon {...commonProps} />;
    default:
      return null;
  }
};

/**
 * Component for displaying a status message
 * @param {string} status - type of status to be displayed
 * @param {boolean} [iconOnly] - (optional) if true, only displays icon
 * @param {string} [className] - (optional) additional class name for the component
 * @param {string} [displayStatusText] - (optional) use a different text to display the status

 * @example
 * ```tsx
 * <Status status='Warning' />
 * ```
 */
export const Status = ({
  status,
  iconOnly,
  className,
  displayStatusText,
  dataTestId,
  iconStyles,
  iconClassName,
}: {
  status: string | null;
  displayStatusText?: string;
  iconOnly?: boolean;
  className?: string;
  dataTestId?: string;
  iconStyles?: React.CSSProperties;
  iconClassName?: string;
}): React.ReactElement => {
  const statusProps = {
    title: displayStatusText || status || '',
    iconOnly,
    className,
    dataTestId,
  };

  switch (status) {
    case 'New':
    case 'Idle':
    case 'Pending':
    case 'PipelineNotStarted':
      return (
        <StatusIconAndText
          {...statusProps}
          icon={<StatusIcon statusKey="pending" className={iconClassName} />}
        />
      );

    case 'In Progress':
    case 'Progress':
    case 'Progressing':
    case 'Installing':
    case 'InstallReady':
    case 'Replacing':
    case 'Running':
    case 'Updating':
    case 'Upgrading':
    case 'PendingInstall':
      return (
        <StatusIconAndText
          {...statusProps}
          icon={<StatusIcon statusKey="running" className={iconClassName} />}
        />
      );

    case 'Cancelled':
    case 'Deleting':
    case 'Expired':
    case 'Not Ready':
    case 'Cancelling':
    case 'Terminating':
    case 'Superseded':
    case 'Uninstalling':
      return (
        <StatusIconAndText {...statusProps} icon={<BanIcon sx={iconSx} style={iconStyles} />} />
      );

    case 'Warning':
    case 'RequiresApproval':
      return (
        <StatusIconAndText
          {...statusProps}
          icon={<StatusIcon statusKey="warning" className={iconClassName} />}
        />
      );

    case 'ImagePullBackOff':
    case 'Error':
    case 'Failed':
    case 'Failure':
    case 'CrashLoopBackOff':
    case 'ErrImagePull':
      return (
        <StatusIconAndText
          {...statusProps}
          icon={<StatusIcon statusKey="error" className={iconClassName} />}
        />
      );

    case 'Completed':
    case 'Succeeded':
    case 'Synced':
      return (
        <StatusIconAndText
          {...statusProps}
          icon={<StatusIcon statusKey="ok" className={iconClassName} />}
        />
      );

    case 'Skipped':
      return (
        <StatusIconAndText
          {...statusProps}
          icon={<AngleDoubleRightIcon sx={iconSx} style={iconStyles} />}
        />
      );
    case 'Paused':
      return (
        <StatusIconAndText {...statusProps} icon={<PauseIcon sx={iconSx} style={iconStyles} />} />
      );
    case 'Stopped':
      return (
        <StatusIconAndText {...statusProps} icon={<OffIcon sx={iconSx} style={iconStyles} />} />
      );

    case 'Unknown':
      return (
        <StatusIconAndText {...statusProps} icon={<UnknownIcon sx={iconSx} style={iconStyles} />} />
      );

    default:
      return <>{status || DASH}</>;
  }
};
