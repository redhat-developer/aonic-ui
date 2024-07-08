import React from 'react';
import _ from 'lodash';
import { K8sGroupVersionKind, K8sModel } from '../types/k8s';

export type GetGroupVersionKindForModel = (model: K8sModel) => K8sGroupVersionKind;

export const useDeepCompareMemoize = <T = any>(value: T, strinfigy?: boolean): T | undefined => {
  const ref = React.useRef<T>();
  if (
    strinfigy
      ? JSON.stringify(value) !== JSON.stringify(ref.current)
      : !_.isEqual(value, ref.current)
  ) {
    ref.current = value;
  }
  return ref.current;
};

export const getGroupVersionKindForModel: GetGroupVersionKindForModel = ({
  apiGroup,
  apiVersion: version,
  kind,
}) => Object.assign(Object.assign({}, apiGroup && { group: apiGroup }), { version, kind });
