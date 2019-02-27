import { MutableRefObject, useCallback, useLayoutEffect, useState } from 'react';

function useOverflowScrollPosition(ref: MutableRefObject<HTMLElement | null>) {
  const [scrollProperties, setScrollProperties] = useState<[number | null, number | null]>([
    null,
    null,
  ]);

  const handleScroll = useCallback(
    function handle() {
      if (ref.current != null) {
        setScrollProperties([ref.current.scrollTop + ref.current.clientHeight, ref.current.scrollHeight]);
      }
    },
    [ref],
  );

  useLayoutEffect(() => {
    if (ref.current == null) {
      return;
    }

    handleScroll();

    window.addEventListener('resize', handleScroll);
    ref.current.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleScroll);
      if (ref.current) {
        ref.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [ref.current]);

  return scrollProperties;
}

export { useOverflowScrollPosition };
export default useOverflowScrollPosition;
