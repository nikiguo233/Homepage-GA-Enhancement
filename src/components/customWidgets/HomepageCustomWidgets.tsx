import type { RefObject } from "react";
import { isCustomWidgetId, parseCustomWidgetRef, type CustomWidget } from "../../customWidgets/types";
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
    <>
      {visibleCustomWidgetIds.map((widgetId) => {
        const parsedRef = parseCustomWidgetRef(widgetId);
        const widget = parsedRef ? getCustomWidgetById(parsedRef.widgetId) : undefined;

        if (!widget || !parsedRef) {
          return null;
        }

        return (
          <CustomWidgetDashboardCard
            displaySize={parsedRef.size ?? widget.size}
            key={widgetId}
            ref={widgetId === highlightedWidgetRefId ? widgetRef : undefined}
            widget={widget}
          />
        );
      })}
    </>
  );
}
