import ViewCompactOutlinedIcon from "@mui/icons-material/ViewCompactOutlined";
import { useState } from "react";
import type { HomepageTemplate } from "../../homepageConfig/teamTemplate";
import { DeleteConfirmModal } from "./CustomWidgetDashboardCard";
import { HomepageTemplatePreviewFrame } from "./HomepageTemplatePreviewFrame";
import { ManagementBreadcrumbs } from "./ManagementBreadcrumbs";

export type ManageTemplatesTab = "published" | "drafts";

export function ManageTemplatesPage({
  activeTab,
  draftTemplates,
  onAddToHomepage,
  onCreateTemplate,
  onDeleteTemplate,
  onEditTemplate,
  onGoHome,
  onGoHub,
  onTabChange,
  publishedTemplates,
}: {
  activeTab: ManageTemplatesTab;
  draftTemplates: HomepageTemplate[];
  onAddToHomepage: (templateId: string) => void;
  onCreateTemplate: () => void;
  onDeleteTemplate: (templateId: string) => void;
  onEditTemplate: (templateId: string) => void;
  onGoHome: () => void;
  onGoHub: () => void;
  onTabChange: (tab: ManageTemplatesTab) => void;
  publishedTemplates: HomepageTemplate[];
}) {
  const [pendingDeleteTemplateId, setPendingDeleteTemplateId] = useState<string | null>(null);
  const visibleTemplates = activeTab === "published" ? publishedTemplates : draftTemplates;
  const isEmpty = visibleTemplates.length === 0;
  const pendingDeleteTemplate = visibleTemplates.find(
    (template) => template.id === pendingDeleteTemplateId,
  );

  return (
    <section className="custom-widget-management-page">
      <ManagementBreadcrumbs
        items={[
          { label: "Home", onClick: onGoHome },
          { label: "Manage Templates and Widgets", onClick: onGoHub },
          { label: "Templates" },
        ]}
      />
      <div className="custom-widget-management-header">
        <h1>Templates</h1>
        <div className="custom-widget-management-header-actions">
          <button className="custom-widget-primary-button" onClick={onCreateTemplate} type="button">
            Create Template
          </button>
        </div>
      </div>
      <div className="custom-widget-tabs" role="tablist">
        <button
          aria-selected={activeTab === "published"}
          className={`custom-widget-tab${activeTab === "published" ? " is-active" : ""}`}
          onClick={() => onTabChange("published")}
          role="tab"
          type="button"
        >
          Published
        </button>
        <button
          aria-selected={activeTab === "drafts"}
          className={`custom-widget-tab${activeTab === "drafts" ? " is-active" : ""}`}
          onClick={() => onTabChange("drafts")}
          role="tab"
          type="button"
        >
          Drafts
        </button>
      </div>
      {isEmpty ? (
        <div className="custom-widget-empty-state">
          <div className="custom-widget-empty-state-icon">
            <ViewCompactOutlinedIcon />
          </div>
          <h2>No Templates</h2>
        </div>
      ) : (
        <div className="custom-widget-grid">
          {visibleTemplates.map((template) => (
            <article className="custom-widget-grid-card" key={template.id}>
              <div className="custom-widget-grid-preview homepage-template-grid-preview">
                <HomepageTemplatePreviewFrame template={template} />
                <div className="custom-widget-grid-card-overlay">
                  <button
                    className="custom-widget-primary-button custom-widget-grid-card-action"
                    onClick={() => onEditTemplate(template.id)}
                    type="button"
                  >
                    View Details
                  </button>
                  {activeTab === "drafts" ? (
                    <button
                      className="custom-widget-secondary-button custom-widget-grid-card-action"
                      onClick={() => setPendingDeleteTemplateId(template.id)}
                      type="button"
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      className="custom-widget-secondary-button custom-widget-grid-card-action"
                      onClick={() => onAddToHomepage(template.id)}
                      type="button"
                    >
                      Add to Home Page
                    </button>
                  )}
                </div>
              </div>
              <span className="custom-widget-grid-name">{template.name || "Untitled Template"}</span>
            </article>
          ))}
        </div>
      )}
      {pendingDeleteTemplate ? (
        <DeleteConfirmModal
          onCancel={() => setPendingDeleteTemplateId(null)}
          onConfirm={() => {
            onDeleteTemplate(pendingDeleteTemplate.id);
            setPendingDeleteTemplateId(null);
          }}
          widgetName={pendingDeleteTemplate.name}
        />
      ) : null}
    </section>
  );
}
