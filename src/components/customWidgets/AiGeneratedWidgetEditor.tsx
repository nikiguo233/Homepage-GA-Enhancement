import CloseIcon from "@mui/icons-material/Close";
import { useMemo, useState } from "react";
import type { CustomWidget, CustomWidgetAccess } from "../../customWidgets/types";
import { normalizeCustomWidgetAccess } from "../../customWidgets/widgetAccess";
import { getWidgetSizeLabel } from "../../customWidgets/widgetSizes";
import { AiChatBadge } from "../../AiChatPanel";
import { AiGeneratedChip } from "./AiGeneratedChip";
import { WidgetEditorPreviewGrid } from "./WidgetEditorPreviewGrid";

type EditorStep = "basic" | "configure";

export function AiGeneratedWidgetEditor({
  aiChatOpen = false,
  initialStep = "basic",
  onClose,
  onOpenAiChat,
  onSave,
  widget,
}: {
  aiChatOpen?: boolean;
  initialStep?: EditorStep;
  onClose: () => void;
  onOpenAiChat?: (draftMessage?: string) => void;
  onSave: (access: CustomWidgetAccess) => void;
  widget: CustomWidget;
}) {
  const [step, setStep] = useState<EditorStep>(initialStep);
  const isTenantAccess = normalizeCustomWidgetAccess(widget.access) === "tenant";

  const previewWidget = useMemo(
    () => ({
      ...widget,
      displayWidgetName: false,
    }),
    [widget],
  );

  const handleSaveForPersonalUse = () => {
    onSave("private");
  };

  const handlePublish = () => {
    onOpenAiChat?.("Publish this widget");
  };

  const handleUnpublish = () => {
    onOpenAiChat?.("Unpublish this widget");
  };

  return (
    <div className="custom-widget-editor-shell ai-generated-widget-editor">
      <header className="custom-widget-editor-header">
        <div className="custom-widget-editor-header-left">
          <button
            aria-label="Close widget editor"
            className="custom-widget-editor-icon-button"
            onClick={onClose}
            type="button"
          >
            <CloseIcon />
          </button>
          <span className="custom-widget-editor-brand">zuora</span>
          <div className="custom-widget-editor-title-group">
            <span className="custom-widget-editor-title">Custom Widget</span>
            <span
              className={`custom-widget-editor-status-chip${isTenantAccess ? " is-published" : ""}`}
            >
              {isTenantAccess ? "Published" : "Personal"}
            </span>
            <AiGeneratedChip className="custom-widget-ai-generated-chip-inline" />
          </div>
        </div>
        <nav aria-label="Widget steps" className="custom-widget-editor-tabs">
          <button
            className={`custom-widget-editor-tab${step === "basic" ? " is-active" : ""}`}
            onClick={() => setStep("basic")}
            type="button"
          >
            Basic Info
          </button>
          <button
            className={`custom-widget-editor-tab${step === "configure" ? " is-active" : ""}`}
            onClick={() => setStep("configure")}
            type="button"
          >
            Preview
          </button>
        </nav>
        <div className="custom-widget-editor-header-actions">
          <button
            className="custom-widget-editor-secondary-button"
            onClick={() => onOpenAiChat?.()}
            type="button"
          >
            Edit with AI
          </button>
          {!isTenantAccess ? (
            <button
              className="custom-widget-editor-secondary-button"
              onClick={handleSaveForPersonalUse}
              type="button"
            >
              Save for Personal Use
            </button>
          ) : null}
          <button
            className="custom-widget-editor-primary-button"
            onClick={isTenantAccess ? handleUnpublish : handlePublish}
            type="button"
          >
            {isTenantAccess ? "Unpublish Widget" : "Publish Widget"}
          </button>
        </div>
      </header>

      {step === "basic" ? (
        <div className="custom-widget-editor-basic">
          <div className="custom-widget-basic-form">
            <dl className="custom-widget-ai-detail-fields">
              <div className="custom-widget-ai-detail-field">
                <dt>Type</dt>
                <dd>AI Generated</dd>
              </div>
              <div className="custom-widget-ai-detail-field">
                <dt>Widget Name</dt>
                <dd>{widget.name || "Untitled Widget"}</dd>
              </div>
              <div className="custom-widget-ai-detail-field">
                <dt>Description</dt>
                <dd>{widget.description || "—"}</dd>
              </div>
            </dl>
            <div className="custom-widget-basic-actions">
              <button
                className="custom-widget-primary-button"
                onClick={() => setStep("configure")}
                type="button"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="custom-widget-editor-configure">
          <div className="custom-widget-editor-workspace code-hidden">
            <div className="custom-widget-preview-panel">
              <div className="custom-widget-preview-toolbar">
                <label className="custom-widget-size-field">
                  <span>Widget Size</span>
                  <select disabled value={widget.size}>
                    <option value={widget.size}>{getWidgetSizeLabel(widget.size)}</option>
                  </select>
                </label>
              </div>
              <div className="custom-widget-preview-stage">
                <WidgetEditorPreviewGrid previewWidget={previewWidget} size={widget.size} />
              </div>
            </div>
          </div>
        </div>
      )}
      {step === "configure" && !aiChatOpen && onOpenAiChat ? (
        <AiChatBadge className="custom-widget-editor-ai-badge" onClick={() => onOpenAiChat()} />
      ) : null}
    </div>
  );
}
