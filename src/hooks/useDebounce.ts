import { useCallback, useEffect, useRef } from "react";

function useDebounce(fn: Function, delay = 300, dep: any[] = []) {
  const ref = useRef<{ fn: any; timer: NodeJS.Timeout | null }>({
    fn,
    timer: null,
  });
  useEffect(
    function () {
      ref.current.fn = fn;
    },
    [fn]
  );

  return useCallback(
    function f(...args) {
      if (ref.current.timer) {
        clearTimeout(ref.current.timer);
      }
      ref.current.timer = setTimeout(() => {
        ref.current.fn(...args);
      }, delay);
    },
    [delay, ...dep]
  );
}

export default useDebounce;
