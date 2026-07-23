import AddIcon from "@mui/icons-material/Add";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DataUsageOutlinedIcon from "@mui/icons-material/DataUsageOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoIcon from "@mui/icons-material/Info";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import ViewModuleOutlinedIcon from "@mui/icons-material/ViewModuleOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { flushSync } from "react-dom";
import configureHomepageIconUrl from "./assets/configure-homepage.svg";
import { buildTopAccountsLiveDataProposal } from "./ai/assistantProposals";
import { AI_RECOMMENDATION_TOP_ACCOUNTS_ID } from "./ai/recommendationRationales";
import { useAiHomepageConfigChat } from "./ai/useAiHomepageConfigChat";
import type { ChatPreview, CustomWidgetProposal, TeamTemplateProposal } from "./ai/types";
import { HomepageTemplateEditor } from "./components/HomepageTemplateEditor";
import { createTemplateDraftFromProposal, createTemplateId } from "./homepageConfig/teamTemplate";
import type { HomepageTemplateDraft } from "./homepageConfig/teamTemplate";
import { AiChatBadge, AiChatPanel } from "./AiChatPanel";
import { AiGeneratedDashboard } from "./components/AiGeneratedDashboard";
import { DashboardWidget } from "./components/dashboardWidgets/DashboardWidgets";
import type { DashboardWidgetId } from "./components/dashboardWidgets/catalog";
import { HomepageEmptyState } from "./components/HomepageEmptyState";
import { OnboardingScreen, type OnboardingTemplateId } from "./components/OnboardingScreen";
import { getCurrentDashboardWidgetIds } from "./homepageConfig/homepageCleanup";
import type { HomepageCleanupPlan } from "./homepageConfig/homepageCleanup";
import { FloatingButton } from "./FloatingButton";
import { useHomepageConfig } from "./homepageConfig/useHomepageConfig";
import { ConfigureCustomWidgetPanel } from "./components/customWidgets/ConfigureCustomWidgetPanel";
import { createEmptyCustomWidgetDraft } from "./customWidgets/useCustomWidgets";
import { createNewWidgetDraft, CustomWidgetEditor, type EditorStep } from "./components/customWidgets/CustomWidgetEditor";
import type { CreateWidgetOption } from "./components/customWidgets/CreateWidgetDropdown";
import { getCustomWidgetEditorCaptureConfig } from "./figmaCapture/customWidgetEditorCapture";
import { HomepageCustomWidgets } from "./components/customWidgets/HomepageCustomWidgets";
import { WidgetDrawerShell } from "./components/customWidgets/WidgetDrawerShell";
import { WidgetSizePreview } from "./components/customWidgets/WidgetSizePreview";
import { HomepageActionsMenu } from "./components/customWidgets/HomepageActionsMenu";
import { ManageCustomWidgetsPage } from "./components/customWidgets/ManageCustomWidgetsPage";
import { AiGeneratedWidgetEditor } from "./components/customWidgets/AiGeneratedWidgetEditor";
import { isAiGeneratedCustomWidget } from "./customWidgets/isAiGeneratedCustomWidget";
import { ManageTemplatesHubPage } from "./components/customWidgets/ManageTemplatesHubPage";
import {
  ManageTemplatesPage,
  type ManageTemplatesTab,
} from "./components/customWidgets/ManageTemplatesPage";
import { useHomepageTemplates } from "./homepageConfig/useHomepageTemplates";
import {
  getCustomWidgetSavedStatus,
  getCustomWidgetVisibilityChipLabel,
  normalizeCustomWidgetAccess,
} from "./customWidgets/widgetAccess";
import { createCustomWidgetRefId } from "./customWidgets/types";
import type { CustomWidget, CustomWidgetDraft, CustomWidgetSize } from "./customWidgets/types";
import { saveAiGeneratedHomepageMetricWidgets } from "./customWidgets/aiGeneratedMetricWidgets";
import { useCustomWidgets } from "./customWidgets/useCustomWidgets";

const menuItems = [
  { label: "Dashboard", icon: <DashboardOutlinedIcon /> },
  { label: "Reports", icon: <ArticleOutlinedIcon /> },
  { label: "Workbench", icon: <ReceiptLongOutlinedIcon /> },
  { label: "Accounting", icon: <PaymentOutlinedIcon /> },
  { label: "SSP", icon: <CalculateOutlinedIcon /> },
  { label: "Policies", icon: <DataUsageOutlinedIcon /> },
  { label: "Integration Hub", icon: <ShoppingCartOutlinedIcon /> },
  { label: "Data Interface", icon: <ListAltOutlinedIcon /> },
  { label: "File Upload", icon: <CloudUploadOutlinedIcon /> },
  { label: "Setups", icon: <SettingsApplicationsOutlinedIcon /> },
];

const notificationAnnouncements = [
  {
    title: "COMING EVENT - Register Now & Join Us June 26th for Subscribed Live!",
    description:
      "Subscribed Live is Zuora's flagship event for subscription business leaders. Join us on June 26th for keynotes, product roadmap previews, and sessions on billing automation, usage-based pricing, and revenue recognition. Connect with peers and Zuora experts to learn how leading companies are growing recurring revenue.",
    primaryAction: "Register Now",
    secondaryAction: "Remind Me Tomorrow",
  },
  {
    title: "Scheduled Maintenance - Revenue Cloud will be unavailable June 20th from 2:00–4:00 AM PT",
    description:
      "We are performing scheduled maintenance to improve system performance and reliability. During this window, Revenue Cloud features including reporting, batch processing, and file uploads will be temporarily unavailable. Please plan accordingly and save any in-progress work before the maintenance window begins.",
    primaryAction: "View Maintenance Details",
    secondaryAction: "Remind Me Tomorrow",
  },
] as const;

const STICKY_TRANSITION_DISTANCE = 310;
const WELCOME_TITLE_MORPH_Y = 54;
const STICKY_HEADER_TITLE_TOP = 8;
const STICKY_HEADER_HEIGHT = 56;
const NOTIFICATION_BANNER_MARGIN_TOP = 24;
const NOTIFICATION_BANNER_PINNED_HEIGHT_FALLBACK = 136;
const OCCAM_HEADLINE_L_SIZE = 28;
const OCCAM_HEADLINE_L_LINE_HEIGHT = 40;
const OCCAM_TITLE_L_SIZE = 17;
const STICKY_TITLE_SCALE = OCCAM_TITLE_L_SIZE / OCCAM_HEADLINE_L_SIZE;

type ActionsLayout = "stacked" | "horizontal";
type WidgetDrawerStep = "closed" | "select" | "configure";
type WidgetDrawerConfigureKind = "revenue-progress" | "custom-widget";
type WidgetDrawerConfigureEntry = "select" | "direct";
type HomepageView =
  | "home"
  | "manage-hub"
  | "manage-templates"
  | "manage-custom-widgets"
  | "create-widget"
  | "edit-widget"
  | "edit-template";
type ManageWidgetsTab = "published" | "private" | "history";

const WIDGET_TYPES = [
  {
    id: "pending-tasks",
    name: "Revenue Pending Tasks",
    description: "A line of description of the widget",
    configurable: false,
  },
  {
    id: "data-statistics",
    name: "Revenue Data / Statistics",
    description: "A line of description of the widget",
    configurable: false,
  },
  {
    id: "quick-access",
    name: "Revenue Quick Access",
    description: "A line of description of the widget",
    configurable: false,
  },
  {
    id: "revenue-progress",
    name: "Revenue Progress",
    description: "A line of description of the widget",
    configurable: true,
  },
] as const;

type StickyProgressStyle = CSSProperties & {
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
};

function clampStickyProgress(scrollTop: number) {
  return Math.min(1, Math.max(0, scrollTop / STICKY_TRANSITION_DISTANCE));
}

function easeInOut(value: number) {
  return value * value * (3 - 2 * value);
}

function runAfterScrollSettles(scrollNode: HTMLElement, callback: () => void, maxWait = 1500) {
  let settleTimeout = 0;
  let maxTimeout = 0;
  let done = false;

  const finish = () => {
    if (done) {
      return;
    }

    done = true;
    scrollNode.removeEventListener("scroll", handleScroll);
    window.clearTimeout(settleTimeout);
    window.clearTimeout(maxTimeout);
    callback();
  };

  const handleScroll = () => {
    window.clearTimeout(settleTimeout);
    settleTimeout = window.setTimeout(finish, 120);
  };

  scrollNode.addEventListener("scroll", handleScroll, { passive: true });
  maxTimeout = window.setTimeout(finish, maxWait);
  handleScroll();
}

function triggerAddedWidgetSpotlight(widget: HTMLElement) {
  widget.classList.add("widget-card-settled");
  widget.classList.remove("widget-card-spotlight");
  void widget.offsetWidth;
  widget.classList.add("widget-card-spotlight");

  const handleAnimationEnd = (event: AnimationEvent) => {
    if (event.target !== widget || event.animationName !== "widget-card-spotlight-pop") {
      return;
    }

    widget.classList.remove("widget-card-spotlight");
    widget.removeEventListener("animationend", handleAnimationEnd);
  };

  widget.addEventListener("animationend", handleAnimationEnd);
}

function rangeProgress(value: number, start: number, end: number) {
  return Math.min(1, Math.max(0, (value - start) / (end - start)));
}

function isElementVisibleInScrollContainer(element: HTMLElement, container: HTMLElement): boolean {
  const elementRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const visibleTop = Math.max(elementRect.top, containerRect.top);
  const visibleBottom = Math.min(elementRect.bottom, containerRect.bottom);
  const visibleHeight = visibleBottom - visibleTop;

  if (visibleHeight <= 0) {
    return false;
  }

  return visibleHeight >= elementRect.height * 0.5;
}

function useStickyProgress(enabled: boolean) {
  const scrollRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setProgress(0);
      return undefined;
    }

    let frame = 0;
    let scrollNode: HTMLElement | null = null;
    let cancelled = false;

    const getScrollTop = () =>
      Math.max(
        scrollNode?.scrollTop ?? 0,
        window.scrollY,
        document.documentElement.scrollTop,
        document.body.scrollTop,
      );

    const updateProgress = () => {
      frame = 0;
      const nextProgress = clampStickyProgress(getScrollTop());
      setProgress((currentProgress) =>
        Math.abs(currentProgress - nextProgress) > 0.002 ? nextProgress : currentProgress,
      );
    };

    const scheduleUpdate = () => {
      if (frame || cancelled) {
        return;
      }

      frame = window.requestAnimationFrame(updateProgress);
    };

    const attachListeners = () => {
      scrollNode = scrollRef.current;

      if (!scrollNode) {
        frame = window.requestAnimationFrame(attachListeners);
        return;
      }

      updateProgress();
      scrollNode.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("resize", scheduleUpdate);
    };

    attachListeners();

    return () => {
      cancelled = true;

      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      scrollNode?.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [enabled]);

  return { progress, scrollRef };
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function getActionsLayout(): ActionsLayout {
  if (typeof window === "undefined") {
    return "stacked";
  }

  const params = new URLSearchParams(window.location.search);
  return params.get("variant") === "horizontal-buttons" ? "horizontal" : "stacked";
}

