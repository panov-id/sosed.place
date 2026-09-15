# Screen 23 — A phrase full screen

## Purpose

One phrase, large, with two actions at hand: like and "hide". The screen was created on 2026-09-15 by the owner's decision. The July prototype had a viewer, but screens 01–22 did not use it, and its swipe was rejected along with the swipe on a card (screen 5). The swipe comes back here because the argument against it does not apply: this screen has no scrolling for a gesture to fight with.

## How one gets here

- **A tap on a phrase's text in the feed** (screen 3). The card's buttons — the like and "…" — work as before and do not open the viewer.
- It pages through **published phrases — neighbours' and your own** — in feed order: newest on top, so the next one is older. Your own phrase still waiting for its check is skipped: on screen 9 it stands apart. The viewer also skips offers and tables: a venue's offer has its own "Save" button, a private author's offer makes an offer to talk at once on a like, both have their own menu (screen 17), a table has "sit down" (screen 19). The price is named: paging to the end, a person does not see that an offer or a table stood between the phrases; they stay in the feed.
- The end of the loaded batch is the same "show more" button as under the feed (screen 3, 30 cards).
- Closing is a "close" button or `Esc`; the feed opens on the phrase that was viewed last.

## What is on the screen

- The phrase's text, large; its mode (solo / company / crowd) and remaining time — as a word and a number, not by fading alone (`xor.ad/docs/accessibility-and-i18n_EN.md`, rule 1).
- **Two buttons: "like" and "hide".** Hiding is not blocking: the phrase leaves only your feed, the author learns nothing, and it can be brought back from the hidden list under "Me" (screen 5, screen 10).
- **"…" with the two loud actions** — block and report, as on the card (screen 5). They do not become quieter because "hide" has a button of its own.
- "Previous" and "next" buttons.

## Gestures and keys

- **Swiping works only on a touch screen** (`pointer: coarse`, `00-mechanics_EN.md` §4): right is like, left is hide; after either, the next phrase (decided 2026-09-15). On a phrase already liked, a swipe right only pages; taking the like back is a second tap on the button (screen 5). With a mouse or a keyboard the same results come from the buttons; the left and right arrow keys only page and do nothing to the phrase, so that a mistyped key does not hide a neighbour.
- **The first swipe does not act, it explains** (decided 2026-09-15): over the phrase — "right is like, left is hide; you can bring hidden ones back under Me", with a "got it" button. Until it is pressed there is no like and no hide, and the phrase stays where it is. The device remembers that it was understood (screen 24).
- **Hiding shows a "hidden · undo" line** for a few seconds, like "declined · undo" on a match (screen 6). A mis-swipe is undone with one tap, without going into settings.
- **A like without a live phrase of your own** does not act by button or by swipe: the same "to like, say something yourself" line and the jump to the composer as for the inactive like on a card (screen 5); the phrase stays where it is.
- **Your own phrase** also turns up in the viewer: it has no like and no "hide", it has its remaining time and "take down" (screen 9).
- **With `prefers-reduced-motion`** the phrase does not fly off sideways: it changes without movement.

## Logic

- **This screen's edge states and their texts — screen 11** (`11-empty-and-edge-states_EN.md`): a phrase expired while open, the feed ran out, no connection.
- **A phrase that expires, or is taken down by its author or by moderation, while open** fades as in the feed and gives way to the next one by itself with the screen 11 line "The phrase has ended". Expiry does not ask the viewer's permission.
- **You blocked the author from "…"** — their phrases leave the viewer, and the next phrase from someone else opens.
- **The like and the hide are the same as on the card**, with the same rules and the same trace: the node does not know whether a phrase was opened full screen. How long a person looked at a phrase is written nowhere — that would be exactly the attention signal the feed refused (screen 3, "no ranking").
- **On a wide screen** (screen 3, "Wide screen") the viewer opens in the feed column, and the conversations beside it stay in place.
- The table you sit at is still reachable by the line in the feed header; the viewer does not hide it.

## Open questions

- ~~Should there be a full-screen view~~ — **yes, with like and "hide"** (decided 2026-09-15).
- ~~What a swipe does~~ — **right like, left hide, touch screens only, the first swipe explains** (decided 2026-09-15).
- The text size, where the buttons sit and how the "hidden · undo" line looks — settled by the drawing (2026-09-15).
