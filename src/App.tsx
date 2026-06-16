import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
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
import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
} from "react";
import configureHomepageIconUrl from "./assets/configure-homepage.svg";
import { AiChatBadge, AiChatPanel } from "./AiChatPanel";
import { FloatingButton } from "./FloatingButton";

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

const reports = [
  ["1000001", "Revenue Insights", "2026/02/19  22:13"],
  ["1000002", "RCRF RollForward", "2026/02/19  22:13"],
  ["1000003", "Revenue Trends Export", "2026/02/19  22:13"],
  ["1000004", "Billing Waterfall", "2026/02/19  22:13"],
  ["1000005", "Cost Insight", "2026/02/19  22:13"],
];

const taskRows = [
  ["SSP Exceptions", "32"],
  ["Auto POBs", "18"],
  ["Orphan Transactions", "10"],
  ["Inbound Transactions Exceptions", "5"],
];

const scheduleJobs = [
  ["1000001", "Data Sync", "2026/02/19  22:13", "completed"],
  ["1000002", "Monthly Revenue Calcul...", "2026/02/19  22:13", "completed"],
  ["1000003", "User Engagement Report", "2026/02/19  22:13", "completed"],
  ["1000004", "Immediate POB Release", "2026/02/19  22:13", "error"],
  ["1000005", "Process Usage Data", "2026/02/19  22:13", "warning"],
] as const;

const sspBatches = [
  ["vCPU Edition", "FY25 vCPU Edition", "10000001"],
  ["Product Family", "FY23 Product Family", "10000002"],
  ["Perpetual License", "FY21 Perpetual License", "10000003"],
  ["AppDynamics SSP...", "FY25 vCPU Edition", "10000004"],
  ["vCPU Edition", "FY25 vCPU Edition", "10000005"],
  ["Product Family", "FY23 Product Family", "10000006"],
  ["Perpetual License", "FY21 Perpetual License", "10000007"],
] as const;

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
type BannerPlacement = "default" | "pin-on-scroll" | "chip-on-scroll";
type WidgetDrawerStep = "closed" | "select" | "configure";

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
  "--chip-return-center-phase": number;
};

function clampStickyProgress(scrollTop: number) {
  return Math.min(1, Math.max(0, scrollTop / STICKY_TRANSITION_DISTANCE));
}

function easeInOut(value: number) {
  return value * value * (3 - 2 * value);
}

function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - (-2 * value + 2) ** 3 / 2;
}

function smoothScrollTo(element: HTMLElement, targetTop: number, duration: number) {
  return new Promise<void>((resolve) => {
    const startTop = element.scrollTop;
    const distance = targetTop - startTop;

    if (Math.abs(distance) < 1) {
      element.scrollTop = targetTop;
      resolve();
      return;
    }

    const startTime = performance.now();
    let frame = 0;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      element.scrollTop = startTop + distance * easeInOutCubic(progress);

      if (progress < 1) {
        frame = window.requestAnimationFrame(step);
        return;
      }

      element.scrollTop = targetTop;
      resolve();
    };

    frame = window.requestAnimationFrame(step);
  });
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

function useStickyProgress() {
  const scrollRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const scrollNode = scrollRef.current;

    if (!scrollNode) {
      return undefined;
    }

    let frame = 0;

    const getScrollTop = () =>
      Math.max(
        scrollNode.scrollTop,
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
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    scrollNode.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      scrollNode.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

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

function getBannerPlacement(): BannerPlacement {
  if (typeof window === "undefined") {
    return "default";
  }

  const params = new URLSearchParams(window.location.search);
  const banner = params.get("banner");

  if (banner === "pin-on-scroll") {
    return "pin-on-scroll";
  }

  if (banner === "chip-on-scroll") {
    return "chip-on-scroll";
  }

  return "default";
}

function syncBannerPlacementUrl(bannerPlacement: BannerPlacement) {
  const url = new URL(window.location.href);

  if (bannerPlacement === "default") {
    url.searchParams.delete("banner");
  } else {
    url.searchParams.set("banner", bannerPlacement);
  }

  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
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
  }, [bannerAffectsHero, pinnedBannerHeight, progress]);

  return geometry;
}

