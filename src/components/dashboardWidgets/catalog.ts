export type DashboardWidgetId =
  | "active-batches"
  | "file-upload"
  | "rc-search"
  | "revenue-overview"
  | "revenue-progress"
  | "revenue-tasks"
  | "run-program"
  | "run-report";

export type DashboardWidgetDefinition = {
  id: DashboardWidgetId;
  name: string;
  description: string;
};

export const DASHBOARD_WIDGET_CATALOG: DashboardWidgetDefinition[] = [
  {
    id: "revenue-overview",
    name: "Revenue Overview",
    description: "Regional revenue breakdown with filters and donut chart.",
  },
  {
    id: "revenue-tasks",
    name: "Revenue Tasks",
    description: "Track exceptions and actions with pending data insights.",
  },
  {
    id: "run-report",
    name: "Zuora Revenue Report",
    description: "Search reports and view recent downloads.",
  },
  {
    id: "run-program",
    name: "Zuora Revenue Program",
    description: "Run programs and monitor recent schedule jobs.",
  },
  {
    id: "file-upload",
    name: "File Upload",
    description: "Upload revenue files and review recent uploads.",
  },
  {
    id: "active-batches",
    name: "Active SSP Batches",
    description: "Monitor active SSP batches and batch actions.",
  },
  {
    id: "rc-search",
    name: "Revenue Contract Search",
    description: "Search revenue contracts with saved searches and filters.",
  },
  {
    id: "revenue-progress",
    name: "Close Process Status",
    description: "Monitor close process status, tasks, and milestones.",
  },
];

export const DEFAULT_DASHBOARD_WIDGET_IDS: DashboardWidgetId[] = [
  "revenue-overview",
  "revenue-tasks",
  "run-report",
  "run-program",
  "file-upload",
  "active-batches",
  "rc-search",
];
