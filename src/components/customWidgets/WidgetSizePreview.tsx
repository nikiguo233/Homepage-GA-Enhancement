import type { CustomWidgetSize } from "../../customWidgets/types";
import { parseWidgetSize } from "../../customWidgets/widgetSizes";

const PREVIEW_MAX_COLS = 6;
const PREVIEW_CELL_HEIGHT = 40;
const PREVIEW_ROW_GAP = 12;

function getPreviewMaxRows(rows: number) {
  return Math.max(3, rows);
}

export function WidgetSizePreview({ size }: { size: CustomWidgetSize }) {
  const { cols, rows } = parseWidgetSize(size);
  const maxRows = getPreviewMaxRows(rows);
  const sideCols = Math.max(0, PREVIEW_MAX_COLS - cols);
  const sideCellCount = sideCols * rows;
  const bottomRows = Math.max(0, maxRows - rows);
  const bottomCellCount = bottomRows * PREVIEW_MAX_COLS;
  const selectedMinHeight = rows * PREVIEW_CELL_HEIGHT + Math.max(0, rows - 1) * PREVIEW_ROW_GAP;

  return (
    <div className="widget-size-preview" data-size={size}>
      <div className="widget-size-preview-row">
        <div
          className="widget-size-preview-selected"
          style={{
            flex: `${cols} 0 0`,
            minHeight: selectedMinHeight,
          }}
        >
          <span>{size}</span>
        </div>
        {sideCols > 0 ? (
          <div
            className="widget-size-preview-grid widget-size-preview-grid-side"
            style={{ gridTemplateColumns: `repeat(${sideCols}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: sideCellCount }, (_, index) => (
              <span className="widget-size-preview-cell" key={index} />
            ))}
          </div>
        ) : null}
      </div>
      {bottomCellCount > 0 ? (
        <div
          className="widget-size-preview-grid widget-size-preview-grid-bottom"
          style={{ gridTemplateColumns: `repeat(${PREVIEW_MAX_COLS}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: bottomCellCount }, (_, index) => (
            <span className="widget-size-preview-cell" key={index} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
