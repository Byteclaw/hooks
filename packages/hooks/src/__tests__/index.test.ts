import * as hooks from '../';

describe('all hooks', () => {
  it('reexports everything', () => {
    expect(hooks.useOverflowScrollPosition).toBeDefined();
  });
});
