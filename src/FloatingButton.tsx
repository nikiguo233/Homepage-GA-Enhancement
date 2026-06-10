import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type FloatingButtonVariant = "primary" | "secondary" | "tertiary";
export type FloatingButtonShape = "circular" | "extended";
export type FloatingButtonSize = "medium" | "small" | "xSmall";
export type FloatingButtonTheme = "light" | "dark";

export type FloatingButtonProps = {
  variant?: FloatingButtonVariant;
  shape?: FloatingButtonShape;
  size?: FloatingButtonSize;
  theme?: FloatingButtonTheme;
  /** Label for extended shape (Figma default: "FAB"). Ignored when shape is circular. */
  label?: string;
  /** Custom icon; defaults to MUI Add icon. */
  icon?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  /** Merged after internal OCCAM styles. */
  sx?: SxProps<Theme>;
};

const SIZE_PX = { medium: 36, small: 32, xSmall: 28 } as const;
const ICON_PX = { medium: 24, small: 20, xSmall: 18 } as const;
const EXTENDED_PAD_X = { medium: 12, small: 10, xSmall: 8 } as const;

function fabSx({
  variant,
  shape,
  size,
  themeMode,
}: {
  variant: FloatingButtonVariant;
  shape: FloatingButtonShape;
  size: FloatingButtonSize;
  themeMode: FloatingButtonTheme;
}): SxProps<Theme> {
  const d = SIZE_PX[size];
  const icon = ICON_PX[size];
  const padX = EXTENDED_PAD_X[size];
  const gapPx = size === "xSmall" ? 2 : 4;

  const base: SxProps<Theme> = {
    boxShadow: "var(--occam-elevation-2dp)",
    textTransform: "capitalize",
    fontFamily: "var(--zui-font-system)",
    fontSize: "var(--font-button-size)",
    fontWeight: "var(--font-button-weight)",
    lineHeight: "var(--font-button-line-height)",
    letterSpacing: "0.1px",
    minHeight: d,
    "&:hover": { boxShadow: "var(--occam-elevation-2dp)" },
    "&:active": { boxShadow: "var(--occam-elevation-2dp)" },
    "&:focus-visible": {
      outline:
        themeMode === "light"
          ? "2px solid var(--occam-light-theme-links-enabled)"
          : "2px solid var(--occam-dark-theme-links-enabled)",
      outlineOffset: "2px",
    },
    "& .MuiSvgIcon-root": {
      width: icon,
      height: icon,
    },
  };

  if (shape === "circular") {
    Object.assign(base, {
      width: d,
      height: d,
      minHeight: d,
      padding: 0,
    });
  } else {
    Object.assign(base, {
      width: "auto",
      height: "auto",
      borderRadius: 100,
      px: `${padX}px`,
      py: "6px",
      gap: `${gapPx}px`,
      flexDirection: "row",
    });
  }

  const isLight = themeMode === "light";

  if (variant === "primary") {
    if (isLight) {
      Object.assign(base, {
        bgcolor: "var(--occam-light-theme-contained-default-enabled)",
        color: "var(--occam-core-palette-contrasts-white)",
        border: "1px solid transparent",
        "&:hover:not(.Mui-disabled)": {
          bgcolor: `color-mix(in srgb, var(--occam-light-theme-contained-default-hover-on-layer) 12%, var(--occam-light-theme-contained-default-hover-base))`,
        },
        "&:active:not(.Mui-disabled)": {
          bgcolor: `color-mix(in srgb, var(--occam-light-theme-contained-default-pressed-on-layer) 20%, var(--occam-light-theme-contained-default-pressed-base))`,
        },
        "&.Mui-disabled": {
          bgcolor: "var(--occam-floating-button-disabled-bg-light)",
          color: "var(--occam-floating-button-disabled-fg-light)",
        },
      });
    } else {
      Object.assign(base, {
        bgcolor: "var(--occam-core-palette-brand-blue-400)",
        color: "var(--occam-dark-theme-layout-emphasis-high)",
        border: "1px solid transparent",
        "&:hover:not(.Mui-disabled)": {
          bgcolor: `color-mix(in srgb, var(--occam-dark-theme-contained-default-hover-on-layer) 12%, var(--occam-dark-theme-contained-default-hover-base))`,
        },
        "&:active:not(.Mui-disabled)": {
          bgcolor: `color-mix(in srgb, var(--occam-dark-theme-contained-default-hover-on-layer) 20%, var(--occam-dark-theme-contained-default-hover-base))`,
        },
        "&.Mui-disabled": {
          bgcolor: "var(--occam-floating-button-disabled-bg-dark)",
          color: "var(--occam-floating-button-disabled-fg-dark)",
        },
      });
    }
  } else if (variant === "secondary") {
    if (isLight) {
      Object.assign(base, {
        bgcolor: "var(--occam-core-palette-brand-blue-010)",
        color: "var(--occam-light-theme-links-enabled)",
        border: "1px solid var(--occam-light-theme-links-enabled)",
        "&:hover:not(.Mui-disabled)": {
          bgcolor: "var(--occam-core-palette-brand-blue-050)",
        },
        "&:active:not(.Mui-disabled)": {
          bgcolor: "var(--occam-core-palette-brand-blue-100)",
        },
        "&.Mui-disabled": {
          bgcolor: "var(--occam-light-theme-layout-main-container)",
          color: "var(--occam-floating-button-disabled-fg-light)",
          borderColor: "var(--occam-core-palette-brand-cool-gray-100)",
        },
      });
    } else {
      Object.assign(base, {
        bgcolor: "var(--occam-core-palette-brand-navy-800)",
        color: "var(--occam-dark-theme-links-enabled)",
        border: "1px solid var(--occam-dark-theme-links-enabled)",
        "&:hover:not(.Mui-disabled)": {
          bgcolor: "var(--occam-core-palette-brand-navy-600)",
        },
        "&:active:not(.Mui-disabled)": {
          bgcolor: "var(--occam-core-palette-brand-navy-700-b)",
        },
        "&.Mui-disabled": {
          borderColor: "var(--occam-floating-button-secondary-border-disabled-dark)",
          color: "var(--occam-floating-button-secondary-fg-disabled-dark)",
        },
      });
    }
  } else {
    if (isLight) {
      Object.assign(base, {
        bgcolor: "var(--occam-core-palette-contrasts-white)",
        color: "var(--occam-floating-button-tertiary-fg-light)",
        border: "1px solid var(--occam-floating-button-tertiary-border-light)",
        "&:hover:not(.Mui-disabled)": {
          bgcolor: "var(--occam-core-palette-brand-cool-gray-050)",
        },
        "&:active:not(.Mui-disabled)": {
          bgcolor: "var(--occam-core-palette-brand-cool-gray-100)",
        },
        "&.Mui-disabled": {
          bgcolor: "var(--occam-light-theme-layout-main-container)",
          color: "var(--occam-floating-button-disabled-fg-light)",
          borderColor: "var(--occam-core-palette-brand-cool-gray-100)",
        },
      });
    } else {
      Object.assign(base, {
        bgcolor: "var(--occam-core-palette-brand-cool-gray-800)",
        color: "var(--occam-dark-theme-layout-emphasis-high)",
        border: "1px solid var(--occam-core-palette-brand-cool-gray-200)",
        "&:hover:not(.Mui-disabled)": {
          bgcolor: "var(--occam-core-palette-brand-cool-gray-700)",
        },
        "&:active:not(.Mui-disabled)": {
          bgcolor: "var(--occam-core-palette-brand-cool-gray-600)",
        },
        "&.Mui-disabled": {
          borderColor: "var(--occam-floating-button-tertiary-border-disabled-dark)",
          color: "var(--occam-floating-button-disabled-fg-dark)",
        },
      });
    }
  }

  return base;
}

export function FloatingButton({
  variant = "primary",
  shape = "circular",
  size = "medium",
  theme = "light",
  label = "FAB",
  icon,
  className,
  disabled,
  type = "button",
  "aria-label": ariaLabel,
  sx: sxProp,
  ...rest
}: FloatingButtonProps) {
  const extended = shape === "extended";
  const resolvedAriaLabel = ariaLabel ?? (extended ? undefined : "Add");
  const sx = fabSx({ variant, shape, size, themeMode: theme });
  const mergedSx = (sxProp ? [sx, sxProp] : [sx]) as SxProps<Theme>;

  if (extended) {
    return (
      <Fab
        {...rest}
        className={className}
        type={type}
        disabled={disabled}
        variant="extended"
        color="inherit"
        aria-label={resolvedAriaLabel}
        sx={mergedSx}
      >
        <span>{label}</span>
        {icon ?? <AddIcon />}
      </Fab>
    );
  }

  return (
    <Fab
      {...rest}
      className={className}
      type={type}
      disabled={disabled}
      variant="circular"
      color="inherit"
      aria-label={resolvedAriaLabel}
      sx={mergedSx}
    >
      {icon ?? <AddIcon />}
    </Fab>
  );
}
