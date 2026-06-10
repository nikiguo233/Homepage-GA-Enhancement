# Occam Design System — Source of Truth

Last extracted from Figma May 2026

---

## Tech Stack & Source of Truth

### What Occam Is

Occam is Zuora's shared design language, spanning multiple product teams. It covers foundations (color, typography, spacing, motion) and a component library built on top of [MUI](https://mui.com/) (Material UI).

### Tech Stack

| Layer | Technology | Notes |
| :---- | :---- | :---- |
| Component base | **MUI 7** (Material UI) | Migrated from MUI 5; provides component behavior, accessibility, keyboard nav |
| Styling | **Occam design tokens** (`--zui-*` CSS custom properties) | Applied on top of MUI base; Figma is the visual source of truth |
| Icons | **Material Symbols** \+ Zuora custom SVGs | See Section 3 |
| Storybook and GitHub | **`Nav-v2`**`GH: https://github.com/zuora-platform/nav-v2SB: https://cdn.zuora.com/@platform-ui/nav-v2-sb/latest/index.html app-builder GH: https://github.com/zuora-platform/app-builder SB: https://cdn.zuora.com/@platform-ui/app-builder-sb/latest/index.html?path=/docs/welcome--docs Occam GH: https://github.com/zuora-platform/zds-next GH Lighthouse components: https://github.com/zuora-platform/lighthouse-components SB: https://cdn.zuora.com/@platform-ui/zds-next/latest/index.html?path=/docs/welcome--docs` | ⚠️ Visual styles not yet updated to reflect Occam DS —  do not use as visual reference |

###  **Source of Truth Hierarchy**

When there is a conflict between sources, follow this order:

1\. This .md file ← compiled from Figma \+ Occam website

2\. Figma design files ← canonical visual spec

3\. Occam website ← occam.zuora.com (guidelines, usage rules)

4\. MUI 7 docs ← component behavior, props, accessibility

5\. Storybook ⚠️ out of sync — visual styles not matching the Figma components 

###  **How to Use This File for Mockups**

- **Colors:** use color tockens from Section 2 directly  
- **Typography:** use `--zui-font-system` stack with sizes and weights from Section 1  
- **Components:** reference variant/state tables in Section 9 to match correct props  
- **Icons:** use Material Symbols for standard icons; flag Zuora custom icons with a comment  
- **Elevation:** apply correct shadow level per component type (Section 5\)  
- **Shapes:** default `border-radius: 4px`; chips use `border-radius: 9999px`; Card Drawer uses `8px`  
- **Theme:** Always use the Nebula UI Shell theme as the default when building. Before starting, ask whether Horizon or Cosmos themes are needed instead.

### Figma Source Files

