import {
  DASHBOARD_WIDGET_CATALOG,
  DEFAULT_DASHBOARD_WIDGET_IDS,
  type DashboardWidgetId,
} from "../components/dashboardWidgets/catalog";
import type { HomepageLayout } from "./types";
import type { AiGeneratedDashboardVariant } from "../ai/types";
import { CLEANUP_LAYOUT_REASON } from "../ai/recommendationRationales";

export type HomepageCleanupPlan = {
  hiddenMetricCardLabels: string[];
  layoutReason: string;
  metricCardOrder: string[];
  orderedWidgetIds: DashboardWidgetId[];
  removals: Array<{
    id: string;
    name: string;
    reason: string;
  }>;
  removedWidgetIds: DashboardWidgetId[];
  removedWidgetNames: string[];
};

const DEFAULT_METRIC_CARD_ORDER = [
  "Active Contracts",
  "Deferred Revenue",
  "Close Readiness",
  "Compliance Risk",
] as const;

const MONTH_END_METRIC_CARD_ORDER = [
  "Close Readiness",
  "Open Exceptions",
  "Deferred Revenue",
  "Compliance Risk",
] as const;

const PRIORITY_WIDGET_ORDER: DashboardWidgetId[] = [
  "revenue-tasks",
  "revenue-overview",
  "run-report",
  "run-program",
  "revenue-progress",
  "active-batches",
  "file-upload",
  "rc-search",
];

function getPriorityMetricOrder(variant: AiGeneratedDashboardVariant) {
  return variant === "month-end-close" ? MONTH_END_METRIC_CARD_ORDER : DEFAULT_METRIC_CARD_ORDER;
}

function buildMetricCardOrder(
  variant: AiGeneratedDashboardVariant,
  hiddenMetricCardLabels: string[],
  currentMetricCardOrder: string[] | null,
) {
  const priority = getPriorityMetricOrder(variant);
  const baselineOrder =
    currentMetricCardOrder && currentMetricCardOrder.length > 0
      ? currentMetricCardOrder
      : [...priority];
  const visibleLabels = baselineOrder.filter((label) => !hiddenMetricCardLabels.includes(label));

  return priority.filter((label) => visibleLabels.includes(label));
}

function isSameMetricOrder(current: string[], next: string[]) {
  return current.length === next.length && current.every((label, index) => label === next[index]);
}

function getWidgetName(widgetId: DashboardWidgetId) {
  return DASHBOARD_WIDGET_CATALOG.find((widget) => widget.id === widgetId)?.name ?? widgetId;
}

function reorderWidgets(widgetIds: DashboardWidgetId[]) {
  const prioritized = PRIORITY_WIDGET_ORDER.filter((id) => widgetIds.includes(id));
  const remainder = widgetIds.filter((id) => !PRIORITY_WIDGET_ORDER.includes(id));

  return [...prioritized, ...remainder];
}

function isSameWidgetOrder(current: DashboardWidgetId[], next: DashboardWidgetId[]) {
  return current.length === next.length && current.every((id, index) => id === next[index]);
}

function isDashboardWidgetId(id: string): id is DashboardWidgetId {
  return DASHBOARD_WIDGET_CATALOG.some((widget) => widget.id === id) || id === "revenue-progress";
}

function appendRevenueProgressIfNeeded(
  visible: DashboardWidgetId[],
  options: {
    removedWidgetIds: DashboardWidgetId[];
    revenueProgressAdded: boolean;
  },
): DashboardWidgetId[] {
  if (
    options.revenueProgressAdded &&
    !options.removedWidgetIds.includes("revenue-progress") &&
    !visible.includes("revenue-progress")
  ) {
    return [...visible, "revenue-progress"];
  }

  return visible;
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

  if (options.widgetOrder && options.widgetOrder.length > 0) {
    if (options.startWithEmptyHomepage) {
      const onHomepage = new Set<DashboardWidgetId>(
        options.addedWidgetIds.filter(isDashboardWidgetId),
      );

      if (options.revenueProgressAdded) {
        onHomepage.add("revenue-progress");
      }

      return options.widgetOrder.filter(
        (id): id is DashboardWidgetId =>
          onHomepage.has(id) && !options.removedWidgetIds.includes(id),
      );
    }

    const visible = options.widgetOrder.filter(
      (id): id is DashboardWidgetId => !options.removedWidgetIds.includes(id),
    );

    return appendRevenueProgressIfNeeded(visible, options);
  }

  if (options.startWithEmptyHomepage) {
    const visible = Array.from(
      new Set(options.addedWidgetIds.filter(isDashboardWidgetId)),
    ).filter(
      (id): id is DashboardWidgetId => !options.removedWidgetIds.includes(id),
    );

    return appendRevenueProgressIfNeeded(visible, options);
  }

  const visible = DEFAULT_DASHBOARD_WIDGET_IDS.filter(
    (id) => !options.removedWidgetIds.includes(id),
  );

  return appendRevenueProgressIfNeeded(visible, options);
}

export function proposeHomepageCleanup(options: {
  addedWidgetIds: string[];
  aiDashboardVariant?: AiGeneratedDashboardVariant;
  aiLibraryWidgetIds?: DashboardWidgetId[];
  hiddenMetricCardLabels: string[];
  layout: HomepageLayout;
  metricCardOrder: string[] | null;
  removedWidgetIds: DashboardWidgetId[];
  revenueProgressAdded: boolean;
  startWithEmptyHomepage?: boolean;
  widgetOrder: DashboardWidgetId[] | null;
}): HomepageCleanupPlan | null {
  const currentWidgetIds = [
    ...new Set([
      ...(options.aiLibraryWidgetIds ?? []),
      ...getCurrentDashboardWidgetIds(options),
    ]),
  ];

  if (options.layout === "ai-generated") {
    const variant = options.aiDashboardVariant ?? "default";
    const currentMetricOrder = buildMetricCardOrder(
      variant,
      options.hiddenMetricCardLabels,
      options.metricCardOrder,
    );
    const metricCardOrder = buildMetricCardOrder(variant, options.hiddenMetricCardLabels, null);
    const orderedWidgetIds = reorderWidgets(currentWidgetIds);

    if (
      isSameMetricOrder(currentMetricOrder, metricCardOrder) &&
      isSameWidgetOrder(currentWidgetIds, orderedWidgetIds)
    ) {
      return null;
    }

    return {
      hiddenMetricCardLabels: options.hiddenMetricCardLabels,
      layoutReason: CLEANUP_LAYOUT_REASON,
      metricCardOrder,
      orderedWidgetIds,
      removals: [],
      removedWidgetIds: [],
      removedWidgetNames: [],
    };
  }

  const orderedWidgetIds = reorderWidgets(currentWidgetIds);

  if (isSameWidgetOrder(currentWidgetIds, orderedWidgetIds)) {
    return null;
  }

  return {
    hiddenMetricCardLabels: options.hiddenMetricCardLabels,
    layoutReason: CLEANUP_LAYOUT_REASON,
    metricCardOrder: [],
    orderedWidgetIds,
    removals: [],
    removedWidgetIds: [],
    removedWidgetNames: [],
  };
}
