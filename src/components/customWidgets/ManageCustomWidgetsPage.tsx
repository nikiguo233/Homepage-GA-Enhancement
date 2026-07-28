import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import type {
  CustomWidget,
  CustomWidgetHistoryAction,
  CustomWidgetHistoryEntry,
} from "../../customWidgets/types";
import {
  formatHistoryTimestamp,
  getHistoryActionLabel,
} from "../../customWidgets/widgetHistory";
import { ENABLE_CUSTOM_WIDGET_HISTORY_TAB } from "../../customWidgets/featureFlags";
import { getWidgetGridPreviewSize } from "../../customWidgets/aiGeneratedMetricWidgets";
import { isWidgetCreatedByCurrentUser } from "../../customWidgets/widgetCreator";
import { ManagementBreadcrumbs } from "./ManagementBreadcrumbs";
import { CreateWidgetDropdown, type CreateWidgetOption } from "./CreateWidgetDropdown";
import { CustomWidgetPreviewFrame } from "./CustomWidgetPreviewFrame";
import { AiGeneratedChip } from "./AiGeneratedChip";
import { DeleteConfirmModal, ClearHistoryConfirmModal } from "./CustomWidgetDashboardCard";

const historyHeaderCellSx = {
  color: "#575e63",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.25px",
  textTransform: "uppercase",
} as const;

function getHistoryActionChipSx(action: CustomWidgetHistoryAction) {
  switch (action) {
    case "published":
      return { bgcolor: "#e8f8f4", color: "#005a4f" };
    case "unpublished":
      return { bgcolor: "#f6f7f8", color: "#464c51" };
    case "deleted":
      return { bgcolor: "#fdecea", color: "#b60f00" };
    default:
      return { bgcolor: "#e9f0fa", color: "#0d4ac3" };
  }
}

