import type { CustomWidgetSize } from "./types";
import { getWidgetDataApiBase } from "./widgetDataBinding";
import { getWidgetDesignDimensions, getWidgetGridSlotDimensions } from "./widgetSizes";

const PREVIEW_ADAPTOR_ATTR = "data-zuora-preview-adaptor";

export function buildWidgetPreviewDocument(
  content: string,
  size: CustomWidgetSize,
  compact = false,
  options?: { dense?: boolean; gridFit?: boolean; scrollable?: boolean; useLiveData?: boolean },
) {
  const { height } = options?.gridFit
    ? getWidgetGridSlotDimensions(size, { editorPreview: true })
    : getWidgetDesignDimensions(size);
  const gridFit = options?.gridFit ?? false;
  const scrollable = options?.scrollable ?? false;
  const dense = options?.dense ?? false;
  const bodyOverflow = compact ? "hidden" : gridFit && !scrollable ? "hidden" : "auto";
  const bodyPadding = compact ? (dense ? "4px" : "8px") : gridFit ? "0" : "12px";
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
  const adaptor = gridFit
    ? scrollable
      ? `<style ${PREVIEW_ADAPTOR_ATTR}>
    html {
      height: 100%;
      overflow: hidden;
    }

    body {
      width: 100%;
      height: 100%;
      margin: 0;
      overflow-x: hidden;
      overflow-y: auto;
      padding: ${bodyPadding};
    }

    body > :first-child {
      width: 100%;
      min-height: 100%;
      box-sizing: border-box;
    }

    .card,
    .metric,
    .dashboard {
      width: 100% !important;
      max-width: none !important;
      box-sizing: border-box;
    }
  </style>`
      : `<style ${PREVIEW_ADAPTOR_ATTR}>
    html, body {
      width: 100%;
      height: 100%;
      margin: 0;
      overflow: hidden;
    }

    body {
      display: flex;
      flex-direction: column;
      padding: ${bodyPadding};
    }

    body > :first-child {
      flex: 1 1 auto;
      min-height: 0;
      min-width: 0;
      width: 100%;
    }

    .card,
    .metric,
    .dashboard {
      width: 100% !important;
      height: 100% !important;
      max-width: none !important;
      box-sizing: border-box;
    }
  </style>`
    : `<style ${PREVIEW_ADAPTOR_ATTR}>
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
