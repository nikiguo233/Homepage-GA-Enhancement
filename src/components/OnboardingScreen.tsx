import SearchIcon from "@mui/icons-material/Search";
import { useMemo, useState } from "react";
import aiSparkIconUrl from "../assets/onboarding-create-with-ai-spark.svg";
import { OnboardingCreateWithAiPreview } from "./onboarding/OnboardingCreateWithAiPreview";
import {
  isCreateWithAiOnboardingChoice,
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
          Choose a template to get started, or build your own homepage with Zuora AI.
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
    <div className="onboarding-screen" data-node-id="9093:45218">
      <div aria-hidden="true" className="onboarding-screen-background">
        <div className="onboarding-screen-gradient" />
      </div>

      <div className="onboarding-screen-content onboarding-screen-content--templates">
        <div className="onboarding-templates-view" data-node-id="9093:45226">
          <OnboardingTemplatesHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <div className="onboarding-template-grid">
            {filteredTemplates.map((template) => {
              const isAiOption = isCreateWithAiOnboardingChoice(template.id);

              return (
                <article
                  className={`onboarding-template-card${isAiOption ? " is-ai" : ""}`}
                  key={template.id}
                >
                  <button
                    aria-label={
                      isAiOption ? "Create with Zuora AI" : `Use ${template.name} template`
                    }
                    className="onboarding-template-preview-button"
                    onClick={() => onSelectTemplate(template.id)}
                    type="button"
                  >
                    {isAiOption ? (
                      <OnboardingCreateWithAiPreview />
                    ) : (
                      <span className="onboarding-template-preview-frame">
                        <img alt="" src={"imageUrl" in template ? template.imageUrl : ""} />
                      </span>
                    )}
                  </button>
                  <div className="onboarding-template-copy">
                    <h2>
                      {isAiOption ? (
                        <>
                          <img
                            alt=""
                            aria-hidden="true"
                            className="onboarding-template-ai-title-icon"
                            src={aiSparkIconUrl}
                          />
                          <span>{template.name}</span>
                        </>
                      ) : (
                        template.name
                      )}
                    </h2>
                    <p>{template.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
