import type { DashboardWidgetId } from "../components/dashboardWidgets/catalog";
import type { AiRecommendation, RecommendedWidget } from "./types";

export const AI_RECOMMENDATION_TOP_ACCOUNTS_ID = "ai-recommendation:top-accounts";

export const HOMEPAGE_CREATION_RECOMMENDATIONS: AiRecommendation[] = [
  {
    name: "Active Contracts",
    reason: "Shows contract volume at a glance so you can gauge revenue pipeline health.",
    source: "ai-generated",
  },
  {
    name: "Deferred Revenue",
    reason: "Tracks unrecognized revenue to catch timing issues before close.",
    source: "ai-generated",
  },
  {
    name: "Compliance Risk",
    reason: "Flags ASC 606 exposure early so finance can act before reporting.",
    source: "ai-generated",
  },
  {
    name: "Close Readiness",
    reason: "Summarizes period-close progress so blockers are visible immediately.",
    source: "ai-generated",
  },
  {
    name: "Revenue Recognition Trend",
    reason: "Reveals monthly patterns to spot anomalies and forecast recognition.",
    source: "library",
  },
];

export const MONTH_END_CLOSE_LIBRARY_WIDGET_IDS: DashboardWidgetId[] = [
  "revenue-progress",
  "revenue-tasks",
  "run-report",
];

export const MONTH_END_CLOSE_DASHBOARD_RECOMMENDATIONS: AiRecommendation[] = [
  {
    name: "Close Readiness",
    reason: "Tracks period-close completion so you can spot blockers before sign-off.",
    source: "ai-generated",
  },
  {
    name: "Open Exceptions",
    reason: "Surfaces unresolved items that must be cleared before you can close the period.",
    source: "ai-generated",
  },
  {
    name: "Compliance Risk",
    reason: "Highlights ASC 606 exposure that needs review before the books close.",
    source: "ai-generated",
  },
  {
    name: "Deferred Revenue",
    reason: "Shows unrecognized revenue balances that may need close adjustments.",
    source: "ai-generated",
  },
  {
    name: "Close Process Status",
    reason: "From your widget library — keeps close milestones and blockers visible in one view.",
    source: "library",
  },
  {
    name: "Revenue Tasks",
    reason: "From your widget library — lists exceptions and actions that must finish before close.",
    source: "library",
  },
  {
    name: "Zuora Revenue Report",
    reason: "From your widget library — puts close-related reports and recent downloads one click away.",
    source: "library",
  },
];

export const AI_GENERATED_WIDGET_RECOMMENDATIONS: RecommendedWidget[] = [
  {
    id: AI_RECOMMENDATION_TOP_ACCOUNTS_ID,
    name: "Top Accounts by Open Balance",
    description: "Custom HTML table ranking the top 10 accounts by open balance.",
    reason: "Surfaces high-risk receivables so billing teams can prioritize follow-up.",
    source: "ai-generated",
  },
];

export const WIDGET_RECOMMENDATION_REASONS: Record<DashboardWidgetId, string> = {
  "active-batches": "Useful when your team monitors SSP batch runs throughout the day.",
  "file-upload": "Adds quick ingest access when file uploads are part of your routine.",
  "rc-search": "Brings contract lookup to the homepage when search is a daily habit.",
  "revenue-overview": "Helps explain regional revenue mix and variances to stakeholders.",
  "revenue-progress": "Gives period-close milestones and tasks in one dedicated view.",
  "revenue-tasks": "Surfaces exceptions that need action before you can close the period.",
  "run-program": "Keeps scheduled recognition jobs visible without leaving the homepage.",
  "run-report": "Puts your most-used recognition reports one click away.",
};

export const REORGANIZE_DEPRIORITIZE_REASONS: Record<string, string> = {
  "Close Readiness": "Moved below top-priority revenue metrics so contract and revenue KPIs stay above the fold.",
  "Compliance Risk": "Moved below top-priority revenue metrics so contract and revenue KPIs stay above the fold.",
};

export const CLEANUP_REMOVAL_REASONS: Record<string, string> = {
  "active-batches": "Niche for most revenue roles and adds clutter to the default layout.",
  "Close Readiness": "Overlaps with task-focused widgets that already track close actions.",
  "Compliance Risk": "Secondary signal when core contract and revenue metrics are already visible.",
  "file-upload": "Opened infrequently after setup; uploads are faster from dedicated workflows.",
  "rc-search": "Low daily usage compared to task and overview widgets; global search covers most needs.",
};

export const CLEANUP_LAYOUT_REASON =
  "Reordered to put the most important metrics and actionable widgets at the top of your homepage.";

export function getCleanupRemovalReason(id: string) {
  return (
    REORGANIZE_DEPRIORITIZE_REASONS[id] ??
    CLEANUP_REMOVAL_REASONS[id] ??
    "Moved down so higher-priority metrics stay at the top of your homepage."
  );
}
