import { useLayoutEffect, useState } from "react";
import { lerp } from "./easing";
import type { StickyHeaderMeasurementRefs } from "./types";

const INITIAL_SEARCH_GEOMETRY = {
  "--search-morph-left": "24px",
  "--search-morph-top": "116px",
  "--search-morph-width": "604px",
  "--search-morph-height": "48px",
  "--search-morph-radius": "24px",
  "--search-morph-padding-x": "16px",
  "--search-morph-padding-y": "4px",
  "--search-morph-border-width": "0px",
  "--search-morph-shadow": "var(--occam-elevation-2dp)",
};

export function useSearchMorphGeometry(progress: number, refs: StickyHeaderMeasurementRefs) {
  const [geometry, setGeometry] = useState(INITIAL_SEARCH_GEOMETRY);

  useLayoutEffect(() => {
    const updateGeometry = () => {
      const welcomeSearch = refs.welcomeSearchPlaceholderRef.current;
      const stickySearch = refs.stickySearchPlaceholderRef.current;
      const actionsSlot = refs.headerActionsSlotRef.current;

      if (!welcomeSearch || !stickySearch) {
        return;
      }

      const welcomeRect = welcomeSearch.getBoundingClientRect();
      const stickyRect = stickySearch.getBoundingClientRect();
      const actionsSlotRect = actionsSlot?.getBoundingClientRect();
      const stickyTargetRight = actionsSlotRect ? actionsSlotRect.left - 12 : stickyRect.right;
      const stickyTargetWidth = Math.max(120, stickyTargetRight - stickyRect.left);
      const height = lerp(welcomeRect.height, stickyRect.height, progress);
      const shadowAlpha = (1 - progress) * 0.16;
      const shadow =
        shadowAlpha > 0.01
          ? `0 ${2 * (1 - progress)}px ${6 * (1 - progress)}px rgba(20, 23, 25, ${shadowAlpha})`
          : "none";

      setGeometry({
        "--search-morph-left": `${lerp(welcomeRect.left, stickyRect.left, progress)}px`,
        "--search-morph-top": `${lerp(welcomeRect.top, stickyRect.top, progress)}px`,
        "--search-morph-width": `${lerp(welcomeRect.width, stickyTargetWidth, progress)}px`,
        "--search-morph-height": `${height}px`,
        "--search-morph-radius": `${height / 2}px`,
        "--search-morph-padding-x": `${lerp(16, 12, progress)}px`,
        "--search-morph-padding-y": `${lerp(4, 0, progress)}px`,
        "--search-morph-border-width": `${progress}px`,
        "--search-morph-shadow": shadow,
      });
    };

    updateGeometry();

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateGeometry) : null;

    [
      refs.bannerRegionRef?.current,
      refs.pinnedBannerRef?.current,
      refs.stickyHeaderRef.current,
      refs.welcomeSearchRef.current,
    ]
      .filter(Boolean)
      .forEach((element) => resizeObserver?.observe(element as HTMLElement));

    window.addEventListener("resize", updateGeometry);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateGeometry);
    };
  }, [progress, refs]);

  return geometry;
}
