import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useMemo } from "react";
import type { CustomWidget } from "../../customWidgets/types";
import {
  getWidgetDataBindingQuerySummary,
  getWidgetDataBindingSourceLabel,
} from "../../customWidgets/widgetDataBinding";
import { getCustomWidgetAccessLabel } from "../../customWidgets/widgetAccess";
import { getWidgetSizeLabel } from "../../customWidgets/widgetSizes";
import { AiButton } from "../AiButton";
import { AiGeneratedChip } from "./AiGeneratedChip";
import { WidgetEditorPreviewGrid } from "./WidgetEditorPreviewGrid";

function getWidgetTypeLabel(type: CustomWidget["type"]) {
  return type === "html" ? "Custom HTML" : "Embedded Content";
}

export function AiGeneratedWidgetDetailModal({
  onClose,
  onEditWithAi,
  onPublish,
  onUnpublish,
  widget,
}: {
  onClose: () => void;
  onEditWithAi: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
  widget: CustomWidget;
}) {
  const previewWidget = useMemo(
    () => ({
      ...widget,
      displayWidgetName: false,
    }),
    [widget],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="custom-widget-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        aria-labelledby="ai-widget-detail-title"
        aria-modal="true"
        className="custom-widget-ai-detail-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <header className="custom-widget-ai-detail-modal-header">
          <div className="custom-widget-ai-detail-modal-heading">
            <h2 id="ai-widget-detail-title">{widget.name || "Untitled Widget"}</h2>
            <AiGeneratedChip className="custom-widget-ai-generated-chip-inline" />
          </div>
          <button
            aria-label="Close widget details"
            className="custom-widget-modal-close"
            onClick={onClose}
            type="button"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="custom-widget-ai-detail-modal-body">
          <dl className="custom-widget-ai-detail-fields">
            <div className="custom-widget-ai-detail-field">
              <dt>Widget Name</dt>
              <dd>{widget.name || "Untitled Widget"}</dd>
            </div>
            <div className="custom-widget-ai-detail-field">
              <dt>Description</dt>
              <dd>{widget.description || "—"}</dd>
            </div>
            <div className="custom-widget-ai-detail-field">
              <dt>Type</dt>
              <dd>{getWidgetTypeLabel(widget.type)}</dd>
            </div>
            <div className="custom-widget-ai-detail-field">
              <dt>Size</dt>
              <dd>{getWidgetSizeLabel(widget.size)}</dd>
            </div>
            <div className="custom-widget-ai-detail-field">
              <dt>Access</dt>
              <dd>{getCustomWidgetAccessLabel(widget.access)}</dd>
            </div>
            {widget.dataBinding ? (
              <>
                <div className="custom-widget-ai-detail-field">
                  <dt>Data Source</dt>
                  <dd>{getWidgetDataBindingSourceLabel(widget.dataBinding.source)}</dd>
                </div>
                <div className="custom-widget-ai-detail-field">
                  <dt>Data Query</dt>
                  <dd>{getWidgetDataBindingQuerySummary(widget.dataBinding)}</dd>
                </div>
              </>
            ) : null}
          </dl>

          <div className="custom-widget-ai-detail-preview">
            <h3>Preview</h3>
            <div className="custom-widget-ai-detail-preview-frame">
              <WidgetEditorPreviewGrid previewWidget={previewWidget} size={widget.size} />
            </div>
          </div>
        </div>

        <footer className="custom-widget-ai-detail-modal-footer">
          {widget.status === "draft" ? (
            <AiButton onClick={onEditWithAi} variant="secondary">
              Edit with AI
            </AiButton>
          ) : null}
          {widget.status === "draft" && widget.access === "tenant" ? (
            <button className="custom-widget-primary-button" onClick={onPublish} type="button">
              Publish
            </button>
          ) : widget.status === "published" && widget.access === "tenant" ? (
            <button className="custom-widget-secondary-button" onClick={onUnpublish} type="button">
              Unpublish
            </button>
          ) : null}
        </footer>
      </div>
    </div>
  );
}
