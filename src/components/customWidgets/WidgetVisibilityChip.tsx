import type { CustomWidgetAccess } from "../../customWidgets/types";
import { getCustomWidgetVisibilityChipLabel } from "../../customWidgets/widgetAccess";

export function WidgetVisibilityChip({
  access,
  className,
}: {
  access: CustomWidgetAccess | undefined;
  className?: string;
}) {
  const label = getCustomWidgetVisibilityChipLabel(access);

  if (label !== "Published") {
    return null;
  }

  return (
    <span className={`custom-widget-visibility-chip${className ? ` ${className}` : ""}`}>{label}</span>
  );
}
