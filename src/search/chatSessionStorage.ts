import type { AiChatSuggestionContext, ChatMessage } from "../ai/types";

export type StoredChatSession = {
  context: AiChatSuggestionContext;
  messages: ChatMessage[];
  prompt: string;
  updatedAt: number;
};

const CHAT_SESSIONS_STORAGE_KEY = "zuora-homepage-chat-sessions";
const MAX_CHAT_SESSIONS = 8;

function normalizePrompt(prompt: string) {
  return prompt.trim().toLowerCase();
}

export function loadChatSessions(): StoredChatSession[] {
  try {
    const raw = window.sessionStorage.getItem(CHAT_SESSIONS_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as StoredChatSession[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveChatSession(
  prompt: string,
  messages: ChatMessage[],
  context: AiChatSuggestionContext,
) {
  const trimmedPrompt = prompt.trim();

  if (!trimmedPrompt || messages.length === 0) {
    return;
  }

  const normalized = normalizePrompt(trimmedPrompt);
  const nextSession: StoredChatSession = {
    context,
    messages,
    prompt: trimmedPrompt,
    updatedAt: Date.now(),
  };

  const sessions = loadChatSessions().filter(
    (session) => normalizePrompt(session.prompt) !== normalized,
  );

  sessions.unshift(nextSession);
  window.sessionStorage.setItem(
    CHAT_SESSIONS_STORAGE_KEY,
    JSON.stringify(sessions.slice(0, MAX_CHAT_SESSIONS)),
  );
}

export function findChatSession(prompt: string): StoredChatSession | null {
  const normalized = normalizePrompt(prompt);

  if (!normalized) {
    return null;
  }

  return (
    loadChatSessions().find((session) => normalizePrompt(session.prompt) === normalized) ?? null
  );
}
