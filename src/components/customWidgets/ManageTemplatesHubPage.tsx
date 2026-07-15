import ViewCompactOutlinedIcon from "@mui/icons-material/ViewCompactOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import { ManagementBreadcrumbs } from "./ManagementBreadcrumbs";

export function ManageTemplatesHubPage({
  customWidgetSummary,
  onGoHome,
  onOpenCustomWidgets,
}: {
  customWidgetSummary: string;
  onGoHome: () => void;
  onOpenCustomWidgets: () => void;
}) {
  return (
    <section className="custom-widget-management-page custom-widget-hub-page">
      <ManagementBreadcrumbs
        items={[
          { label: "Home", onClick: onGoHome },
          { label: "Manage Templates and Widgets" },
        ]}
      />
      <div className="custom-widget-hub-content">
        <div className="custom-widget-hub-stack">
          <div className="custom-widget-hub-intro">
            <h1 className="custom-widget-hub-title">Manage Templates and Widgets</h1>
            <p className="custom-widget-hub-description">
              Choose how you want to shape your team's Zuora homepage. Use templates to apply
              pre-built homepage layouts for common roles, or create custom widgets with your own HTML
              or embedded content and publish them to your team's widget library.
            </p>
          </div>
          <div className="custom-widget-hub-grid">
            <article className="custom-widget-hub-card">
              <div className="custom-widget-hub-card-icon custom-widget-hub-card-icon-templates">
                <ViewCompactOutlinedIcon />
              </div>
              <h2>Templates</h2>
              <p>12 Published, 5 Drafts</p>
            </article>
            <button className="custom-widget-hub-card" onClick={onOpenCustomWidgets} type="button">
              <div className="custom-widget-hub-card-icon custom-widget-hub-card-icon-widgets">
                <WidgetsOutlinedIcon />
              </div>
              <h2>Custom Widgets</h2>
              <p>{customWidgetSummary}</p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
