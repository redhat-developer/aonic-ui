# @aonic-ui/pipelines

## 3.1.0

### Minor Changes

- 1c254ac: Add optional chaining when sorting to prevent errors.

## 3.0.0

### Major Changes

- b870828: Upgrade to patternfly v6

## 2.0.0

### Major Changes

- 977f231: Added the hooks which are related to tekton results to fetch pipelineruns and taskruns from etcd storage and tekton results storage.

  below are the hooks which are added and the description,

  useRuns - Fetch data from both k8s and tekton results
  useTektonResultsRuns - Fetch data from tekton results
  usePipelineRuns - Fetch PipelineRunsfrom both k8s and tekton results
  useTRPipelineRuns - Fetch PipelineRuns from tekton results
  useTaskRuns - Fetch TaskRuns from both k8s and tekton results
  useTRTaskRuns - Fetch TaskRuns from tekton results
  useTRTaskRunLog - Fetch tekton results TaskRuns logs
  usePipelineRunsForPipelineOrRepository - Fetch PipelineRuns for Pipeline or Repository from both k8s and tekton results
  useTaskRunsForPipelineRunOrTask - Fetch TaskRuns for PipelineRun or Task from both k8s and tekton results

### Patch Changes

- 6718cd3: Handle the invalid data for acs image scan tab

## 1.1.1

### Patch Changes

- 96cbcd1: Handle the invalid input for acs table gracefully

## 1.1.0

### Minor Changes

- e44299e: Added core tekton types
  Added integration utils, hooks and sample data helpers

### Patch Changes

- db3639d: replace static image repo string with actual image link
- f18f066: add tab auto selection based on the availability of the tab data

## 1.0.1

### Patch Changes

- 987b97a: Update react-table from devDependancies to dependancies
  export the output component types

## 1.0.0

### Major Changes

- 5b75204: ### New features

  - Output Component https://github.com/redhat-developer/aonic-ui/pull/7

    - Added Enterprise contract, Advanced cluster security and Other pipelinerun result sections. Each section is conditionally rendered based on the availablity of the data and provides overview, summary and report. These are expandable/collapsable sections and provides ability to filter and sort by the columns.
    - Enterprise contract card
      - EC policy report information is visualized in tabular format.
    - Advanced Cluster security card
      - ACS card visualizes the security scan/check reports in tabular format. It supports three subtabs namely Image Scan, Image check and Deployment check.
    - Other results card
      - This section renders the key/value pairs in tabular format.
