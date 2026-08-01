# The app's interface, drawn

Screens 01–17 are described in words in [`../../docs/`](../../docs/). Here they are
drawn.

The sheets are SVG because a drawing should open anywhere, diff line by line, and
be set in the product's own type: every sheet imports
[`../../landing/fonts.css`](../../landing/fonts.css) — the real Golos Text the
landing serves, not a copy of it.

## What is here

| Sheet | What it shows |
|---|---|
| [`foundations.svg`](./foundations.svg) | both themes with their contrast counted, the six accents, the type scale, controls, a feed card, chat bubbles |
| [`03-feed.svg`](./03-feed.svg) | the neighbourhood feed: phone at 390×844 and a wide screen |
| `01`…`17` | the rest of the screens from [`../../docs/`](../../docs/), one sheet each |
| [`03-feed-shape.svg`](./03-feed-shape.svg) | how this product's shape differs from its brother's: one column, a round button over the feed, a rule down what is new |

## The hand

Soft geometry, depth made of light, and what is chosen is washed rather than
ringed. Read off [`../../landing/index.html`](../../landing/index.html), which
carries twenty radius declarations and exactly two hard shadows.

| | |
|---|---|
| radius | **16px** on cards and bubbles |
| border | **1px** |
| depth | none — the phone's shadow is ambient, `0 36px 74px` |
| bubble tail | **one corner tightened to 5px**, the bottom one on the speaker's side |
| outgoing | filled with the accent |
| avatar | **a circle**, accent-filled |
| chosen | a **12% wash of the accent**, not a ring |
| phone | 46 / 35 |

A dashed accent frame appears **exactly once** — the "why you matched" footnote at
the head of a chat. Nothing else on the property is dashed, so it reads as a
footnote and not as a control.

**Do not copy the brother.** neighbro is right angles, 2px borders and a hard
offset shadow. It is a different product, not a different palette.

## The generator

Sheets `01`…`17` are built by [`render.py`](./render.py) — one definition per
screen, rendered beside itself:

```sh
python3 design/interface/render.py
```

`foundations.svg` and `03-feed.svg` were drawn by hand before the generator and
are not overwritten by it.

**The price, stated plainly.** The brother repository carries a copy of this file
with its own face and its own screens. The two storefronts share a family, not a
codebase, so the copies are expected to diverge — which is fine while the
divergence is deliberate. But if you change a screen's shape here and the brother
should follow, that is a second edit, by hand, and nothing will remind you.

## How to view them

In a browser, but **over a server rather than by double-clicking**: some browsers
refuse `@font-face` over `file://`, and the sheet then arrives in a system font
with every line the wrong width.

```sh
# from the repository root
python3 -m http.server 8080
# then http://localhost:8080/design/interface/foundations.svg
```

## Where the colours come from

From [`../../landing/index.html`](../../landing/index.html) — from what is
deployed, not from memory. The contrast figures are counted from those values.

Noticed while reading them off, and recorded on the sheet:

- [`../DESIGN_SPEC_EN.md`](../DESIGN_SPEC_EN.md) is **stale**: it names the accent
  `#d6552f` and a cycle of five, while the landing carries six named accents and
  defaults to terra `#bd4b2a`.
- In the light theme `--muted` on `--panel-2` measures **4.11:1** against a
  threshold of 4.5 — that is secondary text in nested plates and in incoming chat
  bubbles.
- The accent as text on the background measures 3.7–4.2:1. Large headings pass on
  that; a `0.7rem` eyebrow does not.

## The brother

The same thing for neighbro:
[`neighbro.place/design/interface/`](https://github.com/panov-id/neighbro.place/tree/main/design/interface).
The same brutalism and the same templates, its own face.
