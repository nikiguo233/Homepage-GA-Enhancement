import type { CustomWidgetDraft, EmbedAuthenticationMode, EmbedAuthenticationType, EmbedCredentials } from "./types";
import { validateEmbedUrl } from "./embedPolicy";

export type { EmbedAuthenticationMode, EmbedAuthenticationType, EmbedCredentials };

export const EMBED_AUTHENTICATION_TYPE_OPTIONS: {
  label: string;
  value: EmbedAuthenticationType;
}[] = [
  { value: "", label: "Select authentication type" },
  { value: "oauth2", label: "OAuth 2.0" },
  { value: "api-key", label: "API Key" },
  { value: "basic", label: "Basic Authentication" },
  { value: "saml", label: "SAML 2.0" },
];

export const DEFAULT_EMBED_CREDENTIALS: EmbedCredentials = {
  credential1: "",
  credential2: "",
  credential3: "",
  credential4: "",
};

export function createDefaultEmbedConfig() {
  return {
    embedAuthenticationMode: "shared-credentials" as EmbedAuthenticationMode,
    embedAuthenticationType: "" as EmbedAuthenticationType,
    embedCredentials: { ...DEFAULT_EMBED_CREDENTIALS },
  };
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
  embedAuthenticationMode: EmbedAuthenticationMode;
  embedAuthenticationType: EmbedAuthenticationType;
  embedCredentials: EmbedCredentials;
} {
  const defaults = createDefaultEmbedConfig();
  const credentials = widget.embedCredentials ?? defaults.embedCredentials;

  return {
    embedAuthenticationMode:
      widget.embedAuthenticationMode === "user-login-required"
        ? "user-login-required"
        : "shared-credentials",
    embedAuthenticationType: EMBED_AUTHENTICATION_TYPE_OPTIONS.some(
      (option) => option.value === widget.embedAuthenticationType,
    )
      ? (widget.embedAuthenticationType as EmbedAuthenticationType)
      : defaults.embedAuthenticationType,
    embedCredentials: {
      credential1: credentials.credential1 ?? "",
      credential2: credentials.credential2 ?? "",
      credential3: credentials.credential3 ?? "",
      credential4: credentials.credential4 ?? "",
    },
  };
}
