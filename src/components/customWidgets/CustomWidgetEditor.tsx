import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_CUSTOM_WIDGET_HTML, DEFAULT_EMBED_URL } from "../../customWidgets/defaultTemplate";
import { validateEmbedUrl } from "../../customWidgets/embedPolicy";
import { ENABLE_LABEL_AS_EXTERNAL_CONTENT } from "../../customWidgets/featureFlags";
import { createDefaultEmbedConfig, isEmbedConfigValid, normalizeEmbedConfig } from "../../customWidgets/embedConfig";
import {
  getWidgetDataBindingQuerySummary,
  getWidgetDataBindingSourceLabel,
} from "../../customWidgets/widgetDataBinding";
import { createEmptyCustomWidgetDraft } from "../../customWidgets/useCustomWidgets";
import {
  ALL_WIDGET_SIZES,
  clampWidgetGridUnit,
  DEFAULT_CUSTOM_SIZE_COLS,
  DEFAULT_CUSTOM_SIZE_ROWS,
  formatWidgetSize,
  getCustomSupportedSize,
  getWidgetSizeLabel,
  isPresetWidgetSize,
  isValidWidgetSize,
  MAX_WIDGET_GRID_UNIT,
  MIN_WIDGET_GRID_UNIT,
  parseWidgetSize,
  sortWidgetSizes,
} from "../../customWidgets/widgetSizes";
import type { CustomWidgetDraft, CustomWidgetSize, CustomWidgetType } from "../../customWidgets/types";
import { getCustomWidgetAccessDescription, normalizeCustomWidgetAccess } from "../../customWidgets/widgetAccess";
import { CustomWidgetPreviewFrame } from "./CustomWidgetPreviewFrame";
import { WidgetEditorPreviewGrid } from "./WidgetEditorPreviewGrid";
import { EmbedWidgetConfigPanel } from "./EmbedWidgetConfigPanel";
import { CustomWidgetCodeEditor } from "./CustomWidgetCodeEditor";
import { EditorMoreMenu } from "./HomepageActionsMenu";
import { DeleteConfirmModal, PublishConfirmModal } from "./CustomWidgetDashboardCard";
import { AiButton } from "../AiButton";
import { AiChatBadge } from "../../AiChatPanel";

type EditorStep = "basic" | "configure";

export type { EditorStep };

const MAX_DESCRIPTION_LENGTH = 200;
const DEFAULT_CODE_PANEL_WIDTH = 500;
const MIN_CODE_PANEL_WIDTH = 320;
const MIN_PREVIEW_PANEL_WIDTH = 360;
const WORKSPACE_RESIZER_WIDTH = 16;

function isBasicInfoValid(draft: CustomWidgetDraft) {
  return draft.name.trim().length > 0 && draft.description.trim().length > 0;
}

