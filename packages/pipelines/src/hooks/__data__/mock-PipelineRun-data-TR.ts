import { PipelineRunKind } from '../../types';

export const mockTRPipelineRuns: PipelineRunKind[] = [
  {
    apiVersion: 'tekton.dev/v1',
    kind: 'PipelineRun',
    metadata: {
      annotations: {
        'chains.tekton.dev/signed': 'true',
      },
      resourceVersion: '90214',
      name: 'pipeline-run-name-1',
      uid: 'a271f311-c9c9-473d-86f1-91628a717d67',
      creationTimestamp: '2024-06-14T07:04:32Z',
      generation: 1,
      namespace: 'test-namespace',
      finalizers: ['chains.tekton.dev/pipelinerun'],
      labels: {
        'tekton.dev/pipeline': 'hello-goodbye-4',
        'resource.loaded.from.tektonResults': 'true',
        'resource.deleted.in.k8s': 'true',
      },
    },
    spec: {
      params: [
        {
          name: 'username',
          value: 'Tekton',
        },
      ],
      pipelineRef: {
        name: 'hello-goodbye',
      },
      taskRunTemplate: {
        serviceAccountName: 'pipeline',
      },
      timeouts: {
        pipeline: '1h0m0s',
      },
    },
    status: {
      childReferences: [
        {
          apiVersion: 'tekton.dev/v1',
          kind: 'TaskRun',
          name: 'hello-goodbye-run-hello',
          pipelineTaskName: 'hello',
        },
        {
          apiVersion: 'tekton.dev/v1',
          kind: 'TaskRun',
          name: 'hello-goodbye-run-goodbye',
          pipelineTaskName: 'goodbye',
        },
      ],
      completionTime: '2024-06-14T07:04:44Z',
      conditions: [
        {
          lastTransitionTime: '2024-06-14T07:04:44Z',
          message: 'Tasks Completed: 2 (Failed: 0, Cancelled 0), Skipped: 0',
          reason: 'Succeeded',
          status: 'True',
          type: 'Succeeded',
        },
      ],
      pipelineSpec: {
        params: [
          {
            name: 'username',
            type: 'string',
          },
        ],
        tasks: [
          {
            name: 'hello',
            taskRef: {
              kind: 'Task',
              name: 'hello',
            },
            status: {
              completionTime: '2024-06-14T07:04:38Z',
              conditions: [
                {
                  lastTransitionTime: '2024-06-14T07:04:38Z',
                  message: 'All Steps have completed executing',
                  reason: 'Succeeded',
                  status: 'True',
                  type: 'Succeeded',
                },
              ],
              podName: 'hello-goodbye-run-hello-pod',
              startTime: '2024-06-14T07:04:32Z',
              steps: [
                {
                  container: 'step-echo',
                  imageID:
                    'docker.io/library/alpine@sha256:216266c86fc4dcef5619930bd394245824c2af52fd21ba7c6fa0e618657d4c3b',
                  name: 'echo',
                  terminated: {
                    containerID:
                      'cri-o://4b6f1f31407125d7ed6a97f64afbaeb6a511b50638436341d6241a307d42034f',
                    exitCode: 0,
                    finishedAt: '2024-06-14T07:04:37Z',
                    reason: 'Completed',
                    startedAt: '2024-06-14T07:04:37Z',
                  },
                },
              ],
              taskSpec: {
                steps: [
                  {
                    computeResources: {},
                    image: 'alpine',
                    name: 'echo',
                    script: '#!/bin/sh\necho "Hello World"\n',
                  },
                ],
              },
            },
          },
          {
            name: 'goodbye',
            params: [
              {
                name: 'username',
                value: 'Tekton',
              },
            ],
            runAfter: ['hello'],
            taskRef: {
              kind: 'Task',
              name: 'goodbye',
            },
            status: {
              completionTime: '2024-06-14T07:04:44Z',
              conditions: [
                {
                  lastTransitionTime: '2024-06-14T07:04:44Z',
                  message: 'All Steps have completed executing',
                  reason: 'Succeeded',
                  status: 'True',
                  type: 'Succeeded',
                },
              ],
              podName: 'hello-goodbye-run-goodbye-pod',
              startTime: '2024-06-14T07:04:38Z',
              steps: [
                {
                  container: 'step-goodbye',
                  imageID:
                    'docker.io/library/ubuntu@sha256:c279a739b31ead4ebc3e9ce04937eb8b612799b52c26133eb3b4a056d08c31a6',
                  name: 'goodbye',
                  terminated: {
                    containerID:
                      'cri-o://5a06a61f48b2b4193e76b5afe9e57cc93b944794bd403b456764a31ff78db85d',
                    exitCode: 0,
                    finishedAt: '2024-06-14T07:04:44Z',
                    reason: 'Completed',
                    startedAt: '2024-06-14T07:04:44Z',
                  },
                },
              ],
              taskSpec: {
                params: [
                  {
                    name: 'username',
                    type: 'string',
                  },
                ],
                steps: [
                  {
                    computeResources: {},
                    image: 'ubuntu',
                    name: 'goodbye',
                    script: '#!/bin/bash\necho "Goodbye Tekton!"\n',
                  },
                ],
              },
            },
          },
        ],
      },
      startTime: '2024-06-14T07:04:32Z',
    },
  },
  {
    apiVersion: 'tekton.dev/v1',
    kind: 'PipelineRun',
    metadata: {
      annotations: {
        'chains.tekton.dev/signed': 'true',
      },
      resourceVersion: '90214',
      name: 'pipeline-run-name-2',
      uid: 'a271f311-c9c9-473d-86f1-91628a717d68',
      creationTimestamp: '2024-06-14T07:04:32Z',
      generation: 1,
      namespace: 'test-namespace',
      finalizers: ['chains.tekton.dev/pipelinerun'],
      labels: {
        'tekton.dev/pipeline': 'hello-goodbye-3',
        'resource.loaded.from.tektonResults': 'true',
        'resource.deleted.in.k8s': 'true',
      },
    },
    spec: {
      params: [
        {
          name: 'username',
          value: 'Tekton',
        },
      ],
      pipelineRef: {
        name: 'hello-goodbye',
      },
      taskRunTemplate: {
        serviceAccountName: 'pipeline',
      },
      timeouts: {
        pipeline: '1h0m0s',
      },
    },
    status: {
      childReferences: [
        {
          apiVersion: 'tekton.dev/v1',
          kind: 'TaskRun',
          name: 'hello-goodbye-run-hello',
          pipelineTaskName: 'hello',
        },
        {
          apiVersion: 'tekton.dev/v1',
          kind: 'TaskRun',
          name: 'hello-goodbye-run-goodbye',
          pipelineTaskName: 'goodbye',
        },
      ],
      completionTime: '2024-06-14T07:04:44Z',
      conditions: [
        {
          lastTransitionTime: '2024-06-14T07:04:44Z',
          message: 'Tasks Completed: 2 (Failed: 0, Cancelled 0), Skipped: 0',
          reason: 'Succeeded',
          status: 'True',
          type: 'Succeeded',
        },
      ],
      pipelineSpec: {
        params: [
          {
            name: 'username',
            type: 'string',
          },
        ],
        tasks: [
          {
            name: 'hello',
            taskRef: {
              kind: 'Task',
              name: 'hello',
            },
            status: {
              completionTime: '2024-06-14T07:04:38Z',
              conditions: [
                {
                  lastTransitionTime: '2024-06-14T07:04:38Z',
                  message: 'All Steps have completed executing',
                  reason: 'Succeeded',
                  status: 'True',
                  type: 'Succeeded',
                },
              ],
              podName: 'hello-goodbye-run-hello-pod',
              startTime: '2024-06-14T07:04:32Z',
              steps: [
                {
                  container: 'step-echo',
                  imageID:
                    'docker.io/library/alpine@sha256:216266c86fc4dcef5619930bd394245824c2af52fd21ba7c6fa0e618657d4c3b',
                  name: 'echo',
                  terminated: {
                    containerID:
                      'cri-o://4b6f1f31407125d7ed6a97f64afbaeb6a511b50638436341d6241a307d42034f',
                    exitCode: 0,
                    finishedAt: '2024-06-14T07:04:37Z',
                    reason: 'Completed',
                    startedAt: '2024-06-14T07:04:37Z',
                  },
                },
              ],
              taskSpec: {
                steps: [
                  {
                    computeResources: {},
                    image: 'alpine',
                    name: 'echo',
                    script: '#!/bin/sh\necho "Hello World"\n',
                  },
                ],
              },
            },
          },
          {
            name: 'goodbye',
            params: [
              {
                name: 'username',
                value: 'Tekton',
              },
            ],
            runAfter: ['hello'],
            taskRef: {
              kind: 'Task',
              name: 'goodbye',
            },
            status: {
              completionTime: '2024-06-14T07:04:44Z',
              conditions: [
                {
                  lastTransitionTime: '2024-06-14T07:04:44Z',
                  message: 'All Steps have completed executing',
                  reason: 'Succeeded',
                  status: 'True',
                  type: 'Succeeded',
                },
              ],
              podName: 'hello-goodbye-run-goodbye-pod',
              startTime: '2024-06-14T07:04:38Z',
              steps: [
                {
                  container: 'step-goodbye',
                  imageID:
                    'docker.io/library/ubuntu@sha256:c279a739b31ead4ebc3e9ce04937eb8b612799b52c26133eb3b4a056d08c31a6',
                  name: 'goodbye',
                  terminated: {
                    containerID:
                      'cri-o://5a06a61f48b2b4193e76b5afe9e57cc93b944794bd403b456764a31ff78db85d',
                    exitCode: 0,
                    finishedAt: '2024-06-14T07:04:44Z',
                    reason: 'Completed',
                    startedAt: '2024-06-14T07:04:44Z',
                  },
                },
              ],
              taskSpec: {
                params: [
                  {
                    name: 'username',
                    type: 'string',
                  },
                ],
                steps: [
                  {
                    computeResources: {},
                    image: 'ubuntu',
                    name: 'goodbye',
                    script: '#!/bin/bash\necho "Goodbye Tekton!"\n',
                  },
                ],
              },
            },
          },
        ],
      },
      startTime: '2024-06-14T07:04:32Z',
    },
  },
];