| File | Contents | Figma Link | Storybook Link |
| :---- | :---- | :---- | :---- |
| `00.1-Colors` | Full color palette \+ semantic tokens | [Open](https://www.figma.com/design/skDvITvLf81kjwoDilQtBY/ZDS-Colors?node-id=0-1052&p=f&t=pVuSooY3Uv3q9XQs-0) | \-monochrome-palettes:[https://cdn.zuora.com/@platform-ui/zds-next/latest/index.html?path=/story/design-tokens-colors--monochrome-palettes](https://cdn.zuora.com/@platform-ui/zds-next/latest/index.html?path=/story/design-tokens-colors--monochrome-palettes)\-light-palette:[https://cdn.zuora.com/@platform-ui/zds-next/latest/index.html?path=/story/design-tokens-colors--light-palette](https://cdn.zuora.com/@platform-ui/zds-next/latest/index.html?path=/story/design-tokens-colors--light-palette)\-dark-palette:[https://cdn.zuora.com/@platform-ui/zds-next/latest/index.html?path=/story/design-tokens-colors--dark-palette](https://cdn.zuora.com/@platform-ui/zds-next/latest/index.html?path=/story/design-tokens-colors--dark-palette) |
| `00.2-Typography` | Type scale, CSS tokens, design tokens | [Open](https://www.figma.com/design/5PCCeY5ZgmnwB2vSx2hYzX/ZDS-Typography?node-id=1535-9&p=f&t=pVuSooY3Uv3q9XQs-0) |  |
| `00.3-Icons` | Material icons \+ Zuora custom icons | [Open](https://www.figma.com/design/un1c2EHQ855axEz5AJcCx2/Occam-Icons?node-id=308-2007&p=f&t=5X82KWsWau89qDx5-0) |  |
| `01-Foundation` | UI Shell, Page Header, Elevation, Grid | [Open](https://www.figma.com/design/FX4WhygmdWTzoOFjdem6hX/OCCAM-Foundation?node-id=0-1&p=f&t=pVuSooY3Uv3q9XQs-0) |  |
| `02-Navigation` | Breadcrumb, Global Nav, Link, Stepper, Tabs | [Open](https://www.figma.com/design/JpI83YkqlfZctCtki3W304/OCCAM-Navigation?node-id=0-1&p=f&t=5X82KWsWau89qDx5-0) |  |
| `03-Input` | All input components (15 total) | [Open](https://www.figma.com/design/XYbOgtmH4OTybiSBTRlKgC/03-Input) |  |
| `04-Data-Display` | Accordion, Avatar, Badge, Card, Chip, Data Grid, Drawer, Grouped Lists, Modal, Popover, Preview Panel, Widget | [Open](https://www.figma.com/design/2peCKz4CRSKcBzR0uyJHzN/OCCAM-Data-Display?node-id=0-1&p=f&t=5X82KWsWau89qDx5-0) |  |
| `05-Feedback` | Alert, Dialog, Progress, Skeleton, Snackbar, Tooltip | [Open](https://www.figma.com/design/iwcn5QMmp7nHziBxHo51z5/OCCAM-Feedback?t=pVuSooY3Uv3q9XQs-0) |  |
| `06-Utilities` | Glass Effect | [Open](https://www.figma.com/design/PFWNPJPwKrboh0pifevCY2/OCCAM-Utilities?t=5X82KWsWau89qDx5-0) |  |
| `08-Data-Visualization` | Line, Area, Bar, Horizontal Bar, Donut, Semi-Donut charts \+ chart elements | [Open](https://www.figma.com/design/OKxedZqTfPZmnWtmeowMRv/OCCAM-Data-Visualization?t=pVuSooY3Uv3q9XQs-0) |  |
| `OCCAM-AI-Components` | AI-specific components (8 total, 2 WIP) | [Open](https://www.figma.com/design/EEEsr6EeWZAxMAP9juC4g0/OCCAM-AI-Components?t=5X82KWsWau89qDx5-0) |  |

### Occam Website

Full guidelines at [occam.zuora.com](https://occam.zuora.com/foundations-overview) — covers accessibility, content strategy, motion, elevation, shapes, themes, and typography.

---

\#\# What AI Tools Should Prioritize  
1\. Accessibility  
2\. Existing component reuse  
3\. Responsive behavior  
4\. Clear hierarchy  
5\. Minimal cognitive load  
6\. Theme consistency  
7\. Semantic color usage

\#\# AI Usage Rules  
When generating UI with Occam:

* Prefer existing Occam components before inventing new patterns  
* Use semantic color tokens only  
* Use 4px radius by default unless component exceptions are documented  
* Prefer progressive disclosure over dense layouts  
* Avoid decorative gradients unless explicitly part of the component  
* Respect light/dark theme token mappings  
* Use established spacing scale only  
* Never introduce visual styles outside Occam foundations  
* Preserve accessibility requirements in all generated UI

## \#\# Composition Rules

**\#\#\# Forms**  
\- Use 16px vertical spacing between fields  
\- Group related fields inside Cards  
\- Avoid more than 2 columns in forms  
\- Use helper text sparingly

**\#\#\# Tables**  
\- Use Data Grid for datasets over 5 rows  
\- Use Grouped Lists for lightweight collections  
\- Bulk actions appear only after row selection

**\#\#\# Modals**  
\- Avoid nesting modals  
\- Prefer Drawers for multi-step workflows  
\- Confirmation dialogs should remain concise

\#\#When To Use Guidance  
**\#\#\# Use Modal When**  
\- blocking confirmation is required  
\- the user must make a decision before continuing

**\#\#\# Use Drawer When**  
\- preserving page context is important  
\- workflows involve multiple steps  
\- users may need reference information while editing

\#\# Responsive Behavior  
\- Collapse multi-column layouts below tablet widths  
\- Tables should support horizontal scroll or condensed modes  
\- Avoid hover-only interactions

\#\# Interaction Principles  
\- Feedback should appear immediately after user actions  
\- Loading states should preserve layout stability  
\- Use optimistic updates carefully  
\- Destructive actions require confirmation  
\- Focus states must always remain visible

\#\# Content Guidelines  
**\#\#\#Buttons:**  
\- Use verb-first labels  
\- Avoid vague labels like "Submit"

**\#\#\#Errors:**  
\- Explain what happened  
\- Explain how to recover

**\#\#\#AI Messaging:**  
\- Be transparent when AI-generated  
\- Avoid overstating certainty

\#\#\#Accessibility Tokens / Rules  
\- Never rely on color alone for meaning  
\- Use aria-live for async feedback  
\- Dialogs must trap keyboard focus  
\- All icon buttons require accessible labels

\#\# Anti-Patterns  
Do not generate:  
\- glassmorphism outside Glass Effect utility  
\- nested accordions  
\- floating unlabeled actions  
\- more than 3 hierarchy levels  
\- inconsistent card paddings  
\- decorative charts without data meaning  
\- excessive motion

\#\# AI UX Guidelines  
\- AI-generated content should be distinguishable from user content  
\- Suggested actions should remain reversible  
\- Avoid implying certainty when confidence is low  
\- Provide human override paths

---

## 1\. Typography

### Fonts

| Role | Family | CSS Variable |
| :---- | :---- | :---- |
| System / UI | `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif` | `--zui-font-system` |
| Monospace / Code | `'IBM Plex Mono', 'SF Mono', 'Segoe UI Mono', 'Roboto Mono', 'Ubuntu Mono', Menlo, Consolas, Courier, monospace` | `--zui-font-monospace` |

Note: Figma uses SF Pro Display / SF Pro Text as design proxies for the system font stack.

---

### Type Scale — CSS Tokens

All tokens use the `--zui-font-system` family unless noted.

#### Headings

| Token | Size | Weight | Line Height | Letter Spacing | Text Case | Figma Style |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| `--font-display` | 36px | 300 (Light) | 44px | 0 | none | `Headings/Normal/H3` |
| `--font-headline-l` | 28px | 500 (Medium) | 40px | 0 | none | `Headings/Normal/H4` |
| `--font-headline-m` | 24px | 500 (Medium) | 36px | 0 | none | `Headings/Normal/H5` |
| `--font-headline-s` | 20px | 500 (Medium) | 32px | 0 | none | `Headings/Normal/H6` |

H1 (57px) and H2 (45px) exist in Figma but are marked as not used in ZDS 2.0 type ramp.

#### Titles / Subtitles

| Token | Size | Weight | Line Height | Letter Spacing | Text Case | Figma Style |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| `--font-title-l` | 17px | 600 (Semibold) | 28px | 0.1px | none | `Headings/Normal/Subtitle 3` |
| `--font-title-m` | 15px | 600 (Semibold) | 24px | 0.15px | none | `Headings/Normal/Subtitle 11` |
| `--font-title-s` | 13px | 600 (Semibold) | 20px | 0.25px | none | `Headings/Normal/Subtitle 2` |
| `--font-tab` | 13px | 500 (Medium) | 20px | 0.1px | none | `Headings/Normal/Subtitle 4 / Tab` |

#### Body

| Token | Size | Weight | Line Height | Letter Spacing | Text Case | Figma Style |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| `--font-body-l` | 15px | 400 (Regular) | 24px | 0 | none | `Body Text/Normal/Body 1` |
| `--font-body-l-bold` | 15px | 500 (Medium) | 24px | 0 | none | `Body Text/Normal/Body 1 Bold` |
| `--font-body-m` | 13px | 400 (Regular) | 18px | 0.1px | none | `Body Text/Normal/Body 2` |
| `--font-body-m-bold` | 13px | 500 (Medium) | 18px | 0.1px | none | `Body Text/Normal/Body 2 Bold` |

#### Labels, Captions & Utility

| Token | Size | Weight | Line Height | Letter Spacing | Text Case | Figma Style |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| `--font-label` | 13px | 400 (Regular) | 18px | 0.2px | none | `Captions/Normal/Overline 6 / Label` |
| `--font-tableheader` | 12px | 600 (Semibold) | 16px | 0.2px | none | `Captions/Normal/Overline 2 / Table Header` |
| `--font-caption` | 11px | 400 (Regular) | 16px | 0.2px | none | `Captions/Normal/Caption` |
| `--font-overline` | 11px | 600 (Semibold) | 16px | 1px | uppercase | `Captions/Normal/Overline 4` |
| `--font-chip` | 10px | 700 (Bold) | 14px | 0.6px | uppercase | `Captions/Normal/Overline 5 / Chip` |
| `--font-button` | 13px | 500 (Medium) | 20px | 0.1px | capitalize | `Button-Action Text/BUTTON` |
| `--font-code` | 12px | 400 (Regular) | 18px | 0 | none | `Code Text/Code` · uses `--zui-font-monospace` |

#### Additional / Special

| Style | Size | Weight | Line Height | Letter Spacing | Text Case | Notes |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| SurTitle | 12px | 400 (Regular) | 17px | 1.5% | uppercase | Inter; used for section labels |

---

## 2\. Colors

### Brand Palette

#### Navy

| Token | Hex |
| :---- | :---- |
| `Brand/Navy/900` | `#0b1116` |
| `Brand/Navy/800` | `#16212b` |
| `Brand/Navy/700` | `#223341` |
| `Brand/Navy/600` | `#33495c` |
| `Brand/Navy/500` | `#476176` |
| `Brand/Navy/400` | `#5f7b91` |
| `Brand/Navy/300` | `#7c97ac` |
| `Brand/Navy/200` | `#a0b6c6` |
| `Brand/Navy/100` | `#cbd8e1` |
| `Brand/Navy/050` | `#e3eaef` |
| `Brand/Navy/025` | `#f8f9fb` |

#### Red (Brand / Magenta)

| Token | Hex |
| :---- | :---- |
| `Brand/Red/900` | `#1a000f` |
| `Brand/Red/800` | `#34001d` |
| `Brand/Red/700` | `#4e002c` |
| `Brand/Red/600` | `#68003b` |
| `Brand/Red/500` | `#81074c` |
| `Brand/Red/400` | `#9b1c64` |
| `Brand/Red/300` | `#b43e81` |
| `Brand/Red/200` | `#cd70a5` |
| `Brand/Red/100` | `#e6b1cf` |
| `Brand/Red/050` | `#f3d7e7` |
| `Brand/Red/025` | `#fcf5f9` |

#### Teal

| Token | Hex |
| :---- | :---- |
| `Brand/Teal/900` | `#001e1a` |
| `Brand/Teal/800` | `#003c35` |
| `Brand/Teal/700` | `#005a4f` |
| `Brand/Teal/600` | `#00786a` |
| `Brand/Teal/500` | `#009684` |
| `Brand/Teal/400` | `#00b49f` |
| `Brand/Teal/300` | `#00d2b9` |
| `Brand/Teal/200` | `#3ae6d2` |
| `Brand/Teal/100` | `#85fbed` |
| `Brand/Teal/050` | `#b6fff9` |
| `Brand/Teal/025` | `#eafffe` |

---

### Monochrome

#### Cool Gray

| Token | Hex |
| :---- | :---- |
| `Monochrome/Cool Gray/900` | `#141719` |
| `Monochrome/Cool Gray/800` | `#24292c` |
| `Monochrome/Cool Gray/700` | `#353b3f` |
| `Monochrome/Cool Gray/600` | `#464c51` |
| `Monochrome/Cool Gray/500` | `#575e63` |
| `Monochrome/Cool Gray/400` | `#767d82` |
| `Monochrome/Cool Gray/300` | `#959ba0` |
| `Monochrome/Cool Gray/200` | `#b5babe` |
| `Monochrome/Cool Gray/100` | `#d6d9db` |
| `Monochrome/Cool Gray/050` | `#f6f7f8` |

---

### Extended Palette

#### Blue

| Token | Hex |  | Token | Hex |
| :---- | :---- | :---- | :---- | :---- |
| `Extended/Blue/900` | `#020f27` |  | `Extended/Blue/400` | `#3269d4` |
| `Extended/Blue/800` | `#031c4e` |  | `Extended/Blue/300` | `#5e8be5` |
| `Extended/Blue/700` | `#042a75` |  | `Extended/Blue/200` | `#8fb2f6` |
| `Extended/Blue/600` | `#06389c` |  | `Extended/Blue/100` | `#c6dcff` |
| `Extended/Blue/500` | `#0d4ac3` |  | `Extended/Blue/050` | `#e4f1ff` |

#### Purple

| Token | Hex |  | Token | Hex |
| :---- | :---- | :---- | :---- | :---- |
| `Extended/Purple/900` | `#0e0722` |  | `Extended/Purple/400` | `#6f4dcd` |
| `Extended/Purple/800` | `#1d0f44` |  | `Extended/Purple/300` | `#916fef` |
| `Extended/Purple/700` | `#2d1866` |  | `Extended/Purple/200` | `#b69bfe` |
| `Extended/Purple/600` | `#3f2489` |  | `Extended/Purple/100` | `#e1d1ff` |
| `Extended/Purple/500` | `#5435ab` |  | `Extended/Purple/050` | `#f6ecff` |

#### Red (Functional)

| Token | Hex |  | Token | Hex |
| :---- | :---- | :---- | :---- | :---- |
| `Extended/Red/900` | `#240300` |  | `Extended/Red/400` | `#db1f0e` |
| `Extended/Red/800` | `#490600` |  | `Extended/Red/300` | `#ff4635` |
| `Extended/Red/700` | `#6d0900` |  | `Extended/Red/200` | `#ff8073` |
| `Extended/Red/600` | `#920c00` |  | `Extended/Red/100` | `#ffc5be` |
| `Extended/Red/500` | `#b60f00` |  | `Extended/Red/050` | `#ffe9e5` |

#### Orange

| Token | Hex |  | Token | Hex |
| :---- | :---- | :---- | :---- | :---- |
| `Extended/Orange/900` | `#1e0d00` |  | `Extended/Orange/400` | `#b36526` |
| `Extended/Orange/800` | `#3c1b00` |  | `Extended/Orange/300` | `#c9824a` |
| `Extended/Orange/700` | `#5a2800` |  | `Extended/Orange/200` | `#dfa77a` |
| `Extended/Orange/600` | `#773805` |  | `Extended/Orange/100` | `#f4d3b8` |
| `Extended/Orange/500` | `#954c11` |  | `Extended/Orange/050` | `#fdebdb` |

#### Yellow

| Token | Hex |  | Token | Hex |
| :---- | :---- | :---- | :---- | :---- |
| `Extended/Yellow/900` | `#201801` |  | `Extended/Yellow/400` | `#c09725` |
| `Extended/Yellow/800` | `#403001` |  | `Extended/Yellow/300` | `#e0b642` |
| `Extended/Yellow/700` | `#604803` |  | `Extended/Yellow/200` | `#f2cf74` |
| `Extended/Yellow/600` | `#806109` |  | `Extended/Yellow/100` | `#ffedb2` |
| `Extended/Yellow/500` | `#a07b13` |  | `Extended/Yellow/050` | `#fffad6` |

#### Green

| Token | Hex |  | Token | Hex |
| :---- | :---- | :---- | :---- | :---- |
| `Extended/Green/900` | `#081a13` |  | `Extended/Green/400` | `#509a74` |
| `Extended/Green/800` | `#103426` |  | `Extended/Green/300` | `#6eb38d` |
| `Extended/Green/700` | `#1a4d39` |  | `Extended/Green/200` | `#95ccaa` |
| `Extended/Green/600` | `#28674c` |  | `Extended/Green/100` | `#c6e6d0` |
| `Extended/Green/500` | `#39805f` |  | `Extended/Green/050` | `#e1f3e6` |

#### Dark Green

| Token | Hex |  | Token | Hex |
| :---- | :---- | :---- | :---- | :---- |
| `Extended/Dark Green/900` | `#0a1b18` |  | `Extended/Dark Green/400` | `#539f93` |
| `Extended/Dark Green/800` | `#153530` |  | `Extended/Dark Green/300` | `#6ebaad` |
| `Extended/Dark Green/700` | `#215048` |  | `Extended/Dark Green/200` | `#8fd4c9` |
| `Extended/Dark Green/600` | `#2e6a60` |  | `Extended/Dark Green/100` | `#b8efe6` |
| `Extended/Dark Green/500` | `#3e8579` |  | `Extended/Dark Green/050` | `#d5f9f3` |

#### Burgundy

| Token | Hex |  | Token | Hex |
| :---- | :---- | :---- | :---- | :---- |
| `Extended/Burgundy/900` | `#1b0d17` |  | `Extended/Burgundy/400` | `#a46191` |
| `Extended/Burgundy/800` | `#371a2f` |  | `Extended/Burgundy/300` | `#bf7cad` |
| `Extended/Burgundy/700` | `#522846` |  | `Extended/Burgundy/200` | `#db9eca` |
| `Extended/Burgundy/600` | `#6d385e` |  | `Extended/Burgundy/100` | `#f6c7e9` |
| `Extended/Burgundy/500` | `#894a77` |  | `Extended/Burgundy/050` | `#ffe0f6` |

---

### Semantic / Theme Tokens

⚠️ Note: Emphasis, Context, and Border tokens appear as `#000000` / `#ffffff` in Figma — these are likely opacity-based or alias tokens. Actual values need verification from the ZDS token source.

#### Light Theme

| Token | Hex | Notes |
| :---- | :---- | :---- |
| `Light Theme / Page Background` | `#f6f7f8` | Cool Gray 050 |
| `Light Theme / Main Container` | `#ffffff` | White |
| `Light Theme / Link / Enabled` | `#0d4ac3` | Extended Blue 500 |
| `Light Theme / Link / Hover` | `#0d4ac3` | Extended Blue 500 |
| `Light Theme / Link / Pressed` | `#0d4ac3` | Extended Blue 500 |
| `Light Theme / Link / Visited` | `#5435ab` | Extended Purple 500 |
| `Light Theme / Link / Disabled` | `#5e8be5` | Extended Blue 300 |
| `Light Theme / Info` | `#3269d4` | Extended Blue 400 |
| `Light Theme / Ok / Success` | `#39805f` | Extended Green 500 |
| `Light Theme / Warning` | `#e0b642` | Extended Yellow 300 |
| `Light Theme / Error` | `#b60f00` | Extended Red 500 |

#### Dark Theme

| Token | Hex | Notes |
| :---- | :---- | :---- |
| `Dark Theme / Page Background` | `#0b1116` | Brand Navy 900 |
| `Dark Theme / Main Container` | `#16212b` | Brand Navy 800 |
| `Dark Theme / Link / Enabled` | `#8fb2f6` | Extended Blue 200 |
| `Dark Theme / Link / Hover` | `#8fb2f6` | Extended Blue 200 |
| `Dark Theme / Link / Pressed` | `#8fb2f6` | Extended Blue 200 |
| `Dark Theme / Link / Visited` | `#b69bfe` | Extended Purple 200 |
| `Dark Theme / Ok / Success` | `#509a74` | Extended Green 400 |
| `Dark Theme / Warning` | `#e0b642` | Extended Yellow 300 |
| `Dark Theme / Error` | `#ff4635` | Extended Red 300 |

---

## 3\. Icons

### Base Library — Material Design Icons

- **Source:** Material Symbols (Outlined style, weight 400, optical size 20\)  
- **CDN import:** `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined`  
- **Usage in mockups:** Reference by icon name as a ligature, e.g. `<span class="material-symbols-outlined">search</span>`

### Zuora Custom Icons

These are Zuora-specific icons that do not exist in Material Design. In mockups, use the closest Material equivalent and add a comment noting the intended Zuora icon.

#### action/

| Icon |  | Icon |
| :---- | :---- | :---- |
| `action/cancel_recurring` |  | `action/change_order` |
| `action/drag-corner` |  | `action/edit_label` |
| `action/exclude` |  | `action/export` |
| `action/import` |  | `action/import-export` |
| `action/late_fee` |  | `action/list_remove` |
| `action/ownership` |  | `action/pin_left` |
| `action/pin_right` |  | `action/process_payment` |
| `action/refund` |  | `action/workflow` |
| `action/write_off` |  |  |

#### charts/

| Icon |
| :---- |
| `charts/stacked_chart` |

#### file/

| Icon |  | Icon |
| :---- | :---- | :---- |
| `file/file-chart-outline` |  | `file/file-excel-outline` |
| `file/file_chart` |  | `file/file_code` |
| `file/file_pdf` |  | `file/file_table` |
| `file/tree_view` |  |  |

#### misc/

| Icon |  | Icon |
| :---- | :---- | :---- |
| `misc/advanced_search` |  | `misc/asterisk` |
| `misc/balance` |  | `misc/currency_exchange` |
| `misc/database-off-outline` |  | `misc/database-outline` |
| `misc/download_template` |  | `misc/knowledgebase` |
| `misc/lightbulb` |  | `misc/organization` |
| `misc/system-warning` |  | `misc/tenant` |

#### navigation/

| Icon |  | Icon |
| :---- | :---- | :---- |
| `navigation/click` |  | `navigation/collapse` |
| `navigation/collapse_all` |  | `navigation/collapse_down` |
| `navigation/collapse_horiz` |  | `navigation/collapse_left` |
| `navigation/collapse_right` |  | `navigation/collapse_up` |
| `navigation/collapse_vert` |  | `navigation/expand` |
| `navigation/expand_all` |  | `navigation/expand_horiz` |
| `navigation/expand_vert` |  | `navigation/move` |

#### payment/

| Icon |  | Icon |
| :---- | :---- | :---- |
| `payment/credit-card-check-outline` |  | `payment/credit-card-edit-outline` |
| `payment/credit-card-lock-outline` |  | `payment/credit-card-plus-outline` |
| `payment/credit-card-refresh-outline` |  | `payment/credit-card-remove-outline` |
| `payment/credit-card-sync-outline` |  |  |

#### products/

| Icon |  | Icon |
| :---- | :---- | :---- |
| `products/admin` |  | `products/analytics` |
| `products/billing` |  | `products/collect` |
| `products/customers` |  | `products/finance` |
| `products/home` |  | `products/insights` |
| `products/marketplace` |  | `products/payments` |
| `products/platform` |  | `products/products` |
| `products/reporting` |  | `products/revenue` |
| `products/zuora-core` |  |  |

#### table/

| Icon |  | Icon |
| :---- | :---- | :---- |
| `table/column_group` |  | `table/insert_row` |
| `table/move_row_down` |  | `table/move_row_up` |
| `table/remove_row` |  | `table/row_group` |

#### other/

| Icon |  | Icon |
| :---- | :---- | :---- |
| `UIBuilder/not_config` |  | `userpilot/product_release` |

---

## 4\. Layout & Spacing

Source: [occam.zuora.com/foundations-layout-and-spacing](https://occam.zuora.com/foundations-layout-and-spacing)

### Core Principles

- **Progressively Reveal Capabilities** — Show only the most relevant information upfront; let users uncover details as needed.  
- **Strive for Minimalism** — Start with a clean, essential design. Resist unnecessary complexity while maintaining adaptability.

### Grid System

A structured grid ensures consistency and scalability across screens. Key properties: consistency across pages, modular flexibility, and balanced spacing for readability.

### Spacing & Proximity

Spacing defines relationships between elements, reducing cognitive load. Includes padding, margins, and proximity to visually group related components.

- **Visual Grouping** — Thoughtful spacing helps users naturally associate related actions, information, and components.  
- **Containers & Components** — Generous padding prevents overcrowding and highlights essential content.  
- **Interactive Elements** — Consistent spacing maintains clarity and prevents visual clutter.

### Layering & Elevation

Depth directs user focus, surfacing key actions at the right moments. Works in conjunction with the elevation system (see Section 5).

---

## 5\. Elevation

Source: [occam.zuora.com/foundations-elevations](https://occam.zuora.com/foundations-elevations)

Elevations simulate depth by mimicking layered surfaces to express hierarchy. The Y-axis position increases by 2dp at each step.

| Elevation | Token | Usage |
| :---- | :---- | :---- |
| `-2dp` | Recessed | Components that sit below the background, e.g. Preview (inset effect) |
| `0dp` | Base | Default background level; static elements remain flat |
| `2dp` | Raised | Containers like Card; subtle emphasis while maintaining balance |
| `4dp` | Elevated | Interactive elements requiring prominence: Drawers, Popovers, Modals, Toasts |

**Best practices:**

- Stick to predefined elevation levels to maintain consistency  
- Use `-2dp` for inset components that sit below the background  
- Combine elevation with color, contrast, spacing, and typography to reinforce hierarchy

---

## 6\. Shapes & Styling

Source: [occam.zuora.com/foundations-shapes-and-styling](https://occam.zuora.com/foundations-shapes-and-styling)

### Border Radius

| Value | Usage |
| :---- | :---- |
| `4px` | Default — buttons, inputs, cards, popovers, dialogs, modals |
| `8px` | Exception — Card Drawer only |
| `9999px` (pill) | Chips — fully rounded |

### Stroke & Borders

| State | Stroke | Usage |
| :---- | :---- | :---- |
| Default | `1px` | Boundaries of most components; clean, consistent look |
| Focused | `2px` | Interactive elements: buttons, tabs, chips; enhances accessibility |
| Divider | `1px` | Visual separation between sections; non-overwhelming |

### Tooltips

Tooltips use pointer arrows to provide directional affordance.

---

## 7\. Motion

Source: [occam.zuora.com/foundations-motion](https://occam.zuora.com/foundations-motion)

Motion in Occam is purposeful, natural, and restrained — it guides attention and reinforces relationships without distraction.

### Motion Principles

- **Clarity** — Motion communicates, not decorates. Subtle cues for hierarchy, relationships, and transitions.  
- **Elegance** — Transitions are smooth; microinteractions are lightweight and polished.  
- **Adaptability** — More pronounced when guiding focus; restrained when reinforcing stability.

### Standard Motion Patterns

| Pattern | Guideline |
| :---- | :---- |
| Micro-interactions | Instant, lightweight feedback. Hover/press/focus states are quick and unobtrusive. |
| Transitions | Smooth, seamless movement between states. Fast and functional. |
| Expansion & Collapsing | Subtle easing on accordions, dropdowns, expandable sections. Reinforces cause and effect. |
| Feedback & Confirmation | Concise animations for success, error, loading. Never delays user progress. |

### Best Practices

- Every animation must serve a functional purpose — no purely decorative motion  
- Apply uniform motion patterns for a cohesive, predictable experience  
- Keep animations gentle and understated  
- Optimize for performance — animations must not hinder responsiveness

### Accessibility

- Respect OS-level reduced motion preferences (`prefers-reduced-motion`)  
- No flashing or flickering (max 3 flashes/second per WCAG 2.3.1)  
- Avoid extreme or disorienting movement (excessive zoom, parallax)  
- Motion reinforces understanding; never replaces content as the primary conveyor of information

---

## 8\. Accessibility

Source: [occam.zuora.com/foundations-accessibility](https://occam.zuora.com/foundations-accessibility)

**Standard: WCAG 2.1 Level AA**

### Principles (POUR)

- **Perceivable** — Content presented in ways everyone can access  
- **Operable** — All interface elements are interactable  
- **Understandable** — Content and navigation are clear and predictable  
- **Robust** — Content works across different tools and technologies

### Key Requirements

**Visuals**

- Strong contrast for text and UI elements  
- Color is never the sole way meaning is conveyed (always pair with text or icon)

**Keyboard & Navigation**

- All interactive elements are keyboard accessible  
- Clear, visible focus indicators

**Inclusive Content**

- Alt text for meaningful images  
- Logical heading structures for screen readers  
- Captions for video, transcripts for audio

**Forms**

- Clear, persistent input labels (not just placeholders)  
- Helpful error messages using both text and visual cues

---

## 9\. Components

Source: Figma file `03-Input` · More component files to be added ⚠️ Components marked `[needs updating]` in Figma are not yet production-ready

### Input Components

---

#### Button / Standard Button

**Variants:** Primary, Secondary, Tertiary, Text **Sizes:** Medium, Small, X-Small **Icon positions:** None, Start, End **States:** Enabled, Hover, Focused/Selected, Pressed, Disabled **Color:** Default, Danger **Theme:** Light, Dark

---

#### Button Group

**Variants:** Primary, Secondary, Tertiary, Text **Sizes:** Medium, Small, X-Small **Orientation:** Horizontal **Color:** Default, Danger **Theme:** Light, Dark

---

#### Icon Buttons

**Sizes:** Medium, Small, X-Small **States:** Enabled, Hover, Pressed, Focused/Selected, Disabled, Active **Theme:** Light, Dark

Sub-component: `Configure button` (same states)

---

#### Floating Action Button

**Type:** Circular, Extended **Variants:** Primary, Secondary, Tertiary **Sizes:** Medium, Small, X-Small **States:** Enabled, Hover, Pressed, Focused/Selected, Disabled **Theme:** Light, Dark

---

#### Toggle Button

**Type:** Icon, Text **Sizes:** Medium, Small, X-Small **States:** Default, Hover, Selected, Disabled **Has Divider:** Yes, No **Has Left/Right Corners:** Yes, No **Theme:** Light, Dark

---

#### Text Field

**Types:** Basic, Search, With Icon, Date Input, Multi-lines, Time Input, Number Field **Sizes:** Medium, Small **States:** Normal, Hover, Completed, Activated, Inputting, Read Only, Disabled, Error, Error Activated **Optional:** Label, Helper Text

Sub-component: `Input/Label` — states: Default, Error, Activated · Theme: Light, Dark

---

#### Autocomplete / Single Select

**Sizes:** Medium, Small **States:** Normal, Hover, Activated, Inputting, Ready Only, Disabled, Error, Error Activated, Selection, Hover Selection **Has Label:** True, False

#### Autocomplete / Multiselect

**Sizes:** Medium, Small **States:** Normal, Hover, Selected, Hover Selected, Hover Selected and Inputting, Hover Selected and Inputting Done, Hover Cancel Selection, Selected and disabled, Error, Activated, Inputting, Disabled, Read Only, Selected and show all items, Error Inputting **Has Label:** True, False

---

#### Select / Single Select

**Sizes:** Medium, Small **States:** Normal, Hover, Activated, Ready Only, Disabled, Error, Error Activated, Selected, Hover Selected **Has Label:** True, False

#### Select / Multiple Select

**Sizes:** Medium, Small **States:** Normal, Hover, Hover Cancel Selection, Error, Activated, Disabled, Read Only, Selected and show all items, Selection, Hover Selection, Selection and disabled **Selection display:** Chip, Comma **Has Label:** True, False

---

#### Checkbox

**Sizes:** Medium, Small, X-Small **States:** Enable, Hover, Pressed, Focused, Disabled **Selected:** True, False **Indeterminate:** True, False **Label:** True, False **Theme:** Light, Dark

---

#### Radio

**Sizes:** Medium, Small, X-Small **States:** Enabled, Hover, Disabled, Pressed, Focused **Checked:** True, False **Label:** True, False **Theme:** Light, Dark

---

#### Switch

**Sizes:** Medium, Small **States:** Enable, Hover, Disable, Pressed, Focused **Checked:** True, False **Label position:** N/A, Start, End **Required:** Yes, No **Error:** True, False **Theme:** Light, Dark

---

#### Color Picker

**States:** Default, Hover, Open, Custom Color **Has Tint:** Boolean

---

#### List / List

**Type:** Default

#### List / ListItem

**Types:** List Item, Divider, Search, Group name **Variants:** Default, Tree Level 1, Tree Level 2, Tree Level 3 **States:** Default, Hover, Selected, Disabled, Hover Selected, Pressed **Has Checkbox:** True, False **Optional:** Secondary text, Leading Icon, Icon Button, Chevron, Switch, Chip

#### List / Search

**States:** Default, Hover, Activated, Inputing, Completed, Completed Hover, Disabled

---

🔧 Additional component files (navigation, data display, feedback, layout, etc.) to be added

---

### AI Components

Source: Figma file `OCCAM-AI-Components` Components marked 🚧 are WIP and not yet production-ready

---

#### AI Alert

**Types:** One Line, Multiple Lines **Optional:** Close Button, Action button **Note:** Informational alert pattern styled for AI context

---

#### AI Button

**Types:** Primary, Secondary, Text Button **Sizes:** Medium, Small, X-Small **States:** Enabled, Hover, Focused/Selected, Pressed, Disabled **Background:** Light, Dark **AI Icon:** True, False (icon can be hidden, most common on Text Button type)

---

#### AI Card

**States:** Default, Hover, Thinking, Focused/Selected **Optional:** Card Header, Footer **Note:** Includes a "Thinking" state for loading/processing AI responses

Sub-component: `AI Card Title` — with optional Actions and Description

---

#### AI Chip

**Types:** Default, Outlined **States:** Enabled, Hover, Focused/Selected **Mode:** Light, Dark **Clickable:** True, False **Deletable:** True, False **Optional:** Trailing Icon

---

#### AI Icon Button

**Sizes:** Medium, Small, X-Small **States:** Enabled, Hover, Focused/Selected, Pressed, Disabled **Background:** Light, Dark **Outline:** True, False **Color:** Gradient, Grey

---

#### Suggested Action Button (`AI Suggested Actions`)

**States:** Default, Hover, Pressed, Focused, Disabled **Note:** Spark icon can appear standalone; title is optional. Purpose-built for surfacing AI-recommended actions inline.

---

#### 🚧 AI Input *(WIP)*

Input field for AI chat/prompt entry — not yet production-ready

#### 🚧 AI Chat Button *(WIP)*

Chat trigger button — not yet production-ready

---

### Foundation Components

Source: Figma file `01-Foundation` Pages marked `[needs updating]` are not production-ready: Grid, Logo, Progress Bar, Spacing, Tools Header, Global Navigation (old)

---

#### UI Shell (`Zuora UI Shell`)

The top-level application wrapper. Sets the global theme and canvas size — cascades to all nested components.

**Themes:** Cosmos, Horizon, Nebula **Sizes:** 1280px, 1440px, 1600px **Focus Mode:** True, False **Optional:** Footer

| Theme | Character |
| :---- | :---- |
| `Cosmos` | Dark navy — Zuora's primary enterprise shell |
| `Horizon` | Mid-tone — transitional/secondary surfaces |
| `Nebula` | Light — clean, minimal product surfaces |

---

#### Page Header

The persistent header at the top of every page. Adapts to view type, form context, and wizard flows.

**Page Header Types:** View, Form, Form Pinned **Themes:** Nebula, Horizon, Cosmos, No background

**Optional slots:** Overline, Status chips (1 or 2), Supporting info, Pinnable

**Actions — View Pages** (Type: Default, AI Summarize, Object View)

| Slot | Notes |
| :---- | :---- |
| Primary button | Boolean |
| Secondary button 1 & 2 | Boolean |
| More actions button | Boolean |
| AI Summarize button | Boolean |
| Configure button | Boolean |
| Description | Boolean |
| History | Boolean |
| Hierarchy | Boolean — Object View specific |

**Actions — Form Pages** (Type: Create, Edit, Wizard, Save Draft)

Same slots as View Pages, plus:

| Slot | Notes |
| :---- | :---- |
| Is Wizard | Boolean |
| Step | First, PreviousNext, Last, N/A |

---

---

### Navigation Components

Source: Figma file `02-Navigation` Pages marked `[needs updating]`: Pagination, Footer

---

#### Global Navigation

The primary navigation shell. Contains primary nav, secondary nav, search modal, and theme background.

**Theme:** Cosmos, Horizon, Nebula **Page Type:** Homepage, Other Pages, All Pages **Primary Nav:** Active, Focus Mode (Ghost) **Secondary Nav (app context):** Command Center, Billing, Revenue, Zephr, Quoting, Collections, App Settings, Closed / Focus Mode

Sub-components:

- `Global Nav - Secondary Nav` — Theme · Page Type · View (Admin / Persona) · App  
- `Global Nav - Search Modal` — Theme only  
- `Theme Background` — Theme · Page Type

---

#### Breadcrumb

**Levels:** 1–6 **Optional:** Tour Indicator

Sub-component: `.breadcrumbItem`

- **Variant:** Default, Current Location  
- **State:** Default, Hover

---

#### Link

**Variant:** Always Underlined, No Underline, External, Dotted **State:** Default, Hover, Pressed, Disabled, Focused **Theme:** Light, Dark

---

#### Tabs

**Type:** Parent, Child **Orientation:** Horizontal, Vertical **State:** Default, Selected, Focus, Selected Focus **Theme:** Light, Dark **Optional:** Leading Icon

---

#### Stepper

**Type:** Horizontal, Vertical, Condensed **Label Alignment:** Left, Center **Description:** True, False **Theme:** Light, Dark

Sub-components:

- `Stepper/Step` — Type (Active, Inactive, Done, Error \+ Condensed Dark variants) · Label Alignment · Theme · Optional Description  
- `Stepper/Element` — Type (Default, Active, Done, Error) · Theme  
- `Stepper/Line` — Theme

---

### Utility Components

Source: Figma file `06-Utilities` Pages marked `[needs updating]`: Divider, Scrollbar `Color Spot` page is internal/WIP — not production

---

#### Glass Effect

**Theme:** Light, Dark **State:** Default/Hover, Focused/Selected **Elevated:** True, False

A frosted-glass surface treatment — used for overlaying content with depth. Combine with elevation system.

---

### Feedback Components

Source: Figma file `05-Feedback`

---

#### Alert

**Status:** Info, Success, Warning, Error **Multi-line:** True, False **Optional:** Status Icon, Close Icon, Action button, Title

---

#### Dialog

**Status:** Information, Success, Warning, Error **Size:** Small **Status Icon:** True, False **Optional:** Ignore Button

---

#### Progress

**Type:** Circular, Linear **Sizes:** Extra Small, Small, Medium, Large, N/A **Label:** True, False **Theme:** Light, Dark

---

#### Skeleton

**Animation:** Start, End

Used as a loading placeholder — animated shimmer indicating content is loading

---

#### Snackbar

**Type:** Info, Success, Warning, Error **Multi-line:** True, False **Optional:** Status Icon, Actions, Close Icon

Note: Close Button and Text Button are always True when shown — not togglable off individually

---

#### Tooltip

**Position:** Top, Bottom, Left, Right **Pointer Position:** Start, Center, End **Theme:** Light, Dark

---

### Data Display Components

Source: Figma file `04-Data-Display` Pages marked `[needs updating]`: Code Preview, Empty State, Meter, TreeView, Timeline

---

#### Accordion

**Type:** Group, Standalone **Position:** First, Middle, Last, N/A (for standalone) **Expanded:** True, False **Disabled:** True, False

Sub-component: `.Accordion Header`

- **Type:** Collapsed, Expanded  
- **State:** Default, Disabled  
- **Optional:** Description, Secondary Button, Tertiary Button

---

#### Avatar

**Variant:** Circular **Size:** Large **Content:** Icon **Theme:** Light, Teal **Color/Theme:** Black

Note: Supports image, initials, and icon content types

---

#### Badge

**Type:** Standard, Dot **Color:** Info, Negative **Background:** Light, Dark

---

#### Card

Card uses composition — no standalone variant set. Structure is defined by sub-components.

Sub-component: `.Card Title`

- **Type:** Default, Overline title  
- **Optional:** Description, Action Button

---

#### Chip

**Style:** Outline, Filled · **Variant:** Filled, Outlined **Types:** Normal, Default, Custom-Right Icon, Clickable, Deletable **Context / Color:** Default, Negative, Positive, Success, Indeterminate, Warning, Info **Size:** Medium, Small **Usage:** Normal, Primary **State:** Enabled, Default **Theme / Background:** Light, Dark

Special variant: `Environment Chips` — Type: Production (and others)

---

#### Data Grid

Occam's primary table component — complex, highly composable.

**Column features:** Sorting, filtering, grouping, resizing, pinning **Row features:** Selection (single/multi), inline editing, row actions **Bulk actions type:** Text buttons, Icon buttons **Status chips in cells:** Default, Negative, Success colors

Data Grid is the most complex component in the library. When mocking, clarify: column count, row density, which toolbar actions are needed, and whether bulk selection is required.

---

#### Drawer

**Type:** Single Page, Multi Page **Optional:** Footer, Subtitle, Close Icon, Multi-page router

`border-radius: 8px` — the only component that deviates from the 4px default

---

#### Grouped List — Sortable

**State:** Default, Hover, Proximity Hover, Selected/Focused **Theme:** Light, Dark **Optional:** Chip, Action Buttons

---

#### Grouped List — Multi-Card

**State:** Default, Proximity Hover, Hover, Open **Theme:** Light, Dark **Optional:** Chip

---

#### Modal

**Type:** Default

Modal uses composition — content is slotted in. Structure follows Dialog pattern for confirmation flows.

---

#### Popover

**Type:** Default, Error Popover, With Buttons **Theme:** Light, Dark **Optional:** Link, Title

---

#### Preview Panel

Side panel for contextual detail views. Uses Chip and Dropdown Icon sub-components. Theme: Light.

---

#### Widget

**Widget Icon Types:** Quick Link, Business Process, Report, Default, App

**Named icons:** Order Entry, Quick Link, Report, Batch Price Update, Auto Suspend/Resume, Cancel Subscription, Revenue, Approve Journals & RCs, Import Revenue Events, Release Holds, Create Journal Entries, Review Revenue Contract, Run Report

---

### Data Visualization Components

Source: Figma file `08-Data-Visualization` Rendering library: **Highcharts** ([highcharts.com/demo](https://www.highcharts.com/demo)) All charts support Light and Dark themes

---

#### Data Viz Color Palette

Occam uses a specific ordered sequence for chart series colors. Apply in order — do not skip or reorder.

**Light Theme — Series Order**

| \# | Name | Hex |
| :---- | :---- | :---- |
| 01 | Teal 500 | `#009684` |
| 02 | Blue 500 | `#0d4ac3` |
| 03 | Navy 600 | `#33495c` |
| 04 | Orange 300 | `#c9824a` |
| 05 | Dark Red 600 | `#68003b` |
| 06 | Purple 400 | `#6f4dcd` |
| 07 | Green 700 | `#1a4d39` |
| 08 | Dark Red 300 | `#b43e81` |
| 09 | Green 400 | `#509a74` |
| 10 | Midnight 600 | `#49416f` |
| 11 | Red 500 | `#b60f00` |
| 12 | Purple 600 | `#3f2489` |
| 13 | Burgundy 500 | `#894a77` |
| 14 | Yellow 500 | `#a07b13` |
| 15 | Navy 400 | `#5f7b91` |

**Dark Theme equivalents** use lighter palette steps (e.g. Teal 300 `#00d2b9`, Blue 300 `#5e8be5`, Purple 200 `#b69bfe`, etc.)

**Group color sets** (for categorical grouping): 1, 2, 3, 4 group palettes defined in Figma.

---

#### Chart Elements (Sub-components)

Shared building blocks used across all chart types.

| Element | Key Variants |
| :---- | :---- |
| `Chart Grid` | Horizontal/Vertical lines, Y values, Second Y axis, Y/X axis titles, Description — all boolean |
| `Chart Tooltip` | Style: Top, Text Only, Text+Number Right, Number Only · Header: True/False |
| `Chart Legend` | Type: Category, Line, Line with points, Dash line · Counter · State: Default/Disabled |
| `Chart Dot` | Shape: Circle, Outlined · State: Default/Hover · Color: Teal, Burgundy, Blue, Green, Red, Yellow, Purple, Orange, Navy, Dark red |
| `Chart Hover Line` | Dash Line: True/False |
| `Chart Label` | Style: 1/2/3 Lines · Size: Small/Medium/Large · Percentage Change Indicator |
| `Chart Percentage Change Indicator` | Type: Positive, Negative |
| `Chart Forecast Label` | Theme only |
| `X axis values` | Types: Time Interval · Number of Labels: 6/8/12/15/30 |
| `.Chart Horizontal Line` | Type: Horizontal Line, Line \+ Left and Right values, Line \+ Center value |
| `.Chart Vertical Line` | Type: Vertical Line, Line \+ Center value, Line \+ left/right value |

---

#### Line Chart

**Lines count:** 1, 2, 4, 6 **Smooth line:** True, False **Trend line:** True, False **Forecast:** True, False **Theme:** Light, Dark

---

#### Area Chart

**Type:** Basic, Stacked Area, Stepped Area, Stream Area, Area Range **Gradient:** True, False **Smooth line:** True, False **Overlapping:** True, False **Trend line:** True, False **Forecast:** True, False **Theme:** Light, Dark

---

#### Donut & Semi-Donut Charts

**Donut Chart**

- **Thickness:** 50%, 65%, 75%, 90%  
- **State:** Default, Hover  
- **Data parts:** 1 Part, 6 Parts, No Data  
- **Label:** True, False  
- **Theme:** Light, Dark

**Semi-Donut Chart**

- Same props as Donut Chart

**Donut Chart — Small**

- **Edge case:** No data, Low value  
- **Skeleton:** True, False  
- **Theme:** Light, Dark

**Semi-Donut Chart — Small**

- **Data Parts:** 1 Part, 4 Parts, No data  
- **Theme:** Light, Dark

**Progress Ring Chart**

- **Percentage:** 0, 25, 50, 75  
- **Theme:** Light, Dark

---

#### Bar Chart (Vertical)

**Bar Chart**

- **Group bars:** True, False  
- **Time interval:** 6, 8, 10, 12, 15, 30  
- **Trend line:** True, False  
- **Negative:** True, False  
- **Theme:** Light, Dark

**Stacked Bar Chart**

- **Type:** Wide, Thin  
- **Time interval:** 6, 8, 10, 12, 15, 30  
- **Trend line:** True, False  
- **Theme:** Light, Dark

---

#### Horizontal Bar Chart

**Layouts:** Inline, Vertical, Bi-direction **Grouped Bars:** True, False **100% in total:** True, False **State:** Default, Hover **Theme:** Light, Dark

Sub-types: Standard, With Value, Grouped, Stacked, Bi-directional — each with their own layout/value/percentage toggles

---

---

## 10\. Usage Guidelines (Content Strategy)

*To be added — see [occam.zuora.com/foundations-content-strategy](https://occam.zuora.com/foundations-content-strategy)*

---

*This file is generated from Figma source files (via MCP) and the Occam website. Re-extract when tokens are updated.* *Source: occam.zuora.com · Last updated May 2026*

