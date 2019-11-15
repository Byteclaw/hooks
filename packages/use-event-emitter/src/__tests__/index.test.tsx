import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import {
  EventEmitterContext,
  useEventEmitterInstance,
  useEventEmitter,
} from '..';

describe('use-event-emitter', () => {
  describe('useEventEmitterInstance', () => {
    it('returns a new instance of event emitter and then uses it during rerenders', () => {
      const { result, rerender } = renderHook(() => useEventEmitterInstance());

      expect(result.current).toHaveProperty('emit');
      expect(result.current).toHaveProperty('on');

      const instance = result.current;

      rerender();

      expect(result.current).toBe(instance);
    });
  });

  describe('useEventEmitter', () => {
    it('returns event emitter from the context', () => {
      const { result, rerender } = renderHook(() => useEventEmitter(), {
        wrapper({ children }) {
          const ee = useEventEmitter();

          return (
            <EventEmitterContext.Provider value={ee}>
              {children}
            </EventEmitterContext.Provider>
          );
        },
      });

      expect(result.current).toBeDefined();

      const instance = result.current;

      rerender();

      expect(result.current).toBe(instance);
    });
  });
});
