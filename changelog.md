# revertable-globals changelog

## 4.0.0

### Major

- Updated Node.js support to `^14.17.0 || ^16.0.0 || >= 18.0.0`.
- Updated dev dependencies, some of which require newer Node.js versions than previously supported.
- Removed the package `main` field.
- Use the `node:` URL scheme for Node.js builtin module imports in tests.

### Patch

- Simplified dev dependencies and config for ESLint.
- Updated `jsconfig.json`:
  - Set `compilerOptions.maxNodeModuleJsDepth` to `10`.
  - Set `compilerOptions.module` to `nodenext`.
- Updated GitHub Actions CI config:
  - Run tests with Node.js v14, v16, v18.
  - Updated `actions/checkout` to v3.
  - Updated `actions/setup-node` to v3.
- Replaced TypeScript `Record` types with index signatures.
- Updated the JSDoc code examples.
- Revamped the readme:
  - Removed the badges.
  - Removed the detailed API docs. The JSDoc comments and TypeScript types in the exported modules are now the primary documentation.
  - Added a “Requirements” section.
  - Added information about Deno, import maps, TypeScript config and [optimal JavaScript module design](https://jaydenseric.com/blog/optimal-javascript-module-design).

## 3.0.0

### Major

- Updated Node.js support to `^12.22.0 || ^14.17.0 || >= 16.0.0`.
- Updated dev dependencies, some of which require newer Node.js versions than previously supported.
- Removed `./package` from the package `exports` field; the full `package.json` filename must be used in a `require` path.
- Renamed `index.mjs` to `revertableGlobals.mjs` and added it to the package `exports` field.
- Implemented TypeScript types via JSDoc comments.

### Patch

- Also run GitHub Actions CI with Node.js v17.
- Simplified package scripts.
- Check TypeScript types via a new package `types` script.
- Removed the [`jsdoc-md`](https://npm.im/jsdoc-md) dev dependency and the related package scripts, replacing the readme “API” section with a manually written “Exports” section.
- Configured Prettier option `singleQuote` to the default, `false`.
- Documentation tweaks.

## 2.0.0

### Major

- Updated Node.js support to `^12.20 || >= 14.13`.
- Updated dev dependencies, some of which require newer Node.js versions than were previously supported.
- Added a package `exports` field.
- The API is now ESM in `.mjs` files instead of CJS in `.js` files, [accessible via `import` but not `require`](https://nodejs.org/dist/latest/docs/api/esm.html#esm_require).
- Default the function `revertableGlobals` argument 2 `namespace` to the universal [`globalThis`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis) instead of the Node.js [`global`](https://nodejs.org/api/globals.html#globals_global).

### Patch

- Stop using [`hard-rejection`](https://npm.im/hard-rejection) to detect unhandled `Promise` rejections in tests, as Node.js v15+ does this natively.
- Simplified the package scripts now that [`jsdoc-md`](https://npm.im/jsdoc-md) v10 automatically generates a Prettier formatted readme.
- Updated GitHub Actions CI config:
  - Also run tests with Node.js v16.
  - Updated `actions/checkout` to v2.
  - Updated `actions/setup-node` to v2.
  - Don’t specify the `CI` environment variable as it’s set by default.
- Readme tweaks.

## 1.1.0

### Minor

- Allow the global namespace to be specified and add an example for how to set and revert an environment variable at runtime.

### Patch

- Updated dependencies.
- Also test Node.js v15 in GitHub Actions CI.

## 1.0.1

### Patch

- Ensure 100% code coverage with [`coverage-node`](https://npm.im/coverage-node).

## 1.0.0

Initial release.
