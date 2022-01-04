# revertable-globals

[![npm version](https://badgen.net/npm/v/revertable-globals)](https://npm.im/revertable-globals) [![CI status](https://github.com/jaydenseric/revertable-globals/workflows/CI/badge.svg)](https://github.com/jaydenseric/revertable-globals/actions)

Sets globals in a JavaScript environment that can be easily reverted to restore the original environment; useful for testing code that relies on the presence of certain globals.

## Installation

To install with [npm](https://npmjs.com/get-npm), run:

```sh
npm install revertable-globals --save-dev
```

## Exports

These ECMAScript modules are published to [npm](https://npmjs.com) and exported via the [`package.json`](./package.json) `exports` field:

- [`revertableGlobals.mjs`](#exports-revertableGlobals.mjs)

### <span id="exports-revertableGlobals.mjs">[`revertableGlobals.mjs`](./revertableGlobals.mjs)</span>

#### <span id="exports-revertableGlobals.mjs-export-default">Export `default`</span>

Function `revertableGlobals` — Sets globals that can be easily reverted to restore the original environment.

##### <span id="exports-revertableGlobals.mjs-export-default-parameters">Parameters</span>

1. `globals`: `Record<string, unknown>` — Map of globals to set.
2. `namespace` `?`: `Record<string, unknown>` — Namespace for the globals. Defaults to [`globalThis`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis).

##### <span id="exports-revertableGlobals.mjs-export-default-returns">Returns</span>

`() => void` — Function that reverts the globals.

##### <span id="exports-revertableGlobals.mjs-export-default-example-1">Example 1</span>

Ways to import.

```js
import revertableGlobals from "revertable-globals";
```

```js
import revertableGlobals from "revertable-globals/revertableGlobals.mjs";
```

##### <span id="exports-revertableGlobals.mjs-export-default-example-2">Example 2</span>

How to set and revert `fetch` related globals for a test.

```js
import fetch, { Request, Response } from "node-fetch";
import revertableGlobals from "revertable-globals";

const revertGlobals = revertableGlobals({
  fetch,
  Request,
  Response,
});

try {
  // Test assertions here…
} finally {
  revertGlobals();
}
```

##### <span id="exports-revertableGlobals.mjs-export-default-example-3">Example 3</span>

How to set and revert an environment variable at runtime for a test.

```js
import revertableGlobals from "revertable-globals";

const revertEnv = revertableGlobals({ FORCE_COLOR: "1" }, process.env);

try {
  // Test assertions here…
} finally {
  revertEnv();
}
```
