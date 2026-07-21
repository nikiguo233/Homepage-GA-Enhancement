import type { CustomWidgetAccess } from "./types";

export const CUSTOM_WIDGET_TENANT_ID = "10130";

export const CUSTOM_WIDGET_ACCESS_OPTIONS: {
  label: string;
  value: CustomWidgetAccess;
}[] = [
  { value: "private", label: "Personal" },
  {
    value: "tenant",
    label: `All users in current tenant (${CUSTOM_WIDGET_TENANT_ID})`,
  },
];

export function getCustomWidgetAccessLabel(access: CustomWidgetAccess | undefined) {
  return (
    CUSTOM_WIDGET_ACCESS_OPTIONS.find((option) => option.value === access)?.label ??
    CUSTOM_WIDGET_ACCESS_OPTIONS[0].label
  );
}

export function getCustomWidgetVisibilityChipLabel(access: CustomWidgetAccess | undefined) {
  return normalizeCustomWidgetAccess(access) === "tenant" ? "Shared" : "Personal";
}

export function normalizeCustomWidgetAccess(access: unknown): CustomWidgetAccess {
  return access === "tenant" ? "tenant" : "private";
}

export function getCustomWidgetSavedStatus(
  access: CustomWidgetAccess | undefined,
): "draft" | "published" {
  return normalizeCustomWidgetAccess(access) === "tenant" ? "published" : "draft";
}
