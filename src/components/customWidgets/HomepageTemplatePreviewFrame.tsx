import { useLayoutEffect, useRef, useState } from "react";
import { getTemplatePreviewCustomWidget } from "../../homepageConfig/teamTemplate";
import type { HomepageTemplateDraft } from "../../homepageConfig/teamTemplate";
import { AiGeneratedDashboard } from "../AiGeneratedDashboard";

const PREVIEW_REFERENCE_WIDTH = 1120;

export function HomepageTemplatePreviewFrame({ template }: { template: HomepageTemplateDraft }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.3);
  const [height, setHeight] = useState(180);
  const widgetIds = [...template.dashboardWidgetIds, ...template.customWidgetRefs];

  useLayoutEffect(() => {
    if (template.previewImageUrl) {
      return undefined;
    }

    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) {
      return undefined;
    }

    const updateScale = () => {
      const nextScale = container.clientWidth / PREVIEW_REFERENCE_WIDTH;
      setScale(nextScale);
      setHeight(content.scrollHeight * nextScale);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    observer.observe(content);

    return () => {
      observer.disconnect();
    };
  }, [template.previewImageUrl, widgetIds]);

  if (template.previewImageUrl) {
    return (
      <img alt="" className="homepage-template-preview-image" src={template.previewImageUrl} />
    );
  }

  return (
    <div
      className="homepage-template-preview-scaled"
      ref={containerRef}
      style={{ height }}
    >
      <div
        ref={contentRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: PREVIEW_REFERENCE_WIDTH,
        }}
      >
        <AiGeneratedDashboard
          addedWidgetIds={widgetIds}
          getCustomWidgetById={getTemplatePreviewCustomWidget}
        />
      </div>
    </div>
  );
}
