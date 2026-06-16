# Sticky Header Transition

Reusable scroll-driven sticky header morph for the Zuora homepage prototype.

## How it works

```
scroll container (.homepage-main)
  └─ useStickyProgress() → progress (0..1)
       └─ useStickyHeaderStyle() → CSS custom properties
            └─ fixed layers read vars:
                 • StickyHeader (title + frosted bar)
                 • MorphingSearchField
                 • MorphingFloatingActions
```

JavaScript computes **progress** and publishes **CSS variables** on the scroll container. CSS handles the visual morph (no animation library).

## Quick start

```tsx
import {
  MorphingFloatingActions,
  MorphingSearchField,
  StickyHeader,
  WelcomeSearchHero,
  useStickyHeaderStyle,
  useStickyProgress,
} from "./sticky-header";

const HOMEPAGE_TITLE = "Welcome to Zuora, Rachel Carter";

function Homepage() {
  const { progress, scrollRef } = useStickyProgress();
  const { measurementRefs, stickyStyle, stickyControlsActive } = useStickyHeaderStyle(
    progress,
    scrollRef,
    { actionsLayout: "stacked" },
  );

  return (
    <main className="homepage-main" ref={scrollRef} style={stickyStyle}>
      <StickyHeader
        active={stickyControlsActive}
        headerActionsSlotRef={measurementRefs.headerActionsSlotRef}
        stickyHeaderRef={measurementRefs.stickyHeaderRef}
        stickySearchPlaceholderRef={measurementRefs.stickySearchPlaceholderRef}
        title={HOMEPAGE_TITLE}
      />
      <MorphingSearchField />
      <MorphingFloatingActions>{/* your FAB buttons */}</MorphingFloatingActions>

      <WelcomeSearchHero
        title={HOMEPAGE_TITLE}
        welcomeSearchPlaceholderRef={measurementRefs.welcomeSearchPlaceholderRef}
        welcomeSearchRef={measurementRefs.welcomeSearchRef}
      />
    </main>
  );
}
```

Import the module once (styles side-effect):

```tsx
import "./sticky-header";
```

## With notification banner (this prototype)

```tsx
const { progress, scrollRef } = useStickyProgress();
const { bannerPinned, pinnedBannerHeight, bannerAnchorRef, bannerPinnedShellRef } =
  useBannerPinMotion(/* ... */, scrollRef);

const { measurementRefs, stickyStyle, stickyControlsActive } = useStickyHeaderStyle(
  progress,
  scrollRef,
  {
    actionsLayout,
    notificationBannerVisible: true,
    bannerPinned,
    pinnedBannerHeight,
    chipReturnTitleActive: bannerPlacement === "chip-on-scroll" && scrollAnimating,
    measurementRefs: {
      bannerRegionRef: bannerAnchorRef,
      pinnedBannerRef: bannerPinnedShellRef,
    },
  },
);
```

## Module layout

| File | Purpose |
|------|---------|
| `constants.ts` | `STICKY_TRANSITION_DISTANCE`, progress ranges, title scale |
| `easing.ts` | `clampStickyProgress`, `easeInOut`, `lerp`, `rangeProgress`, `smoothScrollTo` |
| `useStickyProgress.ts` | Scroll listener → `progress` 0..1 |
| `useStickyHeaderTransition.ts` | `useStickyHeaderStyle` + combined hook |
| `useSearchMorphGeometry.ts` | Hero ↔ sticky search rect lerp |
| `useFloatingActionsGeometry.ts` | Hero ↔ header action slot rect lerp |
| `useWelcomeHeroMorphY.ts` | Title vertical morph offset |
| `components.tsx` | UI shell components |

## Integration contract

### Required DOM

1. Scroll container — `ref={scrollRef}`, `style={stickyStyle}`, `overflow: auto`
2. Hero search placeholder — `.welcome-search-placeholder` in welcome section
3. Sticky search placeholder — `.sticky-search-placeholder` in sticky header
4. Action slot — `.header-actions-slot` (76×32) in sticky header
5. Layout offset — CSS var `--sticky-header-left`

### Activation

`stickyControlsActive` when `progress > 0.48`. Pass to `StickyHeader` as `active`.

## CSS

Copy sticky-related sections from `src/index.css` (see selectors: `homepage-sticky-header`, `morphing-search-control`, `morphing-floating-actions`, `welcome-search`).

## Handoff

Copy the entire `src/sticky-header/` folder plus the CSS sections above.
