# Screen 11 — Empty and Edge States

> This was screen 13 until 2026-08-27. Number 13 was held by two screens at once — this one and moving the identity — while eleven stood empty: screen 11 was dropped along with moving the paper code to registration, screen 12 along with the social link field. Referring to "screen 13" had become ambiguous, and numbering exists precisely for references.

## Purpose

Interface states for missing data or reached limits, rather than the normal usage flow.

**Every edge state of the product is gathered here — decided 2026-08-29.** There used to be four, while those added over the week lived each on its own screen. The price of gathering them is named: some states are described here and where they happen — so here the line is short and carries a pointer, and the mechanic lives on its own screen. Empty screens are the ones most often left undrawn, and a place where they are all visible at once is worth that price.

## States

- **Quota exhausted.** All four slots hold live phrases (`00-mechanics_EN.md` §3). Posting is unavailable until one expires or is taken down by hand on screen 9.
- **Four already said this hour (added 2026-09-14).** A slot is free, but the ceiling of four publications per sliding hour holds (`00-mechanics_EN.md` §3). The line names when the next one is possible: the time is counted from one's own publications, and nobody else's can be read from it. Until this edit the limit had neither a state nor a text, and a refusal next to "1 of 4 free" looked like a fault.
- **The first phrase is waiting on its name.** Until the queue accepts the name, the phrase has not reached the feed and a second cannot be sent. A state of its own, separate from an exhausted quota: no slot is taken, but the button is inactive (edit of 2026-08-26).
- **No one nearby.** No live phrases within the selected radius (screen 3). The screen does not leave the person in a void: a line says it is quiet nearby and offers to widen the circle — **with the step of how many phrases would then appear**: "a few", "about a dozen", "dozens" (settled 2026-08-26, the steps are in `00-mechanics_EN.md` §4). There is no exact number here for the same reason there is none on the handle itself: a counter tied to a radius is a measuring instrument, and an exact figure lets one work out the ring holding a single particular phrase. **The circle does grow by itself — corrected 2026-09-10.** This used to read "the circle does not grow by itself: otherwise a person sees people ten kilometres away and takes them for neighbours", while the canon (`xor.ad/docs/chat_EN.md` §8.3; edited 2026-09-14: this pointed at §8.4) has always widened the radius in steps up to 25 km on an empty result — two documents promising different things, and the first to meet that was somebody in a small town. The canon's argument is the stronger one: an empty screen says nothing — broken, nobody around, or the person narrowed their own feed, and there is no telling which. The screen's argument survives in that **every such card is marked "further than you asked"** and the radius setting itself does not change: nobody is taken for a neighbour, because the person is told. The button with the step stays — it is for whoever wants wider by choice rather than by emptiness.
- **A first visit with no phrase of your own (added 2026-08-29).** The feed is full but liking is impossible: a match counts only while both sides have a live phrase. This is a state of its own because until now it lived as a single dimmed icon on a card — a person saw an inactive button and did not understand that the product was waiting for their first word. A line explains it and leads to the composer (screen 4; edited 2026-09-14: this said "screen 5").
- **The queue has stalled (added 2026-08-29).** Moderation is answering more slowly than usual, or not at all. The phrase stays dimmed for its author and a second one cannot be sent — the same as waiting for a name, but the reason differs and so must the wording: not "checking" but "the check is taking longer". After **60 seconds** "checking…" becomes "taking longer than usual" — decided 2026-09-08, the number lives in `xor.ad/docs/facts/limits.tsv` (`refusal.checking.longer`). There is no refusal: the phrase stays in the queue and goes out when the queue clears (`xor.ad/docs/refusal-wordings_EN.md`).
- **A support answer is waiting (added 2026-08-29).** A mark on the "Support" item under "Me" and on "Me" itself (place decided 2026-09-14) rather than in the inbox: the platform's voice does not mix with conversations between people (screen 14).
- **No network (added 2026-09-02).** A line of its own rather than a mention
  inside the neighbouring state: the person has no connection, and it is fixed
  on their side — flight mode, a tunnel, data run out. The tone differs from the
  one below accordingly: not "we could not do it". What was typed is kept, the
  feed shows the last thing it managed to receive, and says that it is stale.
- **Waiting for the first answer (added 2026-09-02).** Neither emptiness nor an
  error: the request went out, the answer has not arrived. A skeleton of cards
  instead of an empty screen — otherwise a first visit to a quiet
  neighbourhood is indistinguishable from an app that does not work, and those
  are exactly the two seconds in which a person decides whether the product
  keeps its place on the phone.
