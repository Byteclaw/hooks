import { useRef } from 'react';

type ExtractArgs<T> = T extends (...args: infer A) => any ? A : undefined;
type ExtractReturn<T> = T extends (...args: any) => infer R ? R : never;

function arraysNotEqual(a: any[], b: any[]): boolean {
  const aLength = a.length;
  const bLength = b.length;

  if (aLength !== bLength) {
    return true;
  }

  const mLength = Math.max(aLength, bLength);

  for (let i = 0; i < mLength; i++) {
    if (a[i] !== b[i]) {
      return true;
    }
  }

  return false;
}

/**
 * Creates a callback from function declaration
 *
 * On call it passes arguments provided as an array in second argument
 */
export function useStaticCallback<T extends () => any>(
  callback: T,
): () => ExtractReturn<T>;
export function useStaticCallback<T extends (...args: any[]) => any>(
  callback: T,
  args: ExtractArgs<T>,
): () => ExtractReturn<T>;

export function useStaticCallback(
  callback: Function,
  args: any[] = [],
): Function {
  const previousCallback = useRef<Function>();
  const previousArgs = useRef([]);
  const returnedCallback = useRef<Function>();

  if (
    previousCallback.current !== callback ||
    arraysNotEqual(previousArgs.current, args)
  ) {
    previousCallback.current = callback;
    previousArgs.current = args as any;

    returnedCallback.current = () => callback(...args);
  }

  return returnedCallback.current!;
}

/**
 * Creates a callback using a callback creator
 *
 * Passes arguments provided as an array in second argument to the callback creator
 * and returns the result as a callback
 */
export function useStaticCallbackCreator<
  T extends () => (...args: any[]) => any,
>(callback: T): ExtractReturn<T>;
export function useStaticCallbackCreator<
  T extends (...args: any[]) => (...args1: any[]) => any,
>(callback: T, args: ExtractArgs<T>): ExtractReturn<T>;

export function useStaticCallbackCreator(
  callbackCreator: Function,
  args: any[] = [],
): Function {
  const previousCallbackCreator = useRef<Function>();
  const previousArgs = useRef([]);
  const returnedCallback = useRef<Function>();

  if (
    previousCallbackCreator.current !== callbackCreator ||
    arraysNotEqual(previousArgs.current, args)
  ) {
    previousCallbackCreator.current = callbackCreator;
    previousArgs.current = args as any;

    returnedCallback.current = callbackCreator(...args);
  }

  return returnedCallback.current!;
}
