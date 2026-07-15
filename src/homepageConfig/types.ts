export type HomepageLayout = "default" | "ai-generated";

export type HomepageConfigState = {
  addedWidgetIds: string[];
  hiddenMetricCardLabels: string[];
  layout: HomepageLayout;
  removedWidgetIds: string[];
  widgetOrder: string[] | null;
};