- **You missed a message (added 2026-09-14).** The node's conversation is newer than the history on the device, and there is nothing to restore the text from (`xor.ad/docs/chat_EN.md` §8.12). A line in the conversation: "you missed a message — ask them to send it again". There is no button that signals the other person: asking works with an ordinary reply (screen 8).
- **The node is unreachable (added 2026-08-29).** Separate from "no network": there the person has no connection, here we are not answering. The difference is not cosmetic — in the second case it is our fault, and the tone differs: "we could not do it", not "there is no connection". What was typed is kept either way.
- **The tenth PIN mistake (added 2026-09-14).** Access on this device is locked until the paper code, the node's share kept (screen 12; decided 2026-09-14, this said "the share is burned, the correspondence erased for good" [retired]). After the code the old PIN opens the history again; if the PIN is forgotten, a new one is set and this device's history is lost; until the code the session is frozen: live phrases are taken down, table seats freed, and only recovery and one support request a day work; while the node is under attack, code entry is closed (refined 2026-09-14 after the review panel; this said "the person sets a new PIN, the node issues a new share" [retired]). Until now this state existed neither here nor on screen 12 — only the warning before it.
- **Locked, with no connection (added 2026-09-14).** The PIN is checked against the node (`xor.ad/docs/chat_EN.md` §8.2), so the tab cannot be unlocked offline. The line says exactly that rather than "wrong PIN": otherwise a network failure would count against the ten attempts in the person's head.
- **A moderation refusal** — the phrase did not pass, the class of reason is named, the text stays at hand (screen 4, wordings in `xor.ad/docs/refusal-wordings_EN.md`).
- **A published phrase of yours was restricted** — the Article 17 statement of reasons is shown in the app at the next sign-in, because the author usually has no email (screen 9; added 2026-09-04).
- **The fifth refusal within an hour** — for fifteen minutes nothing goes to checking: phrases, table lines, a name change, an offer like; each further refusal in the same hour — another pause (edited 2026-09-14: this said "in a row" [retired], and a successful phrase does not reset the count, `00-mechanics_EN.md` §3); the feed, likes on phrases and conversations keep working, and the refusal says so.
- **A conversation ended for the other person** — a gravestone on the open screen; in the list the row is marked when you open the conversation or try to write, not at once (screen 7, the 2026-09-10 rule; edited 2026-09-14: this said "a marked row in the list" [retired]).
- **The other person stepped away** — a label saying "away" above a live input field, with no span; lifted by their first message (screen 8; edited 2026-09-14: this said "a line instead of the input field" [retired]).
- **The identity moved to another device** — the node closed the socket with `4002`, the conversation closes, reconnecting is pointless (screen 8; added 2026-09-04).
- **The app is out of date** — the node does not support this version, code `4004`, no reconnection is attempted (screen 8; added 2026-09-04).
- **An application is waiting (added 2026-09-10).** Somebody applied for the next game at a table and is waiting (screen 19). Neither emptiness nor a refusal: the players decide by the start of the next game. While waiting they are a spectator — they see the board and talk in the chat.
- **You were not taken into the game (added 2026-09-10).** The refusal came with an explanation, and it stands as an ordinary line in the table's conversation, because an application and a refusal are ordinary lines there. There is no separate screen; the state is that the person stays a spectator and may apply again.
- **A line or an application at a table did not pass (added 2026-09-14).** The moderation queue refused it, the class of reason is named, the text stays in the field. No application was made — otherwise the person would wait for an answer to something that does not exist.
- **You did not confirm in time (added 2026-09-10).** The 30 seconds for confirming the line-up ran out and the person became a spectator (`table.confirm.window`). The line is required: without it they come back to the board and find themselves out of the game for no reason at all — and there was a reason, namely that they were not there.
- **The move timed out — a pass was recorded (added 2026-09-14).** The move window ran out and the engine passed on the person's behalf (`table.move.window`, screen 19). The line stands by the board, not only in the console: the console is opened by someone already looking for something, and here the person does not yet know what to look for.
- **Three passes — you are watching now (added 2026-09-14).** A third pass in a row made the person a spectator (`table.pass.limit`). A line and a "Watch" button; an application for the next game can be made once a place frees up. Shown **only to the person themselves** — nobody else is told separately.
- **A report moves into a notice of illegal content (added 2026-09-14).** Support cannot take such a text, so the app opens the Article 16 form with it already in the field (screen 14). A line above the form: "this looks like a report of something illegal — your text is here, confirm and send", and under it "without an email the decision will not reach you" (added 2026-09-14 after the review panel: screen 14 promises an answer in the app, while the decision on a notice goes by email only). A report moved silently looks like one that went missing.
- **Your own table with nobody sitting at it (added 2026-09-10).** An empty table does not reach the selection and goes out on silence; only its author sees it, in the list of their own (screen 9). The line explains why it is not in the feed — otherwise the author reads it as a fault.
- **A table outside your bands** — there is no state and there will not be: someone outside the bands is not shown the table at all, because a greyed-out card would itself report who is sitting where (screen 19).
- **Geolocation does not exist as a state — edit of 2026-08-28.** Permission is never requested, so "no access" is not an edge case but the norm: the point is worked out from the time zone, the address and the language, labelled as approximate, the circle is wider, and everything is refined by hand on the diagram (`00-mechanics_EN.md` §4).

- **A document changed while the person was away — state added 2026-08-29.**
  The feed reads as usual; at the first attempt to publish or open a chat the
  node answers `legal_reacceptance_required` (`xor.ad/docs/protocol_EN.md` §6),
  and the person lands on a screen listing the documents that changed, with one
  checkbox. Reading is left alone **deliberately**: someone who came to read a
  reply should get the reply, not a legal text. The guidelines never come here —
  their new revision is recorded silently (screen 15).

