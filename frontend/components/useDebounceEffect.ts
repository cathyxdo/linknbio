import { useEffect, DependencyList } from "react";

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps: DependencyList = [] // Ensure deps defaults to an empty array
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn(); // Call the function directly, not with `apply`
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, [fn, waitTime, ...deps]); // Ensure all dependencies are included
}
