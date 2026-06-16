export const STICKY_TRANSITION_DISTANCE = 310;
export const WELCOME_TITLE_MORPH_Y = 54;
export const STICKY_HEADER_TITLE_TOP = 8;
export const STICKY_HEADER_HEIGHT = 56;
export const NOTIFICATION_BANNER_PINNED_HEIGHT_FALLBACK = 136;
export const OCCAM_HEADLINE_L_SIZE = 28;
export const OCCAM_HEADLINE_L_LINE_HEIGHT = 40;
export const OCCAM_TITLE_L_SIZE = 17;
export const STICKY_TITLE_SCALE = OCCAM_TITLE_L_SIZE / OCCAM_HEADLINE_L_SIZE;
export const STICKY_CONTROLS_ACTIVE_THRESHOLD = 0.48;

export const STICKY_PROGRESS_RANGES = {
  surface: { start: 0.08, end: 0.64 },
  titleMorph: { start: 0.04, end: 0.76 },
  titleScale: { start: 0.02, end: 0.92 },
  actions: { start: 0.18, end: 0.82 },
  actionsMorph: { start: 0.04, end: 0.76 },
  welcomeOut: { start: 0.08, end: 0.55 },
} as const;
