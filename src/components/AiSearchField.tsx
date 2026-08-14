import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import type { SuggestedAction } from "../ai/types";
import aiSparkTabIconUrl from "../assets/ai-spark-tab.svg";
import { AiButton } from "./AiButton";
import {
  AI_SEARCH_SUGGESTIONS,
  loadSearchHistory,
  prependSearchHistory,
  removeSearchHistory,
  saveSearchHistory,
} from "../search/aiSearchDefaults";
import {
  filterGlobalSearchResults,
  getCategoryResultCount,
  getDefaultGlobalSearchCategory,
  getGlobalSearchCategoryCounts,
  getTotalEntityCount,
  GLOBAL_SEARCH_CATEGORIES,
  hasGlobalSearchResults,
  type GlobalSearchCategory,
} from "../search/globalSearchMockData";
import "./AiSearchField.css";

export function AiSearchField({
  className = "",
  compact = false,
  hidden = false,
  onOpenAi,
  onOpenChatHistory,
  onSubmitToAi,
  placeholder = "Search or ask a question",
  tabIndex,
}: {
  className?: string;
  compact?: boolean;
  hidden?: boolean;
  onOpenAi?: () => void;
  onOpenChatHistory?: (prompt: string) => void;
  onSubmitToAi: (prompt: string) => void;
  placeholder?: string;
  tabIndex?: number;
}) {
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const globalSearchDelayRef = useRef<number | null>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isGlobalSearchLoading, setIsGlobalSearchLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState(loadSearchHistory);
  const [activeCategory, setActiveCategory] = useState<GlobalSearchCategory>("Customers");

  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;

  const categoryCounts = useMemo(
    () => (isOpen && hasQuery ? getGlobalSearchCategoryCounts(query) : ({} as Record<GlobalSearchCategory, number>)),
    [hasQuery, isOpen, query],
  );

  const resolvedCategory = useMemo(() => {
    if (!hasQuery) {
      return activeCategory;
    }

    return getDefaultGlobalSearchCategory(query, categoryCounts);
  }, [activeCategory, categoryCounts, hasQuery, query]);

  const displayedCategory = hasQuery ? resolvedCategory : activeCategory;

  const globalResults = useMemo(
    () => (isOpen && hasQuery ? filterGlobalSearchResults(query, displayedCategory) : []),
    [displayedCategory, hasQuery, isOpen, query],
  );

  const totalEntityCount = useMemo(
    () => (hasQuery ? getTotalEntityCount(categoryCounts) : "0"),
    [categoryCounts, hasQuery],
  );

  const hasGlobalResults = useMemo(
    () => hasQuery && hasGlobalSearchResults(categoryCounts),
    [categoryCounts, hasQuery],
  );

  const categoryResultCount = getCategoryResultCount(displayedCategory, categoryCounts);
  const showReturnIcon = isInputFocused && query.length > 0;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (hasQuery) {
      setActiveCategory(resolvedCategory);
    }
  }, [hasQuery, resolvedCategory]);

  useEffect(() => {
    if (!isOpen || !hasQuery) {
      setIsGlobalSearchLoading(false);

      if (globalSearchDelayRef.current !== null) {
        window.clearTimeout(globalSearchDelayRef.current);
        globalSearchDelayRef.current = null;
      }

      return;
    }

    setIsGlobalSearchLoading(true);

    globalSearchDelayRef.current = window.setTimeout(() => {
      setIsGlobalSearchLoading(false);
      globalSearchDelayRef.current = null;
    }, 500);

    return () => {
      if (globalSearchDelayRef.current !== null) {
        window.clearTimeout(globalSearchDelayRef.current);
        globalSearchDelayRef.current = null;
      }
    };
  }, [hasQuery, isOpen, trimmedQuery]);

  const submitToAi = (prompt: string) => {
    const normalized = prompt.trim();

    if (!normalized) {
      setIsOpen(false);
      onOpenAi?.();
      return;
    }

    const nextHistory = prependSearchHistory(searchHistory, normalized);
    setSearchHistory(nextHistory);
    saveSearchHistory(nextHistory);
    setQuery("");
    setIsInputFocused(false);
    setIsOpen(false);
    onSubmitToAi(normalized);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitToAi(query);
      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelectHistory = (entry: string) => {
    setQuery("");
    setIsInputFocused(false);
    setIsOpen(false);
    onOpenChatHistory?.(entry);
  };

  const handleRemoveHistory = (entry: string, event: ReactMouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const nextHistory = removeSearchHistory(searchHistory, entry);
    setSearchHistory(nextHistory);
    saveSearchHistory(nextHistory);
  };

  const handleSelectSuggestion = (action: SuggestedAction) => {
    setQuery(action.prompt);
    submitToAi(action.prompt);
  };

  const classes = [
    "search-field",
    "ai-search-field-root",
    compact ? "search-field-compact" : "",
    isOpen ? "is-open" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      aria-hidden={hidden || undefined}
      className={classes}
      data-node-id={isOpen ? "427:30218" : "427:30268"}
      ref={rootRef}
    >
      <div className="ai-search-input-wrap">
        <div className="ai-search-input-inner">
          <SearchIcon />
          <input
            aria-controls={isOpen ? panelId : undefined}
            aria-expanded={isOpen}
            aria-label={placeholder}
            autoComplete="off"
            onChange={(event) => setQuery(event.target.value)}
            onBlur={() => setIsInputFocused(false)}
            onFocus={() => {
              setIsOpen(true);
              setIsInputFocused(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            ref={inputRef}
            role="combobox"
            tabIndex={hidden ? -1 : tabIndex}
            type="text"
            value={query}
          />
          <AiButton
            background="light"
            className={`ai-search-ask-ai-button${showReturnIcon ? " has-query" : ""}`}
            icon={
              <span aria-hidden="true" className="ai-search-ask-ai-button-icon-wrap">
                <img
                  alt=""
                  className="ai-search-ask-ai-button-spark"
                  src={aiSparkTabIconUrl}
                />
                <KeyboardReturnOutlinedIcon
                  className="ai-search-ask-ai-button-return"
                  sx={{ color: "#0d4ac3", fontSize: 16 }}
                />
              </span>
            }
            onClick={() => submitToAi(query)}
            onMouseDown={(event) => event.preventDefault()}
            shape="pill"
            size="small"
            variant="secondary"
          >
            Ask Zuora AI
          </AiButton>
        </div>
      </div>

      <div className={`ai-search-panel-shell${isOpen ? " is-open" : ""}`}>
        <div
          aria-hidden={!isOpen || undefined}
          className="ai-search-panel"
          id={panelId}
          role="listbox"
        >
          {hasQuery ? (
            <>
              <button
                className="ai-search-ai-alert"
                onClick={() => submitToAi(query)}
                type="button"
              >
                <img alt="" aria-hidden="true" className="ai-search-ai-alert-spark" src={aiSparkTabIconUrl} />
                <span>Press Enter to ask AI for help with your request.</span>
              </button>

              <section className="ai-search-global-results">
                <div className="ai-search-global-results-heading">
                  <span aria-hidden="true" className="ai-search-global-results-divider" />
                  <h3>Zuora Global Search Results</h3>
                  <span aria-hidden="true" className="ai-search-global-results-divider" />
                </div>

                <p className="ai-search-global-results-count">
                  {isGlobalSearchLoading ? (
                    <span className="ai-search-global-results-loading-copy">Searching...</span>
                  ) : hasGlobalResults ? (
                    <>{totalEntityCount} entities found</>
                  ) : (
                    <>
                      0 entities found for <strong>&quot;{trimmedQuery}&quot;</strong>.
                    </>
                  )}
                </p>

                {isGlobalSearchLoading ? (
                  <div
                    aria-busy="true"
                    aria-live="polite"
                    className="ai-search-global-results-layout ai-search-global-results-skeleton"
                    role="status"
                  >
                    <div aria-hidden="true" className="ai-search-global-results-skeleton-nav">
                      {Array.from({ length: 6 }, (_, index) => (
                        <span className="ai-search-skeleton-bar ai-search-skeleton-bar--nav" key={index} />
                      ))}
                    </div>
                    <div aria-hidden="true" className="ai-search-global-results-skeleton-list">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span className="ai-search-skeleton-bar" key={index} />
                      ))}
                    </div>
                    <span className="visually-hidden">Loading global search results</span>
                  </div>
                ) : hasGlobalResults ? (
                  <div className="ai-search-global-results-layout">
                    <nav aria-label="Search categories" className="ai-search-category-nav">
                      {GLOBAL_SEARCH_CATEGORIES.map((category) => {
                        const count = categoryCounts[category] ?? 0;
                        const isActive = category === displayedCategory;

                        return (
                          <button
                            className={`ai-search-category-item${isActive ? " is-active" : ""}${count === 0 ? " is-empty" : ""}`}
                            disabled={count === 0}
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            type="button"
                          >
                            <span>{category}</span>
                          </button>
                        );
                      })}
                    </nav>

                    <div className="ai-search-results-column">
                      <ul className="ai-search-entity-list">
                        {globalResults.map((result) => (
                          <li key={result.id}>
                            <button
                              className="ai-search-entity-item"
                              onClick={() => {
                                setQuery(result.title);
                                setIsOpen(false);
                              }}
                              type="button"
                            >
                              <span className="ai-search-entity-copy">
                                <span className="ai-search-entity-title">{result.title}</span>
                                <span className="ai-search-entity-meta">{result.meta}</span>
                              </span>
                              {result.status ? (
                                <span className="ai-search-entity-status">{result.status}</span>
                              ) : null}
                            </button>
                          </li>
                        ))}
                      </ul>

                      {categoryResultCount > 0 ? (
                        <button className="ai-search-view-all" type="button">
                          View all {displayedCategory} matching <strong>{trimmedQuery}</strong> (
                          {categoryResultCount} results)
                        </button>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </section>
            </>
          ) : (
            <>
              <section className="ai-search-panel-section">
                <h3 className="ai-search-panel-section-title">Recent searches</h3>
                <ul className="ai-search-history-list">
                  {searchHistory.map((entry) => (
                    <li className="ai-search-history-row" key={entry}>
                      <button
                        className="ai-search-history-item"
                        onClick={() => handleSelectHistory(entry)}
                        type="button"
                      >
                        <HistoryOutlinedIcon aria-hidden="true" />
                        <span className="ai-search-history-label">{entry}</span>
                      </button>
                      <button
                        aria-label={`Remove "${entry}" from recent searches`}
                        className="ai-search-history-delete"
                        onClick={(event) => handleRemoveHistory(entry, event)}
                        type="button"
                      >
                        <CloseOutlinedIcon aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="ai-search-panel-section">
                <h3 className="ai-search-panel-section-title">AI suggestions</h3>
                <div className="ai-search-suggestion-list">
                  {AI_SEARCH_SUGGESTIONS.map((action) => (
                    <button
                      className="ai-search-suggestion-item"
                      key={action.id}
                      onClick={() => handleSelectSuggestion(action)}
                      type="button"
                    >
                      <img alt="" aria-hidden="true" className="ai-search-suggestion-icon" src={aiSparkTabIconUrl} />
                      <span className="ai-search-suggestion-label">{action.label}</span>
                    </button>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
