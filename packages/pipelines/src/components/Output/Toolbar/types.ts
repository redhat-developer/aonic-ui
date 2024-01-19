import { ToolbarChip, ToolbarChipGroup } from '@patternfly/react-core';

export type FilterChip = string | ToolbarChip;
export type FilterChipGroup = string | ToolbarChipGroup;

export enum SubTab {
  imageScan = 'imageScan',
  imageCheck = 'imageCheck',
  deploymentCheck = 'deploymentCheck',
}

export enum ToolBarFilterId {
  name = 'Name',
  status = 'Status',
  severity = 'Severity',
  component = 'Component',
  acsImageScanSeverity = 'ACSImageScanSeverity',
  acsImageCheckSeverity = 'ACSImageCheckSeverity',
  acsImageScanCveID = 'ACSImageScanCveId',
  acsDeploymentCheckSeverity = 'ACSDeploymentCheckSeverity',
  acsDeploymentCheckPolicyName = 'ACSDeploymentCheckPolicyName',
  removeAll = 'RemoveAll',
}

export type ToolBarFilterProps = {
  onDeleteChip: (category: FilterChipGroup, chip: FilterChip) => void;
  onClearAllFilters: (type?: SubTab) => void;
};
