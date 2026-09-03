import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { isDashboardWidgetId } from "./dashboardWidgets/catalog";
import { isCustomWidgetId } from "../customWidgets/types";

type HomepageWidgetActionsValue = {
  canEditWidget: (widgetId: string) => boolean;
  canRemoveWidget: (widgetId: string) => boolean;
  onEditWidget: (widgetId: string) => void;
  onRemoveWidget: (widgetId: string) => void;
};

const HomepageWidgetActionsContext = createContext<HomepageWidgetActionsValue | null>(null);
const HomepageWidgetIdContext = createContext<string | null>(null);

export function HomepageWidgetActionsProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: HomepageWidgetActionsValue;
}) {
  return <HomepageWidgetActionsContext.Provider value={value}>{children}</HomepageWidgetActionsContext.Provider>;
}

export function HomepageWidgetScope({
  children,
  widgetId,
}: {
  children: ReactNode;
  widgetId: string;
}) {
  return <HomepageWidgetIdContext.Provider value={widgetId}>{children}</HomepageWidgetIdContext.Provider>;
}

export function WidgetMoreMenuButton({ className = "" }: { className?: string }) {
  const widgetId = useContext(HomepageWidgetIdContext);
  const actions = useContext(HomepageWidgetActionsContext);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (menuRef.current?.contains(event.target as Node)) {
        return;
      }

      setIsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!widgetId || !actions) {
    return null;
  }

  const canEdit = actions.canEditWidget(widgetId);
  const canRemove = actions.canRemoveWidget(widgetId);

  if (!canEdit && !canRemove) {
    return null;
  }

  return (
    <div className={`widget-more-menu${className ? ` ${className}` : ""}`} ref={menuRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="More actions"
        className="widget-icon-button"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <MoreHorizIcon />
      </button>
      {isOpen ? (
        <div className="homepage-actions-menu" role="menu">
          <button
            className="homepage-actions-menu-item"
            disabled={!canEdit}
            onClick={() => {
              if (!canEdit) {
                return;
              }

              actions.onEditWidget(widgetId);
              setIsOpen(false);
            }}
            type="button"
          >
            <EditOutlinedIcon />
            <span>Edit Widget</span>
          </button>
          <button
            className="homepage-actions-menu-item"
            disabled={!canRemove}
            onClick={() => {
              if (!canRemove) {
                return;
              }

              actions.onRemoveWidget(widgetId);
              setIsOpen(false);
            }}
            type="button"
          >
            <DeleteOutlinedIcon />
            <span>Remove Widget</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function useHomepageWidgetActions() {
  return useContext(HomepageWidgetActionsContext);
}

export function createHomepageWidgetActions(options: {
  onEditWidget: (widgetId: string) => void;
  onRemoveWidget: (widgetId: string) => void;
}): HomepageWidgetActionsValue {
  return {
    canEditWidget: (widgetId) => isCustomWidgetId(widgetId),
    canRemoveWidget: (widgetId) => isCustomWidgetId(widgetId) || isDashboardWidgetId(widgetId),
    onEditWidget: options.onEditWidget,
    onRemoveWidget: options.onRemoveWidget,
  };
}
