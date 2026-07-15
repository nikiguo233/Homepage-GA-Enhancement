import type { DashboardWidgetId } from "../components/dashboardWidgets/catalog";
import type { AiRecommendation } from "./types";

export const HOMEPAGE_CREATION_RECOMMENDATIONS: AiRecommendation[] = [
  {
    name: "Active Contracts",
    reason: "Shows contract volume at a glance so you can gauge revenue pipeline health.",
  },
  {
    name: "Deferred Revenue",
    reason: "Tracks unrecognized revenue to catch timing issues before close.",
  },
  {
    name: "Compliance Risk",
    reason: "Flags ASC 606 exposure early so finance can act before reporting.",
  },
  {
    name: "Close Readiness",
    reason: "Summarizes period-close progress so blockers are visible immediately.",
  },
  {
    name: "Revenue Recognition Trend",
    reason: "Reveals monthly patterns to spot anomalies and forecast recognition.",
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

export const CLEANUP_REMOVAL_REASONS: Record<string, string> = {
  "active-batches": "Niche for most revenue roles and adds clutter to the default layout.",
  "Close Readiness": "Overlaps with task-focused widgets that already track close actions.",
  "Compliance Risk": "Secondary signal when core contract and revenue metrics are already visible.",
  "file-upload": "Opened infrequently after setup; uploads are faster from dedicated workflows.",
  "rc-search": "Low daily usage compared to task and overview widgets; global search covers most needs.",
};

export const CLEANUP_LAYOUT_REASON =
  "Reordered to put actionable tasks and summaries ahead of admin utilities.";

export function getCleanupRemovalReason(id: string) {
  return CLEANUP_REMOVAL_REASONS[id] ?? "Rarely used compared with the widgets that remain on your homepage.";
}
