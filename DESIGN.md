---
name: Shuhuai Zhang Personal Website
description: Two genuine registers share one precise line.
colors:
  academic-slate: "#5d7078"
  academic-deep: "#42545c"
  research-canvas: "#687b83"
  research-image-base: "#73858c"
  mineral: "#e9eff0"
  paper: "#f5f7f6"
  ink: "#18242b"
  muted-slate: "#5c6d73"
  research-metadata: "#506168"
  research-pane: "rgba(237, 242, 242, 0.91)"
  nav-light-muted: "rgba(245, 247, 246, 0.86)"
  home-copy-muted: "rgba(245, 247, 246, 0.92)"
  academic-focus: "#8f4f3a"
  apricot: "#d38a68"
  academic-line: "rgba(24, 36, 43, 0.24)"
  light-line: "rgba(242, 246, 245, 0.3)"
  aubergine-field: "#24181f"
  aubergine-deep: "#1d1319"
  music-pane: "rgba(25, 20, 29, 0.84)"
  ivory: "#f2e8df"
  music-detail: "#d7c6bc"
  music-muted: "#c8b7ad"
  music-line: "rgba(242, 232, 223, 0.25)"
  music-pane-edge: "rgba(242, 232, 223, 0.42)"
  video-black: "#0c0d0e"
typography:
  display:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(4.1rem, 8.2vw, 6rem)"
    fontWeight: 650
    lineHeight: 0.84
    letterSpacing: "-0.038em"
  archive-heading:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(2rem, 3.2vw, 3rem)"
    fontWeight: 570
    lineHeight: 1
    letterSpacing: "-0.032em"
  paper-title:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(1.08rem, 1.42vw, 1.3rem)"
    fontWeight: 600
    lineHeight: 1.34
    letterSpacing: "-0.022em"
  body:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  nav-label:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 540
    lineHeight: 1.55
    letterSpacing: "normal"
  music-lead:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "clamp(1.1rem, 1.55vw, 1.34rem)"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "-0.012em"
  performance-title:
    fontFamily: "Alegreya, Georgia, serif"
    fontSize: "clamp(1.5rem, 2.25vw, 2.15rem)"
    fontWeight: 530
    lineHeight: 1.08
    letterSpacing: "-0.025em"
components:
  navigation:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.nav-label}"
    height: "84px"
    width: "100%"
  home-canvas:
    backgroundColor: "{colors.academic-slate}"
    textColor: "{colors.paper}"
    typography: "{typography.display}"
    height: "100svh"
    width: "100%"
  research-selector:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    width: "260px"
  research-reading-pane:
    backgroundColor: "{colors.research-pane}"
    textColor: "{colors.ink}"
    padding: "clamp(34px, 4.2vw, 54px) clamp(34px, 4.5vw, 58px)"
    width: "100%"
  research-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.paper-title}"
    padding: "28px 0 32px"
    width: "100%"
  performance-carousel:
    backgroundColor: "{colors.music-pane}"
    textColor: "{colors.ivory}"
    width: "100%"
  performance-media:
    backgroundColor: "{colors.apricot}"
    textColor: "{colors.ivory}"
    padding: "clamp(6px, 0.65vw, 9px)"
    width: "100%"
  carousel-control:
    backgroundColor: "transparent"
    textColor: "{colors.ivory}"
    size: "64px"
  skip-link:
    backgroundColor: "{colors.apricot}"
    textColor: "{colors.aubergine-deep}"
    padding: "10px 14px"
---

# Design System: Shuhuai Zhang Personal Website

## Overview

**Creative North Star: "Two Registers, One Line"**

One identity is expressed through two genuine registers. About and Research occupy a cool mineral-and-slate painterly world; Another Me shifts into aubergine, ivory, and apricot. Transparent left-grouped navigation, compressed Archivo display type, full-viewport fields, square geometry, and fine rules keep the three independent routes on one structural line.

The system is experiential but exact. About lets a full portrait field carry biography and contact information; Research makes a generated mineral field the atmosphere behind a functional two-node archive; Another Me sets one performance at a time against a warmer abstract field. The interface refuses boxed portfolio heroes, a permanent side rail, floating cards, ornamental chrome, and invented proof.

**Key Characteristics:**

- Two coordinated painterly registers within one identity.
- Transparent, horizontal, left-grouped navigation on every primary route.
- Full-viewport fields with square, translucent reading surfaces rather than cards.
- Compressed sans type shared across the identity; measured serif type reserved for music.
- Ruled research records and 16:9 performance media with restrained, progressive motion.

## Colors

