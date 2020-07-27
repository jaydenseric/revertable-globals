# revertable-globals

[![npm version](https://badgen.net/npm/v/revertable-globals)](https://npm.im/revertable-globals) [![CI status](https://github.com/jaydenseric/revertable-globals/workflows/CI/badge.svg)](https://github.com/jaydenseric/revertable-globals/actions)

Sets globals in a [Node.js](https://nodejs.org) environment that can be easily reverted to restore the original environment; useful for testing code that relies on the presence of certain globals.

## Setup

Install with [npm](https://npmjs.com/get-npm):

```shell
npm install revertable-globals
```

## API

### Table of contents

- [function revertableGlobals](#function-revertableglobals)

### function revertableGlobals

Sets globals that can be easily reverted to restore the original environment.

| Parameter | Type   | Description            |
| :-------- | :----- | :--------------------- |
| `globals` | object | Map of globals to set. |

**Returns:** Function — Reverts the globals.

#### Examples

_How to `import`._

> ```js
> import revertableGlobals from 'revertable-globals';
> ```

_How to `require`._

> ```js
> const revertableGlobals = require('revertable-globals');
> ```

_How to set and revert `fetch` related globals for a test._

> ```js
> import fetch, { Request, Response } from 'node-fetch';
> import revertableGlobals from 'revertable-globals';
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
