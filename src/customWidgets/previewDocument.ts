import type { CustomWidgetSize } from "./types";
import { getWidgetDataApiBase } from "./widgetDataBinding";
import { getWidgetDesignDimensions } from "./widgetSizes";

const PREVIEW_ADAPTOR_ATTR = "data-zuora-preview-adaptor";

export function buildWidgetPreviewDocument(
  content: string,
  size: CustomWidgetSize,
  compact = false,
  options?: { dense?: boolean; useLiveData?: boolean },
) {
  const { height } = getWidgetDesignDimensions(size);
  const dense = options?.dense ?? false;
  const bodyOverflow = compact ? "hidden" : "auto";
  const bodyPadding = compact ? (dense ? "4px" : "8px") : "12px";
  const liveDataScript = options?.useLiveData
    ? `<script>window.__ZUORA_WIDGET_DATA_API__ = ${JSON.stringify(getWidgetDataApiBase())};</script>`
    : "";
  const denseStyles = dense
    ? `<style ${PREVIEW_ADAPTOR_ATTR}-dense>
    .card { padding: 10px !important; }
    .header { margin-bottom: 6px !important; }
    .header h2 { font-size: 13px !important; line-height: 18px !important; }
    .header span { font-size: 11px !important; }
    table { font-size: 11px !important; }
    th, td { padding: 4px 6px !important; line-height: 14px !important; }
    .rank { width: 22px !important; }
  </style>`
    : "";
  const adaptor = `<style ${PREVIEW_ADAPTOR_ATTR}>
    html {
      height: 100%;
      overflow: hidden;
    }

    body {
      min-height: ${height}px;
      height: 100%;
      margin: 0;
      padding: ${bodyPadding};
      overflow: ${bodyOverflow};
    }
  </style>`;

  if (/<\/head>/i.test(content)) {
    return content.replace(/<\/head>/i, `${liveDataScript}${denseStyles}${adaptor}</head>`);
  }

  if (/<html[\s>]/i.test(content)) {
    return content.replace(/<html([^>]*)>/i, `<html$1><head>${liveDataScript}${denseStyles}${adaptor}</head>`);
  }

  return `<!DOCTYPE html><html><head>${liveDataScript}${denseStyles}${adaptor}</head><body>${content}</body></html>`;
}
