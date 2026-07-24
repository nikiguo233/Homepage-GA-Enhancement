import aiSparkCardIconUrl from "../../assets/onboarding-ai-spark-card.svg";
import type { OnboardingAiPrompt } from "./onboardingAiSuggestions";
import { ONBOARDING_AI_PROMPTS } from "./onboardingAiSuggestions";

function OnboardingAiPromptCard({
  prompt,
  onSelect,
}: {
  prompt: OnboardingAiPrompt;
  onSelect: (prompt: OnboardingAiPrompt) => void;
}) {
  return (
    <button
      aria-label={prompt.label}
      className="onboarding-ai-prompt-card"
      onClick={() => onSelect(prompt)}
      type="button"
    >
      <span aria-hidden="true" className="onboarding-ai-prompt-card-border" />
      <span className="onboarding-ai-prompt-card-surface">
        <span aria-hidden="true" className="onboarding-ai-prompt-card-icon-shell">
          <img alt="" className="onboarding-ai-prompt-card-icon" src={aiSparkCardIconUrl} />
        </span>
        <span className="onboarding-ai-prompt-card-copy">
          <span className="onboarding-ai-prompt-card-title">{prompt.label}</span>
          <span className="onboarding-ai-prompt-card-description">{prompt.description}</span>
        </span>
      </span>
    </button>
  );
}

export function OnboardingAiPromptCards({
  onSelectPrompt,
}: {
  onSelectPrompt: (prompt: OnboardingAiPrompt) => void;
}) {
  const [firstPrompt, secondPrompt, thirdPrompt, fourthPrompt] = ONBOARDING_AI_PROMPTS;

  return (
    <div className="onboarding-ai-prompt-card-grid" data-node-id="379:26692">
      <div className="onboarding-ai-prompt-card-row" data-node-id="379:26693">
        {firstPrompt ? <OnboardingAiPromptCard onSelect={onSelectPrompt} prompt={firstPrompt} /> : null}
        {secondPrompt ? <OnboardingAiPromptCard onSelect={onSelectPrompt} prompt={secondPrompt} /> : null}
      </div>
      <div className="onboarding-ai-prompt-card-row" data-node-id="379:26696">
        {thirdPrompt ? <OnboardingAiPromptCard onSelect={onSelectPrompt} prompt={thirdPrompt} /> : null}
        {fourthPrompt ? <OnboardingAiPromptCard onSelect={onSelectPrompt} prompt={fourthPrompt} /> : null}
      </div>
    </div>
  );
}
