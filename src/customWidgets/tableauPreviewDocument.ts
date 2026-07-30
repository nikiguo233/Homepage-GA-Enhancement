function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function isTableauEmbedUrl(url: string) {
  try {
    const hostname = new URL(url.trim()).hostname.toLowerCase();
    return hostname.endsWith(".tableau.com") || hostname === "tableau.com";
  } catch {
    return false;
  }
}

export function getTableauViewDisplayName(url: string) {
  try {
    const pathname = new URL(url.trim()).pathname;
    const viewsMatch = pathname.match(/\/views\/([^/]+)/i);

    if (!viewsMatch?.[1]) {
      return "Tableau Dashboard";
    }

    return viewsMatch[1]
      .replace(/_/g, " ")
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/\s+/g, " ")
      .trim();
  } catch {
    return "Tableau Dashboard";
  }
}

export function buildTableauPreviewDocument({
  username,
  viewUrl,
}: {
  username?: string;
  viewUrl: string;
}) {
  const safeUrl = escapeHtml(viewUrl.trim());
  const viewName = escapeHtml(getTableauViewDisplayName(viewUrl));
  const safeUsername = escapeHtml(username?.trim() || "Connected user");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${viewName}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      height: 100%;
      background: #f4f6f8;
      color: #1f2933;
      font-family: "Salesforce Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    body {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .tableau-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      min-height: 44px;
      padding: 8px 12px;
      border-bottom: 1px solid #d8dde6;
      background: #fff;
    }
    .tableau-toolbar-start {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }
    .tableau-logo {
      display: grid;
      place-items: center;
      width: 24px;
      height: 24px;
      border-radius: 4px;
      background: linear-gradient(135deg, #e8762d, #c74634);
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      flex-shrink: 0;
    }
    .tableau-title {
      min-width: 0;
    }
    .tableau-title strong {
      display: block;
      overflow: hidden;
      font-size: 14px;
      font-weight: 600;
      line-height: 18px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tableau-title span {
      display: block;
      overflow: hidden;
      color: #5c6773;
      font-size: 11px;
      line-height: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tableau-toolbar-end {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    .tableau-chip {
      padding: 3px 8px;
      border-radius: 999px;
      background: #eef4ff;
      color: #1b5fbf;
      font-size: 11px;
      font-weight: 600;
      line-height: 14px;
      white-space: nowrap;
    }
    .tableau-body {
      flex: 1;
      display: grid;
      grid-template-rows: auto 1fr;
      gap: 12px;
      padding: 12px;
      overflow: auto;
    }
    .tableau-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .tableau-filter {
      padding: 6px 10px;
      border: 1px solid #d8dde6;
      border-radius: 6px;
      background: #fff;
      color: #364152;
      font-size: 11px;
      line-height: 14px;
    }
    .tableau-viz-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 12px;
      min-height: 0;
    }
    .tableau-card {
      display: flex;
      flex-direction: column;
      min-height: 180px;
      border: 1px solid #d8dde6;
      border-radius: 8px;
      background: #fff;
      overflow: hidden;
    }
    .tableau-card-header {
      padding: 10px 12px;
      border-bottom: 1px solid #edf1f5;
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
    }
    .tableau-card-body {
      flex: 1;
      padding: 12px;
    }
    .tableau-bars {
      display: flex;
      align-items: flex-end;
      gap: 10px;
      height: 100%;
      min-height: 120px;
      padding-top: 8px;
    }
    .tableau-bar {
      flex: 1;
      border-radius: 4px 4px 0 0;
      background: linear-gradient(180deg, #4e79a7, #76a0cf);
    }
    .tableau-bar:nth-child(2) { height: 72%; background: linear-gradient(180deg, #59a14f, #86c67d); }
    .tableau-bar:nth-child(3) { height: 58%; background: linear-gradient(180deg, #e15759, #ef8b8d); }
    .tableau-bar:nth-child(4) { height: 86%; background: linear-gradient(180deg, #f28e2b, #f7b26a); }
    .tableau-bar:nth-child(5) { height: 64%; background: linear-gradient(180deg, #b07aa1, #cb9fbf); }
    .tableau-bar:nth-child(1) { height: 48%; }
    .tableau-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      line-height: 16px;
    }
    .tableau-table th,
    .tableau-table td {
      padding: 8px 10px;
      border-bottom: 1px solid #edf1f5;
      text-align: left;
    }
    .tableau-table th {
      color: #5c6773;
      font-weight: 600;
      background: #fafbfc;
    }
    .tableau-table tr:last-child td {
      border-bottom: 0;
    }
    .tableau-status {
      margin-top: auto;
      padding: 8px 12px 12px;
      color: #5c6773;
      font-size: 10px;
      line-height: 14px;
    }
    @media (max-width: 720px) {
      .tableau-viz-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header class="tableau-toolbar">
    <div class="tableau-toolbar-start">
      <div aria-hidden="true" class="tableau-logo">T</div>
      <div class="tableau-title">
        <strong>${viewName}</strong>
        <span>${safeUrl}</span>
      </div>
    </div>
    <div class="tableau-toolbar-end">
      <span class="tableau-chip">${safeUsername}</span>
      <span class="tableau-chip">Connected App</span>
    </div>
  </header>
  <main class="tableau-body">
    <div class="tableau-filters">
      <span class="tableau-filter">Date Range: Last 12 Months</span>
      <span class="tableau-filter">Region: All</span>
      <span class="tableau-filter">Product Family: All</span>
    </div>
    <div class="tableau-viz-grid">
      <section class="tableau-card">
        <div class="tableau-card-header">Performance Trend</div>
        <div class="tableau-card-body">
          <div aria-hidden="true" class="tableau-bars">
            <div class="tableau-bar"></div>
            <div class="tableau-bar"></div>
            <div class="tableau-bar"></div>
            <div class="tableau-bar"></div>
            <div class="tableau-bar"></div>
          </div>
        </div>
      </section>
      <section class="tableau-card">
        <div class="tableau-card-header">Top Accounts</div>
        <div class="tableau-card-body">
          <table class="tableau-table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Revenue</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Acme Corp</td>
                <td>$1.2M</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>Northwind LLC</td>
                <td>$980K</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>Blue Sky Inc</td>
                <td>$845K</td>
                <td>Renewal</td>
              </tr>
              <tr>
                <td>Vertex Systems</td>
                <td>$712K</td>
                <td>Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
    <p class="tableau-status">Prototype preview using Connected App credentials. The live widget would render the authenticated Tableau view from this URL.</p>
  </main>
</body>
</html>`;
}
