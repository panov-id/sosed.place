# sosed.place — landing design (locked)

Reference: [`sosed-landing.standalone.html`](./sosed-landing.standalone.html) (self-contained, images embedded).
Image-less template: [`sosed-landing.template.html`](./sosed-landing.template.html) + image build [`compress-images.py`](./compress-images.py).

Sibling of **neighbro** (same brutalist system and templates) with its own face: warm terracotta, courtyard voice, the **ХОЙ** greeting, real neighborhood photography.

---

## 1. Palette (tokens)

Dark theme (default) and light — switched via tokens on `:root` (`data-theme` overrides `prefers-color-scheme` both ways).

| Token | Dark | Light | Purpose |
|---|---|---|---|
| `--bg` | `#0d0b0a` | `#ece4d8` | page ground (warm charcoal / warm clay) |
| `--panel` | `#17130f` | `#f5efe4` | cards, panels |
| `--panel-2` | `#241c14` | `#ddd0bd` | nested chips, incoming bubbles |
| `--border` | `#3a2e20` | `#221a12` | 1px borders |
| `--fg` | `#f0e7dc` | `#1c140d` | body text |
| `--muted` | `#9a8d7c` | `#6b5f4c` | secondary text, captions |
| `--muted-2` | `#ab9d88` | `#655847` | in-card text (≥4.5:1) |
| `--accent` | `#d6552f` | `#c24a26` | **signature terracotta / brick** |
| `--accent-ink` | `#1c0e07` | `#fff6f0` | text on accent (buttons, out-bubbles) |

**Accent cycle** (silent, on logo click) — warm brick siblings: `#d6552f · #c8443a · #b7683a · #a84f2b · #cf6a2b`.
Neutrals carry a warm brown bias — not grey.

## 2. Typography

- `--sans`: **Golos Text** → system (`-apple-system, Segoe UI, Roboto, Helvetica Neue, Arial`). Cyrillic.
- `--mono`: `ui-monospace, SF Mono, Menlo, Consolas` — eyebrows, labels, captions, timers.
- **Display** = sans 800, UPPERCASE, negative tracking.
- **Eyebrow/labels** (`.mono`): UPPERCASE, `letter-spacing .22em`, `.7rem`, accent color.

Scale:
| Element | Size | Tracking / leading |
|---|---|---|
| `ХОЙ` (splash) | `clamp(4.8rem, 21vw, 12rem)` | `-.05em` / `.8` |
| `h1` (hero) | `clamp(2.6rem, 8.5vw, 5.6rem)` | `-.035em` / `.94` |
| `.h2` (sections) | `clamp(1.8rem, 5vw, 3rem)` | `-.03em` / `1` |
| `.closing .big` | `clamp(2.4rem, 9vw, 5.2rem)` | `-.035em` |
| body / lead | `1.05–1.3rem` | `1.42–1.5` |

## 3. Grid, spacing, radii

- `.wrap` — max-width `1180px`, padding `0 24px` (`0 18px` at ≤560px).
- Sections: `padding: clamp(58px, 9vw, 112px) 0`, separated by a top `1px` border.
- Eyebrow → heading: `margin-bottom .7rem` (tight).
- Radii: cards `16px`, buttons/input `12px`, phone `46px` / screen `35px`, avatar/“+” `50%`.

## 4. Elements

**Splash** — accent ground, courtyard photo underlay (`opacity .24`, `luminosity`), a ground-colored disc scales up (`.9s`), then the brand rises: **ХОЙ** (breathing `scale 3s`) → `сосед.` → `by PSYTICAN`. Dismisses after ~1.9s.

**Header** — sticky, blurred, logo `сосед●` (click = accent cycle), a `by invitation · soon` label on the right (hidden on mobile) + light/dark button.

**Hero** — three z-layers: facade photo (0) → darkening gradient `58%→80%→96%` (1) → text (2). Eyebrow, two-line `h1` (2nd line `--muted-2`), lead, `.microcat` (what it is), waitlist form, note.

**Neighborhood feed** — grid `minmax(320px,1fr)`, `.msg` cards: area label (mono), text, round “+” button top-right (fills with accent on hover), hover lift `-3px`.

**3 steps** — cards with a photo top (windows/terrace/aerial, gradient into panel), index `I—say / II—match / III—fade`, heading, text. Hover lift `-4px`.

**Features (6)** — 2-column grid, unified mono icons in 44px plaques: `◱ ± ✦ ⧗ ◈ ✷`. Hover lift.

**Closing** — “Район **ждёт**” over a contour texture (`opacity .12`) + a repeated form.

**Footer** — `© 2026 sosed.place · хой, by PSYTICAN` + links (Terms/Privacy/Rules) + a link to neighbro.place as the global version. Stacks on mobile.

## 5. Chat design

- **Bubbles**: incoming — `--panel-2`, left-aligned, rounded except bottom-left; outgoing — `--accent` with `--accent-ink`, right, except bottom-right. `max-width 82%`.
- **“Why you matched”** — a dashed accent box atop the chat: mono title + the liked lines that brought the pair together (the heart of the match).
- **Dissolve timer** — `✦ 2:14` in the header; centered `tstamp`: “dissolves in…”. Ephemerality is part of the UI.
- **Chat header** — `‹`, avatar (accent), name + `area · online`, timer.
- **Composer** — “написать…” + round send button (accent).

## 6. Device: portrait and landscape

- **Portrait** — phone `9/19.3`, bezel `#0a0908`, top notch. Two screens: **feed** (card + “–/+” buttons + swipe hint) and **chat** (see §5).
- **Landscape** — phone `19.5/9`, side notch. Two-pane: left **inbox** (thread list with previews and timers, active one accent-tinted), right **open chat**. On narrow screens (`≤520px`) the panes stack into a column.

## 7. Motion & accessibility

- Splash: disc grow `.9s`, brand rise, ХОЙ “breathing”.
- Section reveal: `IntersectionObserver` (`.reveal` → `.in`), `18px` shift + fade.
- Hovers: lift `3–4px` + accent border.
- `:focus-visible` — `2px` accent outline, `3px` offset.
- `prefers-reduced-motion` — all animation off, splash hidden.
- Both themes are first-class; muted text ≥ 4.5:1.

## 8. Imagery (pipeline)

Source — `neighbro.place/wallpapers/art/*.png` (heavy). `compress-images.py` (Docker/Pillow) compresses for web → 6 JPEG data URIs (~490 KB total):
`splash` courtyard · `hero` facade · `card_say` windows · `card_match` terrace · `card_fade` aerial · `texture` contour.
Injected into the template’s `{{SPLASH}}…{{TEXTURE}}` tokens.

## 9. Voice & tone

Warm courtyard, occasionally a touch “gop” (in moderation, good-natured). Greeting — **хой**. Courtyard reality: sunflower seeds, the yard, dominoes over beer, a beer run, the stairwell, “красава, го”. Microcopy: button “Запросить доступ”, note “статус основателя двора 🌻”, success “хой! ты в списке ✦”.

---

_Next: port to `sosed.place/landing` with self-hosted Golos fonts (like neighbro) and a real waitlist on the prod Supabase. See [DESIGN_SPEC_RU](./DESIGN_SPEC_RU.md)._
