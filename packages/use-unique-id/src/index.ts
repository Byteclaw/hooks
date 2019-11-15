import {
  createElement,
  createContext,
  useContext,
  useRef,
  ReactNode,
} from 'react';

export const UniqueIdContext = createContext({ id: 0 });

UniqueIdContext.displayName = 'UniqueIdContext';

export function UniqueIdContextProvider({
  children,
  id = 0,
}: {
  children: ReactNode;
  id?: number;
}) {
  return createElement(UniqueIdContext.Provider, { value: { id } }, children);
}

/**
 * Returns unique numeric id
 *
 * If you want to use this in SSR, please use UniqueIdContext and wrap the application with it
 * So the ids will be always the same
 */
export function useUniqueId(): number {
  const ctx = useContext(UniqueIdContext);
  const idRef = useRef<number | null>(null);

  if (idRef.current == null) {
    idRef.current = ++ctx.id;
  }

  return idRef.current;
}
