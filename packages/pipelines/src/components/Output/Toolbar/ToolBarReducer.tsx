import * as React from 'react';
import { FilterChip } from './types';

export enum ToolBarActionKind {
  updateNameFilter = 'UPDATE_NAME_FILTER',
  resetNameFilter = 'RESET_NAME_FILTER',

  addCveIdFilter = 'ADD_CVEID_FILTER',
  removeCveIdFilter = 'REMOVE_CVEID_FILTER',
  resetCveIdFilter = 'RESET_CVEID_FILTER',

  addStatusFilter = 'ADD_STATUS_FILTER',
  removeStatusFilter = 'REMOVE_STATUS_FILTER',
  resetStatusFilter = 'RESET_STATUS_FILTER',

  addSeverityFilter = 'ADD_SEVERITY_FILTER',
  removeSeverityFilter = 'REMOVE_SEVERITY_FILTER',
  resetSeverityFilter = 'RESET_SEVERITY_FILTER',

  addComponentFilter = 'ADD_COMPONENT_FILTER',
  removeComponentFilter = 'REMOVE_COMPONENT_FILTER',
  resetComponentFilter = 'RESET_COMPONENT_FILTER',

  updateAcsPoliceNameFilter = 'UPDATE_ACS_POLICY_NAME_FILTER',
  resetAcsPoliceNameFilter = 'RESET_ACS_POLICY_NAME_FILTER',

  addImageCheckSeverityFilter = 'ADD_IMAGE_CHECK_SEVERITY_FILTER',
  removeImageCheckSeverityFilter = 'REMOVE_IMAGE_CHECK_SEVERITY_FILTER',
  resetImageCheckSeverityFilter = 'RESET_IMAGE_CHECK_SEVERITY_FILTER',

  addDeploymentCheckSeverityFilter = 'ADD_DEPLOYMENT_CHECK_SEVERITY_FILTER',
  removeDeploymentCheckSeverityFilter = 'REMOVE_DEPLOYMENT_CHECK_SEVERITY_FILTER',
  resetDeploymentCheckSeverityFilter = 'RESET_DEPLOYMENT_CHECK_SEVERITY_FILTER',

  resetAllFilters = 'CLEAR_ALL_FILTERS',
}

type Merge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof A & keyof B
    ? A[K] | B[K]
    : K extends keyof B
      ? B[K]
      : K extends keyof A
        ? A[K]
        : never;
};

type ToolBarActionKey = keyof typeof ToolBarActionKind;

// An interface for our actions
type ToolBarAction = {
  type: ToolBarActionKind;
  payload: string;
};

type ToolBarArrayFilterAction = {
  type: ToolBarActionKind.addComponentFilter | ToolBarActionKind.removeComponentFilter;
  payload: string;
};

type ToolBarFilterResetAction = {
  type: ToolBarActionKind.resetComponentFilter;
  payload: string | FilterChip | null | undefined;
};
type Filter = string | FilterChip;

type addOrRemoveDispatchers = {
  [key in Exclude<ToolBarActionKey, `reset${string}`>]: (payload: string | FilterChip) => void;
};

type resetDispatchers = {
  [key in Extract<ToolBarActionKey, `reset${string}`>]: () => void;
};

type PayloadActionCallback = (() => void) & ((d: string) => void);

// An interface for our state
export interface ToolBarState {
  nameFilter: string;
  cveIdFilters: Filter[];
  statusFilters: Filter[];
  severityFilters: Filter[];
  componentFilters: Filter[];
  acsPolicyNameFilter: string;
  acsImageCheckSeverityFilters: Filter[];
  acsDeploymentCheckSeverityFilters: Filter[];
}

export type ToolBarActionDispatch = Merge<addOrRemoveDispatchers, resetDispatchers>;

