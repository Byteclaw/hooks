import { act, renderHook } from '@testing-library/react-hooks';
import { useStaticCallback, useStaticCallbackCreator } from '..';

describe('use-static-callback', () => {
  describe('useStaticCallback hook', () => {
    function cb(): number {
      return 10;
    }

    function cbWithArgs(a: string, b: boolean): [string, boolean] {
      return [a, b];
    }

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

  describe('useStaticCallbackCreator hook', () => {
    function createCb() {
      return jest.fn(() => 10);
    }

    function createCbWithArgs(a: string, b: boolean) {
      return jest.fn((num: number) => [a, b, num]);
    }

    it('works correctly without arguments', () => {
      const { result, rerender } = renderHook(() =>
        useStaticCallbackCreator(createCb),
      );

      act(() => expect(result.current()).toBe(10));

      const prev = result.current;

      rerender();

      expect(prev).toEqual(result.current);

      expect(result.current).toHaveBeenCalledTimes(1);
    });

    it('works correctly with arguments', () => {
      let args: [string, boolean] = ['a', true];

      const { rerender, result } = renderHook(() =>
        useStaticCallbackCreator(createCbWithArgs, args),
      );

      const prev = result.current;

      act(() => expect(result.current(11)).toEqual([...args, 11]));

      expect(prev).toHaveBeenCalledWith(11);

      rerender();

      expect(prev).toEqual(result.current);

      args = ['b', false];

      rerender();

      expect(prev).not.toEqual(result.current);

      act(() => expect(result.current(12)).toEqual([...args, 12]));
    });
  });
});
