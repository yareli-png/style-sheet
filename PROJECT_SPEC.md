# Style Sheet — Project Spec

## Overview

A single-file Netflix design token reference tool built in plain HTML, CSS, and JavaScript. No framework, no build step. Everything lives in `index.html`, with an `assets/` folder for static files.

**Primary audience:** Anyone producing visual content at Netflix — designers, engineers, marketers, content strategists, and producers. Built to be usable without a design background.

---

## File Structure

```
style-sheet/
├── index.html                    ← all HTML, CSS, and JS
└── assets/
    ├── km-logo.svg               ← nav logo (active)
    ├── review-apps-script.gs     ← Google Apps Script for feedback form submissions
    ├── step-choose-setup.svg     ← placeholder: Getting Started step 1 image
    ├── step-browse-pick.svg      ← placeholder: Getting Started step 2 image
    ├── step-grab-copy.svg        ← placeholder: Getting Started step 3 image
    ├── step-take-with-you.svg    ← placeholder: Getting Started step 4 image
    └── banner-still-growing.svg  ← placeholder: "Still growing" banner image
```

---

## Sections

| Tab | Description | Controls visible |
|---|---|---|
| Getting Started | Plain-language guide for non-designers | None (hidden) |
| Colors | Swatches by scheme and mode | Mode + Scheme |
| Gradients | Gradient tokens with CSS copy | Mode + Scheme |
| Typography | Type style cards | Mode only (Scheme hidden) |
| FAQ | Accordion Q&A | None (hidden) |

---

## Features

### Navigation
- Sticky black nav bar, 60px tall
- Logo slot on the far left (`assets/km-logo.svg`, 35×35px)
- Tabs centered: sans-serif, 14px, mixed case
- Inactive tabs: `#666666`; active tab: bold white on `#1C1C1E` rounded pill
- Tab order: Getting Started → Colors → Gradients → Typography → FAQ

### Theme System
- **Dark mode** (default) and **Light mode** toggle
- Implemented via CSS custom properties (`--card-bg`, `--text-primary`, etc.)
- `body.light-mode` class overrides variables for light theme
- All cards (colors, gradients, typography) are fully dynamic — no hardcoded colors

### Scheme Switcher
- Three brand expressions: **Core** (red), **Cool** (blue), **Warm** (orange)
- Disabled (greyed out) on the Typography tab
- Fully hidden on Getting Started and FAQ

### Color Cards
- Swatches organized by category within each scheme + mode
- Hover reveals a copy icon — click to copy hex value to clipboard
- Click card body to pin

### Gradient Cards
- Strip-style gradient preview
- Hover copy icon copies full CSS `linear-gradient()` property

### Typography Cards
- Shows sample text rendered in the actual typeface
- Meta bar: token name, font, size, weight, line height, letter spacing, usage
- Copy button copies CSS spec
- Click card to pin

### Pin Bar
- Sticky bottom panel — persists across section navigation
- Pin state is scoped per `{scheme}-{mode}` combination
- Pinned cards highlighted with `--card-border-pinned` (white in dark, black in light)
- Actions: **Copy CSS** (all pinned tokens as CSS variables) / **Export** (Markdown spec download)
- Expandable preview panel shows formatted output before copying

### FAQ Accordions
- 10 questions covering tokens, schemes, modes, copy/pin workflow, and contacts
- Click question to expand/collapse answer
- Chevron rotates on open; keyboard accessible (Enter / Space)

### Getting Started Guide
- Step-by-step sections with numbered guide steps
- No mode or scheme controls shown — purely informational

---

## Voice and Tone

This style sheet is written for a broad audience — designers, engineers, marketers, and producers — many without a design background. The writing should feel like a knowledgeable colleague explaining things clearly, not a documentation bot.

### Principles

**Plain language.** Avoid design jargon. Prefer "color scheme" over "token set", "style" over "spec", "use this for" over "applied to semantic contexts". If a non-designer would pause to Google a term, rewrite it.

**Conversational, not formal.** Contractions are fine. Short sentences are better than long ones. The goal is clarity, not authority.

