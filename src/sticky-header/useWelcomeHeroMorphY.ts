import { useLayoutEffect, useState } from "react";
import { STICKY_HEADER_TITLE_TOP, WELCOME_TITLE_MORPH_Y } from "./constants";
import type { StickyHeaderMeasurementRefs } from "./types";

export function useWelcomeHeroMorphY(refs: StickyHeaderMeasurementRefs) {
  const [welcomeTitleMorphY, setWelcomeTitleMorphY] = useState(WELCOME_TITLE_MORPH_Y);

  useLayoutEffect(() => {
    const getWelcomeHeadingOffset = () => {
      const main = refs.scrollRef.current;
      const welcomeSearch = refs.welcomeSearchRef.current;

      if (!main || !welcomeSearch) {
        return WELCOME_TITLE_MORPH_Y;
      }

      let offset = 0;
      let node: HTMLElement | null = welcomeSearch;

      while (node && node !== main) {
        offset += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }

      return Math.max(WELCOME_TITLE_MORPH_Y, offset - STICKY_HEADER_TITLE_TOP);
    };

    const updateMorphY = () => {
      setWelcomeTitleMorphY(getWelcomeHeadingOffset());
    };

    updateMorphY();

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateMorphY) : null;

    [refs.bannerRegionRef?.current, refs.welcomeSearchRef.current]
      .filter(Boolean)
      .forEach((element) => resizeObserver?.observe(element as HTMLElement));

    window.addEventListener("resize", updateMorphY);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateMorphY);
    };
  }, [refs]);

  return welcomeTitleMorphY;
}
