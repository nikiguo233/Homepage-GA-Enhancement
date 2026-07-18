import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CustomWidgetDraft } from "../customWidgets/types";
import { CustomWidgetPreviewFrame } from "./customWidgets/CustomWidgetPreviewFrame";

export function AiChatCustomWidgetPreview({ draft }: { draft: CustomWidgetDraft }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open widget preview"
        className="ai-chat-preview-thumbnail-button ai-chat-custom-widget-preview-button"
        onClick={() => setModalOpen(true)}
        type="button"
      >
        <div className="ai-chat-custom-widget-preview-thumbnail">
          <CustomWidgetPreviewFrame compact dense size={draft.size} widget={draft} />
          <span aria-hidden="true" className="ai-chat-preview-thumbnail-overlay">
            <OpenInNewIcon />
            <span>Preview</span>
          </span>
        </div>
      </button>
      {modalOpen ? (
        <AiChatCustomWidgetPreviewModal draft={draft} onClose={() => setModalOpen(false)} />
      ) : null}
    </>
  );
}

function AiChatCustomWidgetPreviewModal({
  draft,
  onClose,
}: {
  draft: CustomWidgetDraft;
  onClose: () => void;
}) {
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
        aria-label="Close widget preview"
        className="ai-chat-homepage-preview-modal-backdrop"
        onClick={onClose}
        type="button"
      />
      <div
        aria-labelledby={titleId}
        aria-modal="true"
        className="ai-chat-homepage-preview-modal-panel ai-chat-custom-widget-preview-modal-panel"
        role="dialog"
      >
        <header className="ai-chat-homepage-preview-modal-header">
          <h3 id={titleId}>Widget preview</h3>
          <button
            aria-label="Close widget preview"
            className="ai-chat-homepage-preview-modal-close"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <CloseIcon />
          </button>
        </header>
        <div className="ai-chat-custom-widget-preview-modal-body">
          <CustomWidgetPreviewFrame size={draft.size} widget={draft} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
