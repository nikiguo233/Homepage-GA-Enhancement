import type { CustomWidgetSize, PresetCustomWidgetSize } from "./types";

export const PRESET_WIDGET_SIZES: PresetCustomWidgetSize[] = ["3x2", "3x3", "6x3", "6x4"];

/** @deprecated Use PRESET_WIDGET_SIZES for preset catalog */
export const ALL_WIDGET_SIZES = PRESET_WIDGET_SIZES;

export const DEFAULT_SUPPORTED_WIDGET_SIZES: CustomWidgetSize[] = ["3x3", "6x3", "6x4"];

/** @deprecated Use PRESET_WIDGET_SIZES for full catalog; kept for backward compatibility */
export const CUSTOM_WIDGET_SIZES = PRESET_WIDGET_SIZES;

export const DEFAULT_CUSTOM_SIZE_COLS = 4;
export const DEFAULT_CUSTOM_SIZE_ROWS = 4;
export const MIN_WIDGET_GRID_UNIT = 1;
export const MAX_WIDGET_GRID_UNIT = 12;

const WIDGET_GRID_UNIT_WIDTH = 116;
const WIDGET_GRID_UNIT_HEIGHT = 136;

const PRESET_SIZE_ORDER = new Map(PRESET_WIDGET_SIZES.map((size, index) => [size, index]));

function parseWidgetSizeString(size: string) {
  const match = /^(\d+)x(\d+)$/.exec(size.trim());
  if (!match) {
    return null;
  }

  const cols = Number(match[1]);
  const rows = Number(match[2]);
  if (!Number.isInteger(cols) || !Number.isInteger(rows) || cols < 1 || rows < 1) {
    return null;
  }

  return { cols, rows };
}

export function isPresetWidgetSize(size: string): size is PresetCustomWidgetSize {
  return (PRESET_WIDGET_SIZES as string[]).includes(size);
}

export function isValidWidgetSize(size: string): size is CustomWidgetSize {
  const parsed = parseWidgetSizeString(size);
  if (!parsed) {
    return false;
  }

  return (
    parsed.cols >= MIN_WIDGET_GRID_UNIT &&
    parsed.cols <= MAX_WIDGET_GRID_UNIT &&
    parsed.rows >= MIN_WIDGET_GRID_UNIT &&
    parsed.rows <= MAX_WIDGET_GRID_UNIT
  );
}

export function formatWidgetSize(cols: number, rows: number): CustomWidgetSize {
  return `${cols}x${rows}`;
}

export function getCustomSupportedSize(sizes: CustomWidgetSize[]) {
  return sizes.find((size) => !isPresetWidgetSize(size));
}

export function parseWidgetSize(size: CustomWidgetSize) {
  const parsed = parseWidgetSizeString(size);
  if (!parsed) {
    return { cols: 3, rows: 3 };
  }

  return parsed;
}

export function normalizeWidgetSize(size: string, fallback: CustomWidgetSize = "3x3"): CustomWidgetSize {
  if (isValidWidgetSize(size)) {
    return size;
  }

  if (size === "2x2") {
    return "3x2";
  }

  return fallback;
}

export function sortWidgetSizes(sizes: CustomWidgetSize[]) {
  return [...sizes].sort((left, right) => {
    if (isPresetWidgetSize(left) && isPresetWidgetSize(right)) {
      return (PRESET_SIZE_ORDER.get(left) ?? 0) - (PRESET_SIZE_ORDER.get(right) ?? 0);
    }

    if (isPresetWidgetSize(left)) {
      return -1;
    }

    if (isPresetWidgetSize(right)) {
      return 1;
    }

    const leftSize = parseWidgetSize(left);
    const rightSize = parseWidgetSize(right);
    const leftArea = leftSize.cols * leftSize.rows;
    const rightArea = rightSize.cols * rightSize.rows;

    if (leftArea !== rightArea) {
      return leftArea - rightArea;
    }

    if (leftSize.cols !== rightSize.cols) {
      return leftSize.cols - rightSize.cols;
    }

    return leftSize.rows - rightSize.rows;
  });
}

export function normalizeSupportedWidgetSizes(
  supportedSizes: string[] | undefined,
  fallbackSize: CustomWidgetSize,
) {
  const normalized = sortWidgetSizes(
    (supportedSizes ?? [])
      .map((size) => normalizeWidgetSize(size, fallbackSize))
      .filter((size, index, sizes) => sizes.indexOf(size) === index)
      .filter(isValidWidgetSize),
  );

  if (normalized.length === 0) {
    return [fallbackSize];
  }

  return normalized;
}

export function getWidgetSizeLabel(size: CustomWidgetSize) {
  return size.replace("x", " x ");
}

export function getWidgetSizeAspectRatio(size: CustomWidgetSize) {
  const { cols, rows } = parseWidgetSize(size);
  return cols / rows;
}

export function getWidgetDesignDimensions(size: CustomWidgetSize) {
  const { cols, rows } = parseWidgetSize(size);
  return {
    width: cols * WIDGET_GRID_UNIT_WIDTH,
    height: rows * WIDGET_GRID_UNIT_HEIGHT,
  };
}

export function clampWidgetGridUnit(value: number) {
  if (!Number.isFinite(value)) {
    return MIN_WIDGET_GRID_UNIT;
  }

  return Math.min(MAX_WIDGET_GRID_UNIT, Math.max(MIN_WIDGET_GRID_UNIT, Math.round(value)));
}