export function CustomWidgetEditor({
  aiChatOpen = false,
  initialDraft,
  initialStep = "basic",
  isEditing,
  onAddToHomepage,
  onClose,
  onDelete,
  onOpenAiChat,
  onSave,
  widgetId,
}: {
  aiChatOpen?: boolean;
  initialDraft: CustomWidgetDraft;
  initialStep?: EditorStep;
  isEditing: boolean;
  onAddToHomepage?: (draft: CustomWidgetDraft) => void;
  onClose: () => void;
  onDelete?: () => void;
  onOpenAiChat?: () => void;
  onSave: (draft: CustomWidgetDraft) => void;
  widgetId: string | null;
}) {
  const [step, setStep] = useState<EditorStep>(initialStep);
  const [draft, setDraft] = useState<CustomWidgetDraft>(() => ({
    ...initialDraft,
    access: normalizeCustomWidgetAccess(initialDraft.access),
    ...normalizeEmbedConfig(initialDraft),
  }));
  const [showCode, setShowCode] = useState(true);
  const [showPublishConfirmModal, setShowPublishConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [codePanelWidth, setCodePanelWidth] = useState(DEFAULT_CODE_PANEL_WIDTH);
  const [isResizingWorkspace, setIsResizingWorkspace] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const resizeStateRef = useRef<{ startWidth: number; startX: number } | null>(null);

  useEffect(() => {
    setDraft({
      ...initialDraft,
      access: normalizeCustomWidgetAccess(initialDraft.access),
      ...normalizeEmbedConfig(initialDraft),
    });
    setStep(initialStep);
  }, [widgetId]);

  const embedValidation = useMemo(
    () => (draft.type === "embed" ? validateEmbedUrl(draft.content) : null),
    [draft.content, draft.type],
  );
  const canAccessConfigure = useMemo(
    () =>
      isBasicInfoValid(draft) &&
      draft.supportedSizes.length > 0 &&
      draft.supportedSizes.every(isValidWidgetSize) &&
      draft.supportedSizes.includes(draft.size),
    [draft],
  );
  const canSave = useMemo(
    () => canAccessConfigure && isEmbedConfigValid(draft),
    [canAccessConfigure, draft],
  );
  const embedConfig = useMemo(() => normalizeEmbedConfig(draft), [draft]);
  const showEmbedPreview =
    draft.type === "embed" && Boolean(embedValidation?.valid) && draft.supportedSizes.length > 0;
  const showAddToHomepageButton = isEditing && Boolean(onAddToHomepage);
  const customSupportedSize = getCustomSupportedSize(draft.supportedSizes);
  const isCustomSizeEnabled = Boolean(customSupportedSize);
  const customSizeDimensions = customSupportedSize
    ? parseWidgetSize(customSupportedSize)
    : { cols: DEFAULT_CUSTOM_SIZE_COLS, rows: DEFAULT_CUSTOM_SIZE_ROWS };
  const previewWidget = useMemo(
    () => ({
      content: draft.content,
      dataBinding: draft.dataBinding,
      displayWidgetName: draft.displayWidgetName,
      labelAsExternalContent: draft.labelAsExternalContent,
      name: draft.name,
      size: draft.size,
      type: draft.type,
    }),
    [
      draft.content,
      draft.dataBinding,
      draft.displayWidgetName,
      draft.labelAsExternalContent,
      draft.name,
      draft.size,
      draft.type,
    ],
  );
  const dataBindingSummary = draft.dataBinding
    ? getWidgetDataBindingQuerySummary(draft.dataBinding)
    : null;

  const updateDraft = (patch: Partial<CustomWidgetDraft>) => {
    setDraft((current) => ({ ...current, ...patch }));
  };

  const handleTypeChange = (type: CustomWidgetType) => {
    setDraft((current) => {
      const next: CustomWidgetDraft = {
        ...current,
        type,
        content: type === "html" ? DEFAULT_CUSTOM_WIDGET_HTML : DEFAULT_EMBED_URL,
      };

      if (type === "html") {
        return { ...next, labelAsExternalContent: false };
      }

      if (current.type === "html") {
        return { ...next, labelAsExternalContent: true, ...createDefaultEmbedConfig() };
      }

      return next;
    });
  };

  const handleSave = () => {
    setShowPublishConfirmModal(true);
  };

  const handleConfirmSaveAndPublish = () => {
    onSave({ ...draft, access: "tenant" });
    setShowPublishConfirmModal(false);
  };

  const handleDelete = () => {
    onDelete?.();
    setShowDeleteModal(false);
  };

  const handleAddToHomepageClick = () => {
    if (!canAccessConfigure || !onAddToHomepage) {
      return;
    }

    onAddToHomepage(draft);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(draft.content);
      setCopyMessage("Copied");
      window.setTimeout(() => setCopyMessage(null), 1500);
    } catch {
      setCopyMessage("Copy failed");
    }
  };

  const handleToggleSupportedSize = (size: CustomWidgetSize) => {
    setDraft((current) => {
      const isSelected = current.supportedSizes.includes(size);

      if (isSelected) {
        if (current.supportedSizes.length <= 1) {
          return current;
        }

        const supportedSizes = current.supportedSizes.filter((entry) => entry !== size);
        const nextSize = supportedSizes.includes(current.size) ? current.size : supportedSizes[0];

        return { ...current, supportedSizes, size: nextSize };
      }

      return {
        ...current,
        supportedSizes: sortWidgetSizes([...current.supportedSizes, size]),
      };
    });
  };

  const handleToggleCustomSize = () => {
    setDraft((current) => {
      const existingCustomSize = getCustomSupportedSize(current.supportedSizes);

      if (existingCustomSize) {
        if (current.supportedSizes.length <= 1) {
          return current;
        }

        const supportedSizes = current.supportedSizes.filter((entry) => isPresetWidgetSize(entry));
        const nextSize =
          supportedSizes.find((size) => size === current.size) ?? supportedSizes[0];

        return { ...current, supportedSizes, size: nextSize };
      }

      const customSize = formatWidgetSize(DEFAULT_CUSTOM_SIZE_COLS, DEFAULT_CUSTOM_SIZE_ROWS);

      return {
        ...current,
        supportedSizes: sortWidgetSizes([...current.supportedSizes, customSize]),
      };
    });
  };

  const handleCustomSizeChange = (cols: number, rows: number) => {
    const nextCols = clampWidgetGridUnit(cols);
    const nextRows = clampWidgetGridUnit(rows);
    const nextCustomSize = formatWidgetSize(nextCols, nextRows);

    if (!isValidWidgetSize(nextCustomSize)) {
      return;
    }

    setDraft((current) => {
      const previousCustomSize = getCustomSupportedSize(current.supportedSizes);
      const presetSizes = current.supportedSizes.filter((entry) => isPresetWidgetSize(entry));
      const supportedSizes = sortWidgetSizes([...presetSizes, nextCustomSize]);
      const nextSize =
        previousCustomSize && current.size === previousCustomSize ? nextCustomSize : current.size;
      const size = supportedSizes.includes(nextSize) ? nextSize : supportedSizes[0];

      return { ...current, supportedSizes, size };
    });
  };

  const handlePreviewSizeChange = (size: CustomWidgetSize) => {
    if (!draft.supportedSizes.includes(size)) {
      return;
    }

    updateDraft({ size });
  };

  const clampCodePanelWidth = (nextWidth: number) => {
    const containerWidth = workspaceRef.current?.getBoundingClientRect().width ?? 0;
    const maxCodeWidth = Math.max(
      MIN_CODE_PANEL_WIDTH,
      containerWidth - MIN_PREVIEW_PANEL_WIDTH - WORKSPACE_RESIZER_WIDTH,
    );

    return Math.min(maxCodeWidth, Math.max(MIN_CODE_PANEL_WIDTH, nextWidth));
  };

  const handleWorkspaceResizeStart = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    resizeStateRef.current = { startX: event.clientX, startWidth: codePanelWidth };
    setIsResizingWorkspace(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleWorkspaceResizeMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const resizeState = resizeStateRef.current;
    if (!resizeState) {
      return;
    }

    const deltaX = event.clientX - resizeState.startX;
    setCodePanelWidth(clampCodePanelWidth(resizeState.startWidth + deltaX));
  };

  const handleWorkspaceResizeEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    resizeStateRef.current = null;
    setIsResizingWorkspace(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const workspaceColumns = showCode
    ? `${codePanelWidth}px ${WORKSPACE_RESIZER_WIDTH}px minmax(0, 1fr)`
    : undefined;

  return (
    <div className="custom-widget-editor-shell">
      <header className="custom-widget-editor-header">
        <div className="custom-widget-editor-header-left">
          <button
            aria-label="Close custom widget editor"
            className="custom-widget-editor-icon-button"
            onClick={onClose}
            type="button"
          >
            <CloseIcon />
          </button>
          <span className="custom-widget-editor-brand">zuora</span>
          <div className="custom-widget-editor-title-group">
            <span className="custom-widget-editor-title">Custom Widget</span>
            <span className="custom-widget-editor-status-chip is-published">Shared</span>
          </div>
        </div>
        <nav aria-label="Custom widget steps" className="custom-widget-editor-tabs">
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
            onClick={() => setStep("configure")}
            type="button"
          >
            Configure and Preview
          </button>
        </nav>
        <div className="custom-widget-editor-header-actions">
          {showAddToHomepageButton ? (
            <button
              className="custom-widget-editor-secondary-button"
              disabled={!canAccessConfigure}
              onClick={handleAddToHomepageClick}
              type="button"
            >
              Add to Home Page
            </button>
          ) : null}
          <button
            className="custom-widget-editor-primary-button"
            disabled={!canSave}
            onClick={handleSave}
            type="button"
          >
            Save and Publish
          </button>
          <div className="custom-widget-editor-more">
            <button
              aria-label="More actions"
              className="custom-widget-editor-icon-button"
              onClick={() => setShowMoreMenu((current) => !current)}
              type="button"
            >
              <MoreVertIcon />
            </button>
            {showMoreMenu ? (
              <EditorMoreMenu
                onClose={() => setShowMoreMenu(false)}
                onDelete={
                  isEditing
                    ? () => {
                        setShowMoreMenu(false);
                        setShowDeleteModal(true);
                      }
                    : undefined
                }
              />
            ) : null}
          </div>
        </div>
      </header>

      {step === "basic" ? (
        <div className="custom-widget-editor-basic">
          <div className="custom-widget-basic-form">
            <div className="custom-widget-field">
              <span className="custom-widget-field-label">
                Type <span className="custom-widget-required">*</span>
              </span>
              <div className="custom-widget-type-grid">
                <button
                  className={`custom-widget-type-card${draft.type === "html" ? " is-selected" : ""}`}
                  onClick={() => handleTypeChange("html")}
                  type="button"
                >
                  <span className="custom-widget-type-card-icon" aria-hidden="true">
                    <CodeOutlinedIcon />
                  </span>
                  <div>
                    <strong>Custom HTML</strong>
                    <p>Build a widget with custom HTML and CSS.</p>
                  </div>
                </button>
                <button
                  className={`custom-widget-type-card${draft.type === "embed" ? " is-selected" : ""}`}
                  onClick={() => handleTypeChange("embed")}
                  type="button"
                >
                  <span className="custom-widget-type-card-icon" aria-hidden="true">
                    <LinkOutlinedIcon />
                  </span>
                  <div>
                    <strong>Embedded Content</strong>
                    <p>Embed external dashboards and applications.</p>
                  </div>
                </button>
              </div>
            </div>
            <label className="custom-widget-field">
              <span className="custom-widget-field-label">
                Widget Name <span className="custom-widget-required">*</span>
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
                maxLength={MAX_DESCRIPTION_LENGTH}
                onChange={(event) => updateDraft({ description: event.target.value })}
                placeholder="Input description of the widget"
                rows={4}
                value={draft.description}
              />
              <span className="custom-widget-field-hint">
                Maximum {MAX_DESCRIPTION_LENGTH} characters
              </span>
            </label>
            <div className="custom-widget-field">
              <span className="custom-widget-field-label">Access</span>
              <p className="custom-widget-access-value">{getCustomWidgetAccessDescription()}</p>
            </div>
            {ENABLE_LABEL_AS_EXTERNAL_CONTENT && draft.type === "embed" ? (
              <label className="custom-widget-checkbox-field">
                <input
                  checked={draft.labelAsExternalContent}
                  onChange={(event) => updateDraft({ labelAsExternalContent: event.target.checked })}
                  type="checkbox"
                />
                <span>Label as External Content</span>
              </label>
            ) : null}
            <div className="custom-widget-basic-actions">
              <button
                className="custom-widget-primary-button"
                disabled={!canAccessConfigure}
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
          <div className="custom-widget-configure-header">
            <div className="custom-widget-configure-header-start">
              <button
                className="custom-widget-toggle-code-button"
                onClick={() => setShowCode((current) => !current)}
                type="button"
              >
                <ChevronLeftIcon className={showCode ? "" : "is-flipped"} />
                {showCode
                  ? draft.type === "embed"
                    ? "Hide Configuration"
                    : "Hide Code"
                  : draft.type === "embed"
                    ? "Show Configuration"
                    : "Show Code"}
              </button>
              {showCode && draft.type === "html" && onOpenAiChat ? (
                <AiButton
                  background="light"
                  className="custom-widget-generate-code-ai-button"
                  onClick={onOpenAiChat}
                  size="small"
                  variant="secondary"
                >
                  Generate Code with AI
                </AiButton>
              ) : null}
            </div>
            <div className="custom-widget-configure-header-controls">
              <div className="custom-widget-supported-sizes-field">
              <span className="custom-widget-supported-sizes-label">
                Supported Widget Sizes <span className="custom-widget-required">*</span>
              </span>
              <div
                aria-label="Supported widget sizes"
                className="custom-widget-supported-sizes-options"
                role="group"
              >
                {ALL_WIDGET_SIZES.map((size) => {
                  const isChecked = draft.supportedSizes.includes(size);

                  return (
                    <label className="custom-widget-supported-size-option" key={size}>
                      <input
                        checked={isChecked}
                  disabled={isChecked && draft.supportedSizes.length === 1}
                        onChange={() => handleToggleSupportedSize(size)}
                        type="checkbox"
                      />
                      <span>{getWidgetSizeLabel(size)}</span>
                    </label>
                  );
                })}
                <label className="custom-widget-supported-size-option">
                  <input
                    checked={isCustomSizeEnabled}
                    disabled={isCustomSizeEnabled && draft.supportedSizes.length === 1}
                    onChange={handleToggleCustomSize}
                    type="checkbox"
                  />
                  <span>Custom</span>
                </label>
                <div className="custom-widget-custom-size-inputs">
                  <input
                    aria-label="Custom widget width"
                    className="custom-widget-custom-size-input"
                    disabled={!isCustomSizeEnabled}
                    max={MAX_WIDGET_GRID_UNIT}
                    min={MIN_WIDGET_GRID_UNIT}
                    onChange={(event) =>
                      handleCustomSizeChange(Number(event.target.value), customSizeDimensions.rows)
                    }
                    placeholder="Width"
                    type="number"
                    value={isCustomSizeEnabled ? customSizeDimensions.cols : ""}
                  />
                  <input
                    aria-label="Custom widget height"
                    className="custom-widget-custom-size-input"
                    disabled={!isCustomSizeEnabled}
                    max={MAX_WIDGET_GRID_UNIT}
                    min={MIN_WIDGET_GRID_UNIT}
                    onChange={(event) =>
                      handleCustomSizeChange(customSizeDimensions.cols, Number(event.target.value))
                    }
                    placeholder="Height"
                    type="number"
                    value={isCustomSizeEnabled ? customSizeDimensions.rows : ""}
                  />
                </div>
              </div>
            </div>
            </div>
          </div>
          {draft.dataBinding ? (
            <div className="custom-widget-data-binding-banner">
              <strong>Live data connected</strong>
              <span>
                {getWidgetDataBindingSourceLabel(draft.dataBinding.source)} · {dataBindingSummary} ·
                refreshes every {draft.dataBinding.refreshIntervalMinutes} minutes
              </span>
            </div>
          ) : null}
          <div
            className={`custom-widget-editor-workspace${showCode ? "" : " code-hidden"}${isResizingWorkspace ? " is-resizing" : ""}`}
            ref={workspaceRef}
            style={workspaceColumns ? { gridTemplateColumns: workspaceColumns } : undefined}
          >
            {showCode ? (
              <>
                <div className="custom-widget-code-panel">
                  {draft.type === "html" ? (
                    <>
                      <div className="custom-widget-code-toolbar">
                        <span>HTML</span>
                        <button onClick={() => void handleCopyCode()} type="button">
                          <ContentCopyOutlinedIcon />
                          {copyMessage ?? "Copy"}
                        </button>
                      </div>
                      <CustomWidgetCodeEditor
                        onChange={(content) => updateDraft({ content })}
                        value={draft.content}
                      />
                    </>
                  ) : (
                    <EmbedWidgetConfigPanel
                      connection={embedConfig.tableauConnection}
                      isReadOnly={false}
                      onConnectionChange={(patch) =>
                        updateDraft({
                          tableauConnection: {
                            ...embedConfig.tableauConnection,
                            ...patch,
                          },
                        })
                      }
                    />
                  )}
                </div>
                <div
                  aria-label="Resize code and preview panels"
                  aria-orientation="vertical"
                  className={`custom-widget-workspace-resizer${isResizingWorkspace ? " is-dragging" : ""}`}
                  onPointerDown={handleWorkspaceResizeStart}
                  onPointerMove={handleWorkspaceResizeMove}
                  onPointerUp={handleWorkspaceResizeEnd}
                  onPointerCancel={handleWorkspaceResizeEnd}
                  role="separator"
                />
              </>
            ) : null}
            <div className="custom-widget-preview-panel">
              <div className="custom-widget-preview-toolbar">
                <label className="custom-widget-size-field">
                  <span>Widget Size</span>
                  <select
                    onChange={(event) =>
                      handlePreviewSizeChange(event.target.value as CustomWidgetSize)
                    }
                    value={draft.size}
                  >
                    {draft.supportedSizes.map((size) => (
                      <option key={size} value={size}>
                        {getWidgetSizeLabel(size)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="custom-widget-preview-stage">
                {draft.supportedSizes.length === 0 ? (
                  <p className="custom-widget-preview-empty-message">
                    Select supported widget size to preview
                  </p>
                ) : draft.type === "embed" && !showEmbedPreview ? (
                  <p className="custom-widget-preview-empty-message">No Preview</p>
                ) : (
                  <WidgetEditorPreviewGrid previewWidget={previewWidget} size={previewWidget.size} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showPublishConfirmModal ? (
        <PublishConfirmModal
          access="tenant"
          onCancel={() => setShowPublishConfirmModal(false)}
          onConfirm={handleConfirmSaveAndPublish}
        />
      ) : null}
      {showDeleteModal ? (
        <DeleteConfirmModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          widgetName={draft.name}
        />
      ) : null}
      {step === "configure" && !aiChatOpen && onOpenAiChat ? (
        <AiChatBadge className="custom-widget-editor-ai-badge" onClick={onOpenAiChat} />
      ) : null}
    </div>
  );
}

export function createNewWidgetDraft() {
  return createEmptyCustomWidgetDraft("html");
}
