import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { useMemo, useState } from "react";
import type { SuggestedAction } from "../ai/types";
import aiSparklesIconUrl from "../assets/onboarding-ai-sparkles.svg";
import layoutGridIconUrl from "../assets/onboarding-layout-grid.svg";
import { OnboardingInlineAiChat } from "./onboarding/OnboardingInlineAiChat";
import {
  ONBOARDING_TEMPLATES,
  type OnboardingTemplateId,
} from "./onboarding/onboardingTemplates";

type OnboardingStep = "landing" | "templates";

export type { OnboardingTemplateId };

function OnboardingBackButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button className="onboarding-back-button" onClick={onClick} type="button">
      <ArrowBackIcon aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

function OnboardingLandingHeader() {
  return (
    <header className="onboarding-screen-header onboarding-screen-header--landing">
      <h1 className="onboarding-screen-title">Set Up Your Home Page</h1>
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
      <h1 className="onboarding-templates-page-title">Choose a template to get started</h1>
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

function OnboardingAiTile({
  aiChatProps,
  expanded,
  onExpand,
}: {
  aiChatProps: {
    inputMessage: string;
    onInputMessageChange: (value: string) => void;
    onSendMessage: (text: string) => void;
    onSuggestedAction: (action: SuggestedAction) => void;
  };
  expanded: boolean;
  onExpand: () => void;
}) {
  return (
    <article
      className={`onboarding-ai-tile${expanded ? " is-expanded" : ""}`}
      data-node-id={expanded ? "361:26158" : "361:26123"}
    >
      <div aria-hidden="true" className="onboarding-ai-tile-border" />
      <div className="onboarding-ai-tile-surface">
        {expanded ? (
          <OnboardingInlineAiChat
            inputMessage={aiChatProps.inputMessage}
            onInputMessageChange={aiChatProps.onInputMessageChange}
            onSendMessage={aiChatProps.onSendMessage}
            onSuggestedAction={aiChatProps.onSuggestedAction}
          />
        ) : (
          <div className="onboarding-ai-tile-body">
            <div className="onboarding-tile-icon-shell onboarding-tile-icon-shell--ai">
              <img alt="" aria-hidden="true" className="onboarding-tile-icon" src={aiSparklesIconUrl} />
            </div>
            <div className="onboarding-tile-copy">
              <h2>Start with AI</h2>
              <p>Let AI create your personalized homepage based on a simple prompt.</p>
            </div>
            <button className="onboarding-ai-tile-button" onClick={onExpand} type="button">
              Get Started with AI
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function OnboardingTemplateTile({ onBrowseTemplates }: { onBrowseTemplates: () => void }) {
  return (
    <article className="onboarding-templates-tile" data-node-id="361:26132">
      <div className="onboarding-templates-tile-surface">
        <div className="onboarding-tile-body">
          <div className="onboarding-tile-icon-shell onboarding-tile-icon-shell--template">
            <img alt="" aria-hidden="true" className="onboarding-tile-icon" src={layoutGridIconUrl} />
          </div>
          <div className="onboarding-tile-copy">
            <h2>Use a Template</h2>
            <p>Select from our collection of proven, industry-standard layouts.</p>
          </div>
          <button className="onboarding-templates-tile-button" onClick={onBrowseTemplates} type="button">
            Browse Templates
          </button>
        </div>
      </div>
    </article>
  );
}

export function OnboardingScreen({
  aiChatProps,
  onOpenAiChat,
  onSelectTemplate,
}: {
  aiChatProps: {
    inputMessage: string;
    onClose: () => void;
    onInputMessageChange: (value: string) => void;
    onNewChat?: () => void;
    onSendMessage: (text: string) => void;
    onSuggestedAction: (action: SuggestedAction) => void;
  };
  onOpenAiChat: () => void;
  onSelectTemplate: (templateId: OnboardingTemplateId) => void;
}) {
  const [step, setStep] = useState<OnboardingStep>("landing");
  const [aiExpanded, setAiExpanded] = useState(false);
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

  const handleExpandAi = () => {
    onOpenAiChat();
    setAiExpanded(true);
  };

  const handleBackFromAi = () => {
    setAiExpanded(false);
    aiChatProps.onClose();
    aiChatProps.onNewChat?.();
  };

  const handleBrowseTemplates = () => {
    setAiExpanded(false);
    aiChatProps.onClose();
    aiChatProps.onNewChat?.();
    setStep("templates");
  };

  const handleBackToLanding = () => {
    setStep("landing");
    setSearchQuery("");
  };

  return (
    <div className="onboarding-screen" data-node-id="361:26301">
      <div aria-hidden="true" className="onboarding-screen-background">
        <div className="onboarding-screen-gradient" />
      </div>

      <div
        className={`onboarding-screen-content onboarding-screen-content--${step}${aiExpanded ? " is-ai-expanded" : ""}`}
      >
        {step === "landing" ? (
          <div className="onboarding-landing-view" data-node-id="361:26110">
            {aiExpanded ? (
              <div className="onboarding-landing-nav">
                <OnboardingBackButton label="Back" onClick={handleBackFromAi} />
              </div>
            ) : null}

            <OnboardingLandingHeader />

            <div className="onboarding-split-layout">
              <OnboardingAiTile
                aiChatProps={aiChatProps}
                expanded={aiExpanded}
                onExpand={handleExpandAi}
              />
              {!aiExpanded ? <OnboardingTemplateTile onBrowseTemplates={handleBrowseTemplates} /> : null}
            </div>
          </div>
        ) : null}

        {step === "templates" ? (
          <div className="onboarding-templates-view" data-node-id="361:26183">
            <OnboardingBackButton label="Back" onClick={handleBackToLanding} />
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
        ) : null}
      </div>
    </div>
  );
}
