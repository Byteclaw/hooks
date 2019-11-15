import { createContext, useContext, useState } from 'react';

interface EventEmitter<TEvents extends string> {
  emit(event: TEvents, ...args: any[]): void;
  on(event: TEvents, listener: Function): Function;
}

/**
 * Creates event emitter instance
 */
export function createEventEmitter<
  TEvents extends string = string
>(): EventEmitter<TEvents> {
  const events: Record<TEvents, Function[]> = {} as Record<TEvents, Function[]>;

  return {
    emit(event: TEvents, ...args: any[]) {
      (events[event] || []).forEach(listener => listener(...args));
    },
    on(event: TEvents, listener: Function) {
      (events[event] = events[event] || []).push(listener);

      return () => {
        events[event] = events[event].filter(cb => cb !== listener);
      };
    },
  };
}

export const EventEmitterContext = createContext<EventEmitter<any>>(
  createEventEmitter(),
);

EventEmitterContext.displayName = 'EventEmitterContext';

/**
 * Connects to event emitter in context
 */
export function useEventEmitter<
  TEvents extends string = string
>(): EventEmitter<TEvents> {
  return useContext(EventEmitterContext);
}

/**
 * Returns a new event emitter instance on first call
 * All subsequent calls return the same instance
 */
export function useEventEmitterInstance<
  TEvents extends string = string
>(): EventEmitter<TEvents> {
  return useState(createEventEmitter())[0];
}
