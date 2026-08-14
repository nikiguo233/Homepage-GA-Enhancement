import CloseIcon from "@mui/icons-material/Close";
import { forwardRef } from "react";
import type { CSSProperties } from "react";
import { getWidgetGridPreviewSize } from "../../customWidgets/aiGeneratedMetricWidgets";
import type { CustomWidget, CustomWidgetSize } from "../../customWidgets/types";
import { getWidgetDashboardCardHeight, parseWidgetSize } from "../../customWidgets/widgetSizes";
import { CustomWidgetPreviewFrame } from "./CustomWidgetPreviewFrame";

export const CustomWidgetDashboardCard = forwardRef<
  HTMLElement,
  {
    className?: string;
    displaySize?: CustomWidgetSize;
    widget: CustomWidget;
  }
>(function CustomWidgetDashboardCard({ className, displaySize, widget }, ref) {
  const size = getWidgetGridPreviewSize({
    ...widget,
    size: displaySize ?? widget.size,
  });
  const { cols } = parseWidgetSize(size);
  const cardClassName = ["widget-card", "custom-widget-dashboard-card", className].filter(Boolean).join(" ");
  const cardStyle = {
    "--custom-widget-dashboard-cols": cols,
    "--custom-widget-dashboard-height": `${getWidgetDashboardCardHeight(size)}px`,
  } as CSSProperties;
  const previewWidget = {
    ...widget,
    displayWidgetName: false,
  };
  const showCardHeader = widget.type === "embed" && !widget.displayWidgetName;

  return (
    <article className={cardClassName} ref={ref} style={cardStyle}>
      <div className="widget-card-inner widget-card-inner-gap-8">
        {showCardHeader ? (
          <header className="custom-widget-dashboard-header">
            <h3>{widget.name}</h3>
          </header>
        ) : null}
        <div className="custom-widget-dashboard-preview">
          <CustomWidgetPreviewFrame gridFit scrollable interactive size={size} widget={previewWidget} />
        </div>
      </div>
    </article>
  );
});

export function PublishConfirmModal({
  access = "tenant",
  confirmLabel = "Save and Publish",
  onCancel,
  onConfirm,
}: {
  access?: "private" | "tenant";
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const message =
    access === "private"
      ? "This widget will be published with private access. It will only be available on your homepage. Are you sure you want to publish?"
      : "This widget will be published to all users within the current tenant (Tenant ID: 10130). Are you sure you want to publish?";

  return (
    <div className="custom-widget-modal-backdrop" role="presentation">
      <div aria-labelledby="publish-modal-title" aria-modal="true" className="custom-widget-modal" role="dialog">
        <header className="custom-widget-modal-header">
          <h2 id="publish-modal-title">Confirmation</h2>
          <button aria-label="Close" className="custom-widget-modal-close" onClick={onCancel} type="button">
            <CloseIcon />
          </button>
        </header>
        <p className="custom-widget-modal-body">{message}</p>
        <footer className="custom-widget-modal-footer">
          <button className="custom-widget-secondary-button" onClick={onCancel} type="button">
            Cancel
          </button>
          <button className="custom-widget-primary-button" onClick={onConfirm} type="button">
            {confirmLabel}
          </button>
        </footer>
      </div>
    </div>
  );
}

export function UnpublishConfirmModal({
  access = "tenant",
  onCancel,
  onConfirm,
}: {
  access?: "private" | "tenant";
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const message =
    access === "private"
      ? "This widget will be unpublished and moved to Personal. Are you sure you want to unpublish?"
      : "This widget will be unpublished and removed from all users within the current tenant (Tenant ID: 10130). Are you sure you want to unpublish?";

  return (
    <div className="custom-widget-modal-backdrop" role="presentation">
      <div aria-labelledby="unpublish-modal-title" aria-modal="true" className="custom-widget-modal" role="dialog">
        <header className="custom-widget-modal-header">
          <h2 id="unpublish-modal-title">Confirmation</h2>
          <button aria-label="Close" className="custom-widget-modal-close" onClick={onCancel} type="button">
            <CloseIcon />
          </button>
        </header>
        <p className="custom-widget-modal-body">{message}</p>
        <footer className="custom-widget-modal-footer">
          <button className="custom-widget-secondary-button" onClick={onCancel} type="button">
            Cancel
          </button>
          <button className="custom-widget-primary-button" onClick={onConfirm} type="button">
            Unpublish
          </button>
        </footer>
      </div>
    </div>
  );
}

export function ClearHistoryConfirmModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="custom-widget-modal-backdrop" role="presentation">
      <div aria-labelledby="clear-history-modal-title" aria-modal="true" className="custom-widget-modal" role="dialog">
        <header className="custom-widget-modal-header">
          <h2 id="clear-history-modal-title">Confirmation</h2>
          <button aria-label="Close" className="custom-widget-modal-close" onClick={onCancel} type="button">
            <CloseIcon />
          </button>
        </header>
        <p className="custom-widget-modal-body">
          All custom widget history records will be permanently removed. This action cannot be undone. Are you
          sure you want to clear history?
        </p>
        <footer className="custom-widget-modal-footer">
          <button className="custom-widget-secondary-button" onClick={onCancel} type="button">
            Cancel
          </button>
          <button className="custom-widget-primary-button" onClick={onConfirm} type="button">
            Clear History
          </button>
        </footer>
      </div>
    </div>
  );
}

export function DeleteConfirmModal({
  onCancel,
  onConfirm,
  widgetName,
}: {
  onCancel: () => void;
  onConfirm: () => void;
  widgetName?: string;
}) {
  const label = widgetName?.trim() || "this widget";

  return (
    <div className="custom-widget-modal-backdrop" role="presentation">
      <div aria-labelledby="delete-modal-title" aria-modal="true" className="custom-widget-modal" role="dialog">
        <header className="custom-widget-modal-header">
          <h2 id="delete-modal-title">Confirmation</h2>
          <button aria-label="Close" className="custom-widget-modal-close" onClick={onCancel} type="button">
            <CloseIcon />
          </button>
        </header>
        <p className="custom-widget-modal-body">
          <strong>{label}</strong> will be permanently deleted. This action cannot be undone. Are you sure you
          want to delete this widget?
        </p>
        <footer className="custom-widget-modal-footer">
          <button className="custom-widget-secondary-button" onClick={onCancel} type="button">
            Cancel
          </button>
          <button className="custom-widget-primary-button" onClick={onConfirm} type="button">
            Delete Widget
          </button>
        </footer>
      </div>
    </div>
  );
}
