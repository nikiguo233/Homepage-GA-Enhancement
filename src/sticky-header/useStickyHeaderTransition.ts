import { useMemo, useRef } from "react";
import {
  NOTIFICATION_BANNER_PINNED_HEIGHT_FALLBACK,
  OCCAM_HEADLINE_L_LINE_HEIGHT,
  OCCAM_HEADLINE_L_SIZE,
  STICKY_CONTROLS_ACTIVE_THRESHOLD,
  STICKY_PROGRESS_RANGES,
  STICKY_TITLE_SCALE,
} from "./constants";
import { easeInOut, rangeProgress } from "./easing";
import type {
  ActionsLayout,
  StickyHeaderMeasurementRefs,
  StickyHeaderTransitionOptions,
  StickyProgressStyle,
} from "./types";
import { useFloatingActionsGeometry } from "./useFloatingActionsGeometry";
import { useSearchMorphGeometry } from "./useSearchMorphGeometry";
import { useStickyProgress } from "./useStickyProgress";
import { useWelcomeHeroMorphY } from "./useWelcomeHeroMorphY";

function useStickyHeaderRefs(
  scrollRef: StickyHeaderMeasurementRefs["scrollRef"],
  externalRefs?: StickyHeaderTransitionOptions["measurementRefs"],
) {
  const stickyHeaderRef = useRef<HTMLElement | null>(null);
  const welcomeSearchRef = useRef<HTMLElement | null>(null);
  const welcomeSearchPlaceholderRef = useRef<HTMLLabelElement | null>(null);
  const stickySearchPlaceholderRef = useRef<HTMLLabelElement | null>(null);
  const headerActionsSlotRef = useRef<HTMLDivElement | null>(null);

  return useMemo(
    (): StickyHeaderMeasurementRefs => ({
      scrollRef,
      stickyHeaderRef,
      welcomeSearchRef,
      welcomeSearchPlaceholderRef,
      stickySearchPlaceholderRef,
      headerActionsSlotRef,
      bannerRegionRef: externalRefs?.bannerRegionRef,
      pinnedBannerRef: externalRefs?.pinnedBannerRef,
      workspaceRef: externalRefs?.workspaceRef,
    }),
    [externalRefs?.bannerRegionRef, externalRefs?.pinnedBannerRef, externalRefs?.workspaceRef, scrollRef],
  );
}

export function useStickyHeaderStyle(
  progress: number,
  scrollRef: StickyHeaderMeasurementRefs["scrollRef"],
  options: StickyHeaderTransitionOptions = {},
) {

  const {
    actionsLayout = "stacked",
    bannerPinned = false,
    pinnedBannerHeight = NOTIFICATION_BANNER_PINNED_HEIGHT_FALLBACK,
    pinnedBannerHeightFallback = NOTIFICATION_BANNER_PINNED_HEIGHT_FALLBACK,
    notificationBannerVisible = false,
    chipReturnTitleActive = false,
    measurementRefs: externalMeasurementRefs,
  } = options;

  const measurementRefs = useStickyHeaderRefs(scrollRef, externalMeasurementRefs);
  const chipReturnCenterPhase = chipReturnTitleActive ? rangeProgress(0.25 - progress, 0, 0.25) : 0;

  const surfaceProgress = easeInOut(
    rangeProgress(progress, STICKY_PROGRESS_RANGES.surface.start, STICKY_PROGRESS_RANGES.surface.end),
  );
  const titleMorphProgress = easeInOut(
    rangeProgress(progress, STICKY_PROGRESS_RANGES.titleMorph.start, STICKY_PROGRESS_RANGES.titleMorph.end),
  );
  const titleScaleProgress = easeInOut(
    rangeProgress(progress, STICKY_PROGRESS_RANGES.titleScale.start, STICKY_PROGRESS_RANGES.titleScale.end),
  );
  const actionsProgress = easeInOut(
    rangeProgress(progress, STICKY_PROGRESS_RANGES.actions.start, STICKY_PROGRESS_RANGES.actions.end),
  );
  const actionsMorphProgress = easeInOut(
    rangeProgress(progress, STICKY_PROGRESS_RANGES.actionsMorph.start, STICKY_PROGRESS_RANGES.actionsMorph.end),
  );
  const welcomeOutProgress = easeInOut(
    rangeProgress(progress, STICKY_PROGRESS_RANGES.welcomeOut.start, STICKY_PROGRESS_RANGES.welcomeOut.end),
  );

  const floatingActionsGeometry = useFloatingActionsGeometry(
    actionsMorphProgress,
    actionsLayout as ActionsLayout,
    measurementRefs,
    pinnedBannerHeight,
    notificationBannerVisible,
    bannerPinned,
  );
  const searchMorphGeometry = useSearchMorphGeometry(actionsMorphProgress, measurementRefs);
  const welcomeTitleMorphY = useWelcomeHeroMorphY(measurementRefs);

  const effectiveTitleMorphProgress = chipReturnTitleActive
    ? Math.max(0, 1 - easeInOut(chipReturnCenterPhase))
    : titleMorphProgress;

  const stickyStyle = {
    "--sticky-progress": progress,
    "--actions-morph-progress": actionsMorphProgress,
    ...floatingActionsGeometry,
    "--configure-button-x": `${(1 - actionsMorphProgress) * 44}px`,
    "--configure-button-y": `${(1 - actionsMorphProgress) * 44}px`,
    "--sticky-surface-opacity": surfaceProgress,
    "--sticky-title-opacity": 1,
    "--chip-return-center-phase": chipReturnCenterPhase,
    "--title-morph-left": `calc(${50 - effectiveTitleMorphProgress * 50}% + ${effectiveTitleMorphProgress * 16}px)`,
    "--title-morph-top": "8px",
    "--title-morph-font-size": `${OCCAM_HEADLINE_L_SIZE}px`,
    "--title-morph-line-height": `${OCCAM_HEADLINE_L_LINE_HEIGHT}px`,
    "--sticky-title-scale": 1 - titleScaleProgress * (1 - STICKY_TITLE_SCALE),
    "--sticky-title-x": `calc(${-50 + effectiveTitleMorphProgress * 50}%)`,
    "--sticky-title-y": `${(1 - titleMorphProgress) * welcomeTitleMorphY}px`,
    ...searchMorphGeometry,
    "--sticky-actions-opacity": actionsProgress,
    "--sticky-actions-scale": 1 + (1 - actionsProgress) * 0.025,
    "--sticky-actions-x": `${(1 - actionsProgress) * -15}vw`,
    "--sticky-actions-y": `${(1 - actionsProgress) * 88}px`,
    "--welcome-opacity": 1 - welcomeOutProgress,
    "--sticky-header-y": `${(1 - surfaceProgress) * -6}px`,
    "--welcome-y": `${progress * -44}px`,
    "--welcome-scale": 1 - welcomeOutProgress * 0.035,
    "--notification-banner-pinned-height": bannerPinned
      ? `${pinnedBannerHeight}px`
      : `${pinnedBannerHeightFallback}px`,
  } as StickyProgressStyle;

  return {
    measurementRefs,
    stickyStyle,
    stickyControlsActive: progress > STICKY_CONTROLS_ACTIVE_THRESHOLD,
  };
}

export function useStickyHeaderTransition(options: StickyHeaderTransitionOptions = {}) {
  const { progress, scrollRef } = useStickyProgress();
  const style = useStickyHeaderStyle(progress, scrollRef, options);

  return {
    progress,
    scrollRef,
    ...style,
  };
}

export { useStickyHeaderRefs };
