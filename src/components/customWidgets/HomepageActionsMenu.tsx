import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import ViewModuleOutlinedIcon from "@mui/icons-material/ViewModuleOutlined";
import { useEffect, useRef } from "react";

export function HomepageActionsMenu({
  anchorRef,
  onClose,
  onManageTemplates,
  onResetHomepage,
}: {
  anchorRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
  onManageTemplates: () => void;
  onResetHomepage: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target) || anchorRef.current?.contains(target)) {
        return;
      }

      onClose();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [anchorRef, onClose]);

  return (
    <div
      className="homepage-actions-menu"
      onMouseDown={(event) => event.stopPropagation()}
      ref={menuRef}
      role="menu"
    >
      <button className="homepage-actions-menu-item" disabled type="button">
        <TuneOutlinedIcon />
        <span>Edit Layout</span>
      </button>
      <button
        className="homepage-actions-menu-item"
        onClick={() => {
          onManageTemplates();
          onClose();
        }}
        type="button"
      >
        <ViewModuleOutlinedIcon />
        <span>Manage Templates &amp; Widgets</span>
      </button>
      <button className="homepage-actions-menu-item" disabled type="button">
        <RestartAltOutlinedIcon />
        <span>Reset Homepage</span>
      </button>
    </div>
  );
}

export function EditorMoreMenu({
  onClose,
  onDelete,
}: {
  onClose: () => void;
  onDelete?: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (menuRef.current?.contains(event.target as Node)) {
        return;
      }

      onClose();
    };

    window.addEventListener("mousedown", handlePointerDown);
    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, [onClose]);

  return (
    <div className="custom-widget-editor-more-menu" ref={menuRef} role="menu">
      {onDelete ? (
        <button
          className="homepage-actions-menu-item"
          onClick={() => {
            onDelete();
            onClose();
          }}
          type="button"
        >
          <CloseIcon />
          <span>Delete Widget</span>
        </button>
      ) : null}
    </div>
  );
}

export function MoreMenuButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      aria-label="More actions"
      className="custom-widget-editor-icon-button"
      onClick={onClick}
      type="button"
    >
      <MoreVertIcon />
    </button>
  );
}
