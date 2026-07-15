import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ViewCompactOutlinedIcon from "@mui/icons-material/ViewCompactOutlined";
import { useEffect, useMemo, useState } from "react";
import {
  getTemplatePreviewCustomWidget,
  type HomepageTemplateDraft,
} from "../homepageConfig/teamTemplate";
import { AiGeneratedDashboard } from "./AiGeneratedDashboard";

type TemplateEditorStep = "basic" | "configure";

function isBasicInfoValid(draft: HomepageTemplateDraft) {
  return (
    draft.name.trim().length > 0 &&
    draft.description.trim().length > 0 &&
    draft.audience.trim().length > 0
  );
}

export function HomepageTemplateEditor({
  initialDraft,
  initialStep = "configure",
  onClose,
  onPublish,
  onSave,
}: {
  initialDraft: HomepageTemplateDraft;
  initialStep?: TemplateEditorStep;
  onClose: () => void;
  onPublish: (draft: HomepageTemplateDraft) => void;
  onSave: (draft: HomepageTemplateDraft) => void;
}) {
  const [step, setStep] = useState<TemplateEditorStep>(initialStep);
  const [draft, setDraft] = useState<HomepageTemplateDraft>(initialDraft);

  useEffect(() => {
    setDraft(initialDraft);
    setStep(initialStep);
  }, [initialDraft.id, initialStep]);

  const previewWidgetIds = useMemo(
    () => [...draft.dashboardWidgetIds, ...draft.customWidgetRefs],
    [draft.customWidgetRefs, draft.dashboardWidgetIds],
  );

  const canAccessConfigure = isBasicInfoValid(draft);

  const updateDraft = (patch: Partial<HomepageTemplateDraft>) => {
    setDraft((current) => ({ ...current, ...patch }));
  };

  return (
    <div className="custom-widget-editor-shell homepage-template-editor">
      <header className="custom-widget-editor-header">
        <div className="custom-widget-editor-header-left">
          <button
            aria-label="Close template editor"
            className="custom-widget-editor-icon-button"
            onClick={onClose}
            type="button"
          >
            <CloseIcon />
          </button>
          <span className="custom-widget-editor-brand">zuora</span>
          <div className="custom-widget-editor-title-group">
            <span className="custom-widget-editor-title">Homepage Template</span>
            <span className="custom-widget-editor-status-chip">draft</span>
          </div>
        </div>
        <nav aria-label="Template steps" className="custom-widget-editor-tabs">
          <button
            className={`custom-widget-editor-tab${step === "basic" ? " is-active" : ""}`}
            onClick={() => setStep("basic")}
            type="button"
          >
            Basic Info
          </button>
          <button
            className={`custom-widget-editor-tab${step === "configure" ? " is-active" : ""}`}
            disabled={!canAccessConfigure}
            onClick={() => canAccessConfigure && setStep("configure")}
            type="button"
          >
            Configure Template
          </button>
        </nav>
        <div className="custom-widget-editor-header-actions">
          <button
            className="custom-widget-editor-secondary-button"
            disabled={!isBasicInfoValid(draft)}
            onClick={() => onSave(draft)}
            type="button"
          >
            Save
          </button>
          <button
            className="custom-widget-editor-primary-button"
            disabled={!canAccessConfigure}
            onClick={() => onPublish(draft)}
            type="button"
          >
            Publish
          </button>
          <button aria-label="More actions" className="custom-widget-editor-icon-button" type="button">
            <MoreVertIcon />
          </button>
        </div>
      </header>

      {step === "basic" ? (
        <div className="homepage-template-editor-basic">
          <div className="homepage-template-editor-form">
            <label className="custom-widget-field">
              <span className="custom-widget-field-label">
                Template Name <span className="custom-widget-required">*</span>
              </span>
              <input
                onChange={(event) => updateDraft({ name: event.target.value })}
                placeholder="Input name"
                value={draft.name}
              />
            </label>
            <label className="custom-widget-field">
              <span className="custom-widget-field-label">
                Description <span className="custom-widget-required">*</span>
              </span>
              <textarea
                onChange={(event) => updateDraft({ description: event.target.value })}
                placeholder="Input description of the template"
                rows={4}
                value={draft.description}
              />
            </label>
            <label className="custom-widget-field">
              <span className="custom-widget-field-label">
                Audience <span className="custom-widget-required">*</span>
              </span>
              <input
                onChange={(event) => updateDraft({ audience: event.target.value })}
                placeholder="Who is this template for?"
                value={draft.audience}
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="homepage-template-editor-configure">
          <div className="homepage-template-editor-canvas">
            <div className="homepage-template-editor-welcome">
              <h1>Welcome to Zuora, Rachel Carter</h1>
            </div>
            <AiGeneratedDashboard
              addedWidgetIds={previewWidgetIds}
              getCustomWidgetById={getTemplatePreviewCustomWidget}
            />
          </div>
          <div className="homepage-template-editor-floating-actions">
            <button
              aria-label="Add widget to template"
              className="homepage-template-editor-floating-button homepage-template-editor-floating-button-primary"
              type="button"
            >
              <AddIcon />
            </button>
            <button
              aria-label="Configure template widgets"
              className="homepage-template-editor-floating-button homepage-template-editor-floating-button-secondary"
              type="button"
            >
              <ViewCompactOutlinedIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
