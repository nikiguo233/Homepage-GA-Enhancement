import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getTemplatePreviewCustomWidget } from "../homepageConfig/teamTemplate";
import type { AiGeneratedDashboardVariant } from "../ai/types";
import type { CustomWidget } from "../customWidgets/types";
import type { DashboardWidgetId } from "./dashboardWidgets/catalog";
import { AiGeneratedDashboard } from "./AiGeneratedDashboard";

const PREVIEW_REFERENCE_WIDTH = 1120;

type AiChatDashboardPreviewProps = {
  getCustomWidgetById?: (widgetId: string) => CustomWidget | undefined;
  libraryWidgetIds?: DashboardWidgetId[];
  metricCardOrder?: string[] | null;
  showMetricCards?: boolean;
  showWidgetSources?: boolean;
  variant?: AiGeneratedDashboardVariant;
  widgetIds?: string[];
};

function resolvePreviewCustomWidget(widgetId: string): CustomWidget | undefined {
  return getTemplatePreviewCustomWidget(widgetId);
}

function AiChatDashboardPreviewThumbnail({
  getCustomWidgetById = resolvePreviewCustomWidget,
  libraryWidgetIds = [],
  metricCardOrder = null,
  showMetricCards = true,
  showWidgetSources = false,
  variant = "default",
  widgetIds = [],
}: AiChatDashboardPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.3);
  const [height, setHeight] = useState(180);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) {
      return undefined;
    }

    const updateScale = () => {
      const nextScale = container.clientWidth / PREVIEW_REFERENCE_WIDTH;
      setScale(nextScale);
      setHeight(content.scrollHeight * nextScale);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    observer.observe(content);

    return () => {
      observer.disconnect();
    };
  }, [libraryWidgetIds, metricCardOrder, showMetricCards, variant, widgetIds]);

  return (
    <div className="ai-chat-preview-thumbnail" ref={containerRef} style={{ height }}>
      <div
        className="ai-chat-preview-thumbnail-inner"
        ref={contentRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: PREVIEW_REFERENCE_WIDTH,
        }}
      >
        <AiGeneratedDashboard
          addedWidgetIds={widgetIds}
          getCustomWidgetById={getCustomWidgetById ?? resolvePreviewCustomWidget}
          libraryWidgetIds={libraryWidgetIds}
          metricCardOrder={metricCardOrder}
          showMetricCards={showMetricCards}
          showWidgetSources={showWidgetSources}
          variant={variant}
        />
      </div>
    </div>
  );
}

function AiChatDashboardPreviewModal({
  getCustomWidgetById = resolvePreviewCustomWidget,
  libraryWidgetIds = [],
  metricCardOrder = null,
  onClose,
  showMetricCards = true,
  showWidgetSources = false,
  variant = "default",
  widgetIds = [],
}: AiChatDashboardPreviewProps & { onClose: () => void }) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className="ai-chat-homepage-preview-modal">
      <button
        aria-label="Close homepage preview"
        className="ai-chat-homepage-preview-modal-backdrop"
        onClick={onClose}
        type="button"
      />
      <div
        aria-labelledby={titleId}
        aria-modal="true"
        className="ai-chat-homepage-preview-modal-panel"
        role="dialog"
      >
        <header className="ai-chat-homepage-preview-modal-header">
          <h3 id={titleId}>Homepage preview</h3>
          <button
            aria-label="Close homepage preview"
            className="ai-chat-homepage-preview-modal-close"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <CloseIcon />
          </button>
        </header>
        <div className="ai-chat-homepage-preview-modal-body">
          <AiGeneratedDashboard
            addedWidgetIds={widgetIds}
            getCustomWidgetById={getCustomWidgetById ?? resolvePreviewCustomWidget}
            libraryWidgetIds={libraryWidgetIds}
            metricCardOrder={metricCardOrder}
            showMetricCards={showMetricCards}
            showWidgetSources={showWidgetSources}
            variant={variant}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function AiChatHomepagePreview({
  getCustomWidgetById,
  libraryWidgetIds,
  metricCardOrder,
  showMetricCards = true,
  showWidgetSources = false,
  variant,
  widgetIds = [],
}: AiChatDashboardPreviewProps = {}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open homepage preview"
        className="ai-chat-preview-thumbnail-button"
        onClick={() => setModalOpen(true)}
        type="button"
      >
        <AiChatDashboardPreviewThumbnail
          getCustomWidgetById={getCustomWidgetById}
          libraryWidgetIds={libraryWidgetIds}
          metricCardOrder={metricCardOrder}
          showMetricCards={showMetricCards}
          showWidgetSources={showWidgetSources}
          variant={variant}
          widgetIds={widgetIds}
        />
        <span aria-hidden="true" className="ai-chat-preview-thumbnail-overlay">
          <OpenInNewIcon />
          <span>Preview</span>
        </span>
      </button>
      {modalOpen ? (
        <AiChatDashboardPreviewModal
          getCustomWidgetById={getCustomWidgetById}
          libraryWidgetIds={libraryWidgetIds}
          metricCardOrder={metricCardOrder}
          onClose={() => setModalOpen(false)}
          showMetricCards={showMetricCards}
          showWidgetSources={showWidgetSources}
          variant={variant}
          widgetIds={widgetIds}
        />
      ) : null}
    </>
  );
}

export function AiChatCleanupHomepagePreview({
  proposal,
}: {
  proposal: {
    metricCardOrder: string[];
    orderedWidgetIds: DashboardWidgetId[];
  };
}) {
  const hasMetricCards = proposal.metricCardOrder.length > 0;
  const variant = proposal.metricCardOrder.includes("Open Exceptions")
    ? "month-end-close"
    : "default";

  return (
    <AiChatHomepagePreview
      libraryWidgetIds={proposal.orderedWidgetIds}
      metricCardOrder={hasMetricCards ? proposal.metricCardOrder : null}
      showMetricCards={hasMetricCards}
      variant={variant}
    />
  );
}
