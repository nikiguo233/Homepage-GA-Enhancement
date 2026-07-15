import CloseIcon from "@mui/icons-material/Close";
import type { ReactNode } from "react";

export function WidgetDrawerShell({
  ariaLabel,
  children,
  dataNodeId,
  footer,
  footerClassName,
  header,
  onClose,
}: {
  ariaLabel: string;
  children: ReactNode;
  dataNodeId: string;
  footer?: ReactNode;
  footerClassName?: string;
  header: ReactNode;
  onClose: () => void;
}) {
  const footerClassNames = ["widget-drawer-footer", footerClassName].filter(Boolean).join(" ");

  return (
    <aside
      aria-label={ariaLabel}
      aria-modal="true"
      className="widget-drawer"
      data-node-id={dataNodeId}
      role="dialog"
    >
      <div className="widget-drawer-panel">
        <header className="widget-drawer-header">
          <div className="widget-drawer-header-main">{header}</div>
          <button
            aria-label="Close add widget panel"
            className="widget-drawer-close"
            onClick={onClose}
            type="button"
          >
            <CloseIcon />
          </button>
        </header>
        <div className="widget-drawer-content">{children}</div>
        {footer ? <footer className={footerClassNames}>{footer}</footer> : null}
      </div>
    </aside>
  );
}
