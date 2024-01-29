
# @aonic-ui/pipelines

@aonic-pipelines UI component library provides a set of customizable and easy-to-use components for building modern web applications with React. It contains UI components, utilities and types which can be used in tekton based web console.

## Getting Started




### Installation

```bash
npm install @aonic-ui/pipelines
```


### Usage


```bash
import { OutputTab } from '@aonic-ui/pipelines';

// Example usage of OutputTab component

<OutputTab 
  pipelineRunName="pipelineRunName"
  pipelineRunStatus="Succeeded"
  results={[{name: 'result-1',value: 'value'}]}/>
```
