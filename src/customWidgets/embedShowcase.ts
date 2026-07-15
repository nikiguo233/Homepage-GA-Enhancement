export const EMBED_SHOWCASE_PATH = "/embed-showcase";

export type EmbedShowcaseViewport = {
  height: number;
  width: number;
};

export function getShowcaseEmbedSrc(targetUrl: string, viewport?: EmbedShowcaseViewport) {
  const params = new URLSearchParams({ url: targetUrl });

  if (viewport) {
    params.set("width", String(Math.round(viewport.width)));
    params.set("height", String(Math.round(viewport.height)));
  }

  return `${EMBED_SHOWCASE_PATH}?${params.toString()}`;
}

export function isShowcaseEmbedSrc(src: string) {
  return src.startsWith(`${EMBED_SHOWCASE_PATH}?`);
}
