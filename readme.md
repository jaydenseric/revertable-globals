# revertable-globals

Sets globals in a JavaScript environment that can be easily reverted to restore the original environment; useful for testing code that relies on the presence of certain globals.

## Installation

For [Node.js](https://nodejs.org), to install [`revertable-globals`](https://npm.im/revertable-globals) with [npm](https://npmjs.com/get-npm), run:

```sh
npm install revertable-globals --save-dev
```

For [Deno](https://deno.land), an example import map:

```json
{
  "imports": {
    "revertable-globals": "https://unpkg.com/revertable-globals@3.0.0/revertableGlobals.mjs"
  }
}
```

Then, import and use the function [`revertableGlobals`](./revertableGlobals.mjs).

## Requirements

Supported runtime environments:

- [Node.js](https://nodejs.org) versions `^14.17.0 || ^16.0.0 || >= 18.0.0`.
- [Deno](https://deno.land).

Non [Deno](https://deno.land) projects must configure [TypeScript](https://typescriptlang.org) to use types from the ECMAScript modules that have a `// @ts-check` comment:

- [`compilerOptions.allowJs`](https://typescriptlang.org/tsconfig#allowJs) should be `true`.
- [`compilerOptions.maxNodeModuleJsDepth`](https://typescriptlang.org/tsconfig#maxNodeModuleJsDepth) should be reasonably large, e.g. `10`.
- [`compilerOptions.module`](https://typescriptlang.org/tsconfig#module) should be `"node16"` or `"nodenext"`.

## Exports

The [npm](https://npmjs.com) package [`revertable-globals`](https://npm.im/revertable-globals) features [optimal JavaScript module design](https://jaydenseric.com/blog/optimal-javascript-module-design). These ECMAScript modules are exported via the [`package.json`](./package.json) field [`exports`](https://nodejs.org/api/packages.html#exports):

- [`revertableGlobals.mjs`](./revertableGlobals.mjs)
