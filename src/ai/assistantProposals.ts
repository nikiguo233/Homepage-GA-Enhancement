import type { CustomWidgetDraft } from "../customWidgets/types";
import {
  buildTopAccountsLiveWidgetHtml,
  DEFAULT_TOP_ACCOUNTS_DATA_BINDING,
  getWidgetDataBindingQuerySummary,
  getWidgetDataBindingSourceLabel,
} from "../customWidgets/widgetDataBinding";
import { TEMPLATE_PREVIEW_TOP_ACCOUNTS_REF } from "../homepageConfig/teamTemplate";
import type { AiRecommendation, CustomWidgetProposal, TeamTemplateProposal, WidgetDataBindingProposal } from "./types";

export const TOP_ACCOUNTS_TABLE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Top Accounts by Open Balance</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #24292c; background: #fff; }
    .card { padding: 16px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .header h2 { font-size: 15px; font-weight: 600; }
    .header span { color: #767d82; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th, td { padding: 8px 10px; text-align: left; border-bottom: 1px solid #e6e9eb; }
    th { color: #575e63; font-weight: 600; background: #f6f7f8; }
    td.amount { text-align: right; font-variant-numeric: tabular-nums; }
    tr:last-child td { border-bottom: 0; }
    .rank { color: #767d82; width: 28px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>Top 10 Accounts by Open Balance</h2>
      <span>Sample data</span>
    </div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Account</th>
          <th>Status</th>
          <th>Open Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="rank">1</td><td>Acme Holdings</td><td>Past Due</td><td class="amount">$482,150</td></tr>
        <tr><td class="rank">2</td><td>Northwind Telecom</td><td>Open</td><td class="amount">$391,420</td></tr>
        <tr><td class="rank">3</td><td>Blue Ridge Media</td><td>Past Due</td><td class="amount">$318,900</td></tr>
        <tr><td class="rank">4</td><td>Summit Logistics</td><td>Open</td><td class="amount">$276,540</td></tr>
        <tr><td class="rank">5</td><td>Orion Systems</td><td>Open</td><td class="amount">$241,880</td></tr>
        <tr><td class="rank">6</td><td>Harbor Health</td><td>Past Due</td><td class="amount">$198,320</td></tr>
        <tr><td class="rank">7</td><td>Pacific Retail Group</td><td>Open</td><td class="amount">$176,110</td></tr>
        <tr><td class="rank">8</td><td>Vertex Analytics</td><td>Open</td><td class="amount">$154,760</td></tr>
        <tr><td class="rank">9</td><td>Cascade Manufacturing</td><td>Open</td><td class="amount">$132,490</td></tr>
        <tr><td class="rank">10</td><td>Evergreen Services</td><td>Open</td><td class="amount">$118,275</td></tr>
      </tbody>
    </table>
  </div>
</body>
</html>`;

export const TOP_ACCOUNTS_WIDGET_RATIONALE: AiRecommendation[] = [
  {
    name: "Custom HTML table",
    reason: "Ranks accounts by open balance so collections and billing teams can prioritize follow-up.",
  },
  {
    name: "6 x 4 widget size",
    reason: "Gives enough width for account names and currency columns without crowding the homepage.",
  },
  {
    name: "Live Zuora Billing data",
    reason: "Connects to Zuora Billing to load the top accounts by open balance automatically.",
  },
];

export const BILLING_OPS_TEMPLATE_RATIONALE: AiRecommendation[] = [
  {
    name: "Revenue Tasks",
    reason: "Surfaces billing exceptions that need action before invoices can be sent or collected.",
  },
  {
    name: "File Upload",
    reason: "Keeps payment and adjustment file ingest one click away for daily billing operations.",
  },
  {
    name: "Top Accounts by Open Balance",
    reason: "Gives the team a shared view of the highest-risk receivables on every homepage.",
  },
];

function buildTopAccountsWidgetBase(): Omit<CustomWidgetDraft, "content" | "dataBinding"> {
  return {
    name: "Top Accounts by Open Balance",
    description: "Shows the top 10 customer accounts ranked by open balance.",
    type: "html",
    size: "6x4",
    supportedSizes: ["3x3", "6x3", "6x4"],
    labelAsExternalContent: false,
    displayWidgetName: true,
    embedAuthenticationMode: "shared-credentials",
    embedAuthenticationType: "",
    embedCredentials: {
      credential1: "",
      credential2: "",
      credential3: "",
      credential4: "",
    },
  };
}

export function buildTopAccountsCustomWidgetDraft(useLiveData = false): CustomWidgetDraft {
  const base = buildTopAccountsWidgetBase();

  if (!useLiveData) {
    return {
      ...base,
      content: TOP_ACCOUNTS_TABLE_HTML,
    };
  }

  return {
    ...base,
    content: buildTopAccountsLiveWidgetHtml(DEFAULT_TOP_ACCOUNTS_DATA_BINDING),
    dataBinding: { ...DEFAULT_TOP_ACCOUNTS_DATA_BINDING },
  };
}

export const TOP_ACCOUNTS_CUSTOM_WIDGET_PROPOSAL: CustomWidgetProposal = {
  draft: buildTopAccountsCustomWidgetDraft(false),
  previewSummary:
    "A responsive HTML table listing the top 10 accounts by open balance with rank, account name, status, and amount columns.",
  rationale: TOP_ACCOUNTS_WIDGET_RATIONALE,
  supportsLiveData: true,
};

export function buildTopAccountsLiveDataProposal(): WidgetDataBindingProposal {
  const binding = { ...DEFAULT_TOP_ACCOUNTS_DATA_BINDING };

  return {
    binding,
    draft: buildTopAccountsCustomWidgetDraft(true),
    querySummary: getWidgetDataBindingQuerySummary(binding),
    sourceLabel: getWidgetDataBindingSourceLabel(binding.source),
  };
}

export const BILLING_OPS_TEAM_TEMPLATE_PROPOSAL: TeamTemplateProposal = {
  id: "billing-ops",
  name: "Billing Ops",
  description:
    "A shared homepage starter for billing operations teams with task tracking, file upload access, and an open-balance leaderboard.",
  audience: "Billing Operations",
  includedItems: BILLING_OPS_TEMPLATE_RATIONALE,
  sharingNote:
    "Publishing this template makes it available in your team's widget library so Billing Ops members can apply the same homepage layout.",
  suggestedWidgetIds: ["revenue-tasks", "file-upload"],
  previewCustomWidgetRefs: [TEMPLATE_PREVIEW_TOP_ACCOUNTS_REF],
};
