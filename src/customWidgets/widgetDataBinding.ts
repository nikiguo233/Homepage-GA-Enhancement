import type { CustomWidgetDraft, WidgetDataBinding } from "./types";

export const WIDGET_DATA_API_PATH = "/api/widget-data";

export const DEFAULT_TOP_ACCOUNTS_DATA_BINDING: WidgetDataBinding = {
  source: "zuora-billing",
  queryType: "account-open-balance-top-n",
  limit: 10,
  sort: "desc",
  refreshIntervalMinutes: 15,
};

export type TopAccountRecord = {
  account: string;
  openBalance: number;
  rank: number;
  status: string;
};

export function formatOpenBalance(amount: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount);
}

export function getWidgetDataBindingQuerySummary(binding: WidgetDataBinding) {
  if (binding.queryType === "account-open-balance-top-n") {
    return `Top ${binding.limit} accounts ordered by open balance (${binding.sort === "desc" ? "highest first" : "lowest first"})`;
  }

  return "Custom widget data query";
}

export function getWidgetDataBindingSourceLabel(source: WidgetDataBinding["source"]) {
  return source === "zuora-billing" ? "Zuora Billing" : source;
}

export function buildTopAccountsLiveWidgetHtml(binding: WidgetDataBinding = DEFAULT_TOP_ACCOUNTS_DATA_BINDING) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Top Accounts by Open Balance</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #24292c; background: #fff; }
    .card { padding: 16px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; gap: 12px; }
    .header h2 { font-size: 15px; font-weight: 600; }
    .header span { color: #767d82; font-size: 12px; white-space: nowrap; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th, td { padding: 8px 10px; text-align: left; border-bottom: 1px solid #e6e9eb; }
    th { color: #575e63; font-weight: 600; background: #f6f7f8; }
    td.amount { text-align: right; font-variant-numeric: tabular-nums; }
    tr:last-child td { border-bottom: 0; }
    .rank { color: #767d82; width: 28px; }
    .state { color: #767d82; font-size: 12px; padding: 16px 0; }
    .state.is-error { color: #b60f00; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>Top ${binding.limit} Accounts by Open Balance</h2>
      <span data-live-updated>Loading live data…</span>
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
      <tbody id="accounts-body">
        <tr><td colspan="4" class="state">Loading accounts…</td></tr>
      </tbody>
    </table>
  </div>
  <script>
    (function () {
      var limit = ${binding.limit};
      var apiBase = window.__ZUORA_WIDGET_DATA_API__ || "${WIDGET_DATA_API_PATH}";
      var tbody = document.getElementById("accounts-body");
      var updated = document.querySelector("[data-live-updated]");

      function formatCurrency(amount) {
        try {
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(amount);
        } catch (error) {
          return "$" + amount;
        }
      }

      function renderRows(accounts) {
        if (!tbody) return;
        if (!accounts || !accounts.length) {
          tbody.innerHTML = '<tr><td colspan="4" class="state">No accounts found.</td></tr>';
          return;
        }

        tbody.innerHTML = accounts
          .map(function (account) {
            return (
              '<tr>' +
              '<td class="rank">' + account.rank + "</td>" +
              "<td>" + account.account + "</td>" +
              "<td>" + account.status + "</td>" +
              '<td class="amount">' + formatCurrency(account.openBalance) + "</td>" +
              "</tr>"
            );
          })
          .join("");
      }

      function renderError(message) {
        if (!tbody) return;
        tbody.innerHTML = '<tr><td colspan="4" class="state is-error">' + message + "</td></tr>";
      }

      fetch(apiBase + "/top-accounts?limit=" + limit)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Unable to load live Billing data.");
          }
          return response.json();
        })
        .then(function (payload) {
          renderRows(payload.accounts || []);
          if (updated && payload.asOf) {
            updated.textContent = "Updated " + payload.asOf;
          }
        })
        .catch(function () {
          renderError("Unable to load live Billing data.");
          if (updated) {
            updated.textContent = "Data unavailable";
          }
        });
    })();
  </script>
</body>
</html>`;
}

export function normalizeWidgetDataBinding(
  widget: Partial<CustomWidgetDraft>,
): WidgetDataBinding | undefined {
  const binding = widget.dataBinding;
  if (!binding) {
    return undefined;
  }

  if (binding.queryType !== "account-open-balance-top-n" || binding.source !== "zuora-billing") {
    return undefined;
  }

  const limit = Number.isFinite(binding.limit) ? Math.max(1, Math.min(50, binding.limit)) : 10;

  return {
    source: "zuora-billing",
    queryType: "account-open-balance-top-n",
    limit,
    sort: binding.sort === "asc" ? "asc" : "desc",
    refreshIntervalMinutes: Number.isFinite(binding.refreshIntervalMinutes)
      ? Math.max(5, binding.refreshIntervalMinutes)
      : 15,
  };
}

export function getWidgetDataApiBase() {
  if (typeof window === "undefined") {
    return WIDGET_DATA_API_PATH;
  }

  return `${window.location.origin}${WIDGET_DATA_API_PATH}`;
}

export async function testTopAccountsDataConnection(limit = 10) {
  const response = await fetch(`${getWidgetDataApiBase()}/top-accounts?limit=${limit}`);

  if (!response.ok) {
    throw new Error("Connection failed");
  }

  return (await response.json()) as {
    accounts: TopAccountRecord[];
    asOf: string;
  };
}
