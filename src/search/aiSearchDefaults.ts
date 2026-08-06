import { HOMEPAGE_CONFIG_SUGGESTIONS } from "../ai/homepageConfigAssistant";
import type { SuggestedAction } from "../ai/types";

export const DEFAULT_SEARCH_HISTORY = [
  "Acme Corp account balance",
  "September close tasks",
  "Deferred revenue report",
];

export const AI_SEARCH_SUGGESTIONS: SuggestedAction[] = HOMEPAGE_CONFIG_SUGGESTIONS.slice(0, 4);

const SEARCH_HISTORY_STORAGE_KEY = "zuora-homepage-search-history";

export function loadSearchHistory(): string[] {
  try {
    const raw = window.sessionStorage.getItem(SEARCH_HISTORY_STORAGE_KEY);
    if (!raw) {
      return [...DEFAULT_SEARCH_HISTORY];
    }

    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...DEFAULT_SEARCH_HISTORY];
  } catch {
    return [...DEFAULT_SEARCH_HISTORY];
  }
}

export function saveSearchHistory(history: string[]) {
  window.sessionStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, JSON.stringify(history.slice(0, 8)));
}

export function prependSearchHistory(history: string[], query: string) {
  const trimmed = query.trim();
  if (!trimmed) {
    return history;
  }

  return [trimmed, ...history.filter((entry) => entry.toLowerCase() !== trimmed.toLowerCase())].slice(
    0,
    8,
  );
}

export function removeSearchHistory(history: string[], query: string) {
  return history.filter((entry) => entry !== query);
}
