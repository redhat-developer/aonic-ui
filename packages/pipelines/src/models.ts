import { K8sKind } from '@openshift-console/dynamic-plugin-sdk';
import { chart_color_green_400 as tektonGroupColor } from '@patternfly/react-tokens/dist/js/chart_color_green_400';

const color = tektonGroupColor.value;

export const PipelineModel = {
  apiGroup: 'tekton.dev',
  apiVersion: 'v1',
  label: 'Pipeline',
  // t('plugin__pipelines-console-plugin~Pipeline')
  labelKey: 'Pipeline',
  // t('plugin__pipelines-console-plugin~Pipelines')
  labelPluralKey: 'Pipelines',
  plural: 'pipelines',
  abbr: 'PL',
  namespaced: true,
  kind: 'Pipeline',
  id: 'pipeline',
  labelPlural: 'Pipelines',
  crd: true,
  color,
};

export const PipelineModelV1Beta1 = {
  apiGroup: 'tekton.dev',
  apiVersion: 'v1beta1',
  label: 'Pipeline',
  // t('plugin__pipelines-console-plugin~Pipeline')
  labelKey: 'Pipeline',
  // t('plugin__pipelines-console-plugin~Pipelines')
  labelPluralKey: 'Pipelines',
  plural: 'pipelines',
  abbr: 'PL',
  namespaced: true,
  kind: 'Pipeline',
  id: 'pipeline',
  labelPlural: 'Pipelines',
  crd: true,
  color,
};

export const RepositoryModel = {
  apiGroup: 'pipelinesascode.tekton.dev',
  apiVersion: 'v1alpha1',
  label: 'Repository',
  // t('plugin__pipelines-console-plugin~Repository')
  labelKey: 'Repository',
  // t('plugin__pipelines-console-plugin~Repositories')
  labelPluralKey: 'Repositories',
  plural: 'repositories',
  abbr: 'R',
  namespaced: true,
  kind: 'Repository',
  id: 'repository',
  labelPlural: 'Repositories',
  crd: true,
  color,
};

export const TektonResultModel: K8sKind = {
  apiGroup: 'operator.tekton.dev',
  apiVersion: 'v1alpha1',
  kind: 'TektonResult',
  plural: 'tektonresults',
  label: 'tektonresult',
  // t('plugin__pipelines-console-plugin~TektonResult')
  labelKey: 'TektonResult',
  labelPlural: 'TektonResults',
  // t('plugin__pipelines-console-plugin~TektonResults')
  labelPluralKey: 'TektonResults',
  id: 'tektonResult',
  abbr: 'TR',
  crd: true,
  color: '#38812f',
};

export const RouteModel: K8sKind = {
  label: 'Route',
  // t('plugin__pipelines-console-plugin~Route')
  labelKey: 'Route',
  labelPlural: 'Routes',
  // t('plugin__pipelines-console-plugin~Routes')
  labelPluralKey: 'Routes',
  apiGroup: 'route.openshift.io',
  apiVersion: 'v1',
  plural: 'routes',
  abbr: 'RT',
  namespaced: true,
  kind: 'Route',
  id: 'route',
};

export const TaskRunModel: K8sKind = {
  apiGroup: 'tekton.dev',
  apiVersion: 'v1',
  label: 'TaskRun',
  // t('plugin__pipelines-console-plugin~TaskRun')
  labelKey: 'TaskRun',
  // t('plugin__pipelines-console-plugin~TaskRuns')
  labelPluralKey: 'TaskRuns',
  plural: 'taskruns',
  abbr: 'TR',
  namespaced: true,
  kind: 'TaskRun',
  id: 'taskrun',
  labelPlural: 'TaskRuns',
  crd: true,
  color,
};

export const PipelineRunModel: K8sKind = {
  apiGroup: 'tekton.dev',
  apiVersion: 'v1',
  label: 'PipelineRun',
  // t('plugin__pipelines-console-plugin~PipelineRun')
  labelKey: 'PipelineRun',
  // t('plugin__pipelines-console-plugin~PipelineRuns')
  labelPluralKey: 'PipelineRuns',
  plural: 'pipelineruns',
  abbr: 'PLR',
  namespaced: true,
  kind: 'PipelineRun',
  id: 'pipelinerun',
  labelPlural: 'PipelineRuns',
  crd: true,
  color,
};

export const PipelineRunModelV1Beta1: K8sKind = {
  apiGroup: 'tekton.dev',
  apiVersion: 'v1beta1',
  label: 'PipelineRun',
  // t('plugin__pipelines-console-plugin~PipelineRun')
  labelKey: 'PipelineRun',
  // t('plugin__pipelines-console-plugin~PipelineRuns')
  labelPluralKey: 'PipelineRuns',
  plural: 'pipelineruns',
  abbr: 'PLR',
  namespaced: true,
  kind: 'PipelineRun',
  id: 'pipelinerun',
  labelPlural: 'PipelineRuns',
  crd: true,
  color,
};
