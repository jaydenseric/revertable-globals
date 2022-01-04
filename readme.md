# revertable-globals

[![npm version](https://badgen.net/npm/v/revertable-globals)](https://npm.im/revertable-globals) [![CI status](https://github.com/jaydenseric/revertable-globals/workflows/CI/badge.svg)](https://github.com/jaydenseric/revertable-globals/actions)

Sets globals in a JavaScript environment that can be easily reverted to restore the original environment; useful for testing code that relies on the presence of certain globals.

## Setup

To install with [npm](https://npmjs.com/get-npm), run:

```sh
npm install revertable-globals --save-dev
```

## API

### function revertableGlobals

Sets globals that can be easily reverted to restore the original environment.

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `globals` | object | Map of globals to set. |
| `namespace` | object? = globalThis | Namespace for the globals, defaulting to [`globalThis`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis). |

**Returns:** Function — Reverts the globals.

#### Examples

_How to `import`._

> ```js
> import revertableGlobals from "revertable-globals";
> ```

_How to set and revert `fetch` related globals for a test._

> ```js
> import fetch, { Request, Response } from "node-fetch";
> import revertableGlobals from "revertable-globals";
>
> const revertGlobals = revertableGlobals({
>   fetch,
>   Request,
>   Response,
> });
>
> try {
>   // Test assertions here…
> } finally {
>   revertGlobals();
> }
> ```

_How to set and revert an environment variable at runtime for a test._

> ```js
> import revertableGlobals from "revertable-globals";
>
> const revertEnv = revertableGlobals({ FORCE_COLOR: "1" }, process.env);
>
> try {
>   // Test assertions here…
> } finally {
>   revertEnv();
> }
> ```
