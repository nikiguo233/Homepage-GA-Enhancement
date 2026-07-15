import { buildShowcasePreviewDocument } from "../src/customWidgets/showcasePreviewDocument";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";

const SHOWCASE_PATH = "/embed-showcase";
const BLOCKED_PROTOCOLS = new Set(["javascript:", "data:", "file:", "blob:"]);

function sendText(res: ServerResponse, statusCode: number, message: string) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end(message);
}

function prepareShowcaseHtml(
  html: string,
  origin: string,
  viewport?: { height: number; width: number },
) {
  let document = html.replace(/<base[^>]*>/gi, "");
  document = document.replace(
    /<meta[^>]+name=["']viewport["'][^>]*>/gi,
    "",
  );
  document = document.replace(
    /<meta[^>]+http-equiv=["']Content-Security-Policy["'][^>]*>/gi,
    "",
  );

  const baseTag = `<base href="${origin}/">`;
  const viewportMeta = viewport
    ? `<meta name="viewport" content="width=${viewport.width}, initial-scale=1" />`
    : `<meta name="viewport" content="width=device-width, initial-scale=1" />`;
  const viewportRules = viewport
    ? `
    html, body {
      width: ${viewport.width}px;
      min-height: ${viewport.height}px;
    }`
    : "";
  const showcaseStyles = `<style data-embed-showcase>
    html, body {
      margin: 0;
      background: #fff;
      overflow: auto;
    }${viewportRules}
    img, video, canvas, svg {
      max-width: 100%;
      height: auto;
    }
  </style>`;

  if (/<head[^>]*>/i.test(document)) {
    return document.replace(
      /<head[^>]*>/i,
      (match) => `${match}${baseTag}${viewportMeta}${showcaseStyles}`,
    );
  }

  if (/<html[^>]*>/i.test(document)) {
    return document.replace(
      /<html[^>]*>/i,
      (match) => `${match}<head>${baseTag}${viewportMeta}${showcaseStyles}</head>`,
    );
  }

  return `<!DOCTYPE html><html><head>${baseTag}${viewportMeta}${showcaseStyles}</head><body>${document}</body></html>`;
}

async function handleEmbedShowcase(req: IncomingMessage, res: ServerResponse, next: () => void) {
  const requestPath = req.url?.split("?")[0];
  if (requestPath !== SHOWCASE_PATH) {
    next();
    return;
  }

  const requestUrl = new URL(req.url ?? "", "http://localhost");
  const target = requestUrl.searchParams.get("url");
  const viewportWidth = Number(requestUrl.searchParams.get("width"));
  const viewportHeight = Number(requestUrl.searchParams.get("height"));
  const viewport =
    Number.isFinite(viewportWidth) &&
    Number.isFinite(viewportHeight) &&
    viewportWidth > 0 &&
    viewportHeight > 0
      ? { width: viewportWidth, height: viewportHeight }
      : undefined;

  if (!target) {
    sendText(res, 400, "Missing url parameter.");
    return;
  }

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    sendText(res, 400, "Invalid url parameter.");
    return;
  }

  if (parsed.protocol !== "https:" || BLOCKED_PROTOCOLS.has(`${parsed.protocol}`)) {
    sendText(res, 400, "Only secure HTTPS embed URLs are supported.");
    return;
  }

  try {
    const response = await fetch(parsed.toString(), {
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent":
          "Mozilla/5.0 (compatible; HomepageGAEmbedShowcase/1.0; +https://www.zuora.com)",
      },
      redirect: "follow",
    });

    const contentType = response.headers.get("content-type") ?? "text/html";

    if (!response.ok) {
      sendText(res, response.status, `Embed target responded with ${response.status}.`);
      return;
    }

    if (contentType.startsWith("image/")) {
      const buffer = Buffer.from(await response.arrayBuffer());
      res.statusCode = 200;
      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "no-store");
      res.end(buffer);
      return;
    }

    const body = await response.text();

    if (contentType.includes("text/html")) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "no-store");
      res.end(prepareShowcaseHtml(body, parsed.origin, viewport));
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "no-store");
    res.end(body);
  } catch {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(buildShowcasePreviewDocument(parsed.toString(), parsed.hostname));
  }
}

export function embedShowcasePlugin(): Plugin {
  return {
    name: "embed-showcase",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        void handleEmbedShowcase(req, res, next);
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        void handleEmbedShowcase(req, res, next);
      });
    },
  };
}
