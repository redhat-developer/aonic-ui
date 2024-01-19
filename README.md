# Aonic UI

A common library for Developer UI components and utilities.

### Useful Commands

- `yarn build` - Build all packages, including the Storybook site
- `yarn dev` - Run all packages locally and preview with Storybook
- `yarn lint` - Lint all packages
- `yarn changeset` - Generate a changeset
- `yarn clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)

## Apps & Packages

This repo is configured as a monorepo and uses turborepo to manage the workspaces. It includes the following packages and applications:

- `docs`: Component documentation site with Storybook
- `packages/core`: Core React components
- `packages/typescript-config`: Shared `tsconfig.json`s used throughout the Turborepo
- `packages/eslint-config`: ESLint preset

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/). Workspaces enables us to "hoist" dependencies that are shared between packages to the root `package.json`. This means smaller `node_modules` folders and a better local dev experience. To install a dependency for the entire monorepo, use the `-w` workspaces flag with `yarn add`.

This repo sets up your `.gitignore` to exclude all generated files, other folders like `node_modules` used to store your dependencies.

### Compilation

To make the core library code work across all browsers, we need to compile the raw TypeScript and React code to plain JavaScript. We can accomplish this with `rollup`, which is configured specifically to build a react component library.

Running `yarn build` from the root of the Turborepo will run the `build` command defined in each package's `package.json` file. Turborepo runs each `build` in parallel and caches & hashes the output to speed up future builds.

For `@aonic-ui/core`, the `build` command is the following:

```bash
rollup -c
```

`rollup` compiles `src/index.tsx`, which exports all of the components in the design system, into both ES Modules and CommonJS formats as well as their TypeScript types. The `package.json` for `@aonic-ui/core` then instructs the consumer to select the correct format:

```json:@aonic-ui/core/package.json
{
  "name": "@aonic-ui/core",
  "version": "0.0.0",
  "main": "./dist/cjs/index.js",
  "module": "./dist/esm/index.js",
  "types": "./dist/index.d.ts",
  "sideEffects": false,
}
```

Run `yarn build` to confirm compilation is working correctly. You should see a folder `@aonic-ui/core/dist` which contains the compiled output.

```bash
@aonic-ui/core
└── dist
    ├── index.d.ts  <-- Types
    ├── cjs/index.js    <-- CommonJS version
    └── esm/index.mjs   <-- ES Modules version
```

## Components

Each file inside of `@aonic-ui/core` is a component inside our design system. For example:

```tsx:@aonic-ui/core/src/Button.tsx
import * as React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  return <button>{props.children}</button>;
}

Button.displayName = 'Button';
```

When adding a new file, ensure the component is also exported from the entry `index.tsx` file:

```tsx:@aonic-ui/core/src/index.tsx
import * as React from "react";
export { Button, type ButtonProps } from "./Button";
// Add new component exports here
```

## Storybook

Storybook provides us with an interactive UI playground for our components. This allows us to preview our components in the browser and instantly see changes when developing locally. This example preconfigures Storybook to:

- Use Vite to bundle stories instantly (in milliseconds)
- Automatically find any stories inside the `stories/` folder
- Support using module path aliases like `@acme-core` for imports
- Write MDX for component documentation pages

For example, here's the included Story for our `Button` component:

```js:docs/stories/button.stories.mdx
import { Button } from '@aonic-ui/core/src';
import { Meta, Story, Preview, Props } from '@storybook/addon-docs/blocks';

<Meta title="Components/Button" component={Button} />

# Button

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur tempor, nisl nunc egestas nisi, euismod aliquam nisl nunc euismod.

## Props

<Props of={Box} />

## Examples

<Preview>
  <Story name="Default">
    <Button>Hello</Button>
  </Story>
</Preview>
```

This example includes a few helpful Storybook scripts:

- `yarn dev`: Starts Storybook in dev mode with hot reloading at `localhost:6006`
- `yarn build`: Builds the Storybook UI and generates the static HTML files
- `yarn preview-storybook`: Starts a local server to view the generated Storybook UI
