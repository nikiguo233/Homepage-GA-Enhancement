import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import SearchIcon from "@mui/icons-material/Search";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { forwardRef, useEffect, type HTMLAttributes, type ReactNode, type RefObject } from "react";
import type { DashboardWidgetId } from "./catalog";

const taskRows = [
  ["SSP Exceptions", "32"],
  ["Auto POBs", "18"],
  ["Orphan Transactions", "10"],
  ["Inbound Transactions Exceptions", "5"],
] as const;

const reports = [
  ["1000001", "Revenue Insights", "2026/02/19  22:13"],
  ["1000002", "RCRF RollForward", "2026/02/19  22:13"],
  ["1000003", "Revenue Trends Export", "2026/02/19  22:13"],
  ["1000004", "Billing Waterfall", "2026/02/19  22:13"],
  ["1000005", "Cost Insight", "2026/02/19  22:13"],
] as const;

const scheduleJobs = [
  ["1000001", "Data Sync", "2026/02/19  22:13", "completed"],
  ["1000002", "Monthly Revenue Calcul...", "2026/02/19  22:13", "completed"],
  ["1000003", "User Engagement Report", "2026/02/19  22:13", "completed"],
  ["1000004", "Immediate POB Release", "2026/02/19  22:13", "error"],
  ["1000005", "Process Usage Data", "2026/02/19  22:13", "warning"],
] as const;

const sspBatches = [
  ["vCPU Edition", "FY25 vCPU Edition", "10000001"],
  ["Product Family", "FY23 Product Family", "10000002"],
  ["Perpetual License", "FY21 Perpetual License", "10000003"],
  ["AppDynamics SSP...", "FY25 vCPU Edition", "10000004"],
  ["vCPU Edition", "FY25 vCPU Edition", "10000005"],
  ["Product Family", "FY23 Product Family", "10000006"],
  ["Perpetual License", "FY21 Perpetual License", "10000007"],
] as const;

const processSteps = [
  ["5", "Run Event programs", "Due by Day 2", true],
  ["6", "Review Unreleased POB", "Due by Day 3", true],
  ["7", "Review revenue report", "Due Day 4", false],
] as const;

function OccamSwitch({
  defaultChecked = false,
  label,
}: {
  defaultChecked?: boolean;
  label: string;
}) {
  return (
    <FormControlLabel
      className="occam-switch"
      control={<Switch defaultChecked={defaultChecked} size="small" />}
      data-name="Switch"
      label={label}
    />
  );
}

function ActionButton({
  children,
  disabled = false,
  icon,
}: {
  children: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}) {
  return (
    <button className="action-button" disabled={disabled} type="button">
      {icon}
      <span>{children}</span>
    </button>
  );
}

type WidgetCardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  contentGap?: 8 | 16;
};

const WidgetCard = forwardRef<HTMLElement, WidgetCardProps>(function WidgetCard(
  { children, className = "", contentClassName = "", contentGap = 16, ...rest },
  ref,
) {
  return (
    <section className={`widget-card ${className}`.trim()} ref={ref} {...rest}>
      <div className={`widget-card-inner widget-card-inner-gap-${contentGap} ${contentClassName}`.trim()}>
        {children}
      </div>
    </section>
  );
});

function WidgetIconButton({ label = "More actions" }: { label?: string }) {
  return (
    <button aria-label={label} className="widget-icon-button" type="button">
      <MoreHorizIcon />
    </button>
  );
}

function HeaderActions({
  children,
  gap = 8,
  showMore = true,
}: {
  children?: ReactNode;
  gap?: 8 | 12;
  showMore?: boolean;
}) {
  return (
    <div className={`header-actions${gap === 12 ? " header-actions-wide" : ""}`.trim()}>
      {children}
      {showMore ? <WidgetIconButton /> : null}
    </div>
  );
}

