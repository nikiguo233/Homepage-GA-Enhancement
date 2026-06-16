import { useLayoutEffect, useState } from "react";
import { lerp } from "./easing";
import type { ActionsLayout, StickyHeaderMeasurementRefs } from "./types";

function getInitialActionsGeometry(actionsLayout: ActionsLayout) {
  const compactLayout =
    typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches;

  return {
    "--morph-actions-top": actionsLayout === "horizontal" ? "12px" : compactLayout ? "120px" : "24px",
    "--morph-actions-right": actionsLayout === "horizontal" ? "16px" : "24px",
  };
}

function getHeroFloatingActionsTop(
  actionsLayout: ActionsLayout,
  notificationBannerVisible: boolean,
  bannerPinned: boolean,
  pinnedBannerHeight: number,
  refs: StickyHeaderMeasurementRefs,
) {
  const compactLayout = window.matchMedia("(max-width: 900px)").matches;
  const baseStartTop = actionsLayout === "horizontal" ? 12 : compactLayout ? 120 : 24;

  if (!notificationBannerVisible || actionsLayout === "horizontal") {
    return baseStartTop;
  }

  if (bannerPinned) {
    return Math.max(baseStartTop, pinnedBannerHeight + 16);
  }

  const bannerRegion = refs.bannerRegionRef?.current;

  if (!bannerRegion) {
    return baseStartTop;
  }

  return Math.max(baseStartTop, bannerRegion.getBoundingClientRect().bottom + 16);
}

export function useFloatingActionsGeometry(
  progress: number,
  actionsLayout: ActionsLayout,
  refs: StickyHeaderMeasurementRefs,
  pinnedBannerHeight: number,
  notificationBannerVisible: boolean,
  bannerPinned: boolean,
) {
  const [geometry, setGeometry] = useState(() => getInitialActionsGeometry(actionsLayout));

  useLayoutEffect(() => {
    const updateGeometry = () => {
      const actionsSlot = refs.headerActionsSlotRef.current;
      const heroStartTop = getHeroFloatingActionsTop(
        actionsLayout,
        notificationBannerVisible,
        bannerPinned,
        pinnedBannerHeight,
        refs,
      );

      if (!actionsSlot) {
        setGeometry({
          "--morph-actions-top": `${heroStartTop}px`,
          "--morph-actions-right": actionsLayout === "horizontal" ? "16px" : "24px",
        });
        return;
      }

      const slotRect = actionsSlot.getBoundingClientRect();
      const targetRight = window.innerWidth - slotRect.right;
      const startRight = actionsLayout === "horizontal" ? 16 : 24;

      setGeometry({
        "--morph-actions-top": `${lerp(heroStartTop, slotRect.top, progress)}px`,
        "--morph-actions-right": `${lerp(startRight, targetRight, progress)}px`,
      });
    };

    updateGeometry();
    window.addEventListener("resize", updateGeometry);

    const scrollNode = refs.scrollRef.current;
    scrollNode?.addEventListener("scroll", updateGeometry, { passive: true });

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateGeometry) : null;

    [
      refs.stickyHeaderRef.current,
      refs.pinnedBannerRef?.current,
      refs.bannerRegionRef?.current,
      refs.workspaceRef?.current,
    ]
      .filter(Boolean)
      .forEach((element) => resizeObserver?.observe(element as HTMLElement));

    return () => {
      scrollNode?.removeEventListener("scroll", updateGeometry);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateGeometry);
    };
  }, [actionsLayout, bannerPinned, notificationBannerVisible, pinnedBannerHeight, progress, refs]);

  return geometry;
}
