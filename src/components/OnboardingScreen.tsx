import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { useMemo, useState } from "react";
import spaceDashboardIconUrl from "../assets/onboarding-space-dashboard.svg";
import startAiSparkIconUrl from "../assets/onboarding-start-ai-spark.svg";
import { AiButton } from "./AiButton";
import {
  ONBOARDING_TEMPLATES,
  type OnboardingTemplateId,
} from "./onboarding/onboardingTemplates";

export type { OnboardingTemplateId };

type OnboardingStep = "landing" | "templates";

function OnboardingLandingHeader() {
  return (
    <header className="onboarding-screen-header onboarding-screen-header--landing">
      <div className="onboarding-screen-header-copy">
        <h1 className="onboarding-screen-title">Set Up Your Home Page</h1>
        <p className="onboarding-screen-subtitle">
          Choose a template to get started, or build your own homepage with Zuora AI.
        </p>
      </div>
    </header>
  );
}

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
        <h1 className="onboarding-screen-title">Choose Template</h1>
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
  onCreateWithAi,
  onSelectTemplate,
}: {
  onCreateWithAi: () => void;
  onSelectTemplate: (templateId: OnboardingTemplateId) => void;
}) {
  const [step, setStep] = useState<OnboardingStep>("landing");
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
    <div
      className="onboarding-screen"
      data-node-id={step === "landing" ? "9106:266162" : "9113:266242"}
    >
      <div aria-hidden="true" className="onboarding-screen-background">
        <div className="onboarding-screen-gradient" />
      </div>

      {step === "templates" ? (
        <button
          className="onboarding-back-button"
          onClick={() => {
            setSearchQuery("");
            setStep("landing");
          }}
          type="button"
        >
          <ArrowBackIcon aria-hidden="true" />
          Back
        </button>
      ) : null}

      <div
        className={`onboarding-screen-content${
          step === "landing"
            ? " onboarding-screen-content--landing"
            : " onboarding-screen-content--templates"
        }`}
      >
        {step === "landing" ? (
          <div className="onboarding-landing-view" data-node-id="9106:266170">
            <OnboardingLandingHeader />

            <div className="onboarding-split-layout" data-node-id="9106:266175">
              <article className="onboarding-templates-tile" data-node-id="9106:266177">
                <div className="onboarding-templates-tile-surface">
                  <div className="onboarding-tile-body">
                    <div className="onboarding-tile-icon-shell onboarding-tile-icon-shell--template">
                      <img
                        alt=""
                        aria-hidden="true"
                        className="onboarding-tile-icon onboarding-tile-icon--dashboard"
                        src={spaceDashboardIconUrl}
                      />
                    </div>
                    <div className="onboarding-tile-copy">
                      <h2>Use a Template</h2>
                      <p>Select from our collection of proven, industry-standard layouts.</p>
                    </div>
                    <button
                      className="onboarding-templates-tile-button"
                      onClick={() => setStep("templates")}
                      type="button"
                    >
                      Choose Template
                    </button>
                  </div>
                </div>
              </article>

              <article className="onboarding-ai-tile" data-node-id="9106:266176">
                <div className="onboarding-ai-tile-surface">
                  <div className="onboarding-ai-tile-body">
                    <div className="onboarding-tile-icon-shell onboarding-tile-icon-shell--ai">
                      <img
                        alt=""
                        aria-hidden="true"
                        className="onboarding-tile-icon onboarding-tile-icon--ai-spark"
                        src={startAiSparkIconUrl}
                      />
                    </div>
                    <div className="onboarding-tile-copy">
                      <h2>Start with AI</h2>
                      <p>
                        Let Zuora AI design your personalized homepage, with options to customize
                        further.
                      </p>
                    </div>
                    <AiButton
                      background="dark"
                      className="onboarding-ai-tile-button"
                      onClick={onCreateWithAi}
                      variant="secondary"
                    >
                      Create with Zuora AI
                    </AiButton>
                  </div>
                </div>
              </article>
            </div>
          </div>
        ) : (
          <div className="onboarding-templates-view" data-node-id="9113:266250">
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
        )}
      </div>
    </div>
  );
}
