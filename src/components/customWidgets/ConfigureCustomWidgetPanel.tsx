import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import type { CustomWidget, CustomWidgetSize } from "../../customWidgets/types";
import { getWidgetSizeLabel } from "../../customWidgets/widgetSizes";
import { WidgetDrawerShell } from "./WidgetDrawerShell";
import { WidgetSizePreview } from "./WidgetSizePreview";

export function ConfigureCustomWidgetPanel({
  confirmLabel = "Add",
  onAdd,
  onBack,
  onClose,
  onEditCustomWidget,
  onSizeChange,
  selectedSize,
  widget,
}: {
  confirmLabel?: string;
  onAdd: () => void;
  onBack: () => void;
  onClose: () => void;
  onEditCustomWidget: () => void;
  onSizeChange: (size: CustomWidgetSize) => void;
  selectedSize: CustomWidgetSize;
  widget: CustomWidget;
}) {
  return (
    <WidgetDrawerShell
      ariaLabel="Configure custom widget"
      dataNodeId="306:23508"
      footer={
        <div className="widget-drawer-footer-actions">
          <button className="widget-drawer-secondary-button" onClick={onEditCustomWidget} type="button">
            <EditOutlinedIcon aria-hidden="true" />
            <span>Edit Custom Widget</span>
          </button>
          <button className="widget-drawer-primary-button" onClick={onAdd} type="button">
            {confirmLabel}
          </button>
        </div>
      }
      footerClassName="widget-drawer-footer-dual"
      header={
        <button className="widget-drawer-back-button" onClick={onBack} type="button">
          <ChevronLeftIcon />
          <span>Back</span>
        </button>
      }
      onClose={onClose}
    >
      <div className="widget-config-section">
        <h2>{widget.name}</h2>
        <hr className="widget-config-divider" />
      </div>

      <div className="widget-config-section">
        <h3>Supported Widget Sizes</h3>
        <hr className="widget-config-divider" />
      </div>

      <div className="widget-config-size-panel">
        <div className="widget-config-size-options" role="radiogroup" aria-label="Supported widget sizes">
          {widget.supportedSizes.map((size) => (
            <label className="widget-config-size-option" key={size}>
              <input
                checked={selectedSize === size}
                name={`widget-size-${widget.id}`}
                onChange={() => onSizeChange(size)}
                type="radio"
                value={size}
              />
              <span className="widget-config-size-option-indicator" aria-hidden="true" />
              <span>{getWidgetSizeLabel(size)}</span>
            </label>
          ))}
        </div>
        <WidgetSizePreview size={selectedSize} />
      </div>
    </WidgetDrawerShell>
  );
}