**Warm but concise.** Be friendly without being verbose. Cut words that don't add meaning. A good sentence can always be shorter.

**First-person singular, not plural.** This is a personal project. Write as an individual ("I") or address the reader directly ("you") — never "we" or "our team."

**No em dashes.** Use a comma, a period, or a rephrased sentence instead.

### Specific conventions

- **Terminology:** Use "scheme" (not "color set" or "palette"). Use "style sheet" (not "style guide"). Use "mode" (not "theme").
- **UI references:** Bold UI labels and action words inline — **Dark**, **Copy CSS**, **Pin** — instead of using styled tags or code formatting.
- **Slack links:** Link only the word "Slack", never the full phrase. Phrasing should vary naturally — "Drop us a message on Slack", "Reach out on Slack", "Let us know on Slack" — but avoid being robotic or repeating the same phrase back to back.
- **Status color names:** Use function-first names — Highlight, Alert, Success, Warning — not raw token names like `foreground-system-announce`.
- **Feedback copy:** Invite input in a human way. Prefer "Tell us what you love and what you'd change" over generic "Share your feedback."

---

## Technical Details

### CSS Architecture
- Custom properties defined on `:root` for dark mode defaults
- `body.light-mode { }` overrides for light theme
- No `!important` — specificity managed via selector weight
- Focus styles: `outline: none` globally, `outline: 2px solid var(--scheme-primary)` on `:focus-visible`

### JS Architecture
- `currentScheme`, `currentMode`, `currentTab` — global state
- `TAB_META` — title, subtitle per tab
- `INFO_TABS` — set of tabs that hide controls (`getting-started`, `faq`)
- `applyTabMeta(tab)` — updates section header, page title, control visibility
- `renderCurrentTab()` — re-renders tab content on scheme/mode change
- Pin state stored in a plain object keyed by `{scheme}-{mode}`

### Fonts
- `--font-sans`: Inter (Google Fonts)
- `--font-mono`: JetBrains Mono (Google Fonts)

---

## Prompt History (Key Changes)

1. **Initial build** — single-file HTML/CSS/JS with Colors, Gradients, Typography sections
2. **Added Getting Started and FAQ** — non-designer guide with step-by-step layout; FAQ as interactive accordions; both tabs forced to light mode
3. **Nav and controls pass** — Getting Started set as default tab; Icons tab removed; Mode/Scheme controls hidden on info tabs; logo slot added
4. **Card and layout polish** — hover lift animations; step cards redesigned as row layout with image placeholders; pin bar and modal aligned to Hawkins Professional tokens
5. **UX writing pass** — plain-language copy throughout; em dashes removed; terminology standardized (scheme, style sheet); FAQ rewritten with categorized accordions; status color names changed to function-first (Highlight, Alert, Success, Warning)
6. **Visual refinements** — Cool scheme applied to feedback FAB, banner, and checkmarks; meta bar style (border-top, light mode background) applied consistently across Colors, Gradients, and Typography cards; label sizes standardized to 11px; contrast fixed (`--text-muted` raised to `#767676`); accordion border transitions smoothed

---

## Pending / Future Ideas

### Images
- Replace `assets/step-choose-setup.svg` with a real screenshot or illustration showing the scheme/mode switcher
- Replace `assets/step-browse-pick.svg` with a screenshot of the token card browsing experience
- Replace `assets/step-grab-copy.svg` with a screenshot showing the hover copy action on a card
- Replace `assets/step-take-with-you.svg` with a screenshot of the pin bar and export flow
- Replace `assets/banner-still-growing.svg` with a decorative image or illustration for the "Still growing" banner

### Features
- Icons tab (currently removed — placeholder was "coming soon")
- Figma token export format
- Search / filter across tokens
- Replace inline SVG icons with HC: Web Toolkit (Hawkins) icons — matching found for clipboard (copy), caret-up/chevron (accordions), warning (feedback modal), and chat bubble (review mode). Needs Figma node links or a web-distributable package to extract SVG paths.
- Replace navigation header and tabs with Hawkins equivalents — candidate found at HC Web Toolkit node 15751-28352. Needs visual review to confirm match.
