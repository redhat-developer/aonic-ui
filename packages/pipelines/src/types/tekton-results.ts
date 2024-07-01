import { Operator } from './k8s';

export enum DataType {
  PipelineRun = 'tekton.dev/v1beta1.PipelineRun',
  TaskRun = 'tekton.dev/v1beta1.TaskRun',
  Log = 'results.tekton.dev/v1alpha2.Log',
}

export declare type MatchExpression = {
  key: string;
  operator: Operator | string;
  values?: string[];
};
export declare type MatchLabels = {
  [key: string]: string;
};
export declare type Selector = {
  matchLabels?: MatchLabels;
  matchExpressions?: MatchExpression[];
};

export type ResultRecord = {
  name: string;
  uid: string;
  createTime: string;
  updateTime: string;
  etag: string;
  data: {
    // tekton.dev/v1beta1.PipelineRun | tekton.dev/v1beta1.TaskRun | results.tekton.dev/v1alpha2.Log
    type: string;
    value: string;
  };
};

export type Log = {
  result: {
    name: string;
    data: string;
  };
};

export type RecordsList = {
  nextPageToken?: string;
  records: ResultRecord[];
};

export type TektonResultsOptions = {
  pageSize?: number;
  selector?: Selector;
  // limit cannot be used in conjuction with pageSize and takes precedence
  limit?: number;
  filter?: string;
  summary?: string;
  data_type?: DataType;
  groupBy?: string;
};

export type ProxyRequest = {
  allowInsecure?: boolean;
  method: string;
  url: string;
  headers?: Record<string, string[]>;
  queryparams?: Record<string, string[]>;
  body?: string;
};

export type GetNextPage = () => void | undefined;
