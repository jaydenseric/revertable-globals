'use strict';

const ABSENT = Symbol();

/**
 * Sets globals that can be easily reverted to restore the original environment.
 * @kind function
 * @name revertableGlobals
 * @param {object} globals Map of globals to set.
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
 */
module.exports = function revertableGlobals(globals) {
  const originalGlobals = {};

  for (const [key, value] of Object.entries(globals)) {
    originalGlobals[key] = key in global ? global[key] : ABSENT;
    global[key] = value;
  }

  return () => {
    for (const [key, value] of Object.entries(originalGlobals))
      if (value === ABSENT) delete global[key];
      else global[key] = value;
  };
};