The palette moves from cool slate and mineral blue to deep aubergine and ivory. Apricot is the connective accent; a darker clay tone protects focus contrast on the pale academic pane.

### Primary

- **Academic Portrait Slate** (`#5d7078`): The About fallback field and the cool scrollbar thumb; it also sets the family resemblance for the academic register.
- **Deep Academic Slate** (`#42545c`): The default dark academic field used by secondary fallback surfaces.
- **Research Canvas Slate** (`#687b83`): The Research route fallback and browser theme color beneath its generated mineral image.
- **Research Image Base** (`#73858c`): The image-backed layer behind the fixed Research canvas.
- **Mineral Ground** (`#e9eff0`): The pale academic ground and scrollbar track.
- **Translucent Research Paper** (`rgba(237, 242, 242, 0.91)`): The desktop archive pane; it preserves legibility while allowing the painterly canvas to remain perceptible.

### Secondary

- **Aubergine Field** (`#24181f`): The warmer musical register and its principal dark field.
- **Deep Aubergine** (`#1d1319`): The deepest music fallback, scrollbar track, and dark text counterpart to apricot.
- **Translucent Aubergine Pane** (`rgba(25, 20, 29, 0.84)`): The one-at-a-time performance carousel surface.
- **Performance Ivory** (`#f2e8df`): Primary type and high-contrast focus treatment in the musical register.
- **Warm Performance Detail** (`#d7c6bc`): Serif repertoire detail beneath each performance title.
- **Muted Performance Clay** (`#c8b7ad`): Supporting introduction, credit, status, and counter text.
- **Music Rule** (`rgba(242, 232, 223, 0.25)`): Internal dividers in the carousel.
- **Music Pane Edge** (`rgba(242, 232, 223, 0.42)`): The stronger top and bottom edge of the carousel field.

### Tertiary

- **Apricot Accent** (`#d38a68`): Active navigation lines, Research nodes, the word “Me,” media surrounds, controls, selection, and dark-surface focus.
- **Academic Focus Clay** (`#8f4f3a`): Paper-title hover and keyboard focus on the pale academic reading surface.

### Neutral

- **Paper White** (`#f5f7f6`): Primary type on academic canvases.
- **Navigation Paper** (`rgba(245, 247, 246, 0.86)`): Inactive navigation links over all three canvases.
- **Biography Paper** (`rgba(245, 247, 246, 0.92)`): Supporting biography copy over the portrait.
- **Blue-Black Ink** (`#18242b`): Primary type and strong rules inside the academic pane.
- **Muted Slate** (`#5c6d73`): Secondary academic text on pale surfaces.
- **Research Metadata Slate** (`#506168`): Author metadata within research rows.
- **Academic Rule** (`rgba(24, 36, 43, 0.24)`): Dividers between research records.
- **Light Field Rule** (`rgba(242, 246, 245, 0.3)`): Fine boundaries over dark academic fallback surfaces.
- **Video Black** (`#0c0d0e`): The stable aperture behind embedded performance video.

**The Two Registers Rule.** Cool painterly slate and mineral belong to academic reading; aubergine and ivory belong to performance; apricot and the one-pixel line make them siblings.

**The Contrast-Specific Focus Rule.** Use Academic Focus Clay on the pale Research pane, apricot on dark interactive surfaces, and ivory around focused performance media.

**The Rare Accent Rule.** Apricot marks identity, selection, action, focus, or real media; it never becomes a general-purpose page surface.

## Typography

**Display Font:** Archivo (with Arial Narrow and sans-serif fallbacks)  
**Body Font:** Archivo (with Arial Narrow and sans-serif fallbacks)  
**Music Font:** Alegreya (with Georgia and serif fallbacks)

Both fonts are self-hosted variable WOFF2 assets. Archivo supplies the compressed, factual identity layer and spans from restrained navigation to display-scale names. Alegreya changes the cadence only where the musical register needs warmth.

### Hierarchy

- **Display** (650, `clamp(4.1rem, 8.2vw, 6rem)`, 0.84): Names and page titles, set at a 78% stretch with tight tracking; mobile scales to the viewport rather than introducing a second display style.
- **Archive Heading** (570, `clamp(2rem, 3.2vw, 3rem)`, 1): The active Research category heading above the strong ink rule.
- **Paper Title** (600, `clamp(1.08rem, 1.42vw, 1.3rem)`, 1.34): Compact research titles, set at a 94% stretch for long factual strings.
- **Body** (400, `1rem`, 1.55): The shared baseline for biography, metadata, credits, controls, and supporting copy; each surface applies narrower factual measures where needed.
- **Navigation Label** (540, `0.9rem`, inherited 1.55): Desktop navigation at a 96% stretch; it tightens to `0.74rem` below 680px and `0.68rem` below 390px without becoming a drawer.
- **Music Lead** (500, `clamp(1.1rem, 1.55vw, 1.34rem)`, 1.45): The first-person musical introduction.
- **Performance Title** (530, `clamp(1.5rem, 2.25vw, 2.15rem)`, 1.08): Repertoire titles within the active carousel slide.

