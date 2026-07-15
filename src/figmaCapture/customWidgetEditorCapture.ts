import { DEFAULT_CUSTOM_WIDGET_HTML, DEFAULT_EMBED_URL } from "../customWidgets/defaultTemplate";
import { createDefaultEmbedConfig } from "../customWidgets/embedConfig";
import { createEmptyCustomWidgetDraft } from "../customWidgets/useCustomWidgets";
import type { CustomWidgetDraft, CustomWidgetSize } from "../customWidgets/types";

export type CustomWidgetEditorCaptureScreen =
  | "basic-html"
  | "basic-embed"
  | "configure-html"
  | "configure-embed";

export type CustomWidgetEditorCaptureConfig = {
  draft: CustomWidgetDraft;
  screen: CustomWidgetEditorCaptureScreen;
  step: "basic" | "configure";
};

const CAPTURE_WIDGET_NAME = "Test Custom Widget";
const CAPTURE_WIDGET_DESCRIPTION =
  "A custom widget for team dashboards, announcements, and operational runbooks.";

function buildConfigureDraft(type: "html" | "embed"): CustomWidgetDraft {
  const base = {
    name: CAPTURE_WIDGET_NAME,
    description: CAPTURE_WIDGET_DESCRIPTION,
    size: "6x4" as CustomWidgetSize,
    supportedSizes: ["3x2", "3x3", "6x3", "6x4"] as CustomWidgetSize[],
    displayWidgetName: true,
    labelAsExternalContent: type === "embed",
    ...createDefaultEmbedConfig(),
  };

  if (type === "html") {
    return {
      ...base,
      type: "html",
      content: DEFAULT_CUSTOM_WIDGET_HTML,
    };
  }

  return {
    ...base,
    type: "embed",
    content: DEFAULT_EMBED_URL,
    embedAuthenticationMode: "shared-credentials",
    embedAuthenticationType: "oauth2",
  };
}

export function getCustomWidgetEditorCaptureConfig(): CustomWidgetEditorCaptureConfig | null {
  if (typeof window === "undefined") {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get("figma-capture") !== "custom-widget") {
    return null;
  }

  const screen = params.get("screen") as CustomWidgetEditorCaptureScreen | null;
  if (!screen) {
    return null;
  }

  switch (screen) {
    case "basic-html":
      return {
        draft: createEmptyCustomWidgetDraft("html"),
        screen,
        step: "basic",
      };
    case "basic-embed":
      return {
        draft: createEmptyCustomWidgetDraft("embed"),
        screen,
        step: "basic",
      };
    case "configure-html":
      return {
        draft: buildConfigureDraft("html"),
        screen,
        step: "configure",
      };
    case "configure-embed":
      return {
        draft: buildConfigureDraft("embed"),
        screen,
        step: "configure",
      };
    default:
      return null;
  }
}
