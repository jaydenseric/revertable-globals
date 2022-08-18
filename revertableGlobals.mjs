// @ts-check

const ABSENT = Symbol();

/**
 * Sets globals that can be easily reverted to restore the original environment.
 * @param {Record<string, unknown>} globals Map of globals to set.
 * @param {Record<string, unknown>} [namespace] Namespace for the globals.
 *   Defaults to {@linkcode globalThis}.
 * @returns {() => void} Function that reverts the globals.
 * @example
 * For Node.js, how to set and revert `fetch` related globals for a test:
 *
 * ```js
 * import fetch, { Request, Response } from "node-fetch";
 * import revertableGlobals from "revertable-globals";
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
 * @example
 * For Node.js, how to set and revert an environment variable at runtime for a
 * test:
 *
 * ```js
 * import revertableGlobals from "revertable-globals";
 *
 * const revertEnv = revertableGlobals({ FORCE_COLOR: "1" }, process.env);
 *
 * try {
 *   // Test assertions here…
 * } finally {
 *   revertEnv();
 * }
 * ```
 */
export default function revertableGlobals(globals, namespace = globalThis) {
  /** @type {Record<string, unknown>} */
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
}