## Wordings

**Written 2026-09-03, before the drawing — and that is a decision.** A mockup
with "Lorem ipsum" lies about the layout: a long line breaks it exactly where
nobody expected, a short one leaves a hole. Below is what a person reads; the
look stays open.

One voice for all of them: say what happened and what to do next. No apologising
twice, no explaining how the system is built, no "oops".

| State | Heading | Line under it | Action |
|---|---|---|---|
| Quota spent | That is all for now | Your four phrases are still alive. The next slot frees at HH:MM. | My messages |
| Four already said this hour | Enough for now | Four phrases already said this hour. The next one can go at HH:MM. | — |
| Tab locked | Enter your PIN | Six digits and you are back. | — |
| Locked, fewer than four attempts left | Enter your PIN | 3 attempts left. After that this device is locked until the paper code. | — |
| Waiting before a PIN attempt | Wait a moment | The next attempt is in N seconds or minutes, beyond an hour at HH:MM. The wait grows after the fifth mistake; if you did not cause it, someone else is using your session. | Enter the paper code |
| The tenth PIN mistake | Access locked | Ten wrong PINs — access on this device is locked until the paper code. The correspondence is intact: after the code it opens with the old PIN. | Enter the code · Write to support |
| Locked, no connection | No connection | The PIN is checked on our side, and there is no connection. Unlocking will work once the network is back. | Retry |
| First phrase waiting for a name | Looking at your name | Once the name is accepted, the phrase goes out to the neighbours. | — |
| Nobody nearby | Quiet around here | Nobody in your circle is talking right now. A wider circle, more voices. | Widen the circle |
| First visit with no phrase of your own | Say something first | A like opens a conversation only when both of you have a live phrase. | Write one |
| The queue is stuck | The check is running late | The phrase is not lost, it is waiting its turn. | — |
| A support reply is waiting | You have a reply | The reply is under "Me" → "Support". | Open |
| No network | No connection | The internet seems to be gone. What you typed is here, the feed is what made it through. | Retry |
| Waiting for the first answer | — | (a skeleton of cards, no text) | — |
| The node is unreachable | This one is on us | We are not answering — that is our side. What you typed is here. | Retry |
| Moderation refusal | This will not go out | *(the class of reason — `xor.ad/docs/refusal-wordings_EN.md`)* | Edit |
| Fifth refusal within an hour | Fifteen minutes off | The feed, likes on phrases and conversations all work — phrases, table lines, name changes and offer likes are paused. Another refusal this hour — another 15 minutes. | — |
| The conversation ended for the other person | The conversation ended | There is nothing here any more. | Close |
| The other person stepped away | Stepped away | — | — |
| The identity moved to another device | Your identity is not here any more | The identity was brought up on another device. It no longer works here, and the correspondence on this device will not open again. If it was not you, you have your paper code. | Enter the code |
| The app is out of date | Time to update | This version no longer talks to the node. Reload the page and everything is where you left it. | Reload |
| A published phrase was restricted | Your phrase was hidden | What happened, why, who decided and what to do next — all of it here. | Read |
| An application is waiting | Waiting for an answer | The players will decide by the start of the next game. Watch and talk meanwhile. | — |
| You were not taken into the game | Not taken in | The reason is in the table's conversation. You can apply again. | To the table |
| A line at the table did not pass | This will not go out | *(the class of reason)* No application was made, the text is still here. | Edit |
| You did not confirm in time | You are watching now | The confirmation waited 30 seconds. There are no seats in this game — you can apply for the next one. | Watch |
| The move timed out | A pass was recorded | Five minutes went by without a move, and a pass was made for you. | — |
| Three passes | You are watching now | Three moves went by without you. You can apply once a seat frees up. | Watch |
| A report is being moved | This looks like something illegal | Your text is now in the notice form. Confirm and send. Without an email the decision will not reach you. | Review and send |
| Your own table with nobody at it | Nobody at the table | An empty table is not shown in the feed. Sit down at it and it will be seen again — you will have to stand up from your current table. | Sit down |
| A document changed | Something changed | Read what is different and accept it — writing does not work until you do. | Read |

Three lines are deliberately empty. "Stepped away" has no second line because we
do not know when they are back and will not invent it. "Waiting for the first
answer" has no text at all: the skeleton already says a load is running, and a
caption under it turns a second of waiting into an event. The moderation refusal
has a shared heading, while the reason arrives from the node — one per class.

## Open questions

- ~~Exact copy for each state~~ — **written 2026-09-03, the "Wordings" section above**. What stays open is the **visual**: how these lines sit on the screen, with or without an icon, where the action goes.
- ~~Whether the quota recovers over time~~ — **there are two counts and they differ** (decided 2026-08-29). A slot frees **only** when a phrase disappears: it expired or was taken down. The "four per hour" ceiling is a sliding window and releases by itself. So a person can see a free slot and still be refused, and the other way round; a refusal must name which of the two is holding them (`xor.ad/docs/refusal-wordings_EN.md`).
- ~~Behaviour when geolocation access is denied~~ — settled 2026-08-26 (above).
