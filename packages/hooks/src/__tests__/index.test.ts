import * as hooks from '..';

describe('all hooks', () => {
  it('reexports everything', () => {
    expect(hooks.EventEmitterContext).toBeDefined();
    expect(hooks.createEventEmitter).toBeDefined();
    expect(hooks.useEventEmitter).toBeDefined();
    expect(hooks.useEventEmitterInstance).toBeDefined();
    expect(hooks.useOverflowScrollPosition).toBeDefined();
  });
});
