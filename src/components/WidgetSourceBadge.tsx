import WidgetLibraryOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import { AiGeneratedChip } from "./customWidgets/AiGeneratedChip";
import type { WidgetRecommendationSource } from "../ai/types";

export function WidgetSourceBadge({
  className,
  source,
}: {
  className?: string;
  source: WidgetRecommendationSource;
}) {
  if (source === "ai-generated") {
    return <AiGeneratedChip className={["ai-widget-source-badge", className].filter(Boolean).join(" ")} />;
  }

  return (
    <span className={["ai-widget-library-badge", className].filter(Boolean).join(" ")}>
      <span aria-hidden="true" className="ai-widget-library-badge-icon-wrap">
        <WidgetLibraryOutlinedIcon className="ai-widget-library-badge-icon" />
      </span>
      <span className="ai-widget-library-badge-label">Widget Library</span>
    </span>
  );
}
