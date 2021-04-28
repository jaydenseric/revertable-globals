# revertable-globals changelog

## Next

### Patch

- Stop using [`hard-rejection`](https://npm.im/hard-rejection) to detect unhandled `Promise` rejections in tests, as Node.js v15+ does this natively.
- Updated GitHub Actions CI config:
  - Also run tests with Node.js v16.
  - Updated `actions/checkout` to v2.
  - Updated `actions/setup-node` to v2.
  - Don’t specify the `CI` environment variable as it’s set by default.

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
