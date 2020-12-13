'use strict';

const { strictEqual } = require('assert');
const { TestDirector } = require('test-director');
const revertableGlobals = require('./index');

const tests = new TestDirector();

tests.add(
  '`revertableGlobals` with a namespace, a present global, value not undefined.',
  () => {
    const globalName = 'revertableGlobalsTestA';
    const originalValue = false;
    const newValue = true;
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
  '`revertableGlobals` with a present global, value not undefined.',
  () => {
    const globalName = 'revertableGlobalsTestA';
    const originalValue = false;
    const newValue = true;

    global[globalName] = originalValue;

    const revertGlobals = revertableGlobals({ [globalName]: newValue });

    strictEqual(global[globalName], newValue);

    revertGlobals();

    strictEqual(global[globalName], originalValue);
  }
);

tests.add(
  '`revertableGlobals` with an present global, value undefined.',
  () => {
    const globalName = 'revertableGlobalsTestB';
    const originalValue = undefined;
    const newValue = true;

    global[globalName] = originalValue;

    const revertGlobals = revertableGlobals({ [globalName]: newValue });

    strictEqual(global[globalName], newValue);

    revertGlobals();

    strictEqual(globalName in global, true);
    strictEqual(global[globalName], originalValue);
  }
);

tests.add('`revertableGlobals` with an absent global.', () => {
  const globalName = 'revertableGlobalsTestC';
  const newValue = true;
  const revertGlobals = revertableGlobals({ [globalName]: newValue });

  strictEqual(global[globalName], newValue);

  revertGlobals();

  strictEqual(globalName in global, false);
});

tests.add('`revertableGlobals` with various globals.', () => {
  const globalName1 = 'revertableGlobalsTestD1';
  const originalValue1 = false;
  const newValue1 = true;
  const globalName2 = 'revertableGlobalsTestD2';
  const originalValue2 = undefined;
  const newValue2 = true;
  const globalName3 = 'revertableGlobalsTestD3';
  const newValue3 = 2;

  global[globalName1] = originalValue1;
  global[globalName2] = originalValue2;

  const revertGlobals = revertableGlobals({
    [globalName1]: newValue1,
    [globalName2]: newValue2,
    [globalName3]: newValue3,
  });

  strictEqual(global[globalName1], newValue1);
  strictEqual(global[globalName2], newValue2);
  strictEqual(global[globalName3], newValue3);

  revertGlobals();

  strictEqual(global[globalName1], originalValue1);
  strictEqual(global[globalName2], originalValue2);
  strictEqual(globalName3 in global, false);
});

tests.run();
