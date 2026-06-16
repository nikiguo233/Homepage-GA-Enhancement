import type { CSSProperties, RefObject } from "react";

export type ActionsLayout = "stacked" | "horizontal";

export type StickyHeaderMeasurementRefs = {
  scrollRef: RefObject<HTMLElement | null>;
  stickyHeaderRef: RefObject<HTMLElement | null>;
  welcomeSearchRef: RefObject<HTMLElement | null>;
  welcomeSearchPlaceholderRef: RefObject<HTMLLabelElement | null>;
  stickySearchPlaceholderRef: RefObject<HTMLLabelElement | null>;
  headerActionsSlotRef: RefObject<HTMLDivElement | null>;
  bannerRegionRef?: RefObject<HTMLElement | null>;
  pinnedBannerRef?: RefObject<HTMLElement | null>;
  workspaceRef?: RefObject<HTMLElement | null>;
};

export type StickyHeaderTransitionOptions = {
  actionsLayout?: ActionsLayout;
  aiChatOpen?: boolean;
  notificationBannerVisible?: boolean;
  bannerPinned?: boolean;
  pinnedBannerHeight?: number;
  pinnedBannerHeightFallback?: number;
  chipReturnTitleActive?: boolean;
  measurementRefs?: Pick<
    StickyHeaderMeasurementRefs,
    "bannerRegionRef" | "pinnedBannerRef" | "workspaceRef"
  >;
};

export type StickyProgressStyle = CSSProperties & {
  "--sticky-progress": number;
  "--actions-morph-progress": number;
  "--morph-actions-top": string;
  "--morph-actions-right": string;
  "--configure-button-x": string;
  "--configure-button-y": string;
  "--sticky-surface-opacity": number;
  "--sticky-title-opacity": number;
  "--title-morph-left": string;
  "--title-morph-top": string;
  "--title-morph-font-size": string;
  "--title-morph-line-height": string;
  "--sticky-title-scale": number;
  "--sticky-title-x": string;
  "--sticky-title-y": string;
  "--search-morph-left": string;
  "--search-morph-top": string;
  "--search-morph-width": string;
  "--search-morph-height": string;
  "--search-morph-radius": string;
  "--search-morph-padding-x": string;
  "--search-morph-padding-y": string;
  "--search-morph-border-width": string;
  "--search-morph-shadow": string;
  "--sticky-actions-opacity": number;
  "--sticky-actions-scale": number;
  "--sticky-actions-x": string;
  "--sticky-actions-y": string;
  "--welcome-opacity": number;
  "--sticky-header-y": string;
  "--welcome-y": string;
  "--welcome-scale": number;
  "--notification-banner-pinned-height": string;
  "--chip-return-center-phase": number;
};
