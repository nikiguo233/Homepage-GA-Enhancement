import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useMemo, useState } from "react";
import type { CustomWidget, CustomWidgetAccess } from "../../customWidgets/types";
import {
  CUSTOM_WIDGET_ACCESS_OPTIONS,
  normalizeCustomWidgetAccess,
} from "../../customWidgets/widgetAccess";
import { getWidgetSizeLabel } from "../../customWidgets/widgetSizes";
import { AiChatBadge } from "../../AiChatPanel";
import { AiButton } from "../AiButton";
import { PublishConfirmModal } from "./CustomWidgetDashboardCard";
import { WidgetEditorPreviewGrid } from "./WidgetEditorPreviewGrid";

type EditorStep = "basic" | "configure";

export function AiGeneratedWidgetEditor({
  aiChatOpen = false,
  initialStep = "basic",
  onAddToHomepage,
  onClose,
  onOpenAiChat,
  onSave,
  widget,
}: {
  aiChatOpen?: boolean;
  initialStep?: EditorStep;
  onAddToHomepage?: () => void;
  onClose: () => void;
  onOpenAiChat?: () => void;
  onSave: (access: CustomWidgetAccess) => void;
  widget: CustomWidget;
}) {
  const [step, setStep] = useState<EditorStep>(initialStep);
  const [access, setAccess] = useState<CustomWidgetAccess>(() =>
    normalizeCustomWidgetAccess(widget.access),
  );
  const [showPublishConfirmModal, setShowPublishConfirmModal] = useState(false);

  useEffect(() => {
    setAccess(normalizeCustomWidgetAccess(widget.access));
  }, [widget.access, widget.id]);

  const previewWidget = useMemo(
    () => ({
      ...widget,
      displayWidgetName: false,
    }),
    [widget],
  );

  const isPersonalAccess = access === "private";
  const isTenantAccess = access === "tenant";
  const showAddToHomepage = isPersonalAccess && Boolean(onAddToHomepage);

  const handleSave = () => {
    if (isTenantAccess) {
      setShowPublishConfirmModal(true);
      return;
    }

    onSave(access);
  };

  const handleConfirmSaveAndPublish = () => {
    onSave(access);
    setShowPublishConfirmModal(false);
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
              {isTenantAccess ? "Shared" : "Personal"}
            </span>
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
          <AiButton
            background="light"
            className="custom-widget-editor-edit-with-ai-button"
            onClick={() => onOpenAiChat?.()}
            size="medium"
            variant="secondary"
          >
            Edit with AI
          </AiButton>
          {showAddToHomepage ? (
            <button
              className="custom-widget-editor-secondary-button"
              onClick={onAddToHomepage}
              type="button"
            >
              Add to Homepage
            </button>
          ) : null}
          <button
            className="custom-widget-editor-primary-button"
            onClick={handleSave}
            type="button"
          >
            {isTenantAccess ? "Save and Publish" : "Save"}
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
            <label className="custom-widget-field">
              <span className="custom-widget-field-label">Visibility</span>
              <select
                onChange={(event) =>
                  setAccess(event.target.value as CustomWidgetAccess)
                }
                value={access}
              >
                {CUSTOM_WIDGET_ACCESS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
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
      {showPublishConfirmModal ? (
        <PublishConfirmModal
          access={access}
          onCancel={() => setShowPublishConfirmModal(false)}
          onConfirm={handleConfirmSaveAndPublish}
        />
      ) : null}
      {step === "configure" && !aiChatOpen && onOpenAiChat ? (
        <AiChatBadge className="custom-widget-editor-ai-badge" onClick={onOpenAiChat} />
      ) : null}
    </div>
  );
}
