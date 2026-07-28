import type {
  CustomWidgetDraft,
  EmbedAuthenticationMode,
  EmbedAuthenticationType,
  EmbedCredentials,
  EmbedSource,
  TableauConnectionSettings,
  TableauDashboardSettings,
  TableauShowHeaderOption,
  TableauVisibleRole,
} from "./types";
import { validateEmbedUrl } from "./embedPolicy";

export type { EmbedAuthenticationMode, EmbedAuthenticationType, EmbedCredentials, EmbedSource };

export const EMBED_SOURCE_OPTIONS: { label: string; value: EmbedSource }[] = [
  { value: "tableau", label: "Tableau" },
];

export const TABLEAU_PROVIDER_LABEL = "Salesforce Tableau — Connected App (Direct Trust)";

export const TABLEAU_SHOW_HEADER_OPTIONS: { label: string; value: TableauShowHeaderOption }[] = [
  { value: "off", label: "Off" },
  { value: "on", label: "On" },
];

export const TABLEAU_VISIBLE_ROLE_OPTIONS: { label: string; value: TableauVisibleRole }[] = [
  { value: "finance-viewer", label: "Finance Viewer" },
  { value: "billing-admin", label: "Billing Admin" },
];

export const EMBED_URL_PLACEHOLDERS: Record<EmbedSource, string> = {
  tableau: "https://10ay.online.tableau.com/views/RevenueDashboard/RevenueOverview",
};

const DEFAULT_EMBED_URL_PLACEHOLDER = EMBED_URL_PLACEHOLDERS.tableau;

export const DEFAULT_TABLEAU_CONNECTION: TableauConnectionSettings = {
  connectionName: "Production Tableau",
  provider: TABLEAU_PROVIDER_LABEL,
  siteUrl: "https://10ay.online.tableau.com/views/RevenueDashboard/RevenueOverview",
  clientId: "",
  secretId: "",
  connectedAppSecret: "",
  userMapping: "Email match (Zuora email → Tableau username)",
};

export const DEFAULT_TABLEAU_DASHBOARD: TableauDashboardSettings = {
  displayName: "",
  connectionName: "Production Tableau",
  defaultHeightPx: "800",
  showTableauHeader: "off",
  contextFilters: "Zuora Account ID → Tableau filter AccountId · Equals · page.accountId",
  visibleToRoles: "finance-viewer",
};

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
    embedAuthenticationType: "oauth2" as EmbedAuthenticationType,
    embedCredentials: { ...DEFAULT_EMBED_CREDENTIALS },
    tableauConnection: { ...DEFAULT_TABLEAU_CONNECTION },
    tableauDashboard: { ...DEFAULT_TABLEAU_DASHBOARD },
  };
}

function isSupportedEmbedSource(source: EmbedSource | string | undefined): source is EmbedSource {
  return source === "tableau";
}

function isSupportedShowHeader(value: string | undefined): value is TableauShowHeaderOption {
  return value === "on" || value === "off";
}

function isSupportedVisibleRole(value: string | undefined): value is TableauVisibleRole {
  return value === "finance-viewer" || value === "billing-admin";
}

function normalizeVisibleToRole(value: string | undefined): TableauVisibleRole {
  if (isSupportedVisibleRole(value)) {
    return value;
  }

  if (value?.includes("Billing Admin") && !value.includes("Finance Viewer")) {
    return "billing-admin";
  }

  return "finance-viewer";
}

export function getEmbedUrlPlaceholder(_source: EmbedSource) {
  return DEFAULT_EMBED_URL_PLACEHOLDER;
}

export function normalizeTableauConnection(
  connection: Partial<TableauConnectionSettings> | undefined,
): TableauConnectionSettings {
  const defaults = DEFAULT_TABLEAU_CONNECTION;

  return {
    connectionName: connection?.connectionName?.trim() || defaults.connectionName,
    provider: connection?.provider?.trim() || defaults.provider,
    siteUrl: connection?.siteUrl?.trim() || defaults.siteUrl,
    clientId: connection?.clientId ?? defaults.clientId,
    secretId: connection?.secretId ?? defaults.secretId,
    connectedAppSecret: connection?.connectedAppSecret ?? defaults.connectedAppSecret,
    userMapping: connection?.userMapping?.trim() || defaults.userMapping,
  };
}

export function normalizeTableauDashboard(
  dashboard: Partial<TableauDashboardSettings> | undefined,
  connectionName?: string,
): TableauDashboardSettings {
  const defaults = DEFAULT_TABLEAU_DASHBOARD;
  const resolvedConnectionName =
    dashboard?.connectionName?.trim() || connectionName?.trim() || defaults.connectionName;

  return {
    connectionName: resolvedConnectionName,
    contextFilters: dashboard?.contextFilters?.trim() || defaults.contextFilters,
    defaultHeightPx: dashboard?.defaultHeightPx?.trim() || defaults.defaultHeightPx,
    displayName: dashboard?.displayName ?? defaults.displayName,
    showTableauHeader: isSupportedShowHeader(dashboard?.showTableauHeader)
      ? dashboard.showTableauHeader
      : defaults.showTableauHeader,
    visibleToRoles: normalizeVisibleToRole(dashboard?.visibleToRoles),
  };
}

export function isTableauConnectionStepValid(connection: TableauConnectionSettings) {
  return (
    connection.provider.trim().length > 0 &&
    connection.siteUrl.trim().length > 0 &&
    connection.clientId.trim().length > 0 &&
    connection.secretId.trim().length > 0 &&
    connection.connectedAppSecret.trim().length > 0
  );
}

export function isEmbedConfigValid(draft: CustomWidgetDraft) {
  if (draft.type !== "embed") {
    return true;
  }

  if (!validateEmbedUrl(draft.content).valid) {
    return false;
  }

  return isTableauConnectionStepValid(draft.tableauConnection);
}

export function normalizeEmbedConfig(widget: Partial<CustomWidgetDraft>): {
  embedSource: EmbedSource;
  embedAuthenticationMode: EmbedAuthenticationMode;
  embedAuthenticationType: EmbedAuthenticationType;
  embedCredentials: EmbedCredentials;
  tableauConnection: TableauConnectionSettings;
  tableauDashboard: TableauDashboardSettings;
} {
  const defaults = createDefaultEmbedConfig();
  const credentials = widget.embedCredentials ?? defaults.embedCredentials;
  const tableauConnection = normalizeTableauConnection(widget.tableauConnection);

  return {
    embedSource: isSupportedEmbedSource(widget.embedSource)
      ? widget.embedSource
      : defaults.embedSource,
    embedAuthenticationMode:
      widget.embedAuthenticationMode === "user-login-required"
        ? "user-login-required"
        : "shared-credentials",
    embedAuthenticationType: defaults.embedAuthenticationType,
    embedCredentials: {
      credential1: credentials.credential1 ?? "",
      credential2: credentials.credential2 ?? "",
      credential3: credentials.credential3 ?? "",
      credential4: credentials.credential4 ?? "",
    },
    tableauConnection,
    tableauDashboard: normalizeTableauDashboard(
      widget.tableauDashboard,
      tableauConnection.connectionName,
    ),
  };
}
