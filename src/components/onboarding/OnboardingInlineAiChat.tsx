import AddIcon from "@mui/icons-material/Add";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { type KeyboardEvent as ReactKeyboardEvent } from "react";
import type { SuggestedAction } from "../../ai/types";
import { ONBOARDING_AI_SUGGESTIONS } from "./onboardingAiSuggestions";

function OnboardingAiSuggestionChip({
  action,
  onSelect,
}: {
  action: SuggestedAction;
  onSelect: (action: SuggestedAction) => void;
}) {
  return (
    <button
      className="onboarding-ai-suggestion-chip"
      onClick={() => onSelect(action)}
      type="button"
    >
      <span aria-hidden="true" className="onboarding-ai-suggestion-chip-icon" />
      <span className="onboarding-ai-suggestion-chip-label">{action.label}</span>
    </button>
  );
}

export function OnboardingInlineAiChat({
  inputMessage,
  onInputMessageChange,
  onSendMessage,
  onSuggestedAction,
}: {
  inputMessage: string;
  onInputMessageChange: (value: string) => void;
  onSendMessage: (text: string) => void;
  onSuggestedAction: (action: SuggestedAction) => void;
}) {
  const canSend = inputMessage.trim().length > 0;

  const handleSend = () => {
    const trimmed = inputMessage.trim();

    if (!trimmed) {
      return;
    }

    onSendMessage(trimmed);
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="onboarding-inline-ai-chat" data-node-id="361:26158">
      <div className="onboarding-ai-suggestion-list" data-node-id="361:26160">
        <div className="onboarding-ai-suggestion-row">
          {ONBOARDING_AI_SUGGESTIONS.slice(0, 2).map((action) => (
            <OnboardingAiSuggestionChip action={action} key={action.id} onSelect={onSuggestedAction} />
          ))}
        </div>
        {ONBOARDING_AI_SUGGESTIONS[2] ? (
          <OnboardingAiSuggestionChip action={ONBOARDING_AI_SUGGESTIONS[2]} onSelect={onSuggestedAction} />
        ) : null}
      </div>

      <label className="onboarding-inline-ai-chat-input-shell" data-node-id="361:26165">
        <div className="onboarding-inline-ai-chat-input-area">
          <textarea
            aria-label="Chat with AI for your specific needs"
            className="onboarding-inline-ai-chat-input"
            onChange={(event) => onInputMessageChange(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Chat with AI for your specific needs"
            rows={3}
            value={inputMessage}
          />
          <div className="onboarding-inline-ai-chat-input-actions">
            <button aria-label="Add attachment" className="onboarding-inline-ai-chat-icon-button" type="button">
              <AddIcon />
            </button>
            <div className="onboarding-inline-ai-chat-input-actions-right">
              <button aria-label="Use microphone" className="onboarding-inline-ai-chat-icon-button" type="button">
                <MicNoneOutlinedIcon />
              </button>
              <button
                aria-label="Send message"
                className="onboarding-inline-ai-chat-icon-button"
                disabled={!canSend}
                onClick={handleSend}
                type="button"
              >
                <SendOutlinedIcon />
              </button>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
}
