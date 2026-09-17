# Screen 23 — A phrase full screen

## Purpose

One phrase, large, with two actions at hand: like and "hide". The screen was created on 2026-09-15 by the owner's decision. The July prototype had a viewer, but screens 01–22 did not use it, and its swipe was rejected along with the swipe on a card (screen 5). The swipe comes back here because the argument against it does not apply: this screen has no scrolling for a gesture to fight with.

## How one gets here

- **A tap on a phrase's text in the feed** (screen 3). The card's buttons — the like and "…" — work as before and do not open the viewer.
- It pages through **every card of the feed — neighbours' phrases and your own, offers and tables** — in feed order: newest on top, so the next one is older (the owner's decision of 2026-09-17; [retired] this said "the viewer also skips offers and tables"). Your own phrase still waiting for its check is skipped: on screen 9 it stands apart. **What is already liked is skipped too** — it is not in the feed, it lives on screen 25 "My likes", and that is where a like is taken back.
- The end of the loaded batch is the same "show more" button as under the feed (screen 3, 30 cards).
- Closing is a "close" button or `Esc`; the feed opens on the phrase that was viewed last.

## What is on the screen

- The phrase's text, large, and its mode (solo / company / crowd). **Someone else's phrase shows no remaining time as a number — decided 2026-09-15:** other people's spans are not given out (`xor.ad/docs/chat_EN.md` §8.11), so in the last 65 minutes the word **"disappearing soon"** stands instead of a number, together with the fade — a word, not fading alone (`xor.ad/docs/accessibility-and-i18n_EN.md`, rule 1). **Your own phrase keeps the number:** a person already sees their own span on screen 9. [retired] This said "remaining time — as a word and a number" for any phrase.
- **Two buttons: "like" and "hide".** Hiding is not blocking: the phrase leaves only your feed, the author learns nothing, and it can be brought back from the hidden list under "Me" (screen 5, screen 10).
- **"…" with the two loud actions** — block and report, as on the card (screen 5). They do not become quieter because "hide" has a button of its own.
- "Previous" and "next" buttons.
- **An offer in the viewer is the same card as in the feed (2026-09-17):** a venue's has "Save" and "…", a private author's has a like and "…" (screen 17). The private author's like makes the offer to talk at once, as on the card.
- **A table in the viewer is the table card (2026-09-17):** its name if it has one, the game, "playing N, watching M", the like count; "like" and "sit down" buttons, "…" with block and report (screen 19). Liking a table does not seat you: the table goes to "My likes" (screen 25).

## Gestures and keys

- **Swiping works only on a touch screen** (`pointer: coarse`, `00-mechanics_EN.md` §4): right is like, left is hide; after either, the next card (decided 2026-09-15). **The swipe acts only on a phrase; on an offer or a table it only pages (2026-09-17):** a private author's like makes the offer at once, and "sit down" stands you up from your previous table — a mis-gesture here is irreversible, so those actions stay on buttons. What is liked leaves the viewer as it leaves the feed; the like is taken back on screen 25. With a mouse or a keyboard the same results come from the buttons; the left and right arrow keys only page and do nothing to the phrase, so that a mistyped key does not hide a neighbour.
- **The first swipe does not act, it explains** (decided 2026-09-15): over the phrase — "right is like, left is hide; you can bring hidden ones back under Me", with a "got it" button. Until it is pressed there is no like and no hide, and the phrase stays where it is. The device remembers that it was understood (screen 24).
- **Hiding shows a "hidden · undo" line** for a few seconds, like "declined · undo" on a match (screen 6). A mis-swipe is undone with one tap, without going into settings.
- **A like without a live phrase of your own** does not act by button or by swipe: the same "to like, say something yourself" line and the jump to the composer as for the inactive like on a card (screen 5); the phrase stays where it is.
- **Your own phrase** also turns up in the viewer: it has no like and no "hide", it has its remaining time as a number and "take down" (screen 9).
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
- ~~Whether to skip offers and tables~~ — **no, every feed card is paged; the swipe on them only pages** (the owner's decision of 2026-09-17, above).
- How the offer and table cards lie in the viewer, large and with their buttons — settled by the drawing (2026-09-17).
