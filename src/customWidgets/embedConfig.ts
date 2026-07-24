import type { CustomWidgetDraft, EmbedAuthenticationMode, EmbedAuthenticationType, EmbedCredentials, EmbedSource } from "./types";
import { validateEmbedUrl } from "./embedPolicy";

export type { EmbedAuthenticationMode, EmbedAuthenticationType, EmbedCredentials, EmbedSource };

export const EMBED_SOURCE_OPTIONS: { label: string; value: EmbedSource }[] = [
  { value: "tableau", label: "Tableau" },
];

export const EMBED_URL_PLACEHOLDERS: Record<EmbedSource, string> = {
  tableau: "https://your-server.tableau.com/#/site/YourSite/views/WorkbookName/ViewName",
};

const DEFAULT_EMBED_URL_PLACEHOLDER = EMBED_URL_PLACEHOLDERS.tableau;

export const EMBED_AUTHENTICATION_TYPE_OPTIONS: {
  label: string;
  value: EmbedAuthenticationType;
}[] = [
  { value: "", label: "Select authentication type" },
  { value: "oauth2", label: "OAuth 2.0" },
  { value: "api-key", label: "API Key" },
];

export const DEFAULT_EMBED_CREDENTIALS: EmbedCredentials = {
  credential1: "",
  credential2: "",
  credential3: "",
  credential4: "",
};

export function createDefaultEmbedConfig() {
  return {
    embedSource: "tableau" as EmbedSource,
    embedAuthenticationMode: "shared-credentials" as EmbedAuthenticationMode,
    embedAuthenticationType: "" as EmbedAuthenticationType,
    embedCredentials: { ...DEFAULT_EMBED_CREDENTIALS },
  };
}

function isSupportedEmbedAuthenticationType(
  authenticationType: EmbedAuthenticationType | undefined,
): authenticationType is EmbedAuthenticationType {
  return EMBED_AUTHENTICATION_TYPE_OPTIONS.some((option) => option.value === authenticationType);
}

function isSupportedEmbedSource(source: EmbedSource | string | undefined): source is EmbedSource {
  return source === "tableau";
}

export function getEmbedUrlPlaceholder(source: EmbedSource) {
  return EMBED_URL_PLACEHOLDERS[source] ?? DEFAULT_EMBED_URL_PLACEHOLDER;
}

export function getEmbedCredentialFieldLabels(
  authenticationType: EmbedAuthenticationType,
): [string, string, string, string] {
  switch (authenticationType) {
    case "oauth2":
      return ["Client ID", "Client Secret", "Authorization URL", "Token URL"];
    case "api-key":
      return ["API Key", "API Secret", "Header Name", "Header Value"];
    case "basic":
      return ["Username", "Password", "Realm", "Domain"];
    case "saml":
      return ["Entity ID", "SSO URL", "Certificate", "Relay State"];
    default:
      return ["Label", "Label", "Label", "Label"];
  }
}

export function isEmbedConfigValid(draft: CustomWidgetDraft) {
  if (draft.type !== "embed") {
    return true;
  }

  if (!validateEmbedUrl(draft.content).valid) {
    return false;
  }

  if (
    draft.embedAuthenticationMode === "shared-credentials" &&
    !draft.embedAuthenticationType
  ) {
    return false;
  }

  return true;
}

export function normalizeEmbedConfig(widget: Partial<CustomWidgetDraft>): {
  embedSource: EmbedSource;
  embedAuthenticationMode: EmbedAuthenticationMode;
  embedAuthenticationType: EmbedAuthenticationType;
  embedCredentials: EmbedCredentials;
} {
  const defaults = createDefaultEmbedConfig();
  const credentials = widget.embedCredentials ?? defaults.embedCredentials;

  return {
    embedSource: isSupportedEmbedSource(widget.embedSource)
      ? widget.embedSource
      : defaults.embedSource,
    embedAuthenticationMode:
      widget.embedAuthenticationMode === "user-login-required"
        ? "user-login-required"
        : "shared-credentials",
    embedAuthenticationType: isSupportedEmbedAuthenticationType(widget.embedAuthenticationType)
      ? widget.embedAuthenticationType
      : defaults.embedAuthenticationType,
    embedCredentials: {
      credential1: credentials.credential1 ?? "",
      credential2: credentials.credential2 ?? "",
      credential3: credentials.credential3 ?? "",
      credential4: credentials.credential4 ?? "",
    },
  };
}
