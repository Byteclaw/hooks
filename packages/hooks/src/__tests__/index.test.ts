import * as hooks from '..';

describe('all hooks', () => {
  it('reexports everything', () => {
    expect(hooks.EventEmitterContext).toBeDefined();
    expect(hooks.createEventEmitter).toBeDefined();
    expect(hooks.useEventEmitter).toBeDefined();
    expect(hooks.useEventEmitterInstance).toBeDefined();
    expect(hooks.useOverflowScrollPosition).toBeDefined();
    expect(hooks.useUniqueId).toBeDefined();
    expect(hooks.UniqueIdContext).toBeDefined();
    expect(hooks.UniqueIdContextProvider).toBeDefined();
    expect(hooks.usePrompt).toBeDefined();
    expect(hooks.Prompts).toBeDefined();
  });
});
