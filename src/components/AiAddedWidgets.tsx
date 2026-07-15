import { DashboardWidget } from "./dashboardWidgets/DashboardWidgets";
import { DASHBOARD_WIDGET_CATALOG, type DashboardWidgetId } from "./dashboardWidgets/catalog";
import { HomepageCustomWidgets } from "./customWidgets/HomepageCustomWidgets";
import type { CustomWidget } from "../customWidgets/types";
import type { RefObject } from "react";

const validWidgetIds = new Set(DASHBOARD_WIDGET_CATALOG.map((widget) => widget.id));

function isDashboardWidgetId(widgetId: string): widgetId is DashboardWidgetId {
  return validWidgetIds.has(widgetId as DashboardWidgetId);
}

export function AiAddedWidgets({
  addedWidgetIds,
  getCustomWidgetById,
  highlightedWidgetRefId,
  widgetRef,
  widgetIds,
}: {
  addedWidgetIds?: string[];
  getCustomWidgetById?: (widgetId: string) => CustomWidget | undefined;
  highlightedWidgetRefId?: string | null;
  widgetRef?: RefObject<HTMLElement | null>;
  widgetIds: string[];
}) {
  const visibleWidgetIds = widgetIds.filter(isDashboardWidgetId);
  const showCustomWidgets = Boolean(addedWidgetIds && getCustomWidgetById);

  if (visibleWidgetIds.length === 0 && !showCustomWidgets) {
    return null;
  }

  return (
    <div className="ai-added-widget-grid">
      {visibleWidgetIds.map((widgetId) => (
        <DashboardWidget key={widgetId} widgetId={widgetId} />
      ))}
      {showCustomWidgets ? (
        <HomepageCustomWidgets
          addedWidgetIds={addedWidgetIds ?? []}
          getCustomWidgetById={getCustomWidgetById!}
          highlightedWidgetRefId={highlightedWidgetRefId}
          widgetRef={widgetRef}
        />
      ) : null}
    </div>
  );
}
