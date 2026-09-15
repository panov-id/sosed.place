# Screen 22 — Appearance

## Purpose

How the app looks for this person: theme, contrast and accent colour. The screen was added on 2026-09-15. Until that day theme and contrast sat on screen 10, and the accent existed only on the landing, where the house mark cycles it. The "Appearance" item on screen 10 leads here.

## What is on the screen

- **Theme** — light, dark, or as in the system (it sat on screen 10 and moved here on 2026-09-15).
- **Contrast** — three steps: normal, raised, maximum (settled 2026-08-26). There is no slider: a continuous control inevitably has positions below 4.5:1.
- **Accent** — the storefront's set, the same one the house mark cycles on its landing:
  - sosed.place — terracotta (the default), amber, teal, azure, violet, crimson;
  - neighbro.place — gold (the default), crimson, teal, azure, violet.

  Each swatch is labelled with a word: colour must not be the only carrier of the choice (`xor.ad/docs/accessibility-and-i18n_EN.md`, rule 1).
- **A sample line** under the choice — a phrase, a button and the "stepped away" label in the chosen combination. The result is visible before the person leaves the screen.

## Logic

- **This screen's edge states and their texts — screen 11** (`11-empty-and-edge-states_EN.md`): appearance with no connection.
- **Applied at once, no confirmation, and undone with one tap** — as it was on screen 10.
- **Every combination is checked by arithmetic before deploy, not on the fly.** A combination is a theme, a step and a storefront accent: sosed.place has 36 palettes, neighbro.place 30. The contrast check for the app's tokens is written together with the first screen and covers the accents (`xor.ad/docs/accessibility-and-i18n_EN.md`, "What checks this"). A palette below 4.5:1 stops the deploy. There is no free colour choice, for the same reason there is no slider (decided 2026-09-15).
- **The choice is kept with the identity on the node** (decided 2026-09-15; `xor.ad/docs/chat_EN.md` §8.2, the `appearance_*` columns). When the identity moves to another device or is raised with the paper code, its appearance comes with it. The price is named: the node holds new data, and the privacy policy names it from the 2026-09-15 edition (§3, §5). Appearance is not given to other people and is used only for drawing. The node already knows the identity, so appearance creates no new link between people or devices.
- **A copy on the device** lets a locked tab and the first frame before the node answers draw in their own appearance instead of flashing the default. The node holds the main value: its answer overwrites the copy.
- **Before an identity** (the splash, screen 2) the choice made on this storefront's landing applies, or its default if there is none. At registration that choice becomes the new identity's appearance. A private window is always a new person (`00-mechanics_EN.md`), so the storefront default applies there.
- **"Start over"** closes the identity together with its appearance. The new identity takes the appearance currently on the device.
- **An accent not in this storefront's set** (the identity was moved from the other storefront) is drawn as the storefront default. The saved value does not change until the person chooses an accent themselves.
- **The house mark in the header cycles the accent** round the set — as on the landing (`xor.ad/docs/chat_EN.md` §11, decided 2026-09-15). The house mark and this screen are two controls for one value, and they must not drift apart.
- **There is no conflict between two devices by construction:** an identity lives on one device at a time (`00-mechanics_EN.md`).

## Terminal

The terminal client `depth` has its own appearance (decided 2026-09-15, `xor.ad/docs/depth-client_EN.md` §3 and §9).

- **The colours are the emulator's sixteen**, not the storefront palette. The emulator's theme sets the background and text, and nothing can guarantee contrast against an unknown background. The accent becomes an ANSI name: terracotta → red, crimson → bright red, amber → yellow, gold → bright yellow, teal → cyan, azure → blue, violet → magenta.
- **Contrast steps:** normal — colour; raised — colour and bold; maximum — no colour, with icons and words carrying the meaning.
- **`NO_COLOR`** switches on the maximum step and does not change the saved choice.
- **The theme is not chosen in the terminal** — the emulator sets it. The theme saved with the identity applies only on the web.
- **The choice is made with the `depth appearance` command** or the same item inside the client, and is kept with the same identity on the node.

## Open questions

- ~~Can one pick one's own colour~~ — **no: the accent comes from the storefront's set** (decided 2026-09-15), and every combination is checked before deploy.
- ~~Where the choice lives~~ — **with the identity on the node**, with a copy on the device (decided 2026-09-15).
- ~~What the house mark does~~ — **cycles the accent, as on the landing** (decided 2026-09-15).
- The shape of the swatches, their order on the screen and the look of the sample line — settled by the drawing (2026-09-15).