function getInitialActionsGeometry(actionsLayout: ActionsLayout = getActionsLayout()) {
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
) {
  const compactLayout = window.matchMedia("(max-width: 900px)").matches;
  const baseStartTop = actionsLayout === "horizontal" ? 12 : compactLayout ? 120 : 24;

  if (!notificationBannerVisible || actionsLayout === "horizontal") {
    return baseStartTop;
  }

  if (bannerPinned) {
    return Math.max(baseStartTop, pinnedBannerHeight + 16);
  }

  const bannerRegion = document.querySelector<HTMLElement>(".notification-banner-region");

  if (!bannerRegion) {
    return baseStartTop;
  }

  const bannerRect = bannerRegion.getBoundingClientRect();

  return Math.max(baseStartTop, bannerRect.bottom + 16);
}

function useFloatingActionsGeometry(
  progress: number,
  actionsLayout: ActionsLayout,
  pinnedBannerHeight: number,
  aiChatOpen: boolean,
  notificationBannerVisible: boolean,
  bannerPinned: boolean,
  homepageActive: boolean,
) {
  const [geometry, setGeometry] = useState(() => getInitialActionsGeometry(actionsLayout));

  useLayoutEffect(() => {
    const updateGeometry = () => {
      const actionsSlot = document.querySelector<HTMLElement>(".header-actions-slot");
      const heroStartTop = getHeroFloatingActionsTop(
        actionsLayout,
        notificationBannerVisible,
        bannerPinned,
        pinnedBannerHeight,
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

    const scrollNode = document.querySelector<HTMLElement>(".homepage-main");
    scrollNode?.addEventListener("scroll", updateGeometry, { passive: true });

    const stickyHeader = document.querySelector<HTMLElement>(".homepage-sticky-header");
    const pinnedBanner = document.querySelector<HTMLElement>(".notification-banner-fixed");
    const bannerRegion = document.querySelector<HTMLElement>(".notification-banner-region");
    const workspace = document.querySelector<HTMLElement>(".homepage-workspace");
    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateGeometry) : null;

    resizeObserver?.observe(stickyHeader ?? document.documentElement);
    resizeObserver?.observe(pinnedBanner ?? document.documentElement);
    resizeObserver?.observe(bannerRegion ?? document.documentElement);
    resizeObserver?.observe(workspace ?? document.documentElement);

    return () => {
      scrollNode?.removeEventListener("scroll", updateGeometry);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateGeometry);
    };
  }, [
    actionsLayout,
    aiChatOpen,
    bannerPinned,
    homepageActive,
    notificationBannerVisible,
    pinnedBannerHeight,
    progress,
  ]);

  return geometry;
}

function useSearchMorphGeometry(
  progress: number,
  bannerAffectsHero: boolean,
  pinnedBannerHeight: number,
  homepageActive: boolean,
) {
  const [geometry, setGeometry] = useState({
    "--search-morph-left": "24px",
    "--search-morph-top": "116px",
    "--search-morph-width": "604px",
    "--search-morph-height": "48px",
    "--search-morph-radius": "24px",
    "--search-morph-padding-x": "16px",
    "--search-morph-padding-y": "4px",
    "--search-morph-border-width": "0px",
    "--search-morph-shadow": "var(--occam-elevation-2dp)",
  });

  useLayoutEffect(() => {
    const updateGeometry = () => {
      const welcomeSearch = document.querySelector<HTMLElement>(".welcome-search-placeholder");
      const stickySearch = document.querySelector<HTMLElement>(".sticky-search-placeholder");
      const actionsSlot = document.querySelector<HTMLElement>(".header-actions-slot");

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

    const bannerRegion = document.querySelector<HTMLElement>(".notification-banner-region");
    const pinnedBanner = document.querySelector<HTMLElement>(".notification-banner-fixed");
    const stickyHeader = document.querySelector<HTMLElement>(".homepage-sticky-header");
    const welcomeSearch = document.querySelector<HTMLElement>(".welcome-search");
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateGeometry)
        : null;

    if (bannerRegion) {
      resizeObserver?.observe(bannerRegion);
    }

    if (pinnedBanner) {
      resizeObserver?.observe(pinnedBanner);
    }

    if (stickyHeader) {
      resizeObserver?.observe(stickyHeader);
    }

    if (welcomeSearch) {
      resizeObserver?.observe(welcomeSearch);
    }

    window.addEventListener("resize", updateGeometry);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateGeometry);
    };
  }, [bannerAffectsHero, homepageActive, pinnedBannerHeight, progress]);

  return geometry;
}

function useWelcomeHeroMorphY(
  bannerAffectsHero: boolean,
  homepageActive: boolean,
  scrollRef: RefObject<HTMLElement | null>,
) {
  const [welcomeTitleMorphY, setWelcomeTitleMorphY] = useState(WELCOME_TITLE_MORPH_Y);

  useLayoutEffect(() => {
    if (!homepageActive) {
      return undefined;
    }

    const getWelcomeHeadingOffset = () => {
      const scrollNode = scrollRef.current;
      const stickyHeader = document.querySelector<HTMLElement>(".homepage-sticky-header");
      const welcomeHeading = document.querySelector<HTMLElement>(".welcome-search h2");

      if (!stickyHeader || !welcomeHeading) {
        return WELCOME_TITLE_MORPH_Y;
      }

      if (scrollNode && scrollNode.scrollTop > 1) {
        return null;
      }

      const headingRect = welcomeHeading.getBoundingClientRect();
      const headerRect = stickyHeader.getBoundingClientRect();

      return Math.max(
        WELCOME_TITLE_MORPH_Y,
        headingRect.top - headerRect.top - STICKY_HEADER_TITLE_TOP,
      );
    };

    const updateMorphY = () => {
      const nextOffset = getWelcomeHeadingOffset();

      if (nextOffset == null) {
        return;
      }

      setWelcomeTitleMorphY((current) =>
        Math.abs(current - nextOffset) > 0.5 ? nextOffset : current,
      );
    };

    const scheduleUpdate = () => {
      updateMorphY();
      window.requestAnimationFrame(updateMorphY);
    };

    scheduleUpdate();

    const scrollNode = scrollRef.current;
    const bannerRegion = document.querySelector<HTMLElement>(".notification-banner-region");
    const pinnedBanner = document.querySelector<HTMLElement>(".notification-banner-fixed");
    const stickyHeader = document.querySelector<HTMLElement>(".homepage-sticky-header");
    const welcomeSearch = document.querySelector<HTMLElement>(".welcome-search");
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleUpdate)
        : null;

    resizeObserver?.observe(bannerRegion ?? document.documentElement);
    resizeObserver?.observe(pinnedBanner ?? document.documentElement);
    resizeObserver?.observe(stickyHeader ?? document.documentElement);
    resizeObserver?.observe(welcomeSearch ?? document.documentElement);

    scrollNode?.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      resizeObserver?.disconnect();
      scrollNode?.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [bannerAffectsHero, homepageActive, scrollRef]);

  return welcomeTitleMorphY;
}

