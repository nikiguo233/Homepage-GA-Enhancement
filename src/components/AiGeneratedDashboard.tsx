import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useMemo, useState } from "react";
import type { AiGeneratedDashboardVariant } from "../ai/types";
import { AiAddedWidgets } from "./AiAddedWidgets";
import { DASHBOARD_WIDGET_CATALOG, type DashboardWidgetId } from "./dashboardWidgets/catalog";
import type { CustomWidget } from "../customWidgets/types";
import type { RefObject } from "react";
import { WidgetSourceBadge } from "./WidgetSourceBadge";

const defaultMetricCards = [
  { change: "+12%", label: "Active Contracts", value: "1,284" },
  { change: "+4.5%", label: "Deferred Revenue", value: "$4.2M" },
  { change: "0%", label: "Compliance Risk", value: "Low" },
  { change: "+3%", label: "Close Readiness", value: "84%" },
] as const;

const monthEndCloseMetricCards = [
  { change: "+3%", label: "Close Readiness", value: "84%" },
  { change: "+2", label: "Open Exceptions", value: "12" },
  { change: "0%", label: "Compliance Risk", value: "Low" },
  { change: "+4.5%", label: "Deferred Revenue", value: "$4.2M" },
] as const;

const trendData = [
  { month: "Jan", value: 30 },
  { month: "Feb", value: 50 },
  { month: "Mar", value: 38 },
  { month: "Apr", value: 75 },
  { month: "May", value: 58 },
  { month: "Jun", value: 70 },
  { month: "Jul", value: 85 },
  { month: "Aug", value: 55 },
  { month: "Sep", value: 68 },
  { month: "Oct", value: 80 },
  { month: "Nov", value: 95 },
  { month: "Dec", value: 114 },
] as const;

function formatRevenue(value: number): string {
  return `$${value}M`;
}

function getYAxisScale(maxValue: number) {
  const roughStep = maxValue / 4;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const normalized = roughStep / magnitude;
  let step = magnitude;

  if (normalized <= 1) {
    step = magnitude;
  } else if (normalized <= 2) {
    step = 2 * magnitude;
  } else if (normalized <= 5) {
    step = 5 * magnitude;
  } else {
    step = 10 * magnitude;
  }

  const max = Math.ceil(maxValue / step) * step;
  const ticks: number[] = [];

  for (let value = 0; value <= max; value += step) {
    ticks.push(value);
  }

  return { max, ticks };
}

function AiMetricCard({
  change,
  label,
  showSourceBadge = false,
  value,
}: {
  change: string;
  label: string;
  showSourceBadge?: boolean;
  value: string;
}) {
  return (
    <section className="widget-card widget-card-metric ai-dashboard-widget-card">
      <div className="widget-card-inner widget-card-inner-gap-8">
        {showSourceBadge ? <WidgetSourceBadge className="ai-dashboard-widget-source-badge" source="ai-generated" /> : null}
        <span className="ai-metric-card-label">{label}</span>
        <div className="ai-metric-card-value-row">
          <strong>{value}</strong>
          <span className="ai-metric-card-change">{change}</span>
        </div>
      </div>
    </section>
  );
}

