import { getShowcaseEmbedSrc, type EmbedShowcaseViewport } from "./embedShowcase";

export type EmbedTrustLevel = "zuora" | "customer";

export type EmbedUrlValidation = {
  error?: string;
  hostname?: string;
  normalizedUrl?: string;
  trustLevel?: EmbedTrustLevel;
  valid: boolean;
};

const ZUORA_HOST_SUFFIXES = ["zuora.com", "zuora.eu"];

const BLOCKED_PROTOCOLS = new Set(["javascript:", "data:", "file:", "blob:"]);

const INTERACTIVE_EMBED_SANDBOX = [
  "allow-scripts",
  "allow-same-origin",
  "allow-forms",
  "allow-popups",
  "allow-popups-to-escape-sandbox",
  "allow-modals",
  "allow-downloads",
  "allow-top-navigation-by-user-activation",
  "allow-storage-access-by-user-activation",
].join(" ");

export const INTERACTIVE_EMBED_ALLOW = [
  "fullscreen",
  "clipboard-read",
  "clipboard-write",
  "geolocation",
  "microphone",
  "camera",
  "payment",
  "storage-access *",
].join("; ");

const TRUSTED_EMBED_SANDBOX = INTERACTIVE_EMBED_SANDBOX;

const CUSTOMER_EMBED_SANDBOX = INTERACTIVE_EMBED_SANDBOX;

function normalizeHostname(hostname: string) {
  return hostname.trim().toLowerCase().replace(/\.$/, "");
}

export function getEmbedTrustLevel(hostname: string): EmbedTrustLevel {
  const normalizedHost = normalizeHostname(hostname);

  if (
    ZUORA_HOST_SUFFIXES.some(
      (suffix) => normalizedHost === suffix || normalizedHost.endsWith(`.${suffix}`),
    )
  ) {
    return "zuora";
  }

  return "customer";
}

export function getEmbedSandbox(trustLevel: EmbedTrustLevel, interactive = false) {
  if (interactive) {
    // Omit sandbox for interactive embeds so sign-in cookies and redirects work normally.
    return undefined;
  }

  return trustLevel === "zuora" ? TRUSTED_EMBED_SANDBOX : CUSTOMER_EMBED_SANDBOX;
}

export function validateEmbedUrl(rawUrl: string): EmbedUrlValidation {
  const trimmed = rawUrl.trim();

  if (!trimmed) {
    return { valid: false, error: "Enter an HTTPS embed URL." };
  }

  const lower = trimmed.toLowerCase();
  if (BLOCKED_PROTOCOLS.has(lower.split(":")[0] + ":")) {
    return { valid: false, error: "Only secure HTTPS URLs are allowed." };
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { valid: false, error: "Enter a valid URL." };
  }

  if (parsed.protocol !== "https:") {
    return { valid: false, error: "Embed URLs must use HTTPS." };
  }

  if (!parsed.hostname) {
    return { valid: false, error: "Enter a valid hostname." };
  }

  const trustLevel = getEmbedTrustLevel(parsed.hostname);

  return {
    valid: true,
    hostname: normalizeHostname(parsed.hostname),
    normalizedUrl: parsed.toString(),
    trustLevel,
  };
}

export function getEmbedTargetUrl(url: string) {
  const validation = validateEmbedUrl(url);
  if (!validation.valid || !validation.normalizedUrl) {
    return null;
  }

  return validation.normalizedUrl;
}

const IMAGE_EXTENSION_PATTERN = /\.(avif|gif|jpe?g|png|svg|webp)(\?|$)/i;
const IMAGE_HOST_PATTERNS = [
  /^images\.unsplash\.com$/i,
  /^.*\.(googleusercontent|cloudfront|imgix)\.com$/i,
];

export function isEmbedImageUrl(url: string) {
  try {
    const parsed = new URL(url.trim());
    if (IMAGE_EXTENSION_PATTERN.test(parsed.pathname)) {
      return true;
    }

    return IMAGE_HOST_PATTERNS.some((pattern) => pattern.test(parsed.hostname));
  } catch {
    return false;
  }
}

export function getEmbedSrc(
  url: string,
  _trustLevel: EmbedTrustLevel,
  viewport?: EmbedShowcaseViewport,
) {
  const targetUrl = getEmbedTargetUrl(url);
  if (!targetUrl) {
    return null;
  }

  if (isEmbedImageUrl(targetUrl)) {
    return targetUrl;
  }

  // Prototype showcase proxy strips frame-blocking headers so previews can render.
  return getShowcaseEmbedSrc(targetUrl, viewport);
}

export function getEmbedTrustLabel(trustLevel: EmbedTrustLevel) {
  return trustLevel === "zuora" ? "Zuora" : "Customer App";
}
