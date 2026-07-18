import SearchIcon from "@mui/icons-material/Search";
import { useMemo, useState } from "react";
import billingStandardPreviewUrl from "../assets/onboarding-billing-standard.png";
import developerPreviewUrl from "../assets/onboarding-developer.png";
import revenueStandardPreviewUrl from "../assets/onboarding-revenue-standard.png";
import { OnboardingAiDropdown } from "./OnboardingAiDropdown";

const ONBOARDING_TEMPLATES = [
  {
    description:
      "Get started fast with an out-of-the-box homepage that puts your most essential Zuora actions at your fingertips.",
    id: "billing-standard",
    imageUrl: billingStandardPreviewUrl,
    name: "Billing Standard",
  },
  {
    description: "Get started quickly with essential revenue actions and helpful resources.",
    id: "revenue-standard",
    imageUrl: revenueStandardPreviewUrl,
    name: "Revenue Standard",
  },
  {
    description:
      "Power your integrations with real-time API visibility, performance insights, and error tracking—all in one place.",
    id: "developer",
    imageUrl: developerPreviewUrl,
    name: "Developer",
  },
] as const;

export type OnboardingTemplateId = (typeof ONBOARDING_TEMPLATES)[number]["id"];

export function OnboardingScreen({
  onOpenAiChat,
  onSelectAiPrompt,
  onSelectTemplate,
}: {
  onOpenAiChat: () => void;
  onSelectAiPrompt: (prompt: string) => void;
  onSelectTemplate: (templateId: OnboardingTemplateId) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiDropdownExpanded, setAiDropdownExpanded] = useState(false);

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
    <div className="onboarding-screen" data-node-id="268:22669">
      <div aria-hidden="true" className="onboarding-screen-background">
        <div className="onboarding-screen-gradient" />
      </div>

      <div className={`onboarding-screen-content${aiDropdownExpanded ? " is-ai-dropdown-expanded" : ""}`}>
        <header className="onboarding-screen-header">
          <h1 className="onboarding-screen-title">Set Up Your Home Page</h1>
          <p className="onboarding-screen-subtitle">
            Choose a template to get started, or build your own homepage using Zuora AI.
          </p>
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

        <div className="onboarding-screen-actions">
          <OnboardingAiDropdown
            onExpandedChange={setAiDropdownExpanded}
            onOpenAiChat={onOpenAiChat}
            onSelectPrompt={onSelectAiPrompt}
          />
        </div>
      </div>
    </div>
  );
}
