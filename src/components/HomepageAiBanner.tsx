import CloseIcon from "@mui/icons-material/Close";
import aiSparkIconUrl from "../assets/homepage-ai-spark.svg";
import promptWidgetsIconUrl from "../assets/homepage-ai-prompt-widgets.svg";
import { AiButton } from "./AiButton";

export type HomepageAiBannerVariant = "cta" | "prompts";

export type HomepageAiBannerPrompt = {
  id: string;
  label: string;
  prompt: string;
};

export const HOMEPAGE_AI_BANNER_PROMPTS: HomepageAiBannerPrompt[] = [
  {
    id: "create-homepage",
    label: "Create a new Homepage for me",
    prompt: "Create a new Homepage for me",
  },
  {
    id: "recommend-widgets",
    label: "Recommend some widgets to add",
    prompt: "Recommend some widgets to add",
  },
  {
    id: "create-widget",
    label: "Create a new widget based on my need",
    prompt: "Create a new widget based on my need",
  },
  {
    id: "reorganize-homepage",
    label: "Reorganize my homepage",
    prompt: "Reorganize my homepage",
  },
];

export function HomepageAiBanner({
  onClose,
  onGetStarted,
  onSelectPrompt,
  variant = "prompts",
}: {
  onClose: () => void;
  onGetStarted: () => void;
  onSelectPrompt?: (prompt: HomepageAiBannerPrompt) => void;
  variant?: HomepageAiBannerVariant;
}) {
  if (variant === "prompts") {
    return (
      <aside className="homepage-ai-banner homepage-ai-banner--prompts" data-node-id="8836:279083">
        <div className="homepage-ai-banner-header">
          <div className="homepage-ai-banner-content">
            <img alt="" aria-hidden="true" className="homepage-ai-banner-spark" src={aiSparkIconUrl} />
            <p className="homepage-ai-banner-title">Utilize Zuora AI for your Homepage setup</p>
          </div>
          <button
            aria-label="Dismiss AI banner"
            className="homepage-ai-banner-close"
            onClick={onClose}
            type="button"
          >
            <CloseIcon aria-hidden="true" />
          </button>
        </div>
        <div className="homepage-ai-banner-prompts" role="group" aria-label="Suggested homepage prompts">
          {HOMEPAGE_AI_BANNER_PROMPTS.map((prompt) => (
            <button
              className="homepage-ai-banner-prompt"
              key={prompt.id}
              onClick={() => onSelectPrompt?.(prompt)}
              type="button"
            >
              <img
                alt=""
                aria-hidden="true"
                className="homepage-ai-banner-prompt-icon"
                src={promptWidgetsIconUrl}
              />
              <span>{prompt.label}</span>
            </button>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="homepage-ai-banner" data-node-id="8803:31075">
      <div className="homepage-ai-banner-content">
        <img alt="" aria-hidden="true" className="homepage-ai-banner-spark" src={aiSparkIconUrl} />
        <p className="homepage-ai-banner-message">
          Zuora AI can help create or recommend homepage widgets, and optimize your homepage based on
          your needs.
        </p>
      </div>
      <div className="homepage-ai-banner-actions">
        <AiButton
          background="light"
          className="homepage-ai-banner-cta"
          onClick={onGetStarted}
          showIcon={false}
          size="x-small"
          variant="text"
        >
          Get Started
        </AiButton>
        <button
          aria-label="Dismiss AI banner"
          className="homepage-ai-banner-close"
          onClick={onClose}
          type="button"
        >
          <CloseIcon aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
