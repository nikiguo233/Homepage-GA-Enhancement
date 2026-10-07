import SearchIcon from "@mui/icons-material/Search";
import { useMemo, useState } from "react";
import {
  ONBOARDING_TEMPLATES,
  type OnboardingTemplateId,
} from "./onboarding/onboardingTemplates";

export type { OnboardingTemplateId };

function OnboardingTemplatesHeader({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}) {
  return (
    <header className="onboarding-screen-header onboarding-screen-header--templates">
      <div className="onboarding-screen-header-copy">
        <h1 className="onboarding-screen-title">Set Up Your Home Page</h1>
        <p className="onboarding-screen-subtitle">
          Choose a template to get started, or build your own homepage from scratch.
        </p>
      </div>
      <label className="onboarding-screen-search">
        <SearchIcon aria-hidden="true" />
        <input
          aria-label="Search templates"
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search Template"
          type="search"
          value={searchQuery}
        />
      </label>
    </header>
  );
}

export function OnboardingScreen({
  onSelectTemplate,
}: {
  onSelectTemplate: (templateId: OnboardingTemplateId) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();

    if (!normalized) {
      return ONBOARDING_TEMPLATES;
    }

    return ONBOARDING_TEMPLATES.filter(
      (template) =>
        template.name.toLowerCase().includes(normalized) ||
        template.description.toLowerCase().includes(normalized),
    );
  }, [searchQuery]);

  return (
    <div className="onboarding-screen" data-node-id="361:26301">
      <div aria-hidden="true" className="onboarding-screen-background">
        <div className="onboarding-screen-gradient" />
      </div>

      <div className="onboarding-screen-content onboarding-screen-content--templates">
        <div className="onboarding-templates-view" data-node-id="361:26183">
          <OnboardingTemplatesHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <div className="onboarding-template-grid">
            {filteredTemplates.map((template) => (
              <article className="onboarding-template-card" key={template.id}>
                <button
                  aria-label={`Use ${template.name} template`}
                  className="onboarding-template-preview-button"
                  onClick={() => onSelectTemplate(template.id)}
                  type="button"
                >
                  <span className="onboarding-template-preview-frame">
                    <img alt="" src={template.imageUrl} />
                  </span>
                </button>
                <div className="onboarding-template-copy">
                  <h2>{template.name}</h2>
                  <p>{template.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