function useWelcomeHeroMorphY(bannerAffectsHero: boolean) {
  const [welcomeTitleMorphY, setWelcomeTitleMorphY] = useState(WELCOME_TITLE_MORPH_Y);

  useLayoutEffect(() => {
    const getWelcomeHeadingOffset = () => {
      const main = document.querySelector<HTMLElement>(".homepage-main");
      const welcomeSearch = document.querySelector<HTMLElement>(".welcome-search");

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

    const bannerRegion = document.querySelector<HTMLElement>(".notification-banner-region");
    const welcomeSearch = document.querySelector<HTMLElement>(".welcome-search");
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateMorphY)
        : null;

    if (bannerRegion) {
      resizeObserver?.observe(bannerRegion);
    }

    if (welcomeSearch) {
      resizeObserver?.observe(welcomeSearch);
    }

    window.addEventListener("resize", updateMorphY);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateMorphY);
    };
  }, [bannerAffectsHero]);

  return welcomeTitleMorphY;
}

function useBannerPinMotion(
  bannerPlacement: BannerPlacement,
  notificationBannerVisible: boolean,
  scrollRef: RefObject<HTMLElement | null>,
) {
  const bannerAnchorRef = useRef<HTMLDivElement | null>(null);
  const bannerSlotRef = useRef<HTMLDivElement | null>(null);
  const bannerPinnedShellRef = useRef<HTMLDivElement | null>(null);
  const [bannerPinned, setBannerPinned] = useState(false);
  const [pinnedBannerHeight, setPinnedBannerHeight] = useState(NOTIFICATION_BANNER_PINNED_HEIGHT_FALLBACK);

  useEffect(() => {
    if (bannerPlacement !== "pin-on-scroll" || !notificationBannerVisible) {
      setBannerPinned(false);
      return undefined;
    }

    const scrollNode = scrollRef.current;
    const slot = bannerSlotRef.current;

    if (!scrollNode || !slot) {
      return undefined;
    }

    let frame = 0;

    const getScrollTop = () =>
      Math.max(
        scrollNode.scrollTop,
        window.scrollY,
        document.documentElement.scrollTop,
        document.body.scrollTop,
      );

    const updatePinned = () => {
      frame = 0;
      const scrollTop = getScrollTop();
      const slotTop = slot.getBoundingClientRect().top;
      setBannerPinned(scrollTop > 0 && slotTop <= 0);
    };

    const scheduleUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updatePinned);
    };

    updatePinned();
    scrollNode.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      scrollNode.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [bannerPlacement, notificationBannerVisible, scrollRef]);

  useLayoutEffect(() => {
    if (bannerPlacement !== "pin-on-scroll" || !notificationBannerVisible || !bannerPinned) {
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
  }, [bannerPinned, bannerPlacement, notificationBannerVisible]);

  return {
    bannerAnchorRef,
    bannerPinned,
    bannerPinnedShellRef,
    bannerSlotRef,
    pinnedBannerHeight,
  };
}