function useBannerPinMotion(
  notificationBannerVisible: boolean,
  scrollRef: RefObject<HTMLElement | null>,
  homepageActive: boolean,
) {
  const bannerAnchorRef = useRef<HTMLDivElement | null>(null);
  const bannerSlotRef = useRef<HTMLDivElement | null>(null);
  const bannerPinnedShellRef = useRef<HTMLDivElement | null>(null);
  const [bannerPinned, setBannerPinned] = useState(false);
  const [pinnedBannerHeight, setPinnedBannerHeight] = useState(NOTIFICATION_BANNER_PINNED_HEIGHT_FALLBACK);

  useEffect(() => {
    if (!homepageActive || !notificationBannerVisible) {
      setBannerPinned(false);
      return undefined;
    }

    let frame = 0;
    let cancelled = false;
    let scrollNode: HTMLElement | null = null;
    let slot: HTMLDivElement | null = null;

    const getScrollTop = () =>
      Math.max(
        scrollNode?.scrollTop ?? 0,
        window.scrollY,
        document.documentElement.scrollTop,
        document.body.scrollTop,
      );

    const updatePinned = () => {
      frame = 0;

      if (!slot) {
        return;
      }

      const scrollTop = getScrollTop();
      const slotTop = slot.getBoundingClientRect().top;
      setBannerPinned(scrollTop > 0 && slotTop <= 0);
    };

    const scheduleUpdate = () => {
      if (frame || cancelled) {
        return;
      }

      frame = window.requestAnimationFrame(updatePinned);
    };

    const attachListeners = () => {
      scrollNode = scrollRef.current;
      slot = bannerSlotRef.current;

      if (!scrollNode || !slot) {
        frame = window.requestAnimationFrame(attachListeners);
        return;
      }

      updatePinned();
      scrollNode.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("resize", scheduleUpdate);
    };

    attachListeners();

    return () => {
      cancelled = true;

      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      scrollNode?.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [homepageActive, notificationBannerVisible, scrollRef]);

  useLayoutEffect(() => {
    if (!notificationBannerVisible || !bannerPinned) {
      setPinnedBannerHeight(NOTIFICATION_BANNER_PINNED_HEIGHT_FALLBACK);
      return undefined;
    }

    const shell = bannerPinnedShellRef.current;

    if (!shell) {
      return undefined;
    }

    const updateHeight = () => {
      setPinnedBannerHeight(shell.offsetHeight);
    };

    updateHeight();

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateHeight) : null;

    resizeObserver?.observe(shell);
    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [bannerPinned, notificationBannerVisible]);

  return {
    bannerAnchorRef,
    bannerPinned,
    bannerPinnedShellRef,
    bannerSlotRef,
    pinnedBannerHeight,
  };
}

function IconButton({
  children,
  className,
  label,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  label: string;
  onClick?: () => void;
}) {
  const classNames = ["icon-button", className].filter(Boolean).join(" ");

  return (
    <button
      className={classNames}
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function GlobalNav() {
  return (
    <aside className="global-nav" aria-label="Global navigation">
      <div className="primary-nav">
        <div className="primary-nav-group">
          <IconButton label="Home">
            <HomeOutlinedIcon />
          </IconButton>
          <span className="nav-separator" />
          <IconButton label="Billing">
            <span className="product-icon">
              <ReceiptLongOutlinedIcon />
              <b>B</b>
            </span>
          </IconButton>
          <IconButton label="Revenue">
            <span className="product-icon">
              <TableChartOutlinedIcon />
              <b>R</b>
            </span>
          </IconButton>
        </div>
        <div className="primary-nav-group">
          <IconButton label="Feedback">
            <FeedbackOutlinedIcon />
          </IconButton>
          <span className="nav-separator" />
          <IconButton label="Help">
            <HelpOutlineOutlinedIcon />
          </IconButton>
          <IconButton label="App settings">
            <TuneOutlinedIcon />
          </IconButton>
          <button className="avatar-button" type="button" aria-label="Rachel Carter">
            RC
          </button>
        </div>
      </div>

      <div className="secondary-nav">
        <div className="product-title-row">
          <strong>Zuora Revenue</strong>
          <SettingsOutlinedIcon />
          <span className="collapse-mark" />
        </div>

        <section className="tenant-badge" aria-label="Tenant">
          <div className="tenant-meta">
            <span className="environment-chip">Prod</span>
            <span>Default</span>
            <KeyboardArrowDownIcon />
          </div>
          <strong>TenantABC123</strong>
          <span>Tenant ID: 00789</span>
        </section>

        <label className="app-search">
          <span>Search in Revenue</span>
          <kbd>⌘K</kbd>
        </label>

        <nav className="menu-section" aria-label="Revenue pages">
          <a className="menu-item" href="#period">
            <CalendarTodayOutlinedIcon />
            <span>Sep 2024</span>
          </a>
          <a className="menu-item" href="#notifications">
            <NotificationsNoneOutlinedIcon />
            <span>Notifications</span>
          </a>
        </nav>

        <span className="section-divider" />

        <section className="menu-section">
          <h2>Setups</h2>
          <a className="menu-subitem" href="#configurator">
            Configurator
          </a>
          <a className="menu-subitem" href="#migration">
            Migration
          </a>
          <a className="menu-subitem" href="#downloads">
            Shared Downloads
          </a>
        </section>

        <span className="section-divider" />

        <section className="menu-section">
          <h2>Suggested Pages</h2>
          <a className="menu-item" href="#integration">
            <span className="bolt-dot">
              <BoltOutlinedIcon />
            </span>
            <span>Data Integration</span>
          </a>
          <a className="menu-subitem" href="#profiles">
            Profiles
          </a>
          <a className="menu-subitem" href="#roles">
            Roles
          </a>
        </section>

        <span className="section-divider" />

        <nav className="menu-section" aria-label="Default revenue pages">
          {menuItems.map((item) => (
            <a className="menu-item" href={`#${item.label.toLowerCase().replaceAll(" ", "-")}`} key={item.label}>
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

function SearchField({
  className,
  compact = false,
  hidden = false,
  placeholder = "Search in Zuora",
  tabIndex,
}: {
  className?: string;
  compact?: boolean;
  hidden?: boolean;
  placeholder?: string;
  tabIndex?: number;
}) {
  const classes = ["search-field", compact ? "search-field-compact" : "", className].filter(Boolean).join(" ");

  return (
    <label className={classes} aria-hidden={hidden || undefined}>
      <SearchIcon />
      <input aria-label={placeholder} placeholder={placeholder} tabIndex={hidden ? -1 : tabIndex} />
    </label>
  );
}

function ConfigurePageIcon() {
  return <img alt="" aria-hidden="true" className="configure-page-icon" src={configureHomepageIconUrl} />;
}

function StickyHeader({ active, visible }: { active: boolean; visible: boolean }) {
  if (!visible) {
    return null;
  }

  return (
    <header className="homepage-sticky-header" data-node-id="1:148707" aria-hidden={!active}>
      <div className="sticky-header-leading">
        <h1>Welcome to Zuora, Rachel Carter</h1>
      </div>
      <div className="sticky-actions">
        <SearchField className="sticky-search-placeholder" compact hidden />
        <div className="header-actions-slot" data-node-id="1:148714" aria-hidden="true" />
      </div>
    </header>
  );
}

function MorphingSearchField() {
  return <SearchField className="morphing-search-control" />;
}

function MorphingFloatingActions({
  configureActionsRef,
  homepageMenuOpen,
  onCloseHomepageMenu,
  onOpenAddWidgetPanel,
  onOpenManageHub,
  onResetHomepage,
  onToggleHomepageMenu,
}: {
  configureActionsRef: RefObject<HTMLDivElement | null>;
  homepageMenuOpen: boolean;
  onCloseHomepageMenu: () => void;
  onOpenAddWidgetPanel: () => void;
  onOpenManageHub: () => void;
  onResetHomepage: () => void;
  onToggleHomepageMenu: () => void;
}) {
  return (
    <div className="morphing-floating-actions" data-node-id="1:139205" ref={configureActionsRef}>
      <FloatingButton
        aria-label="Configure homepage"
        className="morphing-floating-button morphing-floating-button-configure"
        icon={<ConfigurePageIcon />}
        onClick={onToggleHomepageMenu}
        shape="circular"
        size="small"
        theme="light"
        variant="secondary"
      />
      {homepageMenuOpen ? (
        <HomepageActionsMenu
          anchorRef={configureActionsRef}
          onClose={onCloseHomepageMenu}
          onManageTemplates={onOpenManageHub}
          onResetHomepage={onResetHomepage}
        />
      ) : null}
      <FloatingButton
        aria-label="Add widget"
        className="morphing-floating-button morphing-floating-button-create"
        icon={<AddIcon />}
        onClick={onOpenAddWidgetPanel}
        shape="circular"
        size="small"
        theme="light"
      />
    </div>
  );
}

function WelcomeSearch() {
  return (
    <section className="welcome-search" data-node-id="1:57109">
      <h2>Welcome to Zuora, Rachel Carter</h2>
      <SearchField className="welcome-search-placeholder" hidden />
    </section>
  );
}


function WidgetTypeCard({
  configurable,
  description,
  name,
  onSelect,
}: {
  configurable: boolean;
  description: string;
  name: string;
  onSelect: () => void;
}) {
  return (
    <article className="widget-type-card">
      <div className="widget-type-card-copy">
        <strong>{name}</strong>
        <p>{description}</p>
      </div>
      <button
        className="widget-type-select-button"
        disabled={!configurable}
        onClick={onSelect}
        type="button"
      >
        Select
      </button>
    </article>
  );
}

function WidgetPanelCustomWidgetsEntry({
  onOpenManageCustomWidgets,
}: {
  onOpenManageCustomWidgets: () => void;
}) {
  return (
    <section className="widget-type-list-footer" data-node-id="309:25159">
      <hr className="widget-type-list-footer-divider" />
      <div className="widget-type-list-footer-actions">
        <p className="widget-type-list-footer-copy">
          Can&apos;t find the widgets you need?
          <br />
          Try create your own widgets.
        </p>
        <button
          className="widget-type-list-footer-link"
          onClick={onOpenManageCustomWidgets}
          type="button"
        >
          <WidgetsOutlinedIcon aria-hidden="true" />
          <span>Custom Widgets</span>
        </button>
      </div>
    </section>
  );
}

function CustomWidgetTypeCard({
  onSelect,
  widget,
}: {
  onSelect: () => void;
  widget: CustomWidget;
}) {
  return (
    <article className="widget-type-card">
      <div className="widget-type-card-copy">
        <strong>{widget.name}</strong>
        <p>{widget.description}</p>
      </div>
      <div className="widget-type-card-actions">
        <span className="widget-type-custom-tag">{getCustomWidgetVisibilityChipLabel(widget.access)}</span>
        <button className="widget-type-select-button" onClick={onSelect} type="button">
          Select
        </button>
      </div>
    </article>
  );
}

function WidgetTypeListGroup({
  children,
  count,
  expanded,
  onToggle,
  title,
}: {
  children: ReactNode;
  count: number;
  expanded: boolean;
  onToggle: () => void;
  title: string;
}) {
  const panelId = useId();

  return (
    <section className={`widget-type-list-group${expanded ? "" : " is-collapsed"}`}>
      <button
        aria-controls={panelId}
        aria-expanded={expanded}
        className="widget-type-list-group-header"
        onClick={onToggle}
        type="button"
      >
        <span className="widget-type-list-group-title">
          {title} <span className="widget-type-list-group-count">({count})</span>
        </span>
        <ExpandMoreIcon aria-hidden="true" className="widget-type-list-group-chevron" />
      </button>
      {expanded ? (
        <div className="widget-type-list-group-items" id={panelId}>
          {children}
        </div>
      ) : null}
    </section>
  );
}

function AddWidgetPanel({
  customWidgets,
  onClose,
  onOpenManageCustomWidgets,
  onSelectCustomWidget,
  onSelectWidget,
  searchQuery,
  onSearchQueryChange,
}: {
  customWidgets: CustomWidget[];
  onClose: () => void;
  onOpenManageCustomWidgets: () => void;
  onSelectCustomWidget: (widgetId: string) => void;
  onSelectWidget: (widgetId: (typeof WIDGET_TYPES)[number]["id"]) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
}) {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleWidgets = WIDGET_TYPES.filter((widget) => {
    if (!normalizedQuery) {
      return true;
    }

    return (
      widget.name.toLowerCase().includes(normalizedQuery) ||
      widget.description.toLowerCase().includes(normalizedQuery)
    );
  });
  const visibleCustomWidgets = customWidgets.filter((widget) => {
    if (!normalizedQuery) {
      return true;
    }

    return (
      widget.name.toLowerCase().includes(normalizedQuery) ||
      widget.description.toLowerCase().includes(normalizedQuery)
    );
  });
  const isSearching = normalizedQuery.length > 0;
  const [standardWidgetsExpanded, setStandardWidgetsExpanded] = useState(true);
  const [customWidgetsExpanded, setCustomWidgetsExpanded] = useState(true);
  const showStandardGroup = !isSearching || visibleWidgets.length > 0;
  const showCustomGroup = !isSearching || visibleCustomWidgets.length > 0;

  useEffect(() => {
    if (!isSearching) {
      return;
    }

    setStandardWidgetsExpanded(visibleWidgets.length > 0);
    setCustomWidgetsExpanded(visibleCustomWidgets.length > 0);
  }, [isSearching, visibleCustomWidgets.length, visibleWidgets.length]);

  return (
    <WidgetDrawerShell
      ariaLabel="Add widget"
      dataNodeId="110:13924"
      header={<h2>Add Widget</h2>}
      onClose={onClose}
    >
      <label className="widget-drawer-search">
        <SearchIcon />
        <input
          aria-label="Search widget"
          onChange={(event) => onSearchQueryChange(event.currentTarget.value)}
          placeholder="Search Widget"
          type="search"
          value={searchQuery}
        />
      </label>
      <div className="widget-type-list">
        {showStandardGroup ? (
          <WidgetTypeListGroup
            count={visibleWidgets.length}
            expanded={standardWidgetsExpanded}
            onToggle={() => setStandardWidgetsExpanded((current) => !current)}
            title="Standard widgets"
          >
            {visibleWidgets.map((widget) => (
              <WidgetTypeCard
                configurable={widget.configurable}
                description={widget.description}
                key={widget.id}
                name={widget.name}
                onSelect={() => onSelectWidget(widget.id)}
              />
            ))}
          </WidgetTypeListGroup>
        ) : null}
        {showCustomGroup ? (
          <WidgetTypeListGroup
            count={visibleCustomWidgets.length}
            expanded={customWidgetsExpanded}
            onToggle={() => setCustomWidgetsExpanded((current) => !current)}
            title="Custom widgets"
          >
            {visibleCustomWidgets.map((widget) => (
              <CustomWidgetTypeCard
                key={widget.id}
                onSelect={() => onSelectCustomWidget(widget.id)}
                widget={widget}
              />
            ))}
          </WidgetTypeListGroup>
        ) : null}
        {!showStandardGroup && !showCustomGroup ? (
          <p className="widget-type-empty">No widgets match your search.</p>
        ) : null}
        <WidgetPanelCustomWidgetsEntry onOpenManageCustomWidgets={onOpenManageCustomWidgets} />
      </div>
    </WidgetDrawerShell>
  );
}

function ConfigureRevenueProgressPanel({
  onAdd,
  onBack,
  onClose,
}: {
  onAdd: () => void;
  onBack: () => void;
  onClose: () => void;
}) {
  return (
    <WidgetDrawerShell
      ariaLabel="Configure revenue progress widget"
      dataNodeId="110:14017"
      footer={
        <button className="widget-drawer-primary-button" onClick={onAdd} type="button">
          Add
        </button>
      }
      header={
        <button className="widget-drawer-back-button" onClick={onBack} type="button">
          <ChevronLeftIcon />
          <span>Back</span>
        </button>
      }
      onClose={onClose}
    >
      <div className="widget-config-section">
        <h2>Add Revenue Progress</h2>
        <hr className="widget-config-divider" />
      </div>

      <div className="widget-config-field">
        <label className="widget-config-label" htmlFor="revenue-progress-type">
          <span>Select Type</span>
          <span aria-hidden="true" className="widget-config-required">
            *
          </span>
          <InfoOutlinedIcon aria-hidden="true" />
        </label>
        <div className="widget-config-select" id="revenue-progress-type">
          <span>Close Progress Status</span>
          <ExpandMoreIcon />
        </div>
      </div>

      <div className="widget-config-section">
        <h3>Widget Size</h3>
        <hr className="widget-config-divider" />
      </div>

      <WidgetSizePreview size="3x3" />
    </WidgetDrawerShell>
  );
}

function WidgetDrawer({
  configureCustomWidgetSize,
  configureKind,
  configuringCustomWidget,
  customWidgets,
  onAddRevenueProgress,
  onBackToSelect,
  onClose,
  onConfirmAddCustomWidget,
  onConfigureCustomWidgetSizeChange,
  onEditCustomWidgetFromDrawer,
  onOpenManageCustomWidgets,
  onSelectCustomWidget,
  onSelectWidget,
  searchQuery,
  onSearchQueryChange,
  step,
}: {
  configureCustomWidgetSize: CustomWidgetSize;
  configureKind: WidgetDrawerConfigureKind;
  configuringCustomWidget: CustomWidget | undefined;
  customWidgets: CustomWidget[];
  onAddRevenueProgress: () => void;
  onBackToSelect: () => void;
  onClose: () => void;
  onConfirmAddCustomWidget: () => void;
  onConfigureCustomWidgetSizeChange: (size: CustomWidgetSize) => void;
  onEditCustomWidgetFromDrawer: () => void;
  onOpenManageCustomWidgets: () => void;
  onSelectCustomWidget: (widgetId: string) => void;
  onSelectWidget: (widgetId: (typeof WIDGET_TYPES)[number]["id"]) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  step: Exclude<WidgetDrawerStep, "closed">;
}) {
  if (step === "select") {
    return (
      <AddWidgetPanel
        customWidgets={customWidgets}
        onClose={onClose}
        onOpenManageCustomWidgets={onOpenManageCustomWidgets}
        onSearchQueryChange={onSearchQueryChange}
        onSelectCustomWidget={onSelectCustomWidget}
        onSelectWidget={onSelectWidget}
        searchQuery={searchQuery}
      />
    );
  }

  if (configureKind === "custom-widget" && configuringCustomWidget) {
    return (
      <ConfigureCustomWidgetPanel
        onAdd={onConfirmAddCustomWidget}
        onBack={onBackToSelect}
        onClose={onClose}
        onEditCustomWidget={onEditCustomWidgetFromDrawer}
        onSizeChange={onConfigureCustomWidgetSizeChange}
        selectedSize={configureCustomWidgetSize}
        widget={configuringCustomWidget}
      />
    );
  }

  return (
    <ConfigureRevenueProgressPanel
      onAdd={onAddRevenueProgress}
      onBack={onBackToSelect}
      onClose={onClose}
    />
  );
}

function NotificationBannerPagination({
  activeIndex,
  total,
  onPrevious,
  onNext,
}: {
  activeIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  if (total <= 1) {
    return null;
  }

  return (
    <div className="notification-banner-pagination" data-node-id="188:21387">
      <button
        aria-label="Previous notification"
        className="notification-banner-pagination-button"
        disabled={activeIndex <= 0}
        onClick={onPrevious}
        type="button"
      >
        <ChevronLeftIcon />
      </button>
      <span className="notification-banner-pagination-count">
        {activeIndex + 1} of {total}
      </span>
      <button
        aria-label="Next notification"
        className="notification-banner-pagination-button"
        disabled={activeIndex >= total - 1}
        onClick={onNext}
        type="button"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}

function NotificationBannerRegion({
  bannerPinned,
  onClose,
  anchorRef,
  pinnedShellRef,
  slotRef,
}: {
  bannerPinned: boolean;
  onClose: () => void;
  anchorRef: RefObject<HTMLDivElement | null>;
  pinnedShellRef: RefObject<HTMLDivElement | null>;
  slotRef: RefObject<HTMLDivElement | null>;
}) {
  const [activeAnnouncementIndex, setActiveAnnouncementIndex] = useState(0);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const showPinnedOverlay = bannerPinned;
  const totalAnnouncements = notificationAnnouncements.length;

  useEffect(() => {
    if (!showPinnedOverlay) {
      setDetailsExpanded(false);
    }
  }, [showPinnedOverlay]);

  const handlePreviousAnnouncement = () => {
    setActiveAnnouncementIndex((current) => Math.max(0, current - 1));
  };

  const handleNextAnnouncement = () => {
    setActiveAnnouncementIndex((current) => Math.min(totalAnnouncements - 1, current + 1));
  };

  return (
    <div className="notification-banner-region" ref={anchorRef}>
      <div
        aria-hidden={showPinnedOverlay || undefined}
        className="notification-banner-slot"
        ref={slotRef}
      >
        <NotificationBanner
          activeIndex={activeAnnouncementIndex}
          onClose={onClose}
          onNext={handleNextAnnouncement}
          onPrevious={handlePreviousAnnouncement}
          total={totalAnnouncements}
        />
      </div>
      <div
        aria-hidden={!showPinnedOverlay || undefined}
        className="notification-banner-fixed"
        ref={pinnedShellRef}
      >
        <NotificationBanner
          activeIndex={activeAnnouncementIndex}
          detailsExpanded={detailsExpanded}
          onClose={onClose}
          onNext={handleNextAnnouncement}
          onPrevious={handlePreviousAnnouncement}
          onToggleDetails={() => setDetailsExpanded((current) => !current)}
          pinned
          total={totalAnnouncements}
        />
      </div>
    </div>
  );
}

function NotificationBanner({
  activeIndex,
  detailsExpanded = false,
  onClose,
  onNext,
  onPrevious,
  onToggleDetails,
  pinned = false,
  total,
}: {
  activeIndex: number;
  detailsExpanded?: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onToggleDetails?: () => void;
  pinned?: boolean;
  total: number;
}) {
  const announcement = notificationAnnouncements[activeIndex];
  const showCompactPinned = pinned && !detailsExpanded;
  const bannerClassName = [
    "notification-banner",
    pinned ? "notification-banner-pinned" : "",
    pinned && detailsExpanded ? "notification-banner-expanded" : "",
    showCompactPinned ? "notification-banner-compact" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={bannerClassName}
      data-node-id={pinned ? "188:21487" : "188:21228"}
      role="region"
      aria-label="Notification"
    >
      {!pinned ? (
        <IconButton
          className="notification-banner-close"
          label="Dismiss notification"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
      <div className="notification-banner-layout">
        <NotificationBannerPagination
          activeIndex={activeIndex}
          onNext={onNext}
          onPrevious={onPrevious}
          total={total}
        />
        <div className="notification-banner-message">
          <div className="notification-banner-header-row">
            <p className="notification-banner-title">{announcement.title}</p>
          </div>
          {!showCompactPinned ? (
            <>
              <p className="notification-banner-description">{announcement.description}</p>
              <div className="notification-banner-actions">
                <button className="notification-banner-action" type="button">
                  {announcement.primaryAction}
                </button>
                <button className="notification-banner-action" type="button">
                  {announcement.secondaryAction}
                </button>
              </div>
            </>
          ) : null}
        </div>
        {pinned ? (
          <div className="notification-banner-controls">
            <button
              aria-expanded={detailsExpanded}
              className="notification-banner-detail-toggle"
              onClick={onToggleDetails}
              type="button"
            >
              {detailsExpanded ? "Hide Detail" : "View Detail"}
            </button>
            <IconButton
              className="notification-banner-close"
              label="Dismiss notification"
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function FeedbackToast({
  message,
  onClose,
  onViewDetails,
  onViewWidget,
  showViewDetails,
  showViewWidget,
}: {
  message: string;
  onClose: () => void;
  onViewDetails?: () => void;
  onViewWidget?: () => void;
  showViewDetails?: boolean;
  showViewWidget?: boolean;
}) {
  return (
    <div className="feedback-toast" data-node-id="111:13461" role="status" aria-live="polite">
      <div className="feedback-toast-inner">
        <div className="feedback-toast-message">
          <InfoIcon aria-hidden="true" className="feedback-toast-info-icon" />
          <p>{message}</p>
        </div>
        <div className="feedback-toast-actions">
          {showViewDetails && onViewDetails ? (
            <button className="feedback-toast-action" type="button" onClick={onViewDetails}>
              View Details
            </button>
          ) : null}
          {showViewWidget && onViewWidget ? (
            <button className="feedback-toast-action" type="button" onClick={onViewWidget}>
              view Widget
            </button>
          ) : null}
          <button className="feedback-toast-close" type="button" aria-label="Dismiss notification" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function DashboardGrid({
  addedWidgetIds,
  addedWidgetRef,
  aiDashboardVariant,
  aiLibraryWidgetIds,
  getCustomWidgetById,
  hiddenMetricCardLabels,
  highlightedWidgetRefId,
  isAiGenerated,
  metricCardOrder,
  removedWidgetIds,
  revenueProgressAdded,
  startWithEmptyHomepage,
  widgetOrder,
}: {
  addedWidgetIds: string[];
  addedWidgetRef: RefObject<HTMLElement | null>;
  aiDashboardVariant: "default" | "month-end-close";
  aiLibraryWidgetIds: DashboardWidgetId[];
  getCustomWidgetById: (widgetId: string) => CustomWidget | undefined;
  hiddenMetricCardLabels: string[];
  highlightedWidgetRefId: string | null;
  isAiGenerated: boolean;
  metricCardOrder: string[] | null;
  removedWidgetIds: DashboardWidgetId[];
  revenueProgressAdded: boolean;
  startWithEmptyHomepage: boolean;
  widgetOrder: DashboardWidgetId[] | null;
}) {
  if (isAiGenerated) {
    return (
      <section className="dashboard-grid dashboard-grid-ai-generated" data-node-id="225:41367">
        <AiGeneratedDashboard
          addedWidgetIds={addedWidgetIds}
          getCustomWidgetById={getCustomWidgetById}
          hiddenMetricCardLabels={hiddenMetricCardLabels}
          highlightedWidgetRefId={highlightedWidgetRefId}
          libraryWidgetIds={aiLibraryWidgetIds}
          metricCardOrder={metricCardOrder}
          variant={aiDashboardVariant}
          widgetRef={addedWidgetRef}
        />
      </section>
    );
  }

  const visibleWidgetIds = getCurrentDashboardWidgetIds({
    addedWidgetIds,
    layout: "default",
    removedWidgetIds,
    revenueProgressAdded,
    startWithEmptyHomepage,
    widgetOrder,
  });

  return (
    <section className="dashboard-grid" data-node-id="1:57116">
      {visibleWidgetIds.map((widgetId) => (
        <DashboardWidget
          key={widgetId}
          widgetId={widgetId}
          widgetRef={widgetId === "revenue-progress" ? addedWidgetRef : undefined}
        />
      ))}
      <HomepageCustomWidgets
        addedWidgetIds={addedWidgetIds}
        getCustomWidgetById={getCustomWidgetById}
        highlightedWidgetRefId={highlightedWidgetRefId}
        widgetRef={addedWidgetRef}
      />
    </section>
  );
}

type FeedbackToastState = {
  message: string;
  savedCustomWidgetId?: string;
  savedTemplateId?: string;
  showViewWidgetAction?: boolean;
};

const FEEDBACK_TOAST_DURATION_MS = 3000;

export function App() {
  const customWidgetEditorCapture = getCustomWidgetEditorCaptureConfig();
  const [showOnboarding, setShowOnboarding] = useState(() => !customWidgetEditorCapture);
  const [startWithEmptyHomepage, setStartWithEmptyHomepage] = useState(false);
  const [actionsLayout] = useState(getActionsLayout);
  const [revenueProgressAdded, setRevenueProgressAdded] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<FeedbackToastState | null>(null);
  const {
    addWidgets,
    addedWidgetIds,
    aiDashboardVariant,
    aiLibraryWidgetIds,
    applyAiGeneratedLayout,
    applyCleanupPlan,
    hiddenMetricCardLabels,
    isAiGenerated,
    layout,
    metricCardOrder,
    removedWidgetIds,
    resetToDefaultLayout,
    undoCleanup,
    widgetOrder,
  } = useHomepageConfig();
  const {
    clearHistory,
    deleteWidget,
    privateWidgets,
    getWidgetById,
    historyEntries,
    publishedWidgets,
    saveWidget,
    widgets,
  } = useCustomWidgets();
  const {
    createTemplate,
    deleteTemplate,
    draftTemplates,
    getTemplateById,
    publishTemplate,
    publishedTemplates,
    saveTemplate,
    templates,
  } = useHomepageTemplates();
  const [homepageView, setHomepageView] = useState<HomepageView>(() =>
    customWidgetEditorCapture ? "create-widget" : "home",
  );
  const [editingWidgetId, setEditingWidgetId] = useState<string | null>(null);
  const [aiSuggestedWidgetDraft, setAiSuggestedWidgetDraft] = useState<CustomWidgetDraft | null>(null);
  const [newCustomWidgetDraft, setNewCustomWidgetDraft] = useState<CustomWidgetDraft | null>(null);
  const [aiSuggestedEditorStep, setAiSuggestedEditorStep] = useState<EditorStep | null>(null);
  const [aiSuggestedTemplateDraft, setAiSuggestedTemplateDraft] =
    useState<HomepageTemplateDraft | null>(null);
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [templateEditorReturnView, setTemplateEditorReturnView] =
    useState<Extract<HomepageView, "home" | "manage-templates">>("home");
  const [manageWidgetsTab, setManageWidgetsTab] = useState<ManageWidgetsTab>("published");
  const [manageTemplatesTab, setManageTemplatesTab] = useState<ManageTemplatesTab>("published");
  const [homepageMenuOpen, setHomepageMenuOpen] = useState(false);
  const configureActionsRef = useRef<HTMLDivElement | null>(null);
  const cleanupRevenueProgressSnapshot = useRef(false);
  const showFeedbackToast = useCallback(
    (
      message: string,
      options?: {
        savedCustomWidgetId?: string;
        savedTemplateId?: string;
        showViewWidgetAction?: boolean;
      },
    ) => {
      setFeedbackToast({
        message,
        savedCustomWidgetId: options?.savedCustomWidgetId,
        savedTemplateId: options?.savedTemplateId,
        showViewWidgetAction: options?.showViewWidgetAction,
      });
    },
    [],
  );
  const dismissFeedbackToast = useCallback(() => {
    setFeedbackToast(null);
  }, []);
  const handleAddRecommendedWidgets = useCallback(
    (widgetIds: string[]) => {
      const dashboardWidgetIds: string[] = [];

      widgetIds.forEach((widgetId) => {
        if (widgetId === AI_RECOMMENDATION_TOP_ACCOUNTS_ID) {
          const liveProposal = buildTopAccountsLiveDataProposal();
          const savedWidgetId = saveWidget({
            ...liveProposal.draft,
            status: "draft",
            isAiGenerated: true,
          });
          const refId = createCustomWidgetRefId(savedWidgetId, liveProposal.draft.size);
          addWidgets([refId]);
          setHighlightedWidgetRefId(refId);
          showFeedbackToast(
            `${liveProposal.draft.name?.trim() || "Custom widget"} has been added to your homepage and saved to your widget library.`,
            { savedCustomWidgetId: savedWidgetId, showViewWidgetAction: true },
          );
          return;
        }

        dashboardWidgetIds.push(widgetId);
      });

      if (dashboardWidgetIds.length === 0) {
        return;
      }

      addWidgets(dashboardWidgetIds);

      if (isAiGenerated) {
        setHighlightedWidgetRefId(dashboardWidgetIds[0] ?? null);
        showFeedbackToast(
          dashboardWidgetIds.length === 1
            ? "Widget added to your homepage."
            : `${dashboardWidgetIds.length} widgets added to your homepage.`,
        );
      } else if (dashboardWidgetIds.includes("revenue-progress")) {
        setRevenueProgressAdded(true);
        setHighlightedWidgetRefId("revenue-progress");
        showFeedbackToast("Revenue Progress has been added.", { showViewWidgetAction: true });
      }
    },
    [addWidgets, isAiGenerated, saveWidget, showFeedbackToast],
  );
  const handleApplyCleanup = useCallback(
    (plan: HomepageCleanupPlan) => {
      cleanupRevenueProgressSnapshot.current = revenueProgressAdded;
      applyCleanupPlan(plan, { startWithEmptyHomepage: startWithEmptyHomepage && !isAiGenerated });

      if (plan.orderedWidgetIds.includes("revenue-progress")) {
        setRevenueProgressAdded(true);
      } else if (plan.removedWidgetIds.includes("revenue-progress")) {
        setRevenueProgressAdded(false);
      }
    },
    [applyCleanupPlan, isAiGenerated, revenueProgressAdded, startWithEmptyHomepage],
  );
  const handleUndoCleanup = useCallback(() => {
    undoCleanup();
    setRevenueProgressAdded(cleanupRevenueProgressSnapshot.current);
  }, [undoCleanup]);
  const handleSaveProposedCustomWidget = useCallback(
    (proposal: CustomWidgetProposal) => {
      if (!proposal.supportsLiveData) {
        return undefined;
      }

      const liveProposal = buildTopAccountsLiveDataProposal();
      const widgetId = saveWidget({
        ...liveProposal.draft,
        status: "draft",
        isAiGenerated: true,
      });
      const refId = createCustomWidgetRefId(widgetId, liveProposal.draft.size);
      addWidgets([refId]);
      setHighlightedWidgetRefId(refId);
      const widgetName = liveProposal.draft.name?.trim() || "Custom widget";

      showFeedbackToast(`${widgetName} is added.`);

      return widgetId;
    },
    [addWidgets, saveWidget, showFeedbackToast],
  );
  const handleViewCustomWidgetsPersonalTab = useCallback(() => {
    dismissFeedbackToast();
    setShowOnboarding(false);
    setEditingWidgetId(null);
    setAiSuggestedWidgetDraft(null);
    setAiSuggestedEditorStep(null);
    setManageWidgetsTab("private");
    setHomepageView("manage-custom-widgets");
  }, [dismissFeedbackToast]);

  const handleOpenSavedCustomWidget = useCallback(
    (widgetId: string) => {
      const widget = getWidgetById(widgetId);
      dismissFeedbackToast();
      setShowOnboarding(false);

      if (isAiGeneratedCustomWidget(widget)) {
        setEditingWidgetId(widgetId);
        setAiSuggestedWidgetDraft(null);
        setAiSuggestedEditorStep("basic");
        setManageWidgetsTab("private");
        setHomepageView("edit-widget");
        return;
      }

      setEditingWidgetId(widgetId);
      setAiSuggestedWidgetDraft(null);
      setAiSuggestedEditorStep("configure");
      setManageWidgetsTab("private");
      setHomepageView("edit-widget");
    },
    [dismissFeedbackToast, getWidgetById],
  );
  const handleSaveProposedTeamTemplate = useCallback(
    (proposal: TeamTemplateProposal) => {
      const draft = {
        ...createTemplateDraftFromProposal(proposal),
        id: createTemplateId(),
      };
      const templateId = saveTemplate(draft);
      const templateName = draft.name?.trim() || "Template";

      showFeedbackToast(`${templateName} has been saved.`, { savedTemplateId: templateId });

      return templateId;
    },
    [saveTemplate, showFeedbackToast],
  );
  const handleOpenSavedTemplate = useCallback(
    (templateId: string) => {
      setEditingTemplateId(templateId);
      setAiSuggestedTemplateDraft(null);
      setShowOnboarding(false);
      setManageTemplatesTab("drafts");
      setHomepageView("edit-template");
      dismissFeedbackToast();
    },
    [dismissFeedbackToast],
  );
  const handleCloseTemplateEditor = useCallback(() => {
    setAiSuggestedTemplateDraft(null);
    setEditingTemplateId(null);
    setHomepageView(templateEditorReturnView);
  }, [templateEditorReturnView]);
  const handleSaveTemplateDraft = useCallback(
    (draft: HomepageTemplateDraft) => {
      saveTemplate(draft);
      setAiSuggestedTemplateDraft(draft);
      showFeedbackToast(`${draft.name} template draft saved.`);
    },
    [saveTemplate, showFeedbackToast],
  );
  const handlePublishTemplateDraft = useCallback(
    (draft: HomepageTemplateDraft) => {
      publishTemplate(draft);
      addWidgets([...draft.dashboardWidgetIds, ...draft.customWidgetRefs]);
      setAiSuggestedTemplateDraft({ ...draft, status: "published" });
      setManageTemplatesTab("published");
      showFeedbackToast(`${draft.name} template published for your team.`);
    },
    [addWidgets, publishTemplate, showFeedbackToast],
  );
  const handleApplyAiGeneratedPreview = useCallback(
    (preview?: ChatPreview) => {
      if (preview?.kind === "ai-generated-homepage") {
        const variant = preview.variant ?? "default";

        applyAiGeneratedLayout({
          libraryWidgetIds: preview.libraryWidgetIds,
          variant,
        });
        saveAiGeneratedHomepageMetricWidgets({
          existingWidgets: widgets,
          saveWidget,
          variant,
        });
        return;
      }

      applyAiGeneratedLayout();
    },
    [applyAiGeneratedLayout, saveWidget, widgets],
  );
  const isEmptyHomepage = startWithEmptyHomepage && !isAiGenerated;
  const {
    aiChatOpen,
    closeChat,
    handleAddRecommendedWidgets: handleChatAddRecommendedWidgets,
    handleApplyCleanup: handleChatApplyCleanup,
    handleApplyPreview,
    handleSaveProposedTeamTemplate: handleChatSaveProposedTeamTemplate,
    handleNewChat,
    handleRegeneratePreview,
    handleSaveProposedCustomWidget: handleChatSaveProposedCustomWidget,
    handleSendMessage,
    handleSuggestedAction,
    handleUndoCleanup: handleChatUndoCleanup,
    handleUndoPreview,
    inputMessage,
    isThinking,
    messages,
    onInputMessageChange,
    openChat,
    showEmptyStateSuggestions,
    startChat,
    startChatWithPrompt,
    suggestionContext,
    suggestions,
    thinkingProcess,
  } = useAiHomepageConfigChat({
    addedWidgetIds,
    aiDashboardVariant,
    aiLibraryWidgetIds,
    extraExcludedWidgetIds: revenueProgressAdded ? ["revenue-progress"] : [],
    hiddenMetricCardLabels,
    isAiGenerated,
    isEmptyHomepage,
    layout,
    metricCardOrder,
    onAddWidgets: handleAddRecommendedWidgets,
    onApplyCleanup: handleApplyCleanup,
    onApplyPreview: handleApplyAiGeneratedPreview,
    onSaveProposedTeamTemplate: handleSaveProposedTeamTemplate,
    onSaveProposedCustomWidget: handleSaveProposedCustomWidget,
    onUndoCleanup: handleUndoCleanup,
    onUndoPreview: resetToDefaultLayout,
    removedWidgetIds,
    revenueProgressAdded,
    widgetOrder,
  });
  const [feedbackShowViewWidget, setFeedbackShowViewWidget] = useState(false);
  const [widgetDrawerStep, setWidgetDrawerStep] = useState<WidgetDrawerStep>("closed");
  const [widgetDrawerConfigureKind, setWidgetDrawerConfigureKind] =
    useState<WidgetDrawerConfigureKind>("revenue-progress");
  const [configuringCustomWidgetId, setConfiguringCustomWidgetId] = useState<string | null>(null);
  const [configureCustomWidgetSize, setConfigureCustomWidgetSize] = useState<CustomWidgetSize>("3x3");
  const [widgetDrawerConfigureEntry, setWidgetDrawerConfigureEntry] =
    useState<WidgetDrawerConfigureEntry>("select");
  const [widgetSearchQuery, setWidgetSearchQuery] = useState("");
  const [highlightedWidgetRefId, setHighlightedWidgetRefId] = useState<string | null>(null);
  const [notificationBannerVisible, setNotificationBannerVisible] = useState(true);
  const addedWidgetRef = useRef<HTMLElement | null>(null);
  const homepageActive = !showOnboarding;
  const hasAddedWidgets = addedWidgetIds.length > 0 || revenueProgressAdded;
  const isNotificationBannerActive = notificationBannerVisible && !isEmptyHomepage;
  const bannerAffectsHero = isNotificationBannerActive;
  const { progress, scrollRef } = useStickyProgress(homepageActive);
  const surfaceProgress = easeInOut(rangeProgress(progress, 0.08, 0.64));
  const { bannerAnchorRef, bannerPinned, bannerPinnedShellRef, bannerSlotRef, pinnedBannerHeight } =
    useBannerPinMotion(isNotificationBannerActive, scrollRef, homepageActive);
  const titleMorphProgress = easeInOut(rangeProgress(progress, 0.04, 0.76));
  const titleScaleProgress = easeInOut(rangeProgress(progress, 0.02, 0.92));
  const actionsProgress = easeInOut(rangeProgress(progress, 0.18, 0.82));
  const actionsMorphProgress = easeInOut(rangeProgress(progress, 0.04, 0.76));
  const floatingActionsGeometry = useFloatingActionsGeometry(
    actionsMorphProgress,
    actionsLayout,
    bannerPinned ? pinnedBannerHeight : 0,
    aiChatOpen,
    isNotificationBannerActive,
    bannerPinned,
    homepageActive,
  );
  const searchMorphGeometry = useSearchMorphGeometry(
    actionsMorphProgress,
    bannerAffectsHero,
    bannerPinned ? pinnedBannerHeight : 0,
    homepageActive,
  );
  const welcomeOutProgress = easeInOut(rangeProgress(progress, 0.08, 0.55));
  const welcomeTitleMorphY = useWelcomeHeroMorphY(bannerAffectsHero, homepageActive, scrollRef);

  const handleSelectOnboardingTemplate = useCallback(
    (_templateId: OnboardingTemplateId) => {
      resetToDefaultLayout();
      setRevenueProgressAdded(false);
      setStartWithEmptyHomepage(false);
      setHomepageView("home");
      setShowOnboarding(false);
    },
    [resetToDefaultLayout],
  );

  const prepareOnboardingAiSession = useCallback(() => {
    resetToDefaultLayout();
    setRevenueProgressAdded(false);
    setNotificationBannerVisible(false);
    setStartWithEmptyHomepage(true);
  }, [resetToDefaultLayout]);

  const handleOnboardingOpenAiChat = useCallback(() => {
    prepareOnboardingAiSession();
  }, [prepareOnboardingAiSession]);

  const handleOnboardingCloseAiChat = useCallback(() => {
    closeChat();
  }, [closeChat]);

  const handleOnboardingLaunchAiPrompt = useCallback(
    (prompt: string) => {
      const trimmed = prompt.trim();

      if (!trimmed) {
        return;
      }

      prepareOnboardingAiSession();
      setHomepageView("home");
      setTemplateEditorReturnView("home");
      setShowOnboarding(false);
      startChatWithPrompt(trimmed, {
        context: "homepage",
        showEmptyStateSuggestions: false,
      });
    },
    [prepareOnboardingAiSession, startChatWithPrompt],
  );

  const handleOnboardingSendMessage = useCallback(
    (text: string) => {
      handleOnboardingLaunchAiPrompt(text);
    },
    [handleOnboardingLaunchAiPrompt],
  );

  const handleOpenManageCustomWidgetsFromDrawer = useCallback(() => {
    setWidgetDrawerStep("closed");
    setWidgetSearchQuery("");
    setConfiguringCustomWidgetId(null);
    setWidgetDrawerConfigureEntry("select");
    setWidgetDrawerConfigureKind("revenue-progress");
    setHomepageView("manage-custom-widgets");
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [scrollRef]);

  const handleOpenManageHub = useCallback(() => {
    setHomepageView("manage-hub");
    setHomepageMenuOpen(false);
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [scrollRef]);

  const handleOpenManageCustomWidgets = useCallback(() => {
    setHomepageView("manage-custom-widgets");
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [scrollRef]);

  const handleOpenManageTemplates = useCallback(() => {
    setHomepageView("manage-templates");
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [scrollRef]);

  const handleGoHome = useCallback(() => {
    setHomepageView("home");
    setEditingWidgetId(null);
    setEditingTemplateId(null);
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [scrollRef]);

  const handleOpenAiChatFromCustomWidgetEditor = useCallback(() => {
    const widget = editingWidgetId ? getWidgetById(editingWidgetId) : undefined;
    const widgetName =
      widget?.name?.trim() ||
      aiSuggestedWidgetDraft?.name?.trim() ||
      "custom widget";

    startChat({
      context: "custom-widget",
      draftMessage: `Help me update the "${widgetName}" widget`,
      reset: true,
    });
  }, [aiSuggestedWidgetDraft?.name, editingWidgetId, getWidgetById, startChat]);

  const handleOpenAiChatFromTemplateEditor = useCallback(() => {
    startChat({ context: "template", reset: true });
  }, [startChat]);

  const handleOpenAiChatBadge = useCallback(() => {
    setTemplateEditorReturnView("home");
    openChat();
  }, [openChat]);

  const handleCreateWidgetOption = useCallback(
    (option: CreateWidgetOption) => {
      if (option === "ai") {
        startChat({ context: "custom-widget", reset: true });
        return;
      }

      setAiSuggestedWidgetDraft(null);
      setAiSuggestedEditorStep(null);
      setEditingWidgetId(null);
      setNewCustomWidgetDraft(createEmptyCustomWidgetDraft(option));
      setHomepageView("create-widget");
    },
    [startChat],
  );

  const handleEditCustomWidget = useCallback((widgetId: string) => {
    setEditingWidgetId(widgetId);
    setAiSuggestedWidgetDraft(null);
    setAiSuggestedEditorStep(null);
    setHomepageView("edit-widget");
  }, []);

  const handleCloseCustomWidgetEditor = useCallback(() => {
    setHomepageView("manage-custom-widgets");
    setEditingWidgetId(null);
    setAiSuggestedWidgetDraft(null);
    setNewCustomWidgetDraft(null);
    setAiSuggestedEditorStep(null);
  }, []);

  const handleCreateTemplate = useCallback(() => {
    const templateId = createTemplate();
    setEditingTemplateId(templateId);
    setAiSuggestedTemplateDraft(null);
    setManageTemplatesTab("drafts");
    setTemplateEditorReturnView("manage-templates");
    setHomepageView("edit-template");
  }, [createTemplate]);

  const handleEditTemplate = useCallback(
    (templateId: string) => {
      const template = getTemplateById(templateId);
      if (!template) {
        return;
      }

      setEditingTemplateId(templateId);
      setAiSuggestedTemplateDraft(null);
      setManageTemplatesTab(template.status === "published" ? "published" : "drafts");
      setTemplateEditorReturnView("manage-templates");
      setHomepageView("edit-template");
    },
    [getTemplateById],
  );

  const handleDeleteTemplate = useCallback(
    (templateId: string) => {
      deleteTemplate(templateId);
    },
    [deleteTemplate],
  );

  const handleAddTemplateToHomepage = useCallback(
    (templateId: string) => {
      const template = getTemplateById(templateId);
      if (!template) {
        return;
      }

      addWidgets([...template.dashboardWidgetIds, ...template.customWidgetRefs]);
      showFeedbackToast(`${template.name} template applied to your homepage.`);
    },
    [addWidgets, getTemplateById, showFeedbackToast],
  );

  const handleSaveCustomWidget = useCallback(
    (draft: Parameters<typeof saveWidget>[0]) => {
      const access = normalizeCustomWidgetAccess(draft.access);
      const status = getCustomWidgetSavedStatus(access);

      flushSync(() => {
        showFeedbackToast("Custom widget saved.");
      });

      saveWidget({ ...draft, access, status }, editingWidgetId ?? undefined);
      setEditingWidgetId(null);
      setAiSuggestedWidgetDraft(null);
      setAiSuggestedEditorStep(null);
      setManageWidgetsTab(access === "private" ? "private" : "published");
      setHomepageView("manage-custom-widgets");
    },
    [editingWidgetId, saveWidget, showFeedbackToast],
  );

  const handleSaveAiGeneratedWidget = useCallback(
    (access: Parameters<typeof saveWidget>[0]["access"]) => {
      if (!editingWidgetId) {
        return;
      }

      const widget = getWidgetById(editingWidgetId);

      if (!widget) {
        return;
      }

      handleSaveCustomWidget({ ...widget, access });
    },
    [editingWidgetId, getWidgetById, handleSaveCustomWidget],
  );

  const handleDeleteCustomWidget = useCallback(() => {
    if (!editingWidgetId) {
      return;
    }

    deleteWidget(editingWidgetId);
    setEditingWidgetId(null);
    setHomepageView("manage-custom-widgets");
    showFeedbackToast("Custom widget deleted.");
  }, [deleteWidget, editingWidgetId, showFeedbackToast]);

  const handleDeleteCustomWidgetFromList = useCallback(
    (widgetId: string) => {
      deleteWidget(widgetId);
      showFeedbackToast("Custom widget deleted.");
    },
    [deleteWidget, showFeedbackToast],
  );

  const handleResetHomepage = useCallback(() => {
    resetToDefaultLayout();
    setRevenueProgressAdded(false);
    setStartWithEmptyHomepage(false);
    setHomepageMenuOpen(false);
  }, [resetToDefaultLayout]);

  const handleAddCustomWidgetToHomepage = useCallback(
    (widgetId: string, size: CustomWidgetSize) => {
      const refId = createCustomWidgetRefId(widgetId, size);
      addWidgets([refId]);
      setHighlightedWidgetRefId(refId);
      setWidgetDrawerStep("closed");
      setWidgetSearchQuery("");
      setConfiguringCustomWidgetId(null);
      setWidgetDrawerConfigureEntry("select");
      setWidgetDrawerConfigureKind("revenue-progress");

      const widget = getWidgetById(widgetId);
      showFeedbackToast(`${widget?.name?.trim() || "Custom widget"} has been added.`, {
        showViewWidgetAction: true,
      });
    },
    [addWidgets, getWidgetById, showFeedbackToast],
  );

  const openCustomWidgetHomepageDrawer = useCallback(
    (widgetId: string) => {
      const widget = getWidgetById(widgetId);

      if (!widget || widget.supportedSizes.length === 0) {
        return;
      }

      setWidgetDrawerConfigureEntry("direct");
      setWidgetDrawerConfigureKind("custom-widget");
      setConfiguringCustomWidgetId(widgetId);
      setConfigureCustomWidgetSize(
        widget.supportedSizes.includes(widget.size) ? widget.size : widget.supportedSizes[0],
      );
      setWidgetDrawerStep("configure");
    },
    [getWidgetById],
  );

  const handleAddPublishedWidgetToHomepage = useCallback(
    (widgetId: string) => {
      openCustomWidgetHomepageDrawer(widgetId);
    },
    [openCustomWidgetHomepageDrawer],
  );

  const handleAddCustomWidgetToHomepageFromEditor = useCallback(
    (draft: CustomWidgetDraft) => {
      const access = normalizeCustomWidgetAccess(draft.access);
      const status = getCustomWidgetSavedStatus(access);
      const widgetId = saveWidget({ ...draft, access, status }, editingWidgetId ?? undefined);

      if (widgetId !== editingWidgetId) {
        setEditingWidgetId(widgetId);
      }

      openCustomWidgetHomepageDrawer(widgetId);
    },
    [editingWidgetId, openCustomWidgetHomepageDrawer, saveWidget],
  );

  const handleSelectCustomWidget = useCallback(
    (widgetId: string) => {
      const widget = getWidgetById(widgetId);

      if (!widget || widget.supportedSizes.length === 0) {
        return;
      }

      setWidgetDrawerConfigureEntry("select");
      setWidgetDrawerConfigureKind("custom-widget");
      setConfiguringCustomWidgetId(widgetId);
      setConfigureCustomWidgetSize(
        widget.supportedSizes.includes(widget.size) ? widget.size : widget.supportedSizes[0],
      );
      setWidgetDrawerStep("configure");
    },
    [getWidgetById],
  );

  const handleConfirmAddCustomWidget = useCallback(() => {
    if (!configuringCustomWidgetId) {
      return;
    }

    handleAddCustomWidgetToHomepage(configuringCustomWidgetId, configureCustomWidgetSize);
  }, [configureCustomWidgetSize, configuringCustomWidgetId, handleAddCustomWidgetToHomepage]);

  const handleEditCustomWidgetFromDrawer = useCallback(() => {
    if (!configuringCustomWidgetId) {
      return;
    }

    setEditingWidgetId(configuringCustomWidgetId);
    setHomepageView("edit-widget");
    setWidgetDrawerStep("closed");
    setWidgetSearchQuery("");
    setConfiguringCustomWidgetId(null);
    setWidgetDrawerConfigureEntry("select");
    setWidgetDrawerConfigureKind("revenue-progress");
  }, [configuringCustomWidgetId]);

  const stickyStyle = {
    "--sticky-progress": progress,
    "--actions-morph-progress": actionsMorphProgress,
    ...floatingActionsGeometry,
    "--configure-button-x": `${(1 - actionsMorphProgress) * 44}px`,
    "--configure-button-y": `${(1 - actionsMorphProgress) * 44}px`,
    "--sticky-surface-opacity": surfaceProgress,
    "--sticky-title-opacity": 1,
    "--title-morph-left": `calc(${50 - titleMorphProgress * 50}% + ${titleMorphProgress * 16}px)`,
    "--title-morph-top": "8px",
    "--title-morph-font-size": `${OCCAM_HEADLINE_L_SIZE}px`,
    "--title-morph-line-height": `${OCCAM_HEADLINE_L_LINE_HEIGHT}px`,
    "--sticky-title-scale": 1 - titleScaleProgress * (1 - STICKY_TITLE_SCALE),
    "--sticky-title-x": `calc(${-50 + titleMorphProgress * 50}%)`,
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
      : `${NOTIFICATION_BANNER_PINNED_HEIGHT_FALLBACK}px`,
  } as StickyProgressStyle;
  const stickyControlsActive = progress > 0.48;
  const handleOpenAddWidgetPanel = () => {
    setWidgetSearchQuery("");
    setConfiguringCustomWidgetId(null);
    setWidgetDrawerConfigureEntry("select");
    setWidgetDrawerConfigureKind("revenue-progress");
    setWidgetDrawerStep("select");
  };
  const handleCloseWidgetDrawer = () => {
    setWidgetDrawerStep("closed");
    setWidgetSearchQuery("");
    setConfiguringCustomWidgetId(null);
    setWidgetDrawerConfigureEntry("select");
    setWidgetDrawerConfigureKind("revenue-progress");
  };
  const handleSelectWidgetType = (widgetId: (typeof WIDGET_TYPES)[number]["id"]) => {
    const widget = WIDGET_TYPES.find((entry) => entry.id === widgetId);

    if (!widget?.configurable) {
      return;
    }

    setWidgetDrawerConfigureKind("revenue-progress");
    setConfiguringCustomWidgetId(null);
    setWidgetDrawerStep("configure");
  };
  const handleBackToWidgetSelect = () => {
    setWidgetDrawerStep("select");
    setConfiguringCustomWidgetId(null);
    setWidgetDrawerConfigureEntry("select");
    setWidgetDrawerConfigureKind("revenue-progress");
  };
  const handleConfigureBack = () => {
    if (widgetDrawerConfigureKind === "custom-widget" && widgetDrawerConfigureEntry === "direct") {
      handleCloseWidgetDrawer();
      return;
    }

    handleBackToWidgetSelect();
  };
  const handleConfirmAddRevenueProgress = () => {
    handleCloseWidgetDrawer();

    if (revenueProgressAdded) {
      setHighlightedWidgetRefId("revenue-progress");
      showFeedbackToast("Revenue Progress has been added.", { showViewWidgetAction: true });
      return;
    }

    setRevenueProgressAdded(true);
    setHighlightedWidgetRefId("revenue-progress");
    showFeedbackToast("Revenue Progress has been added.", { showViewWidgetAction: true });
  };
  const handleViewAddedWidget = () => {
    dismissFeedbackToast();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finishViewAddedWidget = () => {
      addedWidgetRef.current?.focus({ preventScroll: true });

      const widgetNode = addedWidgetRef.current;

      if (!reducedMotion && widgetNode) {
        triggerAddedWidgetSpotlight(widgetNode);
      }
    };

    const scrollToAddedWidget = () => {
      const behavior: ScrollBehavior = reducedMotion ? "auto" : "smooth";
      const scrollNode = scrollRef.current;
      const widgetNode = addedWidgetRef.current;

      if (widgetNode) {
        widgetNode.scrollIntoView({ behavior, block: "end", inline: "nearest" });
      } else if (scrollNode) {
        scrollNode.scrollTo({ top: scrollNode.scrollHeight, behavior });
      } else {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior });
      }

      if (scrollNode && !reducedMotion) {
        runAfterScrollSettles(scrollNode, finishViewAddedWidget);
        return;
      }

      window.setTimeout(finishViewAddedWidget, reducedMotion ? 0 : 500);
    };

    const runScrollToAddedWidget = () => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(scrollToAddedWidget);
      });
    };

    if (homepageView !== "home") {
      handleGoHome();
      runScrollToAddedWidget();
      return;
    }

    runScrollToAddedWidget();
  };

  useEffect(() => {
    if (widgetDrawerStep === "closed") {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setWidgetDrawerStep("closed");
        setWidgetSearchQuery("");
        setConfiguringCustomWidgetId(null);
        setWidgetDrawerConfigureEntry("select");
        setWidgetDrawerConfigureKind("revenue-progress");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [widgetDrawerStep]);

  useEffect(() => {
    if (!feedbackToast) {
      setFeedbackShowViewWidget(false);
      return undefined;
    }

    let frame = 0;

    if (feedbackToast.showViewWidgetAction) {
      const measureViewWidgetVisibility = () => {
        const widgetNode = addedWidgetRef.current;
        const scrollNode = scrollRef.current;

        if (widgetNode && scrollNode) {
          setFeedbackShowViewWidget(!isElementVisibleInScrollContainer(widgetNode, scrollNode));
          return;
        }

        setFeedbackShowViewWidget(true);
      };

      frame = window.requestAnimationFrame(() => {
        frame = window.requestAnimationFrame(measureViewWidgetVisibility);
      });
    } else {
      setFeedbackShowViewWidget(false);
    }

    const timeout = window.setTimeout(() => {
      setFeedbackToast(null);
    }, FEEDBACK_TOAST_DURATION_MS);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.clearTimeout(timeout);
    };
  }, [feedbackToast, scrollRef]);

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [aiChatOpen]);

  useEffect(() => {
    if (showOnboarding) {
      return undefined;
    }

    const scrollNode = scrollRef.current;
    scrollNode?.scrollTo({ top: 0 });

    let frame = window.requestAnimationFrame(() => {
      frame = window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event("resize"));
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [scrollRef, showOnboarding]);

  const editingWidget = editingWidgetId ? getWidgetById(editingWidgetId) : undefined;
  const isEditingAiGeneratedWidget = isAiGeneratedCustomWidget(editingWidget);
  const configuringCustomWidget = configuringCustomWidgetId
    ? getWidgetById(configuringCustomWidgetId)
    : undefined;
  const customWidgetSummary =
    widgets.length === 0
      ? "You don't have any custom widgets yet."
      : `${publishedWidgets.length} Shared, ${privateWidgets.length} Personal`;
  const templateSummary =
    templates.length === 0
      ? "You don't have any templates yet."
      : `${publishedTemplates.length} Published, ${draftTemplates.length} Drafts`;
  const editingTemplate = editingTemplateId ? getTemplateById(editingTemplateId) : undefined;
  const activeTemplateDraft = aiSuggestedTemplateDraft ?? editingTemplate ?? null;
  const isHomeView = homepageView === "home";
  const isEditorOpen = homepageView === "create-widget" || homepageView === "edit-widget";
  const isTemplateEditorOpen = homepageView === "edit-template";
  const isWidgetDrawerOpen = widgetDrawerStep !== "closed";
  const isWidgetDrawerOverlay =
    isWidgetDrawerOpen &&
    !isHomeView &&
    widgetDrawerConfigureEntry === "direct" &&
    widgetDrawerStep === "configure" &&
    widgetDrawerConfigureKind === "custom-widget";
  const showWidgetDrawer = isWidgetDrawerOpen && (isHomeView || isWidgetDrawerOverlay);

  return showOnboarding ? (
    <OnboardingScreen
      aiChatProps={{
        inputMessage,
        onClose: handleOnboardingCloseAiChat,
        onInputMessageChange,
        onNewChat: handleNewChat,
        onSendMessage: handleOnboardingSendMessage,
        onSuggestedAction: handleSuggestedAction,
      }}
      onOpenAiChat={handleOnboardingOpenAiChat}
      onSelectTemplate={handleSelectOnboardingTemplate}
    />
  ) : (
    <div
      className="nebula-shell"
      data-ai-chat-open={aiChatOpen || undefined}
      data-editor-open={isTemplateEditorOpen || isEditorOpen || undefined}
      data-template-editor-open={isTemplateEditorOpen || undefined}
    >
      <GlobalNav />
      <div className="homepage-workspace">
        <main
          className="homepage-main"
          data-actions-layout={actionsLayout}
          data-ai-homepage-applied={isAiGenerated || undefined}
          data-banner-affects-hero={bannerAffectsHero || undefined}
          data-banner-pinned={bannerPinned || undefined}
          data-node-id="1:57107"
          data-notification-visible={isNotificationBannerActive || undefined}
          data-sticky-state={progress >= 1 ? "stuck" : "default"}
          ref={scrollRef}
          style={stickyStyle}
          tabIndex={0}
        >
        <StickyHeader active={stickyControlsActive && isHomeView} visible={isHomeView} />
        {isHomeView ? <MorphingSearchField /> : null}
        {isHomeView ? (
          <MorphingFloatingActions
            configureActionsRef={configureActionsRef}
            homepageMenuOpen={homepageMenuOpen}
            onCloseHomepageMenu={() => setHomepageMenuOpen(false)}
            onOpenAddWidgetPanel={handleOpenAddWidgetPanel}
            onOpenManageHub={handleOpenManageHub}
            onResetHomepage={handleResetHomepage}
            onToggleHomepageMenu={() => setHomepageMenuOpen((current) => !current)}
          />
        ) : null}
        {showWidgetDrawer ? (
          <div className={isWidgetDrawerOverlay ? "widget-drawer-overlay-host" : undefined}>
            <WidgetDrawer
              configureCustomWidgetSize={configureCustomWidgetSize}
              configureKind={widgetDrawerConfigureKind}
              configuringCustomWidget={configuringCustomWidget}
              customWidgets={[...publishedWidgets, ...privateWidgets]}
              onAddRevenueProgress={handleConfirmAddRevenueProgress}
              onBackToSelect={handleConfigureBack}
              onClose={handleCloseWidgetDrawer}
              onConfirmAddCustomWidget={handleConfirmAddCustomWidget}
              onConfigureCustomWidgetSizeChange={setConfigureCustomWidgetSize}
              onEditCustomWidgetFromDrawer={handleEditCustomWidgetFromDrawer}
              onOpenManageCustomWidgets={handleOpenManageCustomWidgetsFromDrawer}
              onSearchQueryChange={setWidgetSearchQuery}
              onSelectCustomWidget={handleSelectCustomWidget}
              onSelectWidget={handleSelectWidgetType}
              searchQuery={widgetSearchQuery}
              step={widgetDrawerStep}
            />
          </div>
        ) : null}
        {feedbackToast ? (
          <FeedbackToast
            message={feedbackToast.message}
            onClose={dismissFeedbackToast}
            onViewDetails={
              feedbackToast.savedCustomWidgetId
                ? () => handleOpenSavedCustomWidget(feedbackToast.savedCustomWidgetId!)
                : feedbackToast.savedTemplateId
                  ? () => handleOpenSavedTemplate(feedbackToast.savedTemplateId!)
                  : undefined
            }
            onViewWidget={handleViewAddedWidget}
            showViewDetails={Boolean(
              feedbackToast.savedCustomWidgetId || feedbackToast.savedTemplateId,
            )}
            showViewWidget={Boolean(feedbackToast.showViewWidgetAction && feedbackShowViewWidget)}
          />
        ) : null}
        <div
          className="scrolled-content"
          data-node-id="1:57108"
          data-revenue-progress-added={revenueProgressAdded || undefined}
        >
          {isHomeView ? (
            <>
              {isNotificationBannerActive ? (
                <NotificationBannerRegion
                  anchorRef={bannerAnchorRef}
                  bannerPinned={bannerPinned}
                  onClose={() => setNotificationBannerVisible(false)}
                  pinnedShellRef={bannerPinnedShellRef}
                  slotRef={bannerSlotRef}
                />
              ) : null}
              <WelcomeSearch />
              {!isEmptyHomepage || hasAddedWidgets ? (
                <DashboardGrid
                  addedWidgetIds={addedWidgetIds}
                  addedWidgetRef={addedWidgetRef}
                  aiDashboardVariant={aiDashboardVariant}
                  aiLibraryWidgetIds={aiLibraryWidgetIds}
                  getCustomWidgetById={getWidgetById}
                  hiddenMetricCardLabels={hiddenMetricCardLabels}
                  highlightedWidgetRefId={highlightedWidgetRefId}
                  isAiGenerated={isAiGenerated}
                  metricCardOrder={metricCardOrder}
                  removedWidgetIds={removedWidgetIds}
                  revenueProgressAdded={revenueProgressAdded}
                  startWithEmptyHomepage={isEmptyHomepage}
                  widgetOrder={widgetOrder}
                />
              ) : (
                <HomepageEmptyState />
              )}
            </>
          ) : null}
          {homepageView === "manage-hub" ? (
            <ManageTemplatesHubPage
              customWidgetSummary={customWidgetSummary}
              onGoHome={handleGoHome}
              onOpenCustomWidgets={handleOpenManageCustomWidgets}
              onOpenTemplates={handleOpenManageTemplates}
              templateSummary={templateSummary}
            />
          ) : null}
          {homepageView === "manage-templates" ? (
            <ManageTemplatesPage
              activeTab={manageTemplatesTab}
              draftTemplates={draftTemplates}
              onAddToHomepage={handleAddTemplateToHomepage}
              onCreateTemplate={handleCreateTemplate}
              onDeleteTemplate={handleDeleteTemplate}
              onEditTemplate={handleEditTemplate}
              onGoHome={handleGoHome}
              onGoHub={() => setHomepageView("manage-hub")}
              onTabChange={setManageTemplatesTab}
              publishedTemplates={publishedTemplates}
            />
          ) : null}
          {homepageView === "manage-custom-widgets" ? (
            <ManageCustomWidgetsPage
              activeTab={manageWidgetsTab}
              privateWidgets={privateWidgets}
              historyEntries={historyEntries}
              onAddToHomepage={handleAddPublishedWidgetToHomepage}
              onClearHistory={clearHistory}
              onCreateWidgetOption={handleCreateWidgetOption}
              onDeleteWidget={handleDeleteCustomWidgetFromList}
              onEditWidget={handleEditCustomWidget}
              onGoHome={handleGoHome}
              onGoHub={() => setHomepageView("manage-hub")}
              onTabChange={setManageWidgetsTab}
              publishedWidgets={publishedWidgets}
              widgets={widgets}
            />
          ) : null}
        </div>
        {isEditorOpen && isEditingAiGeneratedWidget && editingWidget ? (
          <AiGeneratedWidgetEditor
            aiChatOpen={aiChatOpen}
            initialStep={aiSuggestedEditorStep ?? "basic"}
            onAddToHomepage={() => handleAddPublishedWidgetToHomepage(editingWidget.id)}
            onClose={handleCloseCustomWidgetEditor}
            onOpenAiChat={handleOpenAiChatFromCustomWidgetEditor}
            onSave={handleSaveAiGeneratedWidget}
            widget={editingWidget}
          />
        ) : isEditorOpen ? (
          <CustomWidgetEditor
            aiChatOpen={aiChatOpen}
            initialDraft={
              aiSuggestedWidgetDraft ??
              newCustomWidgetDraft ??
              customWidgetEditorCapture?.draft ??
              (editingWidget
                ? {
                    name: editingWidget.name,
                    description: editingWidget.description,
                    type: editingWidget.type,
                    content: editingWidget.content,
                    size: editingWidget.size,
                    supportedSizes: editingWidget.supportedSizes,
                    access: editingWidget.access,
                    labelAsExternalContent: editingWidget.labelAsExternalContent,
                    displayWidgetName: editingWidget.displayWidgetName,
                    embedSource: editingWidget.embedSource,
                    embedAuthenticationMode: editingWidget.embedAuthenticationMode,
                    embedAuthenticationType: editingWidget.embedAuthenticationType,
                    embedCredentials: editingWidget.embedCredentials,
                    dataBinding: editingWidget.dataBinding,
                    status: editingWidget.status,
                  }
                : createNewWidgetDraft())
            }
            initialStep={aiSuggestedEditorStep ?? customWidgetEditorCapture?.step}
            isEditing={Boolean(editingWidgetId)}
            widgetId={editingWidgetId}
            onAddToHomepage={handleAddCustomWidgetToHomepageFromEditor}
            onClose={handleCloseCustomWidgetEditor}
            onDelete={handleDeleteCustomWidget}
            onOpenAiChat={handleOpenAiChatFromCustomWidgetEditor}
            onSave={handleSaveCustomWidget}
          />
        ) : null}
        {isTemplateEditorOpen && activeTemplateDraft ? (
          <HomepageTemplateEditor
            aiChatOpen={aiChatOpen}
            initialDraft={activeTemplateDraft}
            initialStep={
              aiSuggestedTemplateDraft || activeTemplateDraft.name.trim()
                ? "configure"
                : "basic"
            }
            onClose={handleCloseTemplateEditor}
            onOpenAiChat={handleOpenAiChatFromTemplateEditor}
            onPublish={handlePublishTemplateDraft}
            onSave={handleSaveTemplateDraft}
          />
        ) : null}
        </main>
        <AiChatPanel
          inputMessage={inputMessage}
          isThinking={isThinking}
          messages={messages}
          onInputMessageChange={onInputMessageChange}
          showEmptyStateSuggestions={showEmptyStateSuggestions}
          onAddRecommendedWidgets={handleChatAddRecommendedWidgets}
          onApplyCleanup={handleChatApplyCleanup}
          onApplyPreview={handleApplyPreview}
          onClose={closeChat}
          onNewChat={handleNewChat}
          onRegeneratePreview={handleRegeneratePreview}
          onSaveProposedCustomWidget={handleChatSaveProposedCustomWidget}
          onSaveProposedTeamTemplate={handleChatSaveProposedTeamTemplate}
          onSendMessage={handleSendMessage}
          onSuggestedAction={handleSuggestedAction}
          onUndoCleanup={handleChatUndoCleanup}
          onUndoPreview={handleUndoPreview}
          onViewCustomWidgets={handleViewCustomWidgetsPersonalTab}
          onViewSavedTemplate={handleOpenSavedTemplate}
          open={aiChatOpen}
          suggestionContext={suggestionContext}
          suggestions={suggestions}
          thinkingProcess={thinkingProcess}
        />
      </div>
      {!aiChatOpen && !isTemplateEditorOpen && !isEditorOpen ? (
        <AiChatBadge onClick={handleOpenAiChatBadge} />
      ) : null}
    </div>
  );
}
