import { useCallback, useEffect, useState } from "react";
import { DEFAULT_CUSTOM_WIDGET_HTML, DEFAULT_EMBED_URL } from "./defaultTemplate";
import { createDefaultEmbedConfig, normalizeEmbedConfig } from "./embedConfig";
import type {
  CustomWidget,
  CustomWidgetDraft,
  CustomWidgetHistoryEntry,
  CustomWidgetType,
} from "./types";
import { buildHistoryEntry, buildSaveHistoryEntry } from "./widgetHistory";
import { normalizeWidgetDataBinding } from "./widgetDataBinding";
import { DEFAULT_SUPPORTED_WIDGET_SIZES, normalizeSupportedWidgetSizes, normalizeWidgetSize } from "./widgetSizes";

const STORAGE_KEY = "zuora-custom-widgets";
const HISTORY_STORAGE_KEY = "zuora-custom-widget-history";
const MAX_HISTORY_ENTRIES = 200;

function createWidgetId() {
  return `cw-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function loadWidgets(): CustomWidget[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as CustomWidget[];
    return Array.isArray(parsed)
      ? parsed.map((widget) => {
          const size = normalizeWidgetSize(widget.size);
          return {
            ...widget,
            size,
            supportedSizes: normalizeSupportedWidgetSizes(widget.supportedSizes, size),
            labelAsExternalContent: Boolean(widget.labelAsExternalContent),
            displayWidgetName: Boolean(widget.displayWidgetName),
            ...normalizeEmbedConfig(widget),
            dataBinding: normalizeWidgetDataBinding(widget),
          };
        })
      : [];
  } catch {
    return [];
  }
}

function loadHistory(): CustomWidgetHistoryEntry[] {
  try {
    const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as CustomWidgetHistoryEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistWidgets(widgets: CustomWidget[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets));
}

function persistHistory(entries: CustomWidgetHistoryEntry[]) {
  window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries));
}

function prependHistoryEntry(
  entries: CustomWidgetHistoryEntry[],
  entry: CustomWidgetHistoryEntry,
) {
  return [entry, ...entries].slice(0, MAX_HISTORY_ENTRIES);
}

export function createEmptyCustomWidgetDraft(
  type: CustomWidgetType = "html",
): CustomWidgetDraft {
  return {
    name: "",
    description: "",
    type,
    content: type === "html" ? DEFAULT_CUSTOM_WIDGET_HTML : DEFAULT_EMBED_URL,
    size: "3x3",
    supportedSizes: [...DEFAULT_SUPPORTED_WIDGET_SIZES],
    labelAsExternalContent: type === "embed",
    displayWidgetName: false,
    ...createDefaultEmbedConfig(),
  };
}

export function useCustomWidgets() {
  const [widgets, setWidgets] = useState<CustomWidget[]>(() => loadWidgets());
  const [historyEntries, setHistoryEntries] = useState<CustomWidgetHistoryEntry[]>(() => loadHistory());

  useEffect(() => {
    persistWidgets(widgets);
  }, [widgets]);

  useEffect(() => {
    persistHistory(historyEntries);
  }, [historyEntries]);

  const saveWidget = useCallback((draft: CustomWidgetDraft, existingId?: string): string => {
    const now = new Date().toISOString();
    const widgetId = existingId ?? createWidgetId();
    const previous = existingId ? widgets.find((widget) => widget.id === existingId) : undefined;

    setHistoryEntries((history) =>
      prependHistoryEntry(
        history,
        buildSaveHistoryEntry({
          draft,
          occurredAt: now,
          previous,
          widgetId,
        }),
      ),
    );

    setWidgets((current) => {
      if (existingId) {
        return current.map((widget) =>
          widget.id === existingId
            ? {
                ...widget,
                ...draft,
                status: draft.status ?? widget.status,
                updatedAt: now,
              }
            : widget,
        );
      }

      const newWidget: CustomWidget = {
        id: widgetId,
        name: draft.name,
        description: draft.description,
        type: draft.type,
        content: draft.content,
        size: draft.size,
        supportedSizes: draft.supportedSizes,
        labelAsExternalContent: draft.labelAsExternalContent,
        displayWidgetName: draft.displayWidgetName,
        embedAuthenticationMode: draft.embedAuthenticationMode,
        embedAuthenticationType: draft.embedAuthenticationType,
        embedCredentials: draft.embedCredentials,
        dataBinding: draft.dataBinding,
        status: draft.status ?? "draft",
        createdAt: now,
        updatedAt: now,
      };

      return [...current, newWidget];
    });

    return widgetId;
  }, [widgets]);

  const publishWidget = useCallback((widgetId: string) => {
    const now = new Date().toISOString();

    setWidgets((current) =>
      current.map((widget) =>
        widget.id === widgetId
          ? { ...widget, status: "published", updatedAt: now }
          : widget,
      ),
    );
  }, []);

  const deleteWidget = useCallback((widgetId: string) => {
    const widget = widgets.find((entry) => entry.id === widgetId);
    if (widget) {
      setHistoryEntries((history) =>
        prependHistoryEntry(
          history,
          buildHistoryEntry({
            action: "deleted",
            occurredAt: new Date().toISOString(),
            widgetId: widget.id,
            widgetName: widget.name.trim() || "Untitled Widget",
          }),
        ),
      );
    }

    setWidgets((current) => current.filter((entry) => entry.id !== widgetId));
  }, [widgets]);

  const getWidgetById = useCallback(
    (widgetId: string) => widgets.find((widget) => widget.id === widgetId),
    [widgets],
  );

  const clearHistory = useCallback(() => {
    setHistoryEntries([]);
  }, []);

  const publishedWidgets = widgets.filter((widget) => widget.status === "published");
  const draftWidgets = widgets.filter((widget) => widget.status === "draft");

  return {
    clearHistory,
    deleteWidget,
    draftWidgets,
    getWidgetById,
    historyEntries,
    publishWidget,
    publishedWidgets,
    saveWidget,
    widgets,
  };
}