function CardHeader({
  action,
  refreshed = true,
  showMoreMenu = false,
  title,
}: {
  action?: ReactNode;
  refreshed?: boolean;
  showMoreMenu?: boolean;
  title: string;
}) {
  return (
    <div className="card-header">
      <div>
        <h3>{title}</h3>
        {refreshed ? <p>Last refreshed at 01/01/2026, 6.31 PM PST</p> : null}
      </div>
      {action ?? (showMoreMenu ? <HeaderActions /> : null)}
    </div>
  );
}

function TextButton({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <button className="text-button" type="button">
      {icon}
      <span>{children}</span>
    </button>
  );
}

function StatusChip({
  showInfo = false,
  variant,
}: {
  showInfo?: boolean;
  variant: "completed" | "error" | "warning";
}) {
  return (
    <span className={`status-chip status-chip-${variant}`}>
      {variant}
      {showInfo ? <InfoOutlinedIcon /> : null}
    </span>
  );
}

function FilterChip({
  active = false,
  label,
  removable = false,
  value,
}: {
  active?: boolean;
  label: string;
  removable?: boolean;
  value: string;
}) {
  return (
    <button className={active ? "filter-chip filter-chip-active" : "filter-chip"} type="button">
      <strong>{label}</strong>
      <span>: {value}</span>
      {removable ? <CloseIcon /> : <ExpandMoreIcon />}
    </button>
  );
}

export function RevenueOverview() {
  return (
    <WidgetCard>
      <CardHeader
        action={
          <HeaderActions>
            <div className="split-button">
              <ActionButton>Refresh</ActionButton>
              <button aria-label="Refresh menu" type="button">
                <ExpandMoreIcon />
              </button>
            </div>
          </HeaderActions>
        }
        title="Revenue Overview"
      />
      <div className="filter-row">
        <FilterChip label="Duration" value="Last Month" />
        <FilterChip active label="Location" removable value="All" />
        <TextButton icon={<TuneOutlinedIcon />}>Add filter</TextButton>
      </div>
      <div className="donut-area">
        <div aria-label="Revenue by region donut chart" className="donut-chart" role="img">
          <div className="donut-center">
            <strong>$12,4K</strong>
            <span>Total</span>
          </div>
          <div className="donut-trend">
            <ArrowDropUpIcon /> 10%
          </div>
        </div>
        <ul className="legend-list">
          <li className="legend-item-active">
            <span className="legend-dot legend-us" /> US
          </li>
          <li>
            <span className="legend-dot legend-emea" /> EMEA
          </li>
          <li>
            <span className="legend-dot legend-apac" /> APAC
          </li>
          <li>
            <span className="legend-dot legend-latam" /> LATAM
          </li>
          <li>
            <span className="legend-dot legend-other" /> Others
          </li>
        </ul>
      </div>
    </WidgetCard>
  );
}