export function ManageCustomWidgetsPage({
  historyEntries,
  initialCreatedByMeOnly = false,
  onAddToHomepage,
  onClearHistory,
  onCreateWidgetOption,
  onDeleteWidget,
  onEditWidget,
  onGoHome,
  onGoHub,
  publishedWidgets,
  showHistory = false,
  widgets,
}: {
  historyEntries: CustomWidgetHistoryEntry[];
  initialCreatedByMeOnly?: boolean;
  onAddToHomepage: (widgetId: string) => void;
  onClearHistory: () => void;
  onCreateWidgetOption: (option: CreateWidgetOption) => void;
  onDeleteWidget: (widgetId: string) => void;
  onEditWidget: (widgetId: string) => void;
  onGoHome: () => void;
  onGoHub: () => void;
  publishedWidgets: CustomWidget[];
  showHistory?: boolean;
  widgets: CustomWidget[];
}) {
  const [pendingDeleteWidgetId, setPendingDeleteWidgetId] = useState<string | null>(null);
  const [isClearHistoryOpen, setIsClearHistoryOpen] = useState(false);
  const [createdByMeOnly, setCreatedByMeOnly] = useState(initialCreatedByMeOnly);
  const resolvedShowHistory =
    ENABLE_CUSTOM_WIDGET_HISTORY_TAB && showHistory;
  const visibleWidgets = useMemo(() => {
    if (resolvedShowHistory) {
      return [];
    }

    if (!createdByMeOnly) {
      return publishedWidgets;
    }

    return publishedWidgets.filter(isWidgetCreatedByCurrentUser);
  }, [createdByMeOnly, publishedWidgets, resolvedShowHistory]);
  const isEmpty = !resolvedShowHistory && visibleWidgets.length === 0;
  const isHistoryEmpty =
    resolvedShowHistory && historyEntries.length === 0;
  const pendingDeleteWidget = visibleWidgets.find((widget) => widget.id === pendingDeleteWidgetId);
  const widgetById = new Map(widgets.map((widget) => [widget.id, widget]));

  useEffect(() => {
    setCreatedByMeOnly(initialCreatedByMeOnly);
  }, [initialCreatedByMeOnly]);

  return (
    <section className="custom-widget-management-page">
      <ManagementBreadcrumbs
        items={[
          { label: "Home", onClick: onGoHome },
          { label: "Manage Templates and Widgets", onClick: onGoHub },
          { label: "Custom Widgets" },
        ]}
      />
      <div className="custom-widget-management-header">
        <h1>Custom Widgets</h1>
        <div className="custom-widget-management-header-actions">
          <CreateWidgetDropdown onSelect={onCreateWidgetOption} />
        </div>
      </div>
      {!resolvedShowHistory ? (
        <div className="custom-widget-management-toolbar">
          <label className="custom-widget-created-by-me-toggle">
            <Switch
              checked={createdByMeOnly}
              onChange={(event) => setCreatedByMeOnly(event.target.checked)}
              size="small"
            />
            <span>Show only widgets created by me</span>
          </label>
        </div>
      ) : null}
      {isEmpty ? (
        <div className="custom-widget-empty-state">
          <div className="custom-widget-empty-state-icon">
            <WidgetsOutlinedIcon />
          </div>
          <h2>No Custom Widgets</h2>
        </div>
      ) : null}
      {isHistoryEmpty ? (
        <div className="custom-widget-empty-state">
          <div className="custom-widget-empty-state-icon">
            <HistoryOutlinedIcon />
          </div>
          <h2>No History Yet</h2>
          <p className="custom-widget-empty-state-copy">
            Create, update, publish, unpublish, or delete widgets to build a change log here.
          </p>
        </div>
      ) : null}
      {!resolvedShowHistory && !isEmpty ? (
        <div className="custom-widget-grid">
          {visibleWidgets.map((widget) => {
            const previewSize = getWidgetGridPreviewSize(widget);

            return (
            <article className="custom-widget-grid-card" key={widget.id}>
              <div className="custom-widget-grid-preview">
                <CustomWidgetPreviewFrame
                  compact
                  fillContainer={previewSize !== "3x1"}
                  size={previewSize}
                  widget={widget}
                />
                {widget.isAiGenerated ? <AiGeneratedChip /> : null}
                <div className="custom-widget-grid-card-overlay">
                  <button
                    className="custom-widget-primary-button custom-widget-grid-card-action"
                    onClick={() => onEditWidget(widget.id)}
                    type="button"
                  >
                    View Details
                  </button>
                  <button
                    className="custom-widget-secondary-button custom-widget-grid-card-action"
                    onClick={() => onAddToHomepage(widget.id)}
                    type="button"
                  >
                    Add to Home Page
                  </button>
                  <button
                    className="custom-widget-secondary-button custom-widget-grid-card-action"
                    onClick={() => setPendingDeleteWidgetId(widget.id)}
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <span className="custom-widget-grid-name">{widget.name || "Untitled Widget"}</span>
            </article>
            );
          })}
        </div>
      ) : null}
      {resolvedShowHistory && !isHistoryEmpty ? (
        <div className="custom-widget-history-panel">
          <div className="custom-widget-history-toolbar">
            <p className="custom-widget-history-intro">
              Track who changed each widget, what changed, and when. The most recent activity appears
              first.
            </p>
            <button
              className="custom-widget-secondary-button custom-widget-history-clear-button"
              onClick={() => setIsClearHistoryOpen(true)}
              type="button"
            >
              Clear History
            </button>
          </div>
          <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table aria-label="Custom widget history" size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={historyHeaderCellSx}>Date &amp; time</TableCell>
                  <TableCell sx={historyHeaderCellSx}>Widget</TableCell>
                  <TableCell sx={historyHeaderCellSx}>Action</TableCell>
                  <TableCell sx={historyHeaderCellSx}>Summary</TableCell>
                  <TableCell sx={historyHeaderCellSx}>Changed by</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyEntries.map((entry) => {
                  const widget = widgetById.get(entry.widgetId);
                  const canOpenWidget = Boolean(widget) && entry.action !== "deleted";

                  return (
                    <TableRow hover key={entry.id}>
                      <TableCell sx={{ color: "#575e63", whiteSpace: "nowrap" }}>
                        {formatHistoryTimestamp(entry.occurredAt)}
                      </TableCell>
                      <TableCell>
                        {canOpenWidget ? (
                          <Link
                            component="button"
                            onClick={() => onEditWidget(entry.widgetId)}
                            sx={{ fontWeight: 600, textAlign: "left" }}
                            underline="hover"
                          >
                            {entry.widgetName}
                          </Link>
                        ) : (
                          <Typography component="span" sx={{ fontWeight: 600 }} variant="body2">
                            {entry.widgetName}
                          </Typography>
                        )}
                        {!widget && entry.action !== "deleted" ? (
                          <Typography
                            component="span"
                            sx={{ color: "text.secondary", display: "block" }}
                            variant="caption"
                          >
                            Widget no longer available
                          </Typography>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getHistoryActionLabel(entry.action)}
                          size="small"
                          sx={{
                            ...getHistoryActionChipSx(entry.action),
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: "0.4px",
                            textTransform: "uppercase",
                          }}
                        />
                      </TableCell>
                      <TableCell>{entry.summary}</TableCell>
                      <TableCell sx={{ color: "#575e63", whiteSpace: "nowrap" }}>
                        {entry.actor}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : null}
      {pendingDeleteWidget ? (
        <DeleteConfirmModal
          onCancel={() => setPendingDeleteWidgetId(null)}
          onConfirm={() => {
            onDeleteWidget(pendingDeleteWidget.id);
            setPendingDeleteWidgetId(null);
          }}
          widgetName={pendingDeleteWidget.name}
        />
      ) : null}
      {isClearHistoryOpen ? (
        <ClearHistoryConfirmModal
          onCancel={() => setIsClearHistoryOpen(false)}
          onConfirm={() => {
            onClearHistory();
            setIsClearHistoryOpen(false);
          }}
        />
      ) : null}
    </section>
  );
}