export const ToolBarReducer = (
  state: ToolBarState,
  action: ToolBarFilterResetAction | ToolBarAction | ToolBarArrayFilterAction,
): ToolBarState => {
  const { type, payload } = action;
  switch (type) {
    case ToolBarActionKind.updateNameFilter:
      return {
        ...state,
        nameFilter: payload,
      };

    case ToolBarActionKind.resetNameFilter:
      return {
        ...state,
        nameFilter: '',
      };

    case ToolBarActionKind.updateAcsPoliceNameFilter:
      return {
        ...state,
        acsPolicyNameFilter: payload,
      };

    case ToolBarActionKind.resetAcsPoliceNameFilter:
      return {
        ...state,
        acsPolicyNameFilter: '',
      };

    case ToolBarActionKind.addStatusFilter:
      return {
        ...state,
        statusFilters: [...state.statusFilters, payload],
      };

    case ToolBarActionKind.removeStatusFilter:
      return {
        ...state,
        statusFilters: state.statusFilters.filter((stat) => stat !== payload),
      };

    case ToolBarActionKind.resetStatusFilter:
      return {
        ...state,
        statusFilters: [],
      };

    case ToolBarActionKind.addSeverityFilter:
      return {
        ...state,
        severityFilters: [...state.severityFilters, payload],
      };

    case ToolBarActionKind.removeSeverityFilter:
      return {
        ...state,
        severityFilters: state.severityFilters.filter((stat) => stat !== payload),
      };

    case ToolBarActionKind.resetSeverityFilter:
      return {
        ...state,
        severityFilters: [],
      };

    case ToolBarActionKind.addComponentFilter:
      return {
        ...state,
        componentFilters: [...state.componentFilters, payload],
      };

    case ToolBarActionKind.removeComponentFilter:
      return {
        ...state,
        componentFilters: state.componentFilters.filter((stat) => stat !== payload),
      };

    case ToolBarActionKind.resetComponentFilter:
      return {
        ...state,
        componentFilters: [],
      };

    case ToolBarActionKind.addCveIdFilter:
      return {
        ...state,
        cveIdFilters: [...state.cveIdFilters, payload],
      };

    case ToolBarActionKind.removeCveIdFilter:
      return {
        ...state,
        cveIdFilters: state.cveIdFilters.filter((stat) => stat !== payload),
      };

    case ToolBarActionKind.resetCveIdFilter:
      return {
        ...state,
        cveIdFilters: [],
      };

    case ToolBarActionKind.addImageCheckSeverityFilter:
      return {
        ...state,
        acsImageCheckSeverityFilters: [...state.acsImageCheckSeverityFilters, payload],
      };

    case ToolBarActionKind.removeImageCheckSeverityFilter:
      return {
        ...state,
        acsImageCheckSeverityFilters: state.acsImageCheckSeverityFilters.filter(
          (stat) => stat !== payload,
        ),
      };

    case ToolBarActionKind.resetImageCheckSeverityFilter:
      return {
        ...state,
        acsImageCheckSeverityFilters: [],
      };

    case ToolBarActionKind.addDeploymentCheckSeverityFilter:
      return {
        ...state,
        acsDeploymentCheckSeverityFilters: [...state.acsDeploymentCheckSeverityFilters, payload],
      };

    case ToolBarActionKind.removeDeploymentCheckSeverityFilter:
      return {
        ...state,
        acsDeploymentCheckSeverityFilters: state.acsDeploymentCheckSeverityFilters.filter(
          (stat) => stat !== payload,
        ),
      };

    case ToolBarActionKind.resetDeploymentCheckSeverityFilter:
      return {
        ...state,
        acsDeploymentCheckSeverityFilters: [],
      };

    case ToolBarActionKind.resetAllFilters:
      return {
        ...state,
        nameFilter: '',
        cveIdFilters: [],
        statusFilters: [],
        componentFilters: [],
        severityFilters: [],
        acsPolicyNameFilter: '',
        acsImageCheckSeverityFilters: [],
        acsDeploymentCheckSeverityFilters: [],
      };
    default:
      return state;
  }
};

export const useToolBarReducer = (): [state: ToolBarState, dispatch: ToolBarActionDispatch] => {
  const initialState: ToolBarState = {
    nameFilter: '',
    statusFilters: [],
    severityFilters: [],
    componentFilters: [],
    cveIdFilters: [],
    acsPolicyNameFilter: '',
    acsImageCheckSeverityFilters: [],
    acsDeploymentCheckSeverityFilters: [],
  };

  const [state, dispatchAction] = React.useReducer(ToolBarReducer, initialState);

  const actionCreator = (type: ToolBarActionKind, payload?: string) =>
    dispatchAction({
      type,
      payload,
    } as ToolBarFilterResetAction | ToolBarAction | ToolBarArrayFilterAction);

  //Generates dispatch methods based on the ToolBarActionKind enum.
  const dispatch: ToolBarActionDispatch = Object.keys(ToolBarActionKind).reduce(
    (acc, key) => {
      const actionKey = key as keyof typeof ToolBarActionKind;
      if (actionKey.startsWith('reset')) {
        acc[actionKey] = () => actionCreator(ToolBarActionKind[actionKey]);
      } else {
        acc[actionKey] = ((payload: string) =>
          actionCreator(ToolBarActionKind[actionKey], payload)) as PayloadActionCallback;
      }

      return acc;
    },
    {} as Record<keyof typeof ToolBarActionKind, PayloadActionCallback>,
  );

  return [state, dispatch];
};
