'use strict';

const ABSENT = Symbol();

/**
 * Sets globals that can be easily reverted to restore the original environment.
 * @kind function
 * @name revertableGlobals
 * @param {object} globals Map of globals to set.
 * @param {object} [namespace] Namespace for the globals, defaulting to the Node.js [`global`](https://nodejs.org/api/globals.html#globals_global).
 * @returns {Function} Reverts the globals.
 * @example <caption>How to `import`.</caption>
 * ```js
 * import revertableGlobals from 'revertable-globals';
 * ```
 * @example <caption>How to `require`.</caption>
 * ```js
 * const revertableGlobals = require('revertable-globals');
 * ```
 * @example <caption>How to set and revert `fetch` related globals for a test.</caption>
 * ```js
 * import fetch, { Request, Response } from 'node-fetch';
 * import revertableGlobals from 'revertable-globals';
 *
 * const revertGlobals = revertableGlobals({
 *   fetch,
 *   Request,
 *   Response,
 * });
 *
 * try {
 *   // Test assertions here…
 * } finally {
 *   revertGlobals();
 * }
 * ```
 * @example <caption>How to set and revert an environment variable at runtime for a test.</caption>
 * ```js
 * import revertableGlobals from 'revertable-globals';
 *
 * const revertEnv = revertableGlobals({ FORCE_COLOR: '1' }, process.env);
 *
 * try {
 *   // Test assertions here…
 * } finally {
 *   revertEnv();
 * }
 * ```
 */
module.exports = function revertableGlobals(globals, namespace = global) {
  const originalGlobals = {};

  for (const [key, value] of Object.entries(globals)) {
    originalGlobals[key] = key in namespace ? namespace[key] : ABSENT;
    namespace[key] = value;
  }

  return () => {
    for (const [key, value] of Object.entries(originalGlobals))
      if (value === ABSENT) delete namespace[key];
      else namespace[key] = value;
  };
};
