import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  getEmbedSrc,
  getEmbedTargetUrl,
  INTERACTIVE_EMBED_ALLOW,
  isEmbedImageUrl,
  validateEmbedUrl,
} from "../../customWidgets/embedPolicy";
import { buildWidgetPreviewDocument } from "../../customWidgets/previewDocument";
import { buildShowcasePreviewDocument } from "../../customWidgets/showcasePreviewDocument";
import type { CustomWidget, CustomWidgetSize } from "../../customWidgets/types";
import { getWidgetDesignDimensions, getWidgetGridSlotDimensions } from "../../customWidgets/widgetSizes";

const EMBED_LOAD_HINT_DELAY_MS = 8000;

type EmbedLoadState = "idle" | "loading" | "ready" | "unavailable";

export function CustomWidgetPreviewFrame({
  compact = false,
  dense = false,
  fillContainer = false,
  gridFit = false,
  interactive,
  scrollable = false,
  size = "3x3",
  widget,
}: {
  compact?: boolean;
  dense?: boolean;
  fillContainer?: boolean;
  gridFit?: boolean;
  interactive?: boolean;
  scrollable?: boolean;
  size?: CustomWidgetSize;
  widget: Pick<
    CustomWidget,
    "content" | "dataBinding" | "displayWidgetName" | "labelAsExternalContent" | "name" | "type"
  >;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const usesLiveData = Boolean(widget.dataBinding);
  const [embedLoadState, setEmbedLoadState] = useState<EmbedLoadState>("idle");
  const [showLoadHint, setShowLoadHint] = useState(false);
  const [useShowcaseFallback, setUseShowcaseFallback] = useState(false);
  const isInteractive = interactive ?? !compact;
  const isInteractiveEmbed = widget.type === "embed" && isInteractive;
  const { width: designWidth, height: designHeight } = gridFit
    ? getWidgetGridSlotDimensions(size, { editorPreview: true })
    : getWidgetDesignDimensions(size);
  const embedValidation =
    widget.type === "embed" ? validateEmbedUrl(widget.content) : null;
  const embedTargetUrl =
    embedValidation?.valid && embedValidation.normalizedUrl ? getEmbedTargetUrl(widget.content) : null;
  const isImageEmbed = Boolean(embedTargetUrl && isEmbedImageUrl(embedTargetUrl));
  const embedViewport = { width: designWidth, height: designHeight };
  const embedSrc =
    embedValidation?.valid && embedValidation.trustLevel
      ? getEmbedSrc(widget.content, embedValidation.trustLevel, embedViewport)
      : null;

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) {
      return;
    }

    if (gridFit) {
      setScale(1);
      return;
    }

    let frameId = 0;
    let timeoutId = 0;

    const updateScale = () => {
      const { width, height } = shell.getBoundingClientRect();
      if (width === 0 || height === 0) {
        return false;
      }

      setScale(Math.min(width / designWidth, height / designHeight));
      return true;
    };

    const scheduleScaleUpdate = () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);

      frameId = window.requestAnimationFrame(() => {
        if (!updateScale()) {
          timeoutId = window.setTimeout(updateScale, 50);
        }
      });
    };

    scheduleScaleUpdate();
    const observer = new ResizeObserver(scheduleScaleUpdate);
    observer.observe(shell);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [designHeight, designWidth, gridFit]);

  useEffect(() => {
    if (widget.type !== "embed" || !embedSrc) {
      setEmbedLoadState("idle");
      setShowLoadHint(false);
      setUseShowcaseFallback(false);
      return;
    }

    setShowLoadHint(false);
    if (isImageEmbed) {
      setUseShowcaseFallback(false);
      setEmbedLoadState("ready");
      return;
    }

    setUseShowcaseFallback(false);
    setEmbedLoadState("loading");
  }, [embedSrc, isImageEmbed, widget.content, widget.type]);

  useEffect(() => {
    if (embedLoadState !== "loading" || !isInteractive) {
      setShowLoadHint(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setShowLoadHint(true);
    }, EMBED_LOAD_HINT_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [embedLoadState, embedSrc, isInteractive]);

  const shellClassName = [
    "custom-widget-preview-shell",
    compact ? "is-compact" : "",
    dense ? "is-dense" : "",
    fillContainer ? "is-fill-container" : "",
    gridFit ? "is-grid-fit" : "",
    isInteractive ? "is-interactive" : "",
    isInteractiveEmbed ? "is-interactive-embed" : "",
    widget.type === "embed" ? "is-embed" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const shellStyle: CSSProperties = gridFit
    ? {
        height: "100%",
        width: "100%",
      }
    : fillContainer
    ? {
        height: "100%",
        maxHeight: "100%",
        maxWidth: "100%",
        width: "100%",
      }
    : compact
    ? dense
      ? {
          aspectRatio: `${designWidth} / ${designHeight}`,
          height: "100%",
          margin: "0 auto",
          maxHeight: "100%",
          maxWidth: "100%",
          width: "auto",
        }
      : {
          aspectRatio: `${designWidth} / ${designHeight}`,
          maxHeight: "100%",
          width: "100%",
        }
    : { aspectRatio: `${designWidth} / ${designHeight}` };

  const designSurfaceStyle: CSSProperties = gridFit
    ? {
        height: "100%",
        width: "100%",
      }
    : {
        height: designHeight,
        width: designWidth,
      };

  const scaledLayerStyle: CSSProperties = gridFit
    ? {
        ...designSurfaceStyle,
        transform: "none",
      }
    : {
        ...designSurfaceStyle,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      };

  const iframeStyle: CSSProperties = {
    ...designSurfaceStyle,
    display: "block",
  };

  const scalerStyle: CSSProperties = gridFit
    ? {
        height: "100%",
        width: "100%",
      }
    : {
        height: designHeight * scale,
        width: designWidth * scale,
      };

  const handleEmbedLoad = () => {
    setEmbedLoadState("ready");
    setShowLoadHint(false);
    setUseShowcaseFallback(false);
  };

  const handleEmbedError = () => {
    if (embedTargetUrl && embedValidation?.hostname) {
      setUseShowcaseFallback(true);
      setEmbedLoadState("ready");
      setShowLoadHint(false);
      return;
    }

    setEmbedLoadState("unavailable");
    setShowLoadHint(false);
  };

  const openEmbedInNewTab = () => {
    if (!embedTargetUrl) {
      return;
    }

    window.open(embedTargetUrl, "_blank", "noopener,noreferrer");
  };

  const showcaseDocument =
    embedTargetUrl && embedValidation?.hostname
      ? buildShowcasePreviewDocument(embedTargetUrl, embedValidation.hostname)
      : null;

  const iframe =
    widget.type === "embed" ? (
      isImageEmbed && embedTargetUrl ? (
        <img
          alt=""
          className="custom-widget-preview-frame custom-widget-preview-image"
          referrerPolicy="no-referrer"
          src={embedTargetUrl}
          style={{ ...iframeStyle, objectFit: "cover" }}
        />
      ) : useShowcaseFallback && showcaseDocument ? (
        <iframe
          className="custom-widget-preview-frame"
          key={`showcase-${embedTargetUrl}`}
          sandbox="allow-scripts allow-same-origin"
          scrolling={compact ? "no" : "auto"}
          srcDoc={showcaseDocument}
          style={iframeStyle}
          title="Custom widget preview"
        />
      ) : embedSrc ? (
        <iframe
          allow={isInteractive ? INTERACTIVE_EMBED_ALLOW : undefined}
          className="custom-widget-preview-frame"
          key={embedSrc}
          onError={handleEmbedError}
          onLoad={handleEmbedLoad}
          referrerPolicy="strict-origin-when-cross-origin"
          scrolling={compact ? "no" : "auto"}
          src={embedSrc}
          style={iframeStyle}
          title="Custom widget preview"
        />
      ) : null
    ) : (
      <iframe
        allow={usesLiveData ? "fullscreen" : undefined}
        className="custom-widget-preview-frame"
        sandbox={usesLiveData ? "allow-scripts allow-same-origin" : "allow-scripts"}
        scrolling={compact ? "no" : "auto"}
        srcDoc={buildWidgetPreviewDocument(widget.content, size, compact, {
          dense,
          gridFit,
          scrollable,
          useLiveData: usesLiveData,
        })}
        style={iframeStyle}
        title="Custom widget preview"
      />
    );

  const showExternalContentChip = widget.labelAsExternalContent;
  const showWidgetNameTitle =
    widget.displayWidgetName && widget.name.trim().length > 0 && !compact;
  const showEmbedFallback = widget.type === "embed" && !embedSrc;
  const showEmbedUnavailable = widget.type === "embed" && embedLoadState === "unavailable";
  const showEmbedLoading = widget.type === "embed" && embedLoadState === "loading" && isInteractive;

  return (
    <div className={shellClassName} ref={shellRef} style={shellStyle}>
      {showExternalContentChip ? (
        <span className="custom-widget-external-content-chip">External Content</span>
      ) : null}
      <div className="custom-widget-preview-scaler" style={scalerStyle}>
        <div className="custom-widget-preview-scaled-layer" style={scaledLayerStyle}>
          {showWidgetNameTitle ? (
            <p className="custom-widget-preview-title">{widget.name.trim()}</p>
          ) : null}
          {showEmbedFallback || showEmbedUnavailable ? (
            <div className="custom-widget-embed-fallback" style={iframeStyle}>
              <p className="custom-widget-embed-fallback-title">
                {showEmbedUnavailable ? "Unable to load embedded content" : "Invalid embed URL"}
              </p>
              <p className="custom-widget-embed-fallback-copy">
                {showEmbedUnavailable
                  ? "This site may block embedding or require sign-in in a new tab."
                  : (embedValidation?.error ?? "Enter a secure HTTPS URL to preview this widget.")}
              </p>
              {embedTargetUrl ? (
                <button
                  className="custom-widget-embed-fallback-button"
                  onClick={() => {
                    window.open(embedTargetUrl, "_blank", "noopener,noreferrer");
                  }}
                  type="button"
                >
                  <OpenInNewOutlinedIcon />
                  Open in new tab
                </button>
              ) : null}
            </div>
          ) : (
            iframe
          )}
        </div>
        {showEmbedLoading ? (
          <div aria-hidden="true" className="custom-widget-embed-loading">
            Loading embed…
          </div>
        ) : null}
      </div>
      {widget.type === "embed" && embedTargetUrl && isInteractive && !showEmbedUnavailable ? (
        <div className="custom-widget-embed-actions">
          {showLoadHint ? (
            <p className="custom-widget-embed-hint">
              Still loading? This content may require sign-in.
            </p>
          ) : null}
          <button
            className="custom-widget-embed-open-button"
            onClick={openEmbedInNewTab}
            type="button"
          >
            <OpenInNewOutlinedIcon />
            Open in new tab
          </button>
        </div>
      ) : null}
    </div>
  );
}
