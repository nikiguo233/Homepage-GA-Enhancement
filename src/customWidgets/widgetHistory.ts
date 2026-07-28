import type { CustomWidget, CustomWidgetDraft, CustomWidgetHistoryAction } from "./types";
import { getWidgetSizeLabel } from "./widgetSizes";
import { getCustomWidgetAccessLabel } from "./widgetAccess";

export const CURRENT_WIDGET_ACTOR = "You";

export function createHistoryId() {
  return `cwh-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getHistoryActionLabel(action: CustomWidgetHistoryAction) {
  switch (action) {
    case "created":
      return "Created";
    case "updated":
    case "saved":
      return "Updated";
    case "published":
      return "Published";
    case "unpublished":
      return "Unpublished";
    case "deleted":
      return "Deleted";
    default:
      return action;
  }
}

export function formatHistoryTimestamp(isoTimestamp: string) {
  const date = new Date(isoTimestamp);
  if (Number.isNaN(date.getTime())) {
    return isoTimestamp;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatSupportedSizes(sizes: CustomWidget["supportedSizes"]) {
  return sizes.map((size) => getWidgetSizeLabel(size)).join(", ");
}

function summarizeDraftChanges(previous: CustomWidget, draft: CustomWidgetDraft) {
  const details: string[] = [];

  if (previous.name !== draft.name) {
    details.push(`Name: "${previous.name}" → "${draft.name}"`);
  }

  if (previous.description !== draft.description) {
    details.push("Description updated");
  }

  if (previous.type !== draft.type) {
    details.push(`Type: ${previous.type} → ${draft.type}`);
  }

  if (previous.size !== draft.size) {
    details.push(
      `Preview size: ${getWidgetSizeLabel(previous.size)} → ${getWidgetSizeLabel(draft.size)}`,
    );
  }

  const previousSupported = formatSupportedSizes(previous.supportedSizes);
  const nextSupported = formatSupportedSizes(draft.supportedSizes);
  if (previousSupported !== nextSupported) {
    details.push(`Supported sizes: ${previousSupported} → ${nextSupported}`);
  }

  if (previous.access !== draft.access) {
    details.push(
      `Access: ${getCustomWidgetAccessLabel(previous.access)} → ${getCustomWidgetAccessLabel(draft.access)}`,
    );
  }

  if (previous.labelAsExternalContent !== draft.labelAsExternalContent) {
    details.push(
      draft.labelAsExternalContent
        ? "Marked as external content"
        : "Removed external content label",
    );
  }


  if (previous.type === "embed" && draft.type === "embed") {
    if (previous.embedAuthenticationMode !== draft.embedAuthenticationMode) {
      details.push(
        `Authentication mode: ${previous.embedAuthenticationMode} → ${draft.embedAuthenticationMode}`,
      );
    }

    if (previous.embedAuthenticationType !== draft.embedAuthenticationType) {
      details.push(
        draft.embedAuthenticationType
          ? `Authentication type set to ${draft.embedAuthenticationType}`
          : "Authentication type cleared",
      );
    }

    if (JSON.stringify(previous.embedCredentials) !== JSON.stringify(draft.embedCredentials)) {
      details.push("Embed credentials updated");
    }
  }

  if (previous.content !== draft.content) {
    details.push(draft.type === "html" ? "HTML content updated" : "Embed URL updated");
  }

  return details;
}

export function buildHistorySummary(
  action: CustomWidgetHistoryAction,
  widgetName: string,
  details: string[],
) {
  switch (action) {
    case "created":
      return `Created widget "${widgetName}".`;
    case "updated":
    case "saved":
      return details.length > 0
        ? `Updated widget "${widgetName}".`
        : `Updated widget "${widgetName}" with no field changes.`;
    case "published":
      return `Published widget "${widgetName}" to the tenant library.`;
    case "unpublished":
      return `Unpublished widget "${widgetName}" and moved it back to drafts.`;
    case "deleted":
      return `Deleted widget "${widgetName}".`;
    default:
      return widgetName;
  }
}

export function buildHistoryEntry({
  action,
  actor = CURRENT_WIDGET_ACTOR,
  details = [],
  occurredAt,
  widgetId,
  widgetName,
}: {
  action: CustomWidgetHistoryAction;
  actor?: string;
  details?: string[];
  occurredAt: string;
  widgetId: string;
  widgetName: string;
}) {
  return {
    id: createHistoryId(),
    action,
    actor,
    details,
    occurredAt,
    summary: buildHistorySummary(action, widgetName, details),
    widgetId,
    widgetName,
  };
}

export function buildSaveHistoryEntry({
  actor = CURRENT_WIDGET_ACTOR,
  draft,
  occurredAt,
  previous,
  widgetId,
}: {
  actor?: string;
  draft: CustomWidgetDraft;
  occurredAt: string;
  previous?: CustomWidget;
  widgetId: string;
}) {
  const widgetName = draft.name.trim() || "Untitled Widget";

  if (!previous) {
    return buildHistoryEntry({
      action: "created",
      actor,
      details: [
        `Type: ${draft.type}`,
        `Preview size: ${getWidgetSizeLabel(draft.size)}`,
        `Supported sizes: ${formatSupportedSizes(draft.supportedSizes)}`,
      ],
      occurredAt,
      widgetId,
      widgetName,
    });
  }

  const details = summarizeDraftChanges(previous, draft);
  const nextStatus = draft.status ?? previous.status;
  let action: CustomWidgetHistoryAction = "updated";

  if (previous.status !== "published" && nextStatus === "published") {
    action = "published";
  } else if (previous.status === "published" && nextStatus === "draft") {
    action = "unpublished";
  }

  return buildHistoryEntry({
    action,
    actor,
    details,
    occurredAt,
    widgetId,
    widgetName,
  });
}
