import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { UniqueIdContextProvider, useUniqueId } from '..';

describe('use-unique-id', () => {
  it('works correctly', () => {
    const res1 = renderHook(() => useUniqueId());

    expect(res1.result.current).toBe(1);
    res1.rerender();
    expect(res1.result.current).toBe(1);

    const res2 = renderHook(() => useUniqueId());

    expect(res2.result.current).toBe(2);
    res2.rerender();
    expect(res2.result.current).toBe(2);
  });

  it('works correctly with custom context', () => {
    const result = renderHook(() => useUniqueId(), {
      wrapper({ children }) {
        return (
          <UniqueIdContextProvider id={10}>{children}</UniqueIdContextProvider>
        );
      },
    });

    expect(result.result.current).toBe(11);
    result.rerender();
    expect(result.result.current).toBe(11);
  });
});