export function RevenueTasks() {
  return (
    <WidgetCard contentGap={8}>
      <CardHeader
        action={
          <HeaderActions gap={12}>
            <ActionButton>Refresh</ActionButton>
          </HeaderActions>
        }
        title="Revenue Tasks"
      />
      <div className="task-toolbar">
        <div className="tabs">
          <button className="tab tab-active" type="button">
            Exceptions
          </button>
          <button className="tab" type="button">
            Actions
          </button>
        </div>
        <OccamSwitch defaultChecked label="Pending Data Only" />
      </div>
      <div className="task-list">
        {taskRows.map(([label, value]) => (
          <div className="task-list-item" key={label}>
            <span className="warning-dot" />
            <span>{label}</span>
            <InfoOutlinedIcon />
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}

export function RunReport() {
  return (
    <WidgetCard className="report-card">
      <CardHeader refreshed={false} showMoreMenu title="Zuora Revenue Report" />
      <div className="form-row">
        <label>
          <strong>Search Report</strong>
          <span className="field-control">
            <SearchIcon />
            <input placeholder="Search report" />
          </span>
        </label>
        <label>
          <strong>Select Layout</strong>
          <span className="field-control select-control">
            <input placeholder="Select layout" readOnly />
            <ExpandMoreIcon />
          </span>
        </label>
        <ActionButton disabled>Submit</ActionButton>
      </div>
      <div className="table-heading">
        <h4>Recent Downloads</h4>
        <button aria-label="Refresh recent downloads" type="button">
          <RefreshOutlinedIcon />
        </button>
      </div>
      <div className="widget-table-wrap">
        <table className="downloads-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Report Name</th>
              <th>Completion Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(([id, name, time]) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{time}</td>
                <td>
                  <FileDownloadOutlinedIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="text-link" type="button">
        View All Downloads
      </button>
    </WidgetCard>
  );
}

export function RunProgram() {
  return (
    <WidgetCard className="program-card">
      <CardHeader refreshed={false} showMoreMenu title="Zuora Revenue Program" />
      <div className="form-row program-form-row">
        <label>
          <strong>Search Program</strong>
          <span className="field-control">
            <SearchIcon />
            <input placeholder="Search program" />
          </span>
        </label>
        <span className="program-checkbox">
          <CheckBoxOutlineBlankOutlinedIcon />
          Job Group
        </span>
        <ActionButton disabled>Run Program</ActionButton>
      </div>
      <div className="table-heading">
        <h4>Recent Schedule Jobs</h4>
        <button aria-label="Refresh recent schedule jobs" type="button">
          <RefreshOutlinedIcon />
        </button>
      </div>
      <div className="widget-table-wrap">
        <table className="widget-table program-table">
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Job Name</th>
              <th>Completion Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {scheduleJobs.map(([id, name, time, status]) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{time}</td>
                <td>
                  <StatusChip
                    showInfo={status === "error" || status === "warning"}
                    variant={status}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="text-link" type="button">
        View All Schedule Jobs
      </button>
    </WidgetCard>
  );
}

export function FileUpload() {
  return (
    <WidgetCard className="upload-card">
      <CardHeader refreshed={false} showMoreMenu title="File Upload" />
      <div className="upload-form-row">
        <div className="upload-form-fields">
          <label className="upload-form-field">
            <strong>Select Type</strong>
            <span className="upload-select">
              Select type <ExpandMoreIcon />
            </span>
          </label>
          <label className="upload-form-field">
            <strong>Select Template</strong>
            <span className="upload-select upload-select-disabled">
              Select template <ExpandMoreIcon />
            </span>
          </label>
        </div>
        <ActionButton disabled>Upload file</ActionButton>
      </div>
      <div className="upload-recent-section">
        <div className="table-heading">
          <h4>Recent Uploads</h4>
        </div>
        <div className="upload-empty-state">
          <p>Select type and template to upload files and view recent uploads</p>
        </div>
      </div>
    </WidgetCard>
  );
}

export function ActiveBatches() {
  return (
    <WidgetCard className="batches-card">
      <CardHeader
        action={
          <HeaderActions>
            <ActionButton>Download</ActionButton>
          </HeaderActions>
        }
        title="Active SSP Batches"
      />
      <div className="widget-table-wrap">
        <div className="widget-table-toolbar">
          <button aria-label="Refresh batches" type="button">
            <RefreshOutlinedIcon />
          </button>
        </div>
        <table className="widget-table batches-table">
          <thead>
            <tr>
              <th>Template</th>
              <th>Batch Name</th>
              <th>Batch ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sspBatches.map(([template, batchName, batchId]) => (
              <tr key={batchId}>
                <td>{template}</td>
                <td>
                  <a className="table-link" href="#">
                    {batchName}
                  </a>
                </td>
                <td>{batchId}</td>
                <td>
                  <AccountTreeOutlinedIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="text-link" type="button">
        View All Batches
      </button>
    </WidgetCard>
  );
}

export function RCSearch() {
  return (
    <WidgetCard className="rc-search-card">
      <CardHeader refreshed={false} showMoreMenu title="Revenue Contract Search" />
      <div className="rc-search-body">
        <div className="rc-search-fields">
          <label>
            <strong>Quick Search</strong>
            <span className="field-control">
              <input placeholder="Select saved search" readOnly />
              <ExpandMoreIcon />
            </span>
          </label>
          <div className="rc-search-divider" />
          <div>
            <strong>Filters</strong>
            <div className="rc-filters-panel">
              <div className="rc-filters-toolbar">
                <span className="rc-operator-select">
                  And
                  <ExpandMoreIcon />
                </span>
                <TextButton icon={<AddIcon />}>Add Rule</TextButton>
              </div>
              <div className="rc-rule-row">
                <div className="rc-rule-fields">
                  <span className="rc-rule-field">
                    Select source <ExpandMoreIcon />
                  </span>
                  <span className="rc-rule-field rc-rule-field-filled">
                    Equals to <ExpandMoreIcon />
                  </span>
                  <span className="rc-rule-field">
                    Select value <ExpandMoreIcon />
                  </span>
                </div>
                <button aria-label="Delete rule" className="rc-delete-button" type="button">
                  <DeleteOutlinedIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="rc-search-footer">
          <ActionButton disabled>Search</ActionButton>
        </div>
      </div>
    </WidgetCard>
  );
}

export function CloseProcessStatus({
  widgetRef,
}: {
  widgetRef?: RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    const widget = widgetRef?.current;

    if (!widget) {
      return undefined;
    }

    const handleEnterAnimationEnd = (event: AnimationEvent) => {
      if (event.target !== widget || event.animationName !== "widget-card-added-in") {
        return;
      }

      widget.classList.add("widget-card-settled");
      widget.removeEventListener("animationend", handleEnterAnimationEnd);
    };

    widget.addEventListener("animationend", handleEnterAnimationEnd);

    return () => {
      widget.removeEventListener("animationend", handleEnterAnimationEnd);
    };
  }, [widgetRef]);

  const className = widgetRef ? "close-process-card widget-card-added" : "close-process-card";

  return (
    <WidgetCard
      className={className}
      data-node-id="111:17159"
      ref={widgetRef}
      tabIndex={widgetRef ? -1 : undefined}
    >
      <CardHeader
        action={
          <HeaderActions>
            <ActionButton>Refresh</ActionButton>
          </HeaderActions>
        }
        title="Close Process Status"
      />
      <div className="close-process-body">
        <div className="close-process-summary">
          <div aria-label="Close process 50 percent complete" className="close-process-ring" role="img">
            <strong>50%</strong>
          </div>
          <span>Completed 4/8 tasks</span>
          <dl className="process-meta-list">
            <div>
              <dt>Current Period</dt>
              <dd>April 2026</dd>
            </div>
            <div>
              <dt>
                Current Close day <InfoOutlinedIcon />
              </dt>
              <dd>Day 2</dd>
            </div>
          </dl>
        </div>

        <div className="close-process-details">
          <div>
            <span className="process-label">Current Task</span>
            <div className="current-task-line">
              <strong>Upload Events</strong>
              <WarningAmberRoundedIcon />
            </div>
          </div>

          <div className="process-next-tasks">
            <span className="process-label">Next 3 Tasks</span>
            <ol>
              {processSteps.map(([number, title, dueDate, warning]) => (
                <li className="process-step" key={number}>
                  <span className="process-step-index">{number}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>
                      {dueDate}
                      {warning ? <WarningAmberRoundedIcon /> : null}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <button className="text-link process-checklist-link" type="button">
            Go to checklist
          </button>
        </div>
      </div>
    </WidgetCard>
  );
}

export function DashboardWidget({
  widgetId,
  widgetRef,
}: {
  widgetId: DashboardWidgetId;
  widgetRef?: RefObject<HTMLElement | null>;
}) {
  switch (widgetId) {
    case "revenue-overview":
      return <RevenueOverview />;
    case "revenue-tasks":
      return <RevenueTasks />;
    case "run-report":
      return <RunReport />;
    case "run-program":
      return <RunProgram />;
    case "file-upload":
      return <FileUpload />;
    case "active-batches":
      return <ActiveBatches />;
    case "rc-search":
      return <RCSearch />;
    case "revenue-progress":
      return <CloseProcessStatus widgetRef={widgetRef} />;
    default:
      return null;
  }
}
