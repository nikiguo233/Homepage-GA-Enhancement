export const DEFAULT_CUSTOM_WIDGET_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Announcements & Runbook</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #24292c; }
    .card { max-width: 100%; background: #fff; border: 1px solid #ddd; border-radius: 12px; padding: 16px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .header h2 { font-size: 15px; font-weight: 600; }
    .header a { color: #0d4ac3; font-size: 12px; text-decoration: none; }
    .banner { background: #e4f1ff; border-left: 4px solid #0d4ac3; padding: 12px; border-radius: 4px; margin-bottom: 12px; }
    .banner strong { display: block; color: #0d4ac3; font-size: 13px; margin-bottom: 4px; }
    .banner span { font-size: 12px; color: #575e63; }
    .body { display: grid; grid-template-columns: 1fr 120px; gap: 12px; font-size: 12px; line-height: 1.5; color: #575e63; }
    .brand { background: #1f4d45; color: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; min-height: 80px; }
    .checklist { margin-top: 16px; }
    .checklist h3 { font-size: 13px; margin-bottom: 8px; }
    .checklist li { list-style: none; font-size: 12px; margin-bottom: 6px; padding-left: 20px; position: relative; }
    .checklist li::before { content: "✓"; position: absolute; left: 0; color: #0d4ac3; }
    .checklist li.unchecked::before { content: "○"; color: #767d82; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>Announcements & Runbook</h2>
      <a href="#">View all announcements →</a>
    </div>
    <div class="banner">
      <strong>Scheduled Maintenance: Zuora Platform – May 24, 2025</strong>
      <span>May 24, 2025 · 10:00 PM PT – May 25, 2025 · 2:00 AM PT</span>
    </div>
    <div class="body">
      <p>We are performing scheduled maintenance to improve system performance. During this window, some features may be temporarily unavailable.</p>
      <div class="brand">ZUORA</div>
    </div>
    <div class="checklist">
      <h3>Runbook Checklist</h3>
      <ul>
        <li>Review maintenance overview and impact</li>
        <li>Verify notifications and stakeholder updates</li>
        <li class="unchecked">Confirm post-maintenance validation steps</li>
      </ul>
    </div>
  </div>
</body>
</html>`;

export const DEFAULT_EMBED_URL = "";
