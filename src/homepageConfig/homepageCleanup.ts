import {
  DASHBOARD_WIDGET_CATALOG,
  DEFAULT_DASHBOARD_WIDGET_IDS,
  type DashboardWidgetId,
} from "../components/dashboardWidgets/catalog";
import type { HomepageLayout } from "./types";
import { CLEANUP_LAYOUT_REASON, getCleanupRemovalReason } from "../ai/recommendationRationales";

export type HomepageCleanupPlan = {
  hiddenMetricCardLabels: string[];
  layoutReason: string;
  orderedWidgetIds: DashboardWidgetId[];
  removals: Array<{
    id: string;
    name: string;
    reason: string;
  }>;
  removedWidgetIds: DashboardWidgetId[];
  removedWidgetNames: string[];
};

const LOW_VALUE_WIDGET_IDS: DashboardWidgetId[] = ["file-upload", "rc-search", "active-batches"];

const PRIORITY_WIDGET_ORDER: DashboardWidgetId[] = [
  "revenue-tasks",
  "revenue-overview",
  "run-report",
  "run-program",
  "active-batches",
  "revenue-progress",
  "file-upload",
  "rc-search",
];

const LOW_VALUE_METRIC_LABELS = ["Compliance Risk", "Close Readiness"] as const;

function getWidgetName(widgetId: DashboardWidgetId) {
  return DASHBOARD_WIDGET_CATALOG.find((widget) => widget.id === widgetId)?.name ?? widgetId;
}

function reorderWidgets(widgetIds: DashboardWidgetId[]) {
  const prioritized = PRIORITY_WIDGET_ORDER.filter((id) => widgetIds.includes(id));
  const remainder = widgetIds.filter((id) => !PRIORITY_WIDGET_ORDER.includes(id));

  return [...prioritized, ...remainder];
}

export function getCurrentDashboardWidgetIds(options: {
  addedWidgetIds: string[];
  layout: HomepageLayout;
  removedWidgetIds: DashboardWidgetId[];
  revenueProgressAdded: boolean;
  startWithEmptyHomepage?: boolean;
  widgetOrder: DashboardWidgetId[] | null;
}): DashboardWidgetId[] {
  if (options.layout === "ai-generated") {
    return options.addedWidgetIds.filter(
      (id): id is DashboardWidgetId =>
        DEFAULT_DASHBOARD_WIDGET_IDS.includes(id as DashboardWidgetId) ||
        id === "revenue-progress",
    ).filter((id) => !options.removedWidgetIds.includes(id));
  }

  if (options.startWithEmptyHomepage) {
    const visible = [
      ...new Set(
        options.addedWidgetIds.filter((id): id is DashboardWidgetId =>
          DASHBOARD_WIDGET_CATALOG.some((widget) => widget.id === id),
        ),
      ),
    ].filter((id) => !options.removedWidgetIds.includes(id));

    if (
      options.revenueProgressAdded &&
      !options.removedWidgetIds.includes("revenue-progress") &&
      !visible.includes("revenue-progress")
    ) {
      return [...visible, "revenue-progress"];
    }

    return visible;
  }

  const baseOrder = options.widgetOrder ?? [...DEFAULT_DASHBOARD_WIDGET_IDS];
  const visible = baseOrder.filter((id) => !options.removedWidgetIds.includes(id));

  if (
    options.revenueProgressAdded &&
    !options.removedWidgetIds.includes("revenue-progress") &&
    !visible.includes("revenue-progress")
  ) {
    return [...visible, "revenue-progress"];
  }

  return visible;
}

export function proposeHomepageCleanup(options: {
  addedWidgetIds: string[];
  hiddenMetricCardLabels: string[];
  layout: HomepageLayout;
  removedWidgetIds: DashboardWidgetId[];
  revenueProgressAdded: boolean;
  widgetOrder: DashboardWidgetId[] | null;
}): HomepageCleanupPlan | null {
  const currentWidgetIds = getCurrentDashboardWidgetIds(options);

  if (options.layout === "ai-generated") {
    const removableDashboardWidgets = currentWidgetIds.filter((id) =>
      LOW_VALUE_WIDGET_IDS.includes(id),
    );
    const removedDashboardWidgets =
      removableDashboardWidgets.length > 0
        ? removableDashboardWidgets.slice(0, 2)
        : currentWidgetIds.slice(-Math.min(2, currentWidgetIds.length));

    const remainingDashboardWidgets = currentWidgetIds.filter(
      (id) => !removedDashboardWidgets.includes(id),
    );
    const hiddenMetricCardLabels =
      currentWidgetIds.length === 0
        ? [...LOW_VALUE_METRIC_LABELS]
        : removedDashboardWidgets.length < 2
          ? ["Compliance Risk"]
          : [];

    if (removedDashboardWidgets.length === 0 && hiddenMetricCardLabels.length === 0) {
      return null;
    }

    return {
      hiddenMetricCardLabels,
      layoutReason: CLEANUP_LAYOUT_REASON,
      orderedWidgetIds: reorderWidgets(remainingDashboardWidgets),
      removals: [
        ...removedDashboardWidgets.map((id) => ({
          id,
          name: getWidgetName(id),
          reason: getCleanupRemovalReason(id),
        })),
        ...hiddenMetricCardLabels.map((label) => ({
          id: label,
          name: label,
          reason: getCleanupRemovalReason(label),
        })),
      ],
      removedWidgetIds: removedDashboardWidgets,
      removedWidgetNames: [
        ...removedDashboardWidgets.map(getWidgetName),
        ...hiddenMetricCardLabels,
      ],
    };
  }

  const removedWidgetIds = (["file-upload", "rc-search"] as DashboardWidgetId[]).filter((id) =>
    currentWidgetIds.includes(id),
  );
  const remainingWidgetIds = currentWidgetIds.filter((id) => !removedWidgetIds.includes(id));

  if (removedWidgetIds.length === 0) {
    return null;
  }

  return {
    hiddenMetricCardLabels: [],
    layoutReason: CLEANUP_LAYOUT_REASON,
    orderedWidgetIds: reorderWidgets(remainingWidgetIds),
    removals: removedWidgetIds.map((id) => ({
      id,
      name: getWidgetName(id),
      reason: getCleanupRemovalReason(id),
    })),
    removedWidgetIds,
    removedWidgetNames: removedWidgetIds.map(getWidgetName),
  };
}
