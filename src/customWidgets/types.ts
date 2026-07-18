export type CustomWidgetType = "html" | "embed";
export type CustomWidgetStatus = "draft" | "published";
export type CustomWidgetAccess = "private" | "tenant";
export type PresetCustomWidgetSize = "3x2" | "3x3" | "6x3" | "6x4";
export type CustomWidgetSize = PresetCustomWidgetSize | `${number}x${number}`;

export type EmbedAuthenticationMode = "shared-credentials" | "user-login-required";
export type EmbedAuthenticationType = "" | "oauth2" | "api-key" | "basic" | "saml";
export type EmbedSource = "" | "salesforce" | "tableau" | "powerbi";

export type EmbedCredentials = {
  credential1: string;
  credential2: string;
  credential3: string;
  credential4: string;
};

export type WidgetDataBindingSource = "zuora-billing";

export type WidgetDataBindingQueryType = "account-open-balance-top-n";

export type WidgetDataBinding = {
  source: WidgetDataBindingSource;
  queryType: WidgetDataBindingQueryType;
  limit: number;
  sort: "asc" | "desc";
  refreshIntervalMinutes: number;
};

export type CustomWidget = {
  id: string;
  name: string;
  description: string;
  type: CustomWidgetType;
  content: string;
  size: CustomWidgetSize;
  supportedSizes: CustomWidgetSize[];
  access: CustomWidgetAccess;
  labelAsExternalContent: boolean;
  displayWidgetName: boolean;
  embedSource: EmbedSource;
  embedAuthenticationMode: EmbedAuthenticationMode;
  embedAuthenticationType: EmbedAuthenticationType;
  embedCredentials: EmbedCredentials;
  dataBinding?: WidgetDataBinding;
  isAiGenerated?: boolean;
  status: CustomWidgetStatus;
  createdAt: string;
  updatedAt: string;
};

export type CustomWidgetDraft = Omit<CustomWidget, "id" | "createdAt" | "updatedAt" | "status"> & {
  status?: CustomWidgetStatus;
};

export type CustomWidgetHistoryAction =
  | "created"
  | "updated"
  | "saved"
  | "published"
  | "unpublished"
  | "deleted";

export type CustomWidgetHistoryEntry = {
  id: string;
  widgetId: string;
  widgetName: string;
  action: CustomWidgetHistoryAction;
  actor: string;
  occurredAt: string;
  summary: string;
  details: string[];
};

export const CUSTOM_WIDGET_ID_PREFIX = "custom:";

export function isCustomWidgetId(widgetId: string) {
  return widgetId.startsWith(CUSTOM_WIDGET_ID_PREFIX);
}

export function getCustomWidgetId(widget: CustomWidget) {
  return `${CUSTOM_WIDGET_ID_PREFIX}${widget.id}`;
}

export function createCustomWidgetRefId(widgetId: string, size?: CustomWidgetSize) {
  if (!size) {
    return `${CUSTOM_WIDGET_ID_PREFIX}${widgetId}`;
  }

  return `${CUSTOM_WIDGET_ID_PREFIX}${widgetId}:${size}`;
}

export type ParsedCustomWidgetRef = {
  size?: CustomWidgetSize;
  widgetId: string;
};

export function parseCustomWidgetRef(refId: string): ParsedCustomWidgetRef | null {
  if (!isCustomWidgetId(refId)) {
    return null;
  }

  const payload = refId.slice(CUSTOM_WIDGET_ID_PREFIX.length);
  const match = /^(.+):(\d+x\d+)$/.exec(payload);

  if (match) {
    return {
      widgetId: match[1],
      size: match[2] as CustomWidgetSize,
    };
  }

  return { widgetId: payload };
}

export function parseCustomWidgetId(refId: string) {
  return parseCustomWidgetRef(refId)?.widgetId ?? null;
}
