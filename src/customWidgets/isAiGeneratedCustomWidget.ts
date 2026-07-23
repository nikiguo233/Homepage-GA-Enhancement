import type { CustomWidget, CustomWidgetDraft } from "./types";

export function isAiGeneratedCustomWidget(
  widget: Pick<CustomWidget, "isAiGenerated" | "dataBinding"> | CustomWidgetDraft | null | undefined,
) {
  if (!widget) {
    return false;
  }

  return Boolean(widget.isAiGenerated || widget.dataBinding);
}
