import type { RefObject } from "react";
import { isCustomWidgetId, parseCustomWidgetRef, type CustomWidget } from "../../customWidgets/types";
import { HomepageWidgetScope } from "../HomepageWidgetActions";
import { CustomWidgetDashboardCard } from "./CustomWidgetDashboardCard";

export function HomepageCustomWidgets({
  addedWidgetIds,
  getCustomWidgetById,
  highlightedWidgetRefId,
  widgetRef,
}: {
  addedWidgetIds: string[];
  getCustomWidgetById: (widgetId: string) => CustomWidget | undefined;
  highlightedWidgetRefId?: string | null;
  widgetRef?: RefObject<HTMLElement | null>;
}) {
  const visibleCustomWidgetIds = addedWidgetIds.filter(isCustomWidgetId);

  if (visibleCustomWidgetIds.length === 0) {
    return null;
  }

  return (
    <div className="homepage-custom-widget-grid">
      {visibleCustomWidgetIds.map((widgetId) => {
        const parsedRef = parseCustomWidgetRef(widgetId);
        const widget = parsedRef ? getCustomWidgetById(parsedRef.widgetId) : undefined;

        if (!widget || !parsedRef) {
          return null;
        }

        return (
          <HomepageWidgetScope key={widgetId} widgetId={widgetId}>
            <CustomWidgetDashboardCard
              displaySize={parsedRef.size ?? widget.size}
              ref={widgetId === highlightedWidgetRefId ? widgetRef : undefined}
              widget={widget}
            />
          </HomepageWidgetScope>
        );
      })}
    </div>
  );
}