**The Shared Display Rule.** Archivo owns the name, page titles, navigation, selector labels, and academic record on every route.

**The Serif Reserve Rule.** Alegreya is limited to the music introduction, performance titles, and repertoire detail; it does not replace the shared identity layer.

## Layout

All three primary routes are independent documents organized on a centered shell (`min(1180px, calc(100vw - 80px))`) inside full-viewport canvases. Their 84px transparent headers are absolutely positioned over the imagery. The wordmark and all three links remain grouped at the left: the navigation follows the wordmark by `clamp(30px, 4.4vw, 58px)` rather than occupying the far edge or a permanent rail.

About is one portrait-backed field with a minimum height of `100svh`. A two-column grid reserves the left for the staggered name, biography, and email and the right for the portrait. Layered gradients protect the reading column and dissolve before the face. There is no separate biography band or footer on the route.

Research is also a `100svh` canvas, but its generated mineral painterly background is fixed behind a two-column working layout. The left rail contains the page title and a vertical two-node category selector; Publications is the default. The right side is a hard-edged translucent reading pane with its own vertical scroll on desktop. Research records remain ruled rows inside that pane, with evidence links in a narrow right column. The tablist supports click plus arrow, Home, and End navigation.

Another Me uses the same two-column canvas against a fixed generated aubergine-and-apricot abstract background. The title and introduction stay at left; a hard-edged carousel fills the right and exposes one of eight performance records at a time. Each active record pairs 16:9 media with year, title, detail, and credit. Previous and next controls, a numeric status, arrow/Home/End keys, and horizontal touch swipes change the active record.

At 1040px, the two working canvases narrow their left rail and gap. At 900px, the shell becomes `min(100% - 44px, 760px)`, Research and Another Me change from viewport-locked panes to whole-page scrolling, their grids stack, the Research selector becomes a horizontal two-node line, and both inner pane scrollers become ordinary document flow. At 680px, the shell becomes `calc(100% - 32px)`, the header becomes 74px, research links stack below metadata, and About narrows its copy to about 30 characters while shifting the portrait crop right. At 390px, navigation gaps and labels tighten again without changing structure.

**The Full-Viewport Field Rule.** Generated imagery and tonal overlays span the canvas; the centered shell aligns content but never turns the route into a boxed portfolio hero.

**The One-Scroller Rule.** Research and Another Me use contained pane scrolling only above 900px; below that breakpoint, the document owns the scroll.

**The Horizontal Navigation Rule.** About, Research, and Another Me remain visible in one left-grouped row on desktop and mobile.

## Elevation & Depth

There are no shadows, radii, or lifted surfaces. Depth comes from the generated background images, directional tonal overlays, translucent square reading panes, one-pixel rules, and the apricot surround around a black video aperture. The panes do not use backdrop blur; their translucency belongs to the painterly field rather than to a glass-card effect.

Route changes use progressive cross-document View Transitions where supported: the old document fades and blurs over 180ms, and the new document arrives from lower opacity and a stronger blur over 420ms. Active Research panels and performance slides use a restrained 360ms fade/blur arrival. The About boundary line draws over 720ms, and navigation underlines draw over 220ms. Reduced-motion preferences collapse all animation and transition durations to `0.01ms` and restore automatic scrolling.

**The Flat-by-Construction Rule.** Use imagery, tonal overlays, rules, and controlled translucency to establish depth; do not introduce shadows, rounded glass, or floating layers.

**The Progressive Motion Rule.** Route transitions enhance navigation when the browser supports them and disappear cleanly under reduced motion; content remains complete without animation.

## Shapes

The form language is square and architectural. Navigation underlines, category nodes, reading panes, research rules, carousel controls, media surrounds, focus outlines, and external-link arrows all use hard edges. The 11px Research nodes sit on a one-pixel line, and the performance surround frames a black 16:9 aperture with no radius or shadow.

**The Square Media Rule.** Performance media remains 16:9, square-cornered, and attached to its active descriptive record.

**The Line-and-Node Rule.** Use one-pixel rules and small square nodes to express sequence and selection; do not substitute pills, chips, or badges.