function useBannerChipVisibility(
  bannerPlacement: BannerPlacement,
  notificationBannerVisible: boolean,
  scrollRef: RefObject<HTMLElement | null>,
  bannerSlotRef: RefObject<HTMLDivElement | null>,
  stickyControlsActive: boolean,
) {
  const [bannerScrolledAway, setBannerScrolledAway] = useState(false);

  useEffect(() => {
    if (bannerPlacement !== "chip-on-scroll" || !notificationBannerVisible) {
      setBannerScrolledAway(false);
      return undefined;
    }

    const scrollNode = scrollRef.current;
    const slot = bannerSlotRef.current;

    if (!scrollNode || !slot) {
      return undefined;
    }

    let frame = 0;

    const updateVisibility = () => {
      frame = 0;
      setBannerScrolledAway(!isElementVisibleInScrollContainer(slot, scrollNode));
    };

    const scheduleUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    scrollNode.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      scrollNode.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [bannerPlacement, bannerSlotRef, notificationBannerVisible, scrollRef]);

  return (
    bannerPlacement === "chip-on-scroll" &&
    notificationBannerVisible &&
    bannerScrolledAway &&
    stickyControlsActive
  );
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

function StickyHeader({
  active,
  announcementCount,
  onAnnouncementChipClick,
  showAnnouncementChip,
}: {
  active: boolean;
  announcementCount: number;
  onAnnouncementChipClick?: () => void;
  showAnnouncementChip?: boolean;
}) {
  const announcementLabel =
    announcementCount === 1 ? "1 announcement" : `${announcementCount} announcements`;

  return (
    <header className="homepage-sticky-header" data-node-id="1:148707" aria-hidden={!active}>
      <div className="sticky-header-leading">
        <h1>Welcome to Zuora, Rachel Carter</h1>
        {showAnnouncementChip ? (
          <button
            aria-label={`View ${announcementLabel}`}
            className="announcement-chip"
            data-node-id="130:18299"
            onClick={onAnnouncementChipClick}
            type="button"
          >
            {announcementLabel}
          </button>
        ) : null}
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

function MorphingFloatingActions({ onOpenAddWidgetPanel }: { onOpenAddWidgetPanel: () => void }) {
  return (
    <div className="morphing-floating-actions" data-node-id="1:139205">
      <FloatingButton
        aria-label="Configure homepage"
        className="morphing-floating-button morphing-floating-button-configure"
        icon={<ConfigurePageIcon />}
        shape="circular"
        size="small"
        theme="light"
        variant="secondary"
      />
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

function BannerPlacementSelect({
  value,
  onChange,
}: {
  value: BannerPlacement;
  onChange: (value: BannerPlacement) => void;
}) {
  return (
    <label className="prototype-control">
      <span>Banner</span>
      <select
        aria-label="Notification banner placement version"
        value={value}
        onChange={(event) => onChange(event.currentTarget.value as BannerPlacement)}
      >
        <option value="default">Option 1 — Scrolls with content</option>
        <option value="pin-on-scroll">Option 2 — Pin above header</option>
        <option value="chip-on-scroll">Option 3 — Hide in header chip</option>
      </select>
    </label>
  );
}

function PrototypeControls({
  bannerPlacement,
  onBannerPlacementChange,
}: {
  bannerPlacement: BannerPlacement;
  onBannerPlacementChange: (value: BannerPlacement) => void;
}) {
  return (
    <div className="prototype-controls">
      <BannerPlacementSelect value={bannerPlacement} onChange={onBannerPlacementChange} />
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

function OccamSwitch({
  defaultChecked = false,
  label,
}: {
  defaultChecked?: boolean;
  label: string;
}) {
  return (
    <FormControlLabel
      className="occam-switch"
      control={<Switch defaultChecked={defaultChecked} size="small" />}
      data-name="Switch"
      label={label}
    />
  );
}

function ActionButton({
  children,
  disabled = false,
  icon,
}: {
  children: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}) {
  return (
    <button className="action-button" disabled={disabled} type="button">
      {icon}
      <span>{children}</span>
    </button>
  );
}

type WidgetCardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  contentGap?: 8 | 16;
};

const WidgetCard = forwardRef<HTMLElement, WidgetCardProps>(function WidgetCard(
  { children, className = "", contentClassName = "", contentGap = 16, ...rest },
  ref,
) {
  return (
    <section className={`widget-card ${className}`.trim()} ref={ref} {...rest}>
      <div className={`widget-card-inner widget-card-inner-gap-${contentGap} ${contentClassName}`.trim()}>
        {children}
      </div>
    </section>
  );
});

function WidgetIconButton({ label = "More actions" }: { label?: string }) {
  return (
    <button className="widget-icon-button" type="button" aria-label={label}>
      <MoreHorizIcon />
    </button>
  );
}

function HeaderActions({
  children,
  gap = 8,
  showMore = true,
}: {
  children?: ReactNode;
  gap?: 8 | 12;
  showMore?: boolean;
}) {
  return (
    <div className={`header-actions${gap === 12 ? " header-actions-wide" : ""}`.trim()}>
      {children}
      {showMore ? <WidgetIconButton /> : null}
    </div>
  );
}

function CardHeader({
  title,
  refreshed = true,
  action,
  showMoreMenu = false,
}: {
  title: string;
  refreshed?: boolean;
  action?: ReactNode;
  showMoreMenu?: boolean;
}) {
  return (
    <div className="card-header">
      <div>
        <h3>{title}</h3>
        {refreshed ? <p>Last refreshed at 01/01/2026, 6.31 PM PST</p> : null}
      </div>
      {action ?? (showMoreMenu ? <HeaderActions /> : null)}
    </div>
  );
}

function TextButton({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <button className="text-button" type="button">
      {icon}
      <span>{children}</span>
    </button>
  );
}

function StatusChip({
  showInfo = false,
  variant,
}: {
  showInfo?: boolean;
  variant: "completed" | "error" | "warning";
}) {
  return (
    <span className={`status-chip status-chip-${variant}`}>
      {variant}
      {showInfo ? <InfoOutlinedIcon /> : null}
    </span>
  );
}

function FilterChip({
  label,
  value,
  active = false,
  removable = false,
}: {
  label: string;
  value: string;
  active?: boolean;
  removable?: boolean;
}) {
  return (
    <button className={active ? "filter-chip filter-chip-active" : "filter-chip"} type="button">
      <strong>{label}</strong>
      <span>: {value}</span>
      {removable ? <CloseIcon /> : <ExpandMoreIcon />}
    </button>
  );
}

function RevenueOverview() {
  return (
    <WidgetCard>
      <CardHeader
        action={
          <HeaderActions>
            <div className="split-button">
              <ActionButton>Refresh</ActionButton>
              <button type="button" aria-label="Refresh menu">
                <ExpandMoreIcon />
              </button>
            </div>
          </HeaderActions>
        }
        title="Revenue Overview"
      />
      <div className="filter-row">
        <FilterChip label="Duration" value="Last Month" />
        <FilterChip active label="Location" removable value="All" />
        <TextButton icon={<TuneOutlinedIcon />}>Add filter</TextButton>
      </div>
      <div className="donut-area">
        <div className="donut-chart" role="img" aria-label="Revenue by region donut chart">
          <div className="donut-center">
            <strong>$12,4K</strong>
            <span>Total</span>
          </div>
          <div className="donut-trend">
            <ArrowDropUpIcon /> 10%
          </div>
        </div>
        <ul className="legend-list">
          <li className="legend-item-active">
            <span className="legend-dot legend-us" /> US
          </li>
          <li>
            <span className="legend-dot legend-emea" /> EMEA
          </li>
          <li>
            <span className="legend-dot legend-apac" /> APAC
          </li>
          <li>
            <span className="legend-dot legend-latam" /> LATAM
          </li>
          <li>
            <span className="legend-dot legend-other" /> Others
          </li>
        </ul>
      </div>
    </WidgetCard>
  );
}

function RevenueTasks() {
  return (
    <WidgetCard contentGap={8}>
      <CardHeader
        action={
          <HeaderActions gap={12}>
            <ActionButton>Refresh</ActionButton>
          </HeaderActions>
        }
        title="Revenue Tasks"
      />
      <div className="task-toolbar">
        <div className="tabs">
          <button className="tab tab-active" type="button">
            Exceptions
          </button>
          <button className="tab" type="button">
            Actions
          </button>
        </div>
        <OccamSwitch defaultChecked label="Pending Data Only" />
      </div>
      <div className="task-list">
        {taskRows.map(([label, value]) => (
          <div className="task-list-item" key={label}>
            <span className="warning-dot" />
            <span>{label}</span>
            <InfoOutlinedIcon />
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}

function RunReport() {
  return (
    <WidgetCard className="report-card">
      <CardHeader refreshed={false} showMoreMenu title="Zuora Revenue Report" />
      <div className="form-row">
        <label>
          <strong>Search Report</strong>
          <span className="field-control">
            <SearchIcon />
            <input placeholder="Search report" />
          </span>
        </label>
        <label>
          <strong>Select Layout</strong>
          <span className="field-control select-control">
            <input placeholder="Select layout" readOnly />
            <ExpandMoreIcon />
          </span>
        </label>
        <ActionButton disabled>Submit</ActionButton>
      </div>
      <div className="table-heading">
        <h4>Recent Downloads</h4>
        <button type="button" aria-label="Refresh recent downloads">
          <RefreshOutlinedIcon />
        </button>
      </div>
      <div className="widget-table-wrap">
        <table className="downloads-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Report Name</th>
              <th>Completion Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(([id, name, time]) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{time}</td>
                <td>
                  <FileDownloadOutlinedIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="text-link" type="button">
        View All Downloads
      </button>
    </WidgetCard>
  );
}

function RunProgram() {
  return (
    <WidgetCard className="program-card">
      <CardHeader refreshed={false} showMoreMenu title="Zuora Revenue Program" />
      <div className="form-row program-form-row">
        <label>
          <strong>Search Program</strong>
          <span className="field-control">
            <SearchIcon />
            <input placeholder="Search program" />
          </span>
        </label>
        <span className="program-checkbox">
          <CheckBoxOutlineBlankOutlinedIcon />
          Job Group
        </span>
        <ActionButton disabled>Run Program</ActionButton>
      </div>
      <div className="table-heading">
        <h4>Recent Schedule Jobs</h4>
        <button type="button" aria-label="Refresh recent schedule jobs">
          <RefreshOutlinedIcon />
        </button>
      </div>
      <div className="widget-table-wrap">
        <table className="widget-table program-table">
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Job Name</th>
              <th>Completion Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {scheduleJobs.map(([id, name, time, status]) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{time}</td>
                <td>
                  <StatusChip
                    showInfo={status === "error" || status === "warning"}
                    variant={status}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="text-link" type="button">
        View All Schedule Jobs
      </button>
    </WidgetCard>
  );
}

function FileUpload() {
  return (
    <WidgetCard className="upload-card">
      <CardHeader refreshed={false} showMoreMenu title="File Upload" />
      <div className="upload-form-row">
        <div className="upload-form-fields">
          <label className="upload-form-field">
            <strong>Select Type</strong>
            <span className="upload-select">Select type <ExpandMoreIcon /></span>
          </label>
          <label className="upload-form-field">
            <strong>Select Template</strong>
            <span className="upload-select upload-select-disabled">
              Select template <ExpandMoreIcon />
            </span>
          </label>
        </div>
        <ActionButton disabled>Upload file</ActionButton>
      </div>
      <div className="upload-recent-section">
        <div className="table-heading">
          <h4>Recent Uploads</h4>
        </div>
        <div className="upload-empty-state">
          <p>Select type and template to upload files and view recent uploads</p>
        </div>
      </div>
    </WidgetCard>
  );
}

function ActiveBatches() {
  return (
    <WidgetCard className="batches-card">
      <CardHeader
        action={
          <HeaderActions>
            <ActionButton>Download</ActionButton>
          </HeaderActions>
        }
        title="Active SSP Batches"
      />
      <div className="widget-table-wrap">
        <div className="widget-table-toolbar">
          <button type="button" aria-label="Refresh batches">
            <RefreshOutlinedIcon />
          </button>
        </div>
        <table className="widget-table batches-table">
          <thead>
            <tr>
              <th>Template</th>
              <th>Batch Name</th>
              <th>Batch ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sspBatches.map(([template, batchName, batchId]) => (
              <tr key={batchId}>
                <td>{template}</td>
                <td>
                  <a className="table-link" href="#">
                    {batchName}
                  </a>
                </td>
                <td>{batchId}</td>
                <td>
                  <AccountTreeOutlinedIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="text-link" type="button">
        View All Batches
      </button>
    </WidgetCard>
  );
}

function RCSearch() {
  return (
    <WidgetCard className="rc-search-card">
      <CardHeader refreshed={false} showMoreMenu title="Revenue Contract Search" />
      <div className="rc-search-body">
        <div className="rc-search-fields">
          <label>
            <strong>Quick Search</strong>
            <span className="field-control">
              <input placeholder="Select saved search" readOnly />
              <ExpandMoreIcon />
            </span>
          </label>
          <div className="rc-search-divider" />
          <div>
            <strong>Filters</strong>
            <div className="rc-filters-panel">
              <div className="rc-filters-toolbar">
                <span className="rc-operator-select">
                  And
                  <ExpandMoreIcon />
                </span>
                <TextButton icon={<AddIcon />}>Add Rule</TextButton>
              </div>
              <div className="rc-rule-row">
                <div className="rc-rule-fields">
                  <span className="rc-rule-field">Select source <ExpandMoreIcon /></span>
                  <span className="rc-rule-field rc-rule-field-filled">Equals to <ExpandMoreIcon /></span>
                  <span className="rc-rule-field">Select value <ExpandMoreIcon /></span>
                </div>
                <button className="rc-delete-button" type="button" aria-label="Delete rule">
                  <DeleteOutlinedIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="rc-search-footer">
          <ActionButton disabled>Search</ActionButton>
        </div>
      </div>
    </WidgetCard>
  );
}

const processSteps = [
  ["5", "Run Event programs", "Due by Day 2", true],
  ["6", "Review Unreleased POB", "Due by Day 3", true],
  ["7", "Review revenue report", "Due Day 4", false],
] as const;

function CloseProcessStatus({
  widgetRef,
}: {
  widgetRef: RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    const widget = widgetRef.current;

    if (!widget) {
      return undefined;
    }

    const handleEnterAnimationEnd = (event: AnimationEvent) => {
      if (event.target !== widget || event.animationName !== "widget-card-added-in") {
        return;
      }

      widget.classList.add("widget-card-settled");
      widget.removeEventListener("animationend", handleEnterAnimationEnd);
    };

    widget.addEventListener("animationend", handleEnterAnimationEnd);

    return () => {
      widget.removeEventListener("animationend", handleEnterAnimationEnd);
    };
  }, [widgetRef]);

  return (
    <WidgetCard
      className="close-process-card widget-card-added"
      data-node-id="111:17159"
      ref={widgetRef}
      tabIndex={-1}
    >
      <CardHeader
        action={
          <HeaderActions>
            <ActionButton>Refresh</ActionButton>
          </HeaderActions>
        }
        title="Close Process Status"
      />
      <div className="close-process-body">
        <div className="close-process-summary">
          <div className="close-process-ring" role="img" aria-label="Close process 50 percent complete">
            <strong>50%</strong>
          </div>
          <span>Completed 4/8 tasks</span>
          <dl className="process-meta-list">
            <div>
              <dt>Current Period</dt>
              <dd>April 2026</dd>
            </div>
            <div>
              <dt>
                Current Close day <InfoOutlinedIcon />
              </dt>
              <dd>Day 2</dd>
            </div>
          </dl>
        </div>

        <div className="close-process-details">
          <div>
            <span className="process-label">Current Task</span>
            <div className="current-task-line">
              <strong>Upload Events</strong>
              <WarningAmberRoundedIcon />
            </div>
          </div>

          <div className="process-next-tasks">
            <span className="process-label">Next 3 Tasks</span>
            <ol>
              {processSteps.map(([number, title, dueDate, warning]) => (
                <li className="process-step" key={number}>
                  <span className="process-step-index">{number}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>
                      {dueDate}
                      {warning && <WarningAmberRoundedIcon />}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <button className="text-link process-checklist-link" type="button">
            Go to checklist
          </button>
        </div>
      </div>
    </WidgetCard>
  );
}

function WidgetDrawerShell({
  ariaLabel,
  children,
  dataNodeId,
  footer,
  header,
  onClose,
}: {
  ariaLabel: string;
  children: ReactNode;
  dataNodeId: string;
  footer?: ReactNode;
  header: ReactNode;
  onClose: () => void;
}) {
  return (
    <aside
      aria-label={ariaLabel}
      aria-modal="true"
      className="widget-drawer"
      data-node-id={dataNodeId}
      role="dialog"
    >
      <div className="widget-drawer-panel">
        <header className="widget-drawer-header">
          <div className="widget-drawer-header-main">{header}</div>
          <button
            aria-label="Close add widget panel"
            className="widget-drawer-close"
            onClick={onClose}
            type="button"
          >
            <CloseIcon />
          </button>
        </header>
        <div className="widget-drawer-content">{children}</div>
        {footer && <footer className="widget-drawer-footer">{footer}</footer>}
      </div>
    </aside>
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

function WidgetSizePreview() {
  return (
    <div className="widget-size-preview" aria-hidden="true">
      <div className="widget-size-preview-selected">
        <span>3x3</span>
      </div>
      <div className="widget-size-preview-grid">
        {Array.from({ length: 9 }, (_, index) => (
          <span className="widget-size-preview-cell" key={index} />
        ))}
      </div>
    </div>
  );
}

function AddWidgetPanel({
  onClose,
  onSelectWidget,
  searchQuery,
  onSearchQueryChange,
}: {
  onClose: () => void;
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
        {visibleWidgets.length > 0 ? (
          visibleWidgets.map((widget) => (
            <WidgetTypeCard
              configurable={widget.configurable}
              description={widget.description}
              key={widget.id}
              name={widget.name}
              onSelect={() => onSelectWidget(widget.id)}
            />
          ))
        ) : (
          <p className="widget-type-empty">No widgets match your search.</p>
        )}
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

      <WidgetSizePreview />
    </WidgetDrawerShell>
  );
}

function WidgetDrawer({
  onAddRevenueProgress,
  onBackToSelect,
  onClose,
  onSelectWidget,
  searchQuery,
  onSearchQueryChange,
  step,
}: {
  onAddRevenueProgress: () => void;
  onBackToSelect: () => void;
  onClose: () => void;
  onSelectWidget: (widgetId: (typeof WIDGET_TYPES)[number]["id"]) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  step: Exclude<WidgetDrawerStep, "closed">;
}) {
  if (step === "select") {
    return (
      <AddWidgetPanel
        onClose={onClose}
        onSearchQueryChange={onSearchQueryChange}
        onSelectWidget={onSelectWidget}
        searchQuery={searchQuery}
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
  bannerPlacement,
  bannerPinned,
  onClose,
  anchorRef,
  pinnedShellRef,
  slotRef,
}: {
  bannerPlacement: BannerPlacement;
  bannerPinned: boolean;
  onClose: () => void;
  anchorRef: RefObject<HTMLDivElement | null>;
  pinnedShellRef: RefObject<HTMLDivElement | null>;
  slotRef: RefObject<HTMLDivElement | null>;
}) {
  const [activeAnnouncementIndex, setActiveAnnouncementIndex] = useState(0);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const showPinnedOverlay = bannerPlacement === "pin-on-scroll" && bannerPinned;
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
      {bannerPlacement === "pin-on-scroll" ? (
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
      ) : null}
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

function RevenueProgressToast({
  onClose,
  onViewWidget,
  showViewWidget,
}: {
  onClose: () => void;
  onViewWidget: () => void;
  showViewWidget: boolean;
}) {
  return (
    <div className="feedback-toast" data-node-id="111:13461" role="status" aria-live="polite">
      <div className="feedback-toast-inner">
        <div className="feedback-toast-message">
          <InfoIcon aria-hidden="true" className="feedback-toast-info-icon" />
          <p>Revenue Progress has been added.</p>
        </div>
        <div className="feedback-toast-actions">
          {showViewWidget ? (
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
  addedWidgetRef,
  revenueProgressAdded,
}: {
  addedWidgetRef: RefObject<HTMLElement | null>;
  revenueProgressAdded: boolean;
}) {
  return (
    <section className="dashboard-grid" data-node-id="1:57116">
      <RevenueOverview />
      <RevenueTasks />
      <RunReport />
      <RunProgram />
      <FileUpload />
      <ActiveBatches />
      <RCSearch />
      {revenueProgressAdded ? <CloseProcessStatus widgetRef={addedWidgetRef} /> : null}
    </section>
  );
}

export function App() {
  const [actionsLayout] = useState(getActionsLayout);
  const [bannerPlacement, setBannerPlacement] = useState(getBannerPlacement);
  const [revenueProgressAdded, setRevenueProgressAdded] = useState(false);
  const [feedbackToastVisible, setFeedbackToastVisible] = useState(false);
  const [feedbackShowViewWidget, setFeedbackShowViewWidget] = useState(false);
  const [widgetDrawerStep, setWidgetDrawerStep] = useState<WidgetDrawerStep>("closed");
  const [widgetSearchQuery, setWidgetSearchQuery] = useState("");
  const [notificationBannerVisible, setNotificationBannerVisible] = useState(true);
  const [announcementScrollAnimating, setAnnouncementScrollAnimating] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const addedWidgetRef = useRef<HTMLElement | null>(null);
  const { progress, scrollRef } = useStickyProgress();
  const surfaceProgress = easeInOut(rangeProgress(progress, 0.08, 0.64));
  const bannerAffectsHero = notificationBannerVisible;
  const { bannerAnchorRef, bannerPinned, bannerPinnedShellRef, bannerSlotRef, pinnedBannerHeight } =
    useBannerPinMotion(bannerPlacement, notificationBannerVisible, scrollRef);
  const titleMorphProgress = easeInOut(rangeProgress(progress, 0.04, 0.76));
  const titleScaleProgress = easeInOut(rangeProgress(progress, 0.02, 0.92));
  const actionsProgress = easeInOut(rangeProgress(progress, 0.18, 0.82));
  const actionsMorphProgress = easeInOut(rangeProgress(progress, 0.04, 0.76));
  const floatingActionsGeometry = useFloatingActionsGeometry(
    actionsMorphProgress,
    actionsLayout,
    bannerPinned ? pinnedBannerHeight : 0,
    aiChatOpen,
    notificationBannerVisible,
    bannerPinned,
  );
  const searchMorphGeometry = useSearchMorphGeometry(
    actionsMorphProgress,
    bannerAffectsHero,
    bannerPinned ? pinnedBannerHeight : 0,
  );
  const welcomeOutProgress = easeInOut(rangeProgress(progress, 0.08, 0.55));
  const welcomeTitleMorphY = useWelcomeHeroMorphY(bannerAffectsHero);
  const chipReturnTitleActive = bannerPlacement === "chip-on-scroll" && announcementScrollAnimating;
  const chipReturnCenterPhase = chipReturnTitleActive ? rangeProgress(0.25 - progress, 0, 0.25) : 0;
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
      : `${NOTIFICATION_BANNER_PINNED_HEIGHT_FALLBACK}px`,
  } as StickyProgressStyle;
  const stickyControlsActive = progress > 0.48;
  const bannerChipEligible = useBannerChipVisibility(
    bannerPlacement,
    notificationBannerVisible,
    scrollRef,
    bannerSlotRef,
    stickyControlsActive,
  );
  const showAnnouncementChip = bannerChipEligible && !announcementScrollAnimating;
  const handleAnnouncementChipClick = () => {
    const scrollNode = scrollRef.current;

    if (!scrollNode) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scrollNode.scrollTop = 0;
      return;
    }

    if (announcementScrollAnimating || scrollNode.scrollTop <= 0) {
      return;
    }

    const duration = Math.min(900, Math.max(550, scrollNode.scrollTop * 2.2));

    setAnnouncementScrollAnimating(true);
    void smoothScrollTo(scrollNode, 0, duration).finally(() => {
      setAnnouncementScrollAnimating(false);
    });
  };
  const handleBannerPlacementChange = (nextBannerPlacement: BannerPlacement) => {
    setBannerPlacement(nextBannerPlacement);
    syncBannerPlacementUrl(nextBannerPlacement);
  };
  const handleOpenAddWidgetPanel = () => {
    setWidgetSearchQuery("");
    setWidgetDrawerStep("select");
  };
  const handleCloseWidgetDrawer = () => {
    setWidgetDrawerStep("closed");
    setWidgetSearchQuery("");
  };
  const handleSelectWidgetType = (widgetId: (typeof WIDGET_TYPES)[number]["id"]) => {
    const widget = WIDGET_TYPES.find((entry) => entry.id === widgetId);

    if (!widget?.configurable) {
      return;
    }

    setWidgetDrawerStep("configure");
  };
  const handleBackToWidgetSelect = () => {
    setWidgetDrawerStep("select");
  };
  const handleConfirmAddRevenueProgress = () => {
    handleCloseWidgetDrawer();

    if (revenueProgressAdded) {
      setFeedbackToastVisible(true);
      return;
    }

    setRevenueProgressAdded(true);
    setFeedbackToastVisible(true);
  };
  const handleViewAddedWidget = () => {
    setFeedbackToastVisible(false);

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

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollToAddedWidget);
    });
  };

  useEffect(() => {
    if (widgetDrawerStep === "closed") {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setWidgetDrawerStep("closed");
        setWidgetSearchQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [widgetDrawerStep]);

  useEffect(() => {
    if (!feedbackToastVisible) {
      setFeedbackShowViewWidget(false);
      return undefined;
    }

    let frame = 0;

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

    const timeout = window.setTimeout(() => {
      setFeedbackToastVisible(false);
    }, 8000);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.clearTimeout(timeout);
    };
  }, [feedbackToastVisible, revenueProgressAdded, scrollRef]);

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [aiChatOpen]);

  return (
    <div className="nebula-shell" data-ai-chat-open={aiChatOpen || undefined}>
      <GlobalNav />
      <div className="homepage-workspace">
        <main
          className="homepage-main"
          data-actions-layout={actionsLayout}
          data-announcement-chip-visible={showAnnouncementChip || undefined}
          data-announcement-scroll-animating={announcementScrollAnimating || undefined}
          data-chip-return-centering={chipReturnCenterPhase > 0.001 || undefined}
          data-banner-affects-hero={bannerAffectsHero || undefined}
          data-banner-pinned={bannerPinned || undefined}
          data-banner-placement={bannerPlacement}
          data-node-id="1:57107"
          data-notification-visible={notificationBannerVisible || undefined}
          data-sticky-state={progress >= 1 ? "stuck" : "default"}
          ref={scrollRef}
          style={stickyStyle}
          tabIndex={0}
        >
        <StickyHeader
          active={stickyControlsActive}
          announcementCount={notificationAnnouncements.length}
          onAnnouncementChipClick={handleAnnouncementChipClick}
          showAnnouncementChip={showAnnouncementChip}
        />
        <MorphingSearchField />
        <MorphingFloatingActions onOpenAddWidgetPanel={handleOpenAddWidgetPanel} />
        <PrototypeControls
          bannerPlacement={bannerPlacement}
          onBannerPlacementChange={handleBannerPlacementChange}
        />
        {widgetDrawerStep !== "closed" && (
          <WidgetDrawer
            onAddRevenueProgress={handleConfirmAddRevenueProgress}
            onBackToSelect={handleBackToWidgetSelect}
            onClose={handleCloseWidgetDrawer}
            onSearchQueryChange={setWidgetSearchQuery}
            onSelectWidget={handleSelectWidgetType}
            searchQuery={widgetSearchQuery}
            step={widgetDrawerStep}
          />
        )}
        {feedbackToastVisible && (
          <RevenueProgressToast
            onClose={() => setFeedbackToastVisible(false)}
            onViewWidget={handleViewAddedWidget}
            showViewWidget={feedbackShowViewWidget}
          />
        )}
        <div
          className="scrolled-content"
          data-node-id="1:57108"
          data-revenue-progress-added={revenueProgressAdded || undefined}
        >
          {notificationBannerVisible ? (
            <NotificationBannerRegion
              anchorRef={bannerAnchorRef}
              bannerPinned={bannerPinned}
              bannerPlacement={bannerPlacement}
              onClose={() => setNotificationBannerVisible(false)}
              pinnedShellRef={bannerPinnedShellRef}
              slotRef={bannerSlotRef}
            />
          ) : null}
          <WelcomeSearch />
          <DashboardGrid addedWidgetRef={addedWidgetRef} revenueProgressAdded={revenueProgressAdded} />
        </div>
        </main>
        <AiChatPanel onClose={() => setAiChatOpen(false)} open={aiChatOpen} />
      </div>
      {!aiChatOpen ? <AiChatBadge onClick={() => setAiChatOpen(true)} /> : null}
    </div>
  );
}
