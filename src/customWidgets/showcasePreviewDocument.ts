export function buildShowcasePreviewDocument(targetUrl: string, hostname: string) {
  const safeUrl = targetUrl.replace(/"/g, "&quot;");
  const safeHost = hostname.replace(/</g, "&lt;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${safeHost}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; background: #f6f7f8; }
    body {
      display: flex;
      flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: #24292c;
    }
    .showcase-toolbar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      border-bottom: 1px solid #d6d9db;
      background: #fff;
    }
    .showcase-toolbar img {
      width: 18px;
      height: 18px;
      border-radius: 4px;
    }
    .showcase-toolbar strong {
      font-size: 13px;
      font-weight: 600;
      line-height: 18px;
    }
    .showcase-toolbar span {
      color: #575e63;
      font-size: 12px;
      line-height: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .showcase-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 24px;
      text-align: center;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(246, 247, 248, 0.96)),
        radial-gradient(circle at top, rgba(13, 74, 195, 0.08), transparent 55%);
    }
    .showcase-badge {
      padding: 4px 10px;
      border-radius: 999px;
      background: #e9f0fa;
      color: #0d4ac3;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.4px;
      text-transform: uppercase;
    }
    .showcase-body h1 {
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
    }
    .showcase-body p {
      max-width: 320px;
      color: #575e63;
      font-size: 13px;
      line-height: 20px;
    }
    .showcase-link {
      color: #0d4ac3;
      font-size: 12px;
      line-height: 18px;
      text-decoration: none;
      word-break: break-all;
    }
    .showcase-link:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="showcase-toolbar">
    <img alt="" src="https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=64" />
    <div>
      <strong>${safeHost}</strong>
      <span>Embedded content preview</span>
    </div>
  </div>
  <div class="showcase-body">
    <span class="showcase-badge">Showcase Preview</span>
    <h1>${safeHost}</h1>
    <p>This prototype renders third-party embeds for demo purposes. The live app would load authenticated content from this URL inside the widget.</p>
    <a class="showcase-link" href="${safeUrl}" rel="noopener noreferrer" target="_blank">${safeUrl}</a>
  </div>
</body>
</html>`;
}
