// @ts-check

import { strictEqual } from "node:assert";
import TestDirector from "test-director";

import revertableGlobals from "./revertableGlobals.mjs";

const tests = new TestDirector();

tests.add(
  "`revertableGlobals` with a namespace, a present global, value not undefined.",
  () => {
    const globalName = "revertableGlobalsTestA";
    const originalValue = false;
    const newValue = true;

    /** @type {{ [key: string]: unknown }} */
    const namespace = {};

    namespace[globalName] = originalValue;

    const revertGlobals = revertableGlobals(
      { [globalName]: newValue },
      namespace
    );

    strictEqual(namespace[globalName], newValue);

    revertGlobals();

    strictEqual(namespace[globalName], originalValue);
  }
);

tests.add(
  "`revertableGlobals` with a present global, value not undefined.",
  () => {
    const globalName = "revertableGlobalsTestA";
    const originalValue = false;
    const newValue = true;

    // @ts-ignore
    globalThis[globalName] = originalValue;

    const revertGlobals = revertableGlobals({ [globalName]: newValue });

    strictEqual(
      // @ts-ignore
      globalThis[globalName],
      newValue
    );

    revertGlobals();

    strictEqual(
      // @ts-ignore
      globalThis[globalName],
      originalValue
    );
  }
);

tests.add(
  "`revertableGlobals` with an present global, value undefined.",
  () => {
    const globalName = "revertableGlobalsTestB";
    const originalValue = undefined;
    const newValue = true;

    // @ts-ignore
    globalThis[globalName] = originalValue;

    const revertGlobals = revertableGlobals({ [globalName]: newValue });

    strictEqual(
      // @ts-ignore
      globalThis[globalName],
      newValue
    );

    revertGlobals();

    strictEqual(globalName in globalThis, true);
    strictEqual(
      // @ts-ignore
      globalThis[globalName],
      originalValue
    );
  }
);

tests.add("`revertableGlobals` with an absent global.", () => {
  const globalName = "revertableGlobalsTestC";
  const newValue = true;
  const revertGlobals = revertableGlobals({ [globalName]: newValue });

  strictEqual(
    // @ts-ignore
    globalThis[globalName],
    newValue
  );

  revertGlobals();

  strictEqual(globalName in globalThis, false);
});

tests.add("`revertableGlobals` with various globals.", () => {
  const globalName1 = "revertableGlobalsTestD1";
  const originalValue1 = false;
  const newValue1 = true;
  const globalName2 = "revertableGlobalsTestD2";
  const originalValue2 = undefined;
  const newValue2 = true;
  const globalName3 = "revertableGlobalsTestD3";
  const newValue3 = 2;

  // @ts-ignore
  globalThis[globalName1] = originalValue1;
  // @ts-ignore
  globalThis[globalName2] = originalValue2;

  const revertGlobals = revertableGlobals({
    [globalName1]: newValue1,
    [globalName2]: newValue2,
    [globalName3]: newValue3,
  });

  strictEqual(
    // @ts-ignore
    globalThis[globalName1],
    newValue1
  );
  strictEqual(
    // @ts-ignore
    globalThis[globalName2],
    newValue2
  );
  strictEqual(
    // @ts-ignore
    globalThis[globalName3],
    newValue3
  );

  revertGlobals();

  strictEqual(
    // @ts-ignore
    globalThis[globalName1],
    originalValue1
  );
  strictEqual(
    // @ts-ignore
    globalThis[globalName2],
    originalValue2
  );
  strictEqual(globalName3 in globalThis, false);
});

tests.run();
