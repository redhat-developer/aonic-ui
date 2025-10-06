# @aonic-ui/pipelines

@aonic-pipelines UI component library provides a set of customizable and easy-to-use components for building modern web applications with React. It contains UI components, utilities and types which can be used in tekton based web console.

## Getting Started

### Installation

```bash
npm install @aonic-ui/pipelines
```

### Usage

Basic

```bash
import { Output, usePipelineRunOutput } from '@aonic-ui/pipelines';

// Example usage of Output component

<Output
  pipelineRunName="pipelineRunName"
  pipelineRunStatus="Succeeded"
  results={[{name: 'result-1',value: 'value'}]}/>
```

Using helper functions

```bash
import { Output, usePipelineRunOutput } from '@aonic-ui/pipelines';

  const output = usePipelineRunOutput(
    mockData.pipelineRun as PipelineRunKind,
    mockData.taskRuns,
    getLogs);

  const getLogs = (podName, containerName): Promise<string> => {

    // fetching the pod logs code goes here.

    return Promise.resolve('logs...')
  }

  return (
  <Output
  results={output.results.data}
  pipelineRunName="pipelineRunName"
  pipelineRunStatus={output.status}
  enterpriseContractPolicies={output.ec?.data}
  acsImageScanResult={output.acsImageScan?.data}
  acsImageCheckResults={output.acsImageCheck?.data}
  acsDeploymentCheckResults={output.acsDeploymentCheck?.data}
  />
  )
```
