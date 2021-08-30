// ! Needed for useMediaQuery to work with SSR
// https://github.com/chakra-ui/chakra-ui/issues/3124#issuecomment-799380374

import * as React from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export const useIsoMediaQuery = (width) => {
  const [targetReached, setTargetReached] = React.useState(false);

  const updateTarget = React.useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    const media = window.matchMedia(`(min-width: ${width})`);
    media.addListener(updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeListener(updateTarget);
  }, []);

  return targetReached;
};
