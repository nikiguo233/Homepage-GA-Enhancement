import type { CustomWidget } from "./types";
import { CURRENT_WIDGET_ACTOR } from "./widgetHistory";

export function isWidgetCreatedByCurrentUser(widget: CustomWidget) {
  return (widget.createdBy ?? CURRENT_WIDGET_ACTOR) === CURRENT_WIDGET_ACTOR;
}
