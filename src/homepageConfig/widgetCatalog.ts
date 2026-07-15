import {
  DASHBOARD_WIDGET_CATALOG,
  DEFAULT_DASHBOARD_WIDGET_IDS,
  type DashboardWidgetId,
} from "../components/dashboardWidgets/catalog";
import { WIDGET_RECOMMENDATION_REASONS } from "../ai/recommendationRationales";
import type { RecommendedWidget } from "../ai/types";
import type { HomepageLayout } from "./types";

export const RECOMMENDED_WIDGETS = DASHBOARD_WIDGET_CATALOG;

const AI_GENERATED_BASE_WIDGET_IDS = new Set(["metric-cards", "revenue-trend-chart"]);

export function getAvailableWidgetRecommendations(
  layout: HomepageLayout,
  addedWidgetIds: string[],
  extraExcludedWidgetIds: string[] = [],
  isEmptyHomepage = false,
): RecommendedWidget[] {
  const existing = new Set([
    ...addedWidgetIds,
    ...extraExcludedWidgetIds,
    ...(isEmptyHomepage
      ? []
      : layout === "ai-generated"
        ? AI_GENERATED_BASE_WIDGET_IDS
        : DEFAULT_DASHBOARD_WIDGET_IDS),
  ]);

  return RECOMMENDED_WIDGETS.filter((widget) => !existing.has(widget.id)).map((widget) => ({
    ...widget,
    reason: WIDGET_RECOMMENDATION_REASONS[widget.id],
  }));
}

export type { DashboardWidgetId };
