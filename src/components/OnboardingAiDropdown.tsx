import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useEffect, useId, useRef, useState } from "react";

const AI_SPARK_ICON_PATH =
  "M12.8838 15.2513V14.367H12.0186C11.6043 14.367 11.2686 14.0318 11.2686 13.6183C11.2686 13.2048 11.6043 12.8696 12.0186 12.8696H12.8838V11.9854C12.8838 11.572 13.2198 11.2369 13.6338 11.2367C14.048 11.2367 14.3838 11.5719 14.3838 11.9854V12.8696H15.25C15.6642 12.8696 16 13.2048 16 13.6183C16 14.0318 15.6642 14.367 15.25 14.367H14.3838V15.2513C14.3838 15.6648 14.048 16 13.6338 16C13.2198 15.9998 12.8838 15.6646 12.8838 15.2513ZM6.33691 2.60297C6.86982 1.00804 9.13028 1.00795 9.66309 2.60297L10.5977 5.4058L13.4062 6.33975C15.0039 6.87168 15.0039 9.12825 13.4062 9.66025L10.5977 10.5942L9.66309 13.397C9.13039 14.9924 6.86964 14.9924 6.33691 13.397L5.40039 10.5942L2.59375 9.66025C0.99564 9.12845 0.99564 6.87155 2.59375 6.33975L5.40039 5.4058L6.33691 2.60297ZM8.23926 3.07677C8.16227 2.84686 7.83664 2.84675 7.75977 3.07677L6.70508 6.23446C6.63045 6.45795 6.45529 6.6337 6.23145 6.70826L3.06836 7.76115C2.83779 7.83787 2.83779 8.1631 3.06836 8.23982L6.23145 9.29271L6.3125 9.32488C6.49718 9.41137 6.63968 9.57 6.70508 9.76554L7.75977 12.9232C7.83662 13.1534 8.1624 13.1534 8.23926 12.9232L9.29395 9.76554C9.36863 9.54206 9.54466 9.36722 9.76855 9.29271L12.9316 8.23982C13.162 8.16307 13.1619 7.83804 12.9316 7.76115L9.76855 6.70826C9.5446 6.63374 9.3686 6.45803 9.29395 6.23446L8.23926 3.07677ZM1.61621 3.97758V3.11187H0.75C0.335786 3.11187 0 2.77666 0 2.36315C7.41099e-05 1.9497 0.335832 1.61443 0.75 1.61443H1.61621V0.74872C1.61621 0.335214 1.952 0 2.36621 0C2.78023 0.000233626 3.11621 0.335358 3.11621 0.74872V1.61443H3.98145C4.39561 1.61443 4.73137 1.9497 4.73145 2.36315C4.73145 2.77666 4.39566 3.11187 3.98145 3.11187H3.11621V3.97758C3.11621 4.39094 2.78023 4.72606 2.36621 4.7263C1.952 4.7263 1.61621 4.39108 1.61621 3.97758Z";

export type OnboardingAiPrompt = {
  id: string;
  label: string;
  prompt?: string;
};

export const ONBOARDING_AI_PROMPTS: OnboardingAiPrompt[] = [
  {
    id: "daily-work",
    label: "Create a homepage for my daily work",
    prompt: "Create a homepage for my daily work.",
  },
  {
    id: "recommend-widgets",
    label: "Recommend some widgets to add",
    prompt: "Recommend some widgets to add to my homepage.",
  },
  {
    id: "month-end-close",
    label: "Build me a month-end close dashboard",
    prompt: "Build me a month-end close dashboard.",
  },
  {
    id: "chat-with-ai",
    label: "Chat with AI",
  },
];

const CAROUSEL_INTERVAL_MS = 2000;

function OnboardingAiSparkIcon({
  className,
  gradientId,
  size = 24,
}: {
  className?: string;
  gradientId: string;
  size?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 16 16"
      width={size}
    >
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id={gradientId} x1="0" x2="16" y1="8" y2="8">
          <stop offset="11.93%" stopColor="#b6fff9" />
          <stop offset="44.382%" stopColor="#8fb2f6" />
          <stop offset="84.996%" stopColor="#b69bfe" />
        </linearGradient>
      </defs>
      <path d={AI_SPARK_ICON_PATH} fill={`url(#${gradientId})`} />
    </svg>
  );
}

export function OnboardingAiDropdown({
  onExpandedChange,
  onOpenAiChat,
  onSelectPrompt,
}: {
  onExpandedChange?: (expanded: boolean) => void;
  onOpenAiChat: () => void;
  onSelectPrompt: (prompt: string) => void;
}) {
  const gradientId = `onboarding-ai-spark-${useId().replace(/:/g, "")}`;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [carouselSession, setCarouselSession] = useState(0);

  const handleToggleExpanded = () => {
    setExpanded((current) => {
      const next = !current;

      if (next) {
        setActiveIndex(0);
        setIsCarouselPaused(false);
        setCarouselSession((session) => session + 1);
      }

      onExpandedChange?.(next);
      return next;
    });
  };

  useEffect(() => {
    if (!expanded) {
      return undefined;
    }

    rootRef.current?.scrollIntoView({ behavior: "auto", block: "center" });
  }, [expanded]);

  useEffect(() => {
    if (!expanded) {
      return undefined;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setExpanded(false);
        onExpandedChange?.(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [expanded]);

  useEffect(() => {
    if (!expanded || isCarouselPaused) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % ONBOARDING_AI_PROMPTS.length);
    }, CAROUSEL_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [carouselSession, expanded, isCarouselPaused]);

  const handleSelectPrompt = (prompt: OnboardingAiPrompt) => {
    setExpanded(false);
    onExpandedChange?.(false);

    if (prompt.prompt) {
      onSelectPrompt(prompt.prompt);
      return;
    }

    onOpenAiChat();
  };

  return (
    <div
      className={`onboarding-ai-dropdown${expanded ? " is-expanded" : ""}`}
      data-node-id="330:25409"
      ref={rootRef}
    >
      <button
        aria-expanded={expanded}
        className="onboarding-ai-dropdown-trigger"
        onClick={handleToggleExpanded}
        type="button"
      >
        <OnboardingAiSparkIcon
          className="onboarding-ai-dropdown-trigger-icon"
          gradientId={gradientId}
          size={18}
        />
        <span className="onboarding-ai-dropdown-trigger-label">
          Create your own homepage with Zuora AI
        </span>
        {expanded ? (
          <ArrowDropUpIcon aria-hidden="true" className="onboarding-ai-dropdown-trigger-chevron" />
        ) : (
          <ArrowDropDownIcon aria-hidden="true" className="onboarding-ai-dropdown-trigger-chevron" />
        )}
      </button>

      <div aria-hidden={!expanded} className="onboarding-ai-dropdown-panel">
        <div
          className={`onboarding-ai-prompt-carousel${expanded ? " is-running" : ""}`}
          role="list"
        >
          {ONBOARDING_AI_PROMPTS.map((prompt, index) => (
            <button
              className={`onboarding-ai-prompt${index === activeIndex ? " is-active" : ""}`}
              key={prompt.id}
              onClick={() => handleSelectPrompt(prompt)}
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
              role="listitem"
              type="button"
            >
              <OnboardingAiSparkIcon
                className="onboarding-ai-prompt-icon"
                gradientId={`${gradientId}-${prompt.id}`}
                size={16}
              />
              <span className="onboarding-ai-prompt-label">{prompt.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