## Components

### Transparent Navigation

- **Structure:** An absolutely positioned, full-width transparent header with an 84px centered shell. The wordmark and horizontal navigation form one left-aligned group on every primary canvas.
- **Type:** The wordmark is `0.98rem` at weight 620; desktop links are `0.9rem` at weight 540.
- **State:** Inactive links use Navigation Paper. Hover, focus, and the current route resolve to full Paper White plus a one-pixel apricot underline that draws from left to right.
- **Mobile:** The header becomes 74px below 680px; labels and gaps tighten at 680px and 390px, but all three links remain visible.

### About Portrait Canvas

- **Structure:** A full-height background portrait with name, biography, and email in one protected left column; the portrait owns the right.
- **Treatment:** Cool horizontal and vertical overlays maintain copy contrast while retaining the generated image as the field itself.
- **Boundary:** A one-pixel light line draws across the bottom on arrival.

### Research Category Selector

- **Structure:** Two real category buttons joined by a fine line. Desktop places them vertically; below 900px they become two columns on one horizontal line.
- **State:** Each button has an 11px square node. The active node fills with apricot; inactive nodes retain a light outline. Roving focus follows the active tab.
- **Behavior:** Click, both-axis arrow keys, Home, and End activate the associated panel and reset the desktop pane scroll.

### Research Reading Pane and Rows

- **Pane:** A translucent mineral surface with strong top and bottom rules, square edges, and its own desktop scroll.
- **Rows:** Each record uses a flexible factual column and a 104px evidence-link column, separated by generous space and an academic rule. Paper-title hover uses Academic Focus Clay.
- **Links:** Compact Archivo labels use a one-pixel underline and an 11px square-capped external arrow. On small screens, links move below metadata and align left.

### Performance Carousel

- **Structure:** A translucent aubergine pane with one active slide and a 64px control strip. Eight records exist in the built archive, but only one is exposed at a time.
- **Media:** An apricot square surround contains a black 16:9 iframe aperture. Only the active iframe receives its source; inactive frames are unloaded.
- **Copy:** Apricot year, Alegreya title and detail, then muted Archivo credit separated by a one-pixel music rule.
- **Controls:** Previous and next square buttons flank a tabular numeric counter. Hover and focus invert each control to apricot with deep-aubergine ink. Arrow keys, Home, End, and 52px horizontal swipes change slides.

### Skip Link and Focus

- **Skip Link:** A fixed apricot rectangle with deep-aubergine text, translated above the viewport until focused.
- **Dark Surfaces:** Links, buttons, and the carousel receive a two-pixel apricot outline with a four-pixel offset.
- **Pale Academic Surface:** Research-pane links use Academic Focus Clay for the same two-pixel outline.
- **Embedded Media:** Focus within the performance media uses a two-pixel ivory outline; the iframe itself suppresses a duplicate outline.

There is no generic card, chip, form, or floating-button primitive. The tab and carousel buttons are structural controls, not an invitation to introduce general-purpose portfolio chrome.

## Do's and Don'ts

### Do:

- **Do** preserve the full generated portrait on About and the fixed generated painterly canvases on Research and Another Me.
- **Do** keep the transparent navigation horizontal, visible, and grouped at the left on every viewport.
- **Do** preserve Research as a two-node selector plus translucent scrolling archive, with Publications active by default.
- **Do** preserve the one-at-a-time performance carousel, active-only iframe loading, and real 16:9 media.
- **Do** use contained pane scrolling only above 900px and whole-page scrolling below it.
- **Do** preserve self-hosted Archivo across the identity and reserve self-hosted Alegreya for musical narrative.
- **Do** keep Academic Focus Clay on pale academic surfaces and apricot or ivory focus treatment on dark surfaces.
- **Do** keep View Transitions progressive and collapse motion under `prefers-reduced-motion`.

### Don't:

- **Don't** replace the Research painterly canvas with the former solid slate field or separate header band.
- **Don't** turn the performance archive back into eight stacked rows; keep one active record in the carousel.
- **Don't** introduce a permanent side rail, far-separated navigation, mobile drawer, decorative numbering, badges, or invented metadata.
- **Don't** place the biography in a detached card or pale band, or obscure the portrait with interface chrome.
- **Don't** round the reading panes or media, add shadows, backdrop blur, or floating glass cards.
- **Don't** spread apricot across general-purpose surfaces; its rarity carries identity and state.
- **Don't** use Alegreya for academic headings, navigation, years, controls, or credits.
- **Don't** fabricate portraits, logos, testimonials, research claims, performance records, or other visual proof.
