import { act, renderHook } from '@testing-library/react-hooks';
import { useStaticCallback } from '..';

function cb(): number {
  return 10;
}

function cbWithArgs(a: string, b: boolean): [string, boolean] {
  return [a, b];
}

describe('use-static-callback', () => {
  it('works correctly without arguments', () => {
    const { result, rerender } = renderHook(() => useStaticCallback(cb));

    act(() => expect(result.current()).toBe(10));

    const prev = result.current;

    rerender();

    expect(prev).toEqual(result.current);
  });

  it('works correctly with arguments', () => {
    let args: [string, boolean] = ['a', true];

    const { rerender, result } = renderHook(() =>
      useStaticCallback(cbWithArgs, args),
    );

    const prev = result.current;

    act(() => expect(result.current()).toEqual(args));

    rerender();

    expect(prev).toEqual(result.current);

    args = ['b', false];

    rerender();

    expect(prev).not.toEqual(result.current);

    act(() => expect(result.current()).toEqual(args));
  });
});
