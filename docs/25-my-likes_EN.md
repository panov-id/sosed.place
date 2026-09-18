# Screen 25 — My likes

## Purpose

Everything a person liked in the feed that is still alive: neighbours' phrases, private authors' offers and tables — as feed cards, as on screen 3. The screen was created on 2026-09-17 by the owner's decision together with the rule "what is liked is not in the feed" (`00-mechanics_EN.md` §11): a like takes the card out of the feed, and without this screen there would be nowhere to take a like back. The way in is the "My likes" item on the "Me" screen (screen 10).

## What is on the screen

- **The liked cards, newest on top** — in the order of liking, not of the feed. The shape is the feed's: a phrase has its text, mode and like count; a table has its name, the game, "playing N, watching M" and a like count; a private author's offer has its discount and term (screen 17).
- **On every card the like is filled in**, and a tap on it takes the like back: the card leaves here and returns to the feed (screen 5). A "taken back · undo" line for a few seconds, like "hidden · undo".
- **A phrase that an offer to talk has come of** stands here already as the offer's card: its like cannot be taken back (it is spent, `00-mechanics_EN.md` §11), the button leads to screen 6.
- **A private author's offer** always lies here as an offer to talk: its match is one-sided and is made by the like at once (screen 17).
- **A table has a "sit down" button** (screen 19): the like does not seat you, sitting down happens from here. One table at a time, and the button warns that it will stand you up from the current one.
- A tap on the text opens the card full screen (screen 23); only the liked ones are paged here.
- The list comes from the node (`GET /likes`, `xor.ad/docs/protocol_EN.md` §4.3) in pages of 30, then "show more", as in the feed.

## What leaves by itself

- **A phrase expired or was taken down by its author** — the card disappears, as in the feed: someone else's span is not given out, there is no number here, in the last 65 minutes — "disappearing soon" (screen 23).
- **A table closed** — the card disappears; the table you sit at is visible here too while it lives.
- **The author is blocked** — their phrases leave here along with the feed (screen 5).
- **Your own step-away also removes the likes you gave** — on phrases and tables — along with your phrases (the owner's decision of 2026-09-18, screen 20): coming back, a person finds this empty.

## Logic

- **This screen's edge states and their texts — screen 11** (`11-empty-and-edge-states_EN.md`): empty — "Nothing liked"; connection, freeze, pause, step-away, changed documents — the shared lines.
- **While the list is being gathered — a skeleton of cards without a caption**, as in the feed (screen 11, "Waiting for the first answer").
- **The node knows the likes, and the list lives there**, not on the device: after an identity transfer (screen 13) it is the same. Who liked someone's phrase is still not told to the author — here one sees only one's own.
- **Taking a like back frees nothing**: likes have no quota. The rate limit is the shared one per identity (`xor.ad/docs/chat_EN.md` §8.4).
- **On a wide screen** (screen 3, "Wide screen") it opens in the feed column, with a "to the feed" button.

## Open questions

- ~~Where the list of the liked lives~~ — **a separate screen, entered from "Me"** (the owner's decision of 2026-09-17).
- ~~Locally or at the node~~ — **at the node: `GET /likes`** (2026-09-17).
- The look of the offer card among feed cards and the "taken back · undo" line — settled by the drawing (2026-09-17).
