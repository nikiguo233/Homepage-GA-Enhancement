import CloseIcon from "@mui/icons-material/Close";
import { forwardRef } from "react";
import type { CustomWidget, CustomWidgetSize } from "../../customWidgets/types";
import { parseWidgetSize } from "../../customWidgets/widgetSizes";
import { CustomWidgetPreviewFrame } from "./CustomWidgetPreviewFrame";

export const CustomWidgetDashboardCard = forwardRef<
  HTMLElement,
  {
    className?: string;
    displaySize?: CustomWidgetSize;
    widget: CustomWidget;
  }
>(function CustomWidgetDashboardCard({ className, displaySize, widget }, ref) {
  const size = displaySize ?? widget.size;
  const { cols } = parseWidgetSize(size);
  const cardClassName = [
    "widget-card",
    "custom-widget-dashboard-card",
    cols > 3 ? "custom-widget-dashboard-card-wide" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClassName} ref={ref}>
      <div className="widget-card-inner widget-card-inner-gap-8">
        {!widget.displayWidgetName ? (
          <header className="custom-widget-dashboard-header">
            <h3>{widget.name}</h3>
          </header>
        ) : null}
        <div className="custom-widget-dashboard-preview">
          <CustomWidgetPreviewFrame interactive size={size} widget={widget} />
        </div>
      </div>
    </article>
  );
});

export function PublishConfirmModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="custom-widget-modal-backdrop" role="presentation">
      <div aria-labelledby="publish-modal-title" aria-modal="true" className="custom-widget-modal" role="dialog">
        <header className="custom-widget-modal-header">
          <h2 id="publish-modal-title">Confirmation</h2>
          <button aria-label="Close" className="custom-widget-modal-close" onClick={onCancel} type="button">
            <CloseIcon />
          </button>
        </header>
        <p className="custom-widget-modal-body">
          This widget will be published to all users within the current tenant (Tenant ID: 10130). Are you
          sure you want to publish?
        </p>
        <footer className="custom-widget-modal-footer">
          <button className="custom-widget-secondary-button" onClick={onCancel} type="button">
            Cancel
          </button>
          <button className="custom-widget-primary-button" onClick={onConfirm} type="button">
            Publish
          </button>
        </footer>
      </div>
    </div>
  );
}

export function UnpublishConfirmModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="custom-widget-modal-backdrop" role="presentation">
      <div aria-labelledby="unpublish-modal-title" aria-modal="true" className="custom-widget-modal" role="dialog">
        <header className="custom-widget-modal-header">
          <h2 id="unpublish-modal-title">Confirmation</h2>
          <button aria-label="Close" className="custom-widget-modal-close" onClick={onCancel} type="button">
            <CloseIcon />
          </button>
        </header>
        <p className="custom-widget-modal-body">
          This widget will be unpublished and removed from all users within the current tenant (Tenant ID:
          10130). Are you sure you want to unpublish?
        </p>
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
