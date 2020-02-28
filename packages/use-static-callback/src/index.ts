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
