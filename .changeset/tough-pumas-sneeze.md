---
"@aonic-ui/pipelines": major
---

Added the hooks which are related to tekton results to fetch pipelineruns and taskruns from etcd storage and tekton results storage.

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
