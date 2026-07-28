import type { AiGeneratedDashboardVariant } from "../ai/types";
import {
  HOMEPAGE_CREATION_RECOMMENDATIONS,
  MONTH_END_CLOSE_DASHBOARD_RECOMMENDATIONS,
} from "../ai/recommendationRationales";
import type { CustomWidget, CustomWidgetDraft } from "./types";
import { createDefaultEmbedConfig } from "./embedConfig";

type AiMetricCardDefinition = {
  change: string;
  description: string;
  label: string;
  value: string;
};

const DEFAULT_AI_METRIC_CARDS: AiMetricCardDefinition[] = [
  {
    change: "+12%",
    description:
      HOMEPAGE_CREATION_RECOMMENDATIONS.find((item) => item.name === "Active Contracts")?.reason ??
      "Shows contract volume at a glance so you can gauge revenue pipeline health.",
    label: "Active Contracts",
    value: "1,284",
  },
  {
    change: "+4.5%",
    description:
      HOMEPAGE_CREATION_RECOMMENDATIONS.find((item) => item.name === "Deferred Revenue")?.reason ??
      "Tracks unrecognized revenue to catch timing issues before close.",
    label: "Deferred Revenue",
    value: "$4.2M",
  },
  {
    change: "0%",
    description:
      HOMEPAGE_CREATION_RECOMMENDATIONS.find((item) => item.name === "Compliance Risk")?.reason ??
      "Flags ASC 606 exposure early so finance can act before reporting.",
    label: "Compliance Risk",
    value: "Low",
  },
  {
    change: "+3%",
    description:
      HOMEPAGE_CREATION_RECOMMENDATIONS.find((item) => item.name === "Close Readiness")?.reason ??
      "Summarizes period-close progress so blockers are visible immediately.",
    label: "Close Readiness",
    value: "84%",
  },
];

const MONTH_END_CLOSE_AI_METRIC_CARDS: AiMetricCardDefinition[] = [
  {
    change: "+3%",
    description:
      MONTH_END_CLOSE_DASHBOARD_RECOMMENDATIONS.find((item) => item.name === "Close Readiness")
        ?.reason ?? "Tracks period-close completion so you can spot blockers before sign-off.",
    label: "Close Readiness",
    value: "84%",
  },
  {
    change: "+2",
    description:
      MONTH_END_CLOSE_DASHBOARD_RECOMMENDATIONS.find((item) => item.name === "Open Exceptions")
        ?.reason ??
      "Surfaces unresolved items that must be cleared before you can close the period.",
    label: "Open Exceptions",
    value: "12",
  },
  {
    change: "0%",
    description:
      MONTH_END_CLOSE_DASHBOARD_RECOMMENDATIONS.find((item) => item.name === "Compliance Risk")
        ?.reason ?? "Highlights ASC 606 exposure that needs review before the books close.",
    label: "Compliance Risk",
    value: "Low",
  },
  {
    change: "+4.5%",
    description:
      MONTH_END_CLOSE_DASHBOARD_RECOMMENDATIONS.find((item) => item.name === "Deferred Revenue")
        ?.reason ?? "Shows unrecognized revenue balances that may need close adjustments.",
    label: "Deferred Revenue",
    value: "$4.2M",
  },
];

const ALL_AI_METRIC_CARDS = [...DEFAULT_AI_METRIC_CARDS, ...MONTH_END_CLOSE_AI_METRIC_CARDS];

export const AI_GENERATED_METRIC_WIDGET_NAMES = [
  "Active Contracts",
  "Deferred Revenue",
  "Compliance Risk",
  "Close Readiness",
  "Open Exceptions",
] as const;

const AI_METRIC_CARDS_BY_NAME = new Map(
  ALL_AI_METRIC_CARDS.map((metric) => [metric.label, metric] as const),
);

function buildAiMetricCardHtml(metric: Pick<AiMetricCardDefinition, "change" | "label" | "value">) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${metric.label}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      height: 100%;
      overflow: hidden;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: #24292c;
      background: #fff;
    }
    .metric {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;
      width: 100%;
      height: 100%;
      min-height: 0;
      padding: 12px 16px;
    }
    .label {
      color: #575e63;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.25px;
      line-height: 16px;
      text-transform: uppercase;
    }
    .value-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      width: 100%;
    }
    .value {
      font-size: 28px;
      font-weight: 600;
      line-height: 1.1;
    }
    .change {
      flex-shrink: 0;
      padding: 2px 8px;
      border: 1px solid #d6d9db;
      border-radius: 4px;
      background: #e9f0fa;
      color: #0d4ac3;
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
    }
  </style>
</head>
<body>
  <div class="metric">
    <span class="label">${metric.label}</span>
    <div class="value-row">
      <strong class="value">${metric.value}</strong>
      <span class="change">${metric.change}</span>
    </div>
  </div>
</body>
</html>`;
}

function buildAiMetricCardWidgetDraft(metric: AiMetricCardDefinition): CustomWidgetDraft {
  return {
    name: metric.label,
    description: metric.description,
    type: "html",
    content: buildAiMetricCardHtml(metric),
    size: "3x1",
    supportedSizes: ["3x1", "3x2"],
    access: "private",
    labelAsExternalContent: false,
    displayWidgetName: false,
    ...createDefaultEmbedConfig(),
    isAiGenerated: true,
    status: "draft",
  };
}

export function getAiGeneratedMetricCardsForVariant(
  variant: AiGeneratedDashboardVariant = "default",
): AiMetricCardDefinition[] {
  return variant === "month-end-close" ? MONTH_END_CLOSE_AI_METRIC_CARDS : DEFAULT_AI_METRIC_CARDS;
}

function findExistingAiMetricWidget(widgets: CustomWidget[], name: string) {
  return widgets.find((widget) => widget.isAiGenerated && widget.name === name);
}

export function saveAiGeneratedHomepageMetricWidgets(options: {
  existingWidgets: CustomWidget[];
  saveWidget: (draft: CustomWidgetDraft, existingId?: string) => string;
  variant?: AiGeneratedDashboardVariant;
}) {
  const metrics = getAiGeneratedMetricCardsForVariant(options.variant ?? "default");

  return metrics.map((metric) => {
    const draft = buildAiMetricCardWidgetDraft(metric);
    const existing = findExistingAiMetricWidget(options.existingWidgets, metric.label);

    return options.saveWidget(draft, existing?.id);
  });
}

export function isAiGeneratedMetricWidgetName(name: string) {
  return (AI_GENERATED_METRIC_WIDGET_NAMES as readonly string[]).includes(name);
}

export function normalizeStoredAiGeneratedMetricWidget(widget: CustomWidget): CustomWidget {
  if (!widget.isAiGenerated || !isAiGeneratedMetricWidgetName(widget.name)) {
    return widget;
  }

  const metric = AI_METRIC_CARDS_BY_NAME.get(widget.name);

  return {
    ...widget,
    size: "3x1",
    supportedSizes: ["3x1", "3x2"],
    ...(metric
      ? {
          content: buildAiMetricCardHtml(metric),
          description: metric.description,
        }
      : {}),
  };
}

export function getWidgetGridPreviewSize(
  widget: Pick<CustomWidget, "isAiGenerated" | "name" | "size">,
): CustomWidget["size"] {
  if (isAiGeneratedMetricWidgetName(widget.name)) {
    return "3x1";
  }

  return widget.size;
}
