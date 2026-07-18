import { useMemo } from "react";
import type { CustomWidget, CustomWidgetSize } from "../../customWidgets/types";
import {
  HOMEPAGE_WIDGET_GRID_COLUMNS,
  parseWidgetSize,
  WIDGET_EDITOR_PREVIEW_GRID_CELL_HEIGHT,
  WIDGET_EDITOR_PREVIEW_GRID_ROWS,
  WIDGET_GRID_UNIT_WIDTH,
} from "../../customWidgets/widgetSizes";
import { CustomWidgetPreviewFrame } from "./CustomWidgetPreviewFrame";

function getOccupiedCellIndexes(cols: number, rows: number) {
  const occupied = new Set<number>();

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      occupied.add(row * HOMEPAGE_WIDGET_GRID_COLUMNS + col);
    }
  }

  return occupied;
}

export function WidgetEditorPreviewGrid({
  previewWidget,
  size,
}: {
  previewWidget: Pick<
    CustomWidget,
    "content" | "dataBinding" | "displayWidgetName" | "labelAsExternalContent" | "name" | "type"
  >;
  size: CustomWidgetSize;
}) {
  const { cols, rows } = parseWidgetSize(size);
  const baseGridRows = Math.max(WIDGET_EDITOR_PREVIEW_GRID_ROWS, rows);
  const gridRows = baseGridRows === rows ? rows + 1 : baseGridRows;
  const totalCells = HOMEPAGE_WIDGET_GRID_COLUMNS * gridRows;
  const occupiedCellIndexes = useMemo(
    () => getOccupiedCellIndexes(cols, rows),
    [cols, rows],
  );

  return (
    <div
      className="custom-widget-editor-preview-grid"
      style={{
        gridTemplateColumns: `repeat(${HOMEPAGE_WIDGET_GRID_COLUMNS}, ${WIDGET_GRID_UNIT_WIDTH}px)`,
        gridTemplateRows: `repeat(${gridRows}, ${WIDGET_EDITOR_PREVIEW_GRID_CELL_HEIGHT}px)`,
      }}
    >
      <div
        className="custom-widget-editor-preview-grid-widget"
        style={{
          gridColumn: `1 / span ${cols}`,
          gridRow: `1 / span ${rows}`,
        }}
      >
        <CustomWidgetPreviewFrame gridFit interactive size={size} widget={previewWidget} />
      </div>
      {Array.from({ length: totalCells }, (_, index) => {
        if (occupiedCellIndexes.has(index)) {
          return null;
        }

        const row = Math.floor(index / HOMEPAGE_WIDGET_GRID_COLUMNS) + 1;
        const col = (index % HOMEPAGE_WIDGET_GRID_COLUMNS) + 1;

        return (
          <div
            aria-hidden="true"
            className="custom-widget-editor-grid-cell"
            key={index}
            style={{ gridColumn: col, gridRow: row }}
          />
        );
      })}
    </div>
  );
}