function AiRevenueTrendChart({ showSourceBadge = false }: { showSourceBadge?: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { max: yAxisMax, ticks: yAxisTicks } = useMemo(
    () => getYAxisScale(Math.max(...trendData.map((point) => point.value))),
    [],
  );

  return (
    <section className="widget-card widget-card-chart ai-dashboard-widget-card">
      <div className="widget-card-inner widget-card-inner-gap-16">
        {showSourceBadge ? (
          <WidgetSourceBadge className="ai-dashboard-widget-source-badge" source="library" />
        ) : null}
        <div className="card-header">
          <div>
            <h3>Revenue Recognition Trend</h3>
          </div>
          <div className="header-actions">
            <span className="ai-trend-period">FY 2026</span>
            <button aria-label="More actions" className="widget-icon-button" type="button">
              <MoreHorizIcon />
            </button>
          </div>
        </div>
        <div
          aria-label="Revenue recognition trend bar chart"
          className="ai-trend-chart-widget"
          role="group"
        >
          <div className="ai-trend-chart-body">
            <div aria-hidden="true" className="ai-trend-chart-y-axis">
              {[...yAxisTicks].reverse().map((tick) => (
                <span className="ai-trend-chart-y-label" key={tick}>
                  {formatRevenue(tick)}
                </span>
              ))}
            </div>
            <div className="ai-trend-chart-plot-wrap">
              <div className="ai-trend-chart-plot">
                {yAxisTicks
                  .filter((tick) => tick > 0)
                  .map((tick) => (
                    <span
                      className="ai-trend-chart-grid-line"
                      key={tick}
                      style={{ bottom: `${(tick / yAxisMax) * 100}%` }}
                    />
                  ))}
                {trendData.map((point, index) => {
                  const isHovered = hoveredIndex === index;
                  const isDimmed = hoveredIndex !== null && !isHovered;

                  return (
                    <div
                      className={`ai-trend-bar-wrap${isHovered ? " is-hovered" : ""}${isDimmed ? " is-dimmed" : ""}`}
                      key={point.month}
                      onBlur={() => setHoveredIndex(null)}
                      onFocus={() => setHoveredIndex(index)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      tabIndex={0}
                    >
                      {isHovered ? (
                        <div className="ai-trend-tooltip" role="tooltip">
                          <strong>{formatRevenue(point.value)}</strong>
                          <span>
                            {point.month} 2024
                          </span>
                        </div>
                      ) : null}
                      <span
                        aria-label={`${point.month} 2024: ${formatRevenue(point.value)}`}
                        className="ai-trend-bar"
                        role="graphics-symbol"
                        style={{ height: `${(point.value / yAxisMax) * 100}%` }}
                      />
                    </div>
                  );
                })}
              </div>
              <div aria-hidden="true" className="ai-trend-chart-x-axis">
                {trendData.map((point) => (
                  <span className="ai-trend-chart-x-label" key={point.month}>
                    {point.month}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AiGeneratedDashboard({
  addedWidgetIds = [],
  getCustomWidgetById,
  hiddenMetricCardLabels = [],
  highlightedWidgetRefId,
  libraryWidgetIds = [],
  metricCardOrder = null,
  showWidgetSources = false,
  variant = "default",
  widgetRef,
}: {
  addedWidgetIds?: string[];
  getCustomWidgetById?: (widgetId: string) => CustomWidget | undefined;
  hiddenMetricCardLabels?: string[];
  highlightedWidgetRefId?: string | null;
  libraryWidgetIds?: DashboardWidgetId[];
  metricCardOrder?: string[] | null;
  showWidgetSources?: boolean;
  variant?: AiGeneratedDashboardVariant;
  widgetRef?: RefObject<HTMLElement | null>;
}) {
  const metricCards = variant === "month-end-close" ? monthEndCloseMetricCards : defaultMetricCards;
  const defaultVisibleMetricCards = metricCards.filter(
    (card) => !hiddenMetricCardLabels.includes(card.label),
  );
  const visibleMetricCards =
    metricCardOrder && metricCardOrder.length > 0
      ? [
          ...metricCardOrder
            .map((label) => defaultVisibleMetricCards.find((card) => card.label === label))
            .filter((card): card is (typeof metricCards)[number] => card !== undefined),
          ...defaultVisibleMetricCards.filter((card) => !metricCardOrder.includes(card.label)),
        ]
      : defaultVisibleMetricCards;
  const showTrendChart = variant === "default";
  const visibleLibraryWidgetIds = useMemo(
    () => [
      ...new Set([
        ...libraryWidgetIds,
        ...addedWidgetIds.filter(
          (id): id is DashboardWidgetId => DASHBOARD_WIDGET_CATALOG.some((widget) => widget.id === id),
        ),
      ]),
    ],
    [addedWidgetIds, libraryWidgetIds],
  );

  return (
    <section className="ai-generated-dashboard" data-node-id="225:41367">
      <div className={`ai-metric-grid${visibleMetricCards.length < 4 ? " ai-metric-grid-compact" : ""}`}>
        {visibleMetricCards.map((card) => (
          <AiMetricCard
            change={card.change}
            key={card.label}
            label={card.label}
            showSourceBadge={showWidgetSources}
            value={card.value}
          />
        ))}
      </div>
      {showTrendChart ? <AiRevenueTrendChart showSourceBadge={showWidgetSources} /> : null}
      <AiAddedWidgets
        addedWidgetIds={addedWidgetIds}
        getCustomWidgetById={getCustomWidgetById}
        highlightedWidgetRefId={highlightedWidgetRefId}
        widgetIds={visibleLibraryWidgetIds}
        widgetRef={widgetRef}
      />
    </section>
  );
}
