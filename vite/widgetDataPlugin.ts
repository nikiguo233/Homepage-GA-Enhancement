import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";

const WIDGET_DATA_PATH = "/api/widget-data/top-accounts";

const LIVE_ACCOUNTS = [
  { account: "Acme Holdings", openBalance: 482150, rank: 1, status: "Past Due" },
  { account: "Northwind Telecom", openBalance: 391420, rank: 2, status: "Open" },
  { account: "Blue Ridge Media", openBalance: 318900, rank: 3, status: "Past Due" },
  { account: "Summit Logistics", openBalance: 276540, rank: 4, status: "Open" },
  { account: "Orion Systems", openBalance: 241880, rank: 5, status: "Open" },
  { account: "Harbor Health", openBalance: 198320, rank: 6, status: "Past Due" },
  { account: "Pacific Retail Group", openBalance: 176110, rank: 7, status: "Open" },
  { account: "Vertex Analytics", openBalance: 154760, rank: 8, status: "Open" },
  { account: "Cascade Manufacturing", openBalance: 132490, rank: 9, status: "Open" },
  { account: "Evergreen Services", openBalance: 118275, rank: 10, status: "Open" },
] as const;

function sendJson(res: ServerResponse, statusCode: number, payload: unknown) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function handleWidgetData(req: IncomingMessage, res: ServerResponse, next: () => void) {
  const requestPath = req.url?.split("?")[0];
  if (requestPath !== WIDGET_DATA_PATH) {
    next();
    return;
  }

  const requestUrl = new URL(req.url ?? "", "http://localhost");
  const limit = Math.max(1, Math.min(50, Number(requestUrl.searchParams.get("limit")) || 10));
  const accounts = LIVE_ACCOUNTS.slice(0, limit).map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));

  sendJson(res, 200, {
    accounts,
    asOf: new Date().toLocaleString("en-US", {
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      month: "short",
    }),
    query: "account-open-balance-top-n",
    source: "zuora-billing",
  });
}

export function widgetDataPlugin(): Plugin {
  return {
    name: "widget-data-api",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        handleWidgetData(req, res, next);
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        handleWidgetData(req, res, next);
      });
    },
  };
}
