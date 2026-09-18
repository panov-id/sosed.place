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
- **The queue has stalled (added 2026-08-29).** Moderation is answering more slowly than usual, or not at all. The phrase stays dimmed for its author and a second one cannot be sent — the same as waiting for a name, but the reason differs and so must the wording: not "checking" but "the check is taking longer". After **60 seconds** "checking…" becomes "taking longer than usual" — decided 2026-09-08, the number lives in `xor.ad/docs/facts/limits.tsv` (`refusal.checking.longer`). **A phrase waits no longer than 10 minutes for its verdict — decided 2026-09-15:** after that comes the "The check did not happen" state (below). [retired] This said "there is no refusal: the phrase stays in the queue and goes out when the queue clears" — with no limit a slot was held for hours, and the canon requires the limit as a number (`xor.ad/docs/chat_EN.md` §8.3, `xor.ad/docs/refusal-wordings_EN.md`).
- **The check did not happen (added 2026-09-15).** Ten minutes without a verdict, and the text goes back to its author: "the check did not happen, your text is saved — send it again". The slot is free, and this does not count towards the pause: the phrase was not refused, it was not checked (`xor.ad/docs/chat_EN.md` §8.3).
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
  keeps its place on the phone. **The skeleton rule is shared (added 2026-09-15 from the screen-state matrix):** the "Conversations" list (screen 7), "My messages" (screen 9), the share exchange on step 2 (screen 2), the time between entering the PIN and the verdict (screen 12) and sitting down at a table (screen 19) show a skeleton, as the feed and the conversation do, with no caption; the button that started the action stays unavailable until the answer.
- **You missed a message (added 2026-09-14).** The node's conversation is newer than the history on the device, and there is nothing to restore the text from (`xor.ad/docs/chat_EN.md` §8.12). A line in the conversation: "you missed a message — ask them to send it again". There is no button that signals the other person: asking works with an ordinary reply (screen 8).
- **The node is unreachable (added 2026-08-29).** Separate from "no network": there the person has no connection, here we are not answering. The difference is not cosmetic — in the second case it is our fault, and the tone differs: "we could not do it", not "there is no connection". What was typed is kept either way. **How the app tells them apart — added 2026-09-15:** "no network" — the request ended in a network error or a timeout, and a probe of an outside address fails too; "we could not do it" — the node answered 5xx, 503 included, or a network error while the probe passes. **Screens 2, 12, 13, 19, 20, 21 and 22 get a state and a wording of their own** (added 2026-09-15 from the screen-state matrix): where a screen had its own "no connection" line, its own "this one is on us" stands beside it — below in the list and in "Wordings".
- **The tenth PIN mistake (added 2026-09-14).** Access on this device is locked until the paper code, the node's share kept (screen 12; decided 2026-09-14, this said "the share is burned, the correspondence erased for good" [retired]). After the code the old PIN opens the history again; if the PIN is forgotten, a new one is set and this device's history is lost; until the code the session is frozen: live phrases are taken down, table seats freed, and only recovery and one support request a day work; while the node is under attack, code entry is closed (refined 2026-09-14 after the review panel; this said "the person sets a new PIN, the node issues a new share" [retired]). Until now this state existed neither here nor on screen 12 — only the warning before it.
- **The tab is locked (listed since 2026-09-15; the wording stood since 2026-09-14).** After five minutes idle the PIN locks the tab (`pin.lock.idle`, screen 12): the feed, conversations and "My notices" are hidden until it is entered, nothing is sent while locked, new messages are not read and no socket is held (the keys stay wrapped until the PIN, screen 12; 2026-09-15). **At a table the lock does not stop the move window** (added 2026-09-15 from the screen-state matrix): the five minutes for a move run on behind the lock, and the lock shows one line, "your move at the table" — no board and no table lines (screens 12 and 19). A locked tab holds no socket, so the line stands if the move was yours at the moment of locking; a move that reaches you afterwards it does not know about.
- **Fewer than four attempts, and the wait before an attempt (listed since 2026-09-15).** From the seventh attempt the counter says how many are left; from the sixth the node holds a growing wait — 30 seconds, 2 minutes, 10 minutes, an hour, 4 hours — and a correct PIN is not accepted during the wait either (screen 12).
- **Locked, with no connection (added 2026-09-14).** The PIN is checked against the node (`xor.ad/docs/chat_EN.md` §8.2), so the tab cannot be unlocked offline. The line says exactly that rather than "wrong PIN": otherwise a network failure would count against the ten attempts in the person's head.
- **The move code did not match or expired (added 2026-09-15; merged into one state 2026-09-15 after the review panel).** The invite is single-use and lives two minutes; the previous device's silence puts it out too (screen 13). The node cannot tell a typo from an expired code: a wrong entry yields a different `lookup_id`, and no invite is found by it. So there is one line — "the code did not match or has expired" — and it says the previous device shows a new code, otherwise the person types the same code again. [retired] There was a second state here, "the code burned" after five wrong entries — an attempt counter on an invite cannot be built.
- **The move was cancelled (added 2026-09-15).** The same code was entered on two devices, and the node cancelled the move on both (screen 13): the identity stayed on the previous device. The line stands on both and says the move starts again, with a new code.
- **The paper code did not match (added 2026-09-15).** A mistake in any character finds no identity; the person has no attempt counter, the node counts the misses — per address and in total (`xor.ad/docs/chat_EN.md` §8.2). The line asks to check the groups and does not say whether such an identity exists.
- **Paper code entry is closed (added 2026-09-15; how the client learns it — the error form, `xor.ad/docs/protocol_EN.md` §8, item 1).** The node is under a guessing attack, and code entry is closed for everyone, with no span (screen 12, `xor.ad/docs/protocol_EN.md` §8, item 7). The line says the identity is intact and that it is worth trying later — and names no time, because there is none.
- **The PIN cannot be changed offline (added 2026-09-15).** A new PIN takes a new share from the node (screen 12); the old PIN keeps working.
- **This device was not used for a year (added 2026-09-15; how the client learns it — the error form, `xor.ad/docs/protocol_EN.md` §8, item 1).** The session was swept together with its vault share (screen 12): the paper code signs in, and this device's correspondence will not open again.
- **A moderation refusal** — the phrase did not pass, the class of reason is named, the text stays at hand (screen 4, wordings in `xor.ad/docs/refusal-wordings_EN.md`).
- **A published phrase of yours was restricted** — the Article 17 statement of reasons is shown in the app at the next sign-in, because the author usually has no email (screen 9; added 2026-09-04).
- **The fifth refusal within an hour** — for fifteen minutes nothing goes to checking: phrases, table lines, a name change, an offer like while the name is not accepted, a hangman word; each further refusal in the same hour — another pause (edited 2026-09-14: this said "in a row" [retired], and a successful phrase does not reset the count, `00-mechanics_EN.md` §3); the feed, likes on phrases and conversations keep working, and the refusal says so.
- **A hold (listed since 2026-09-15; the wording stood since 2026-09-14).** Something of one's own is already being checked — a line, an application, a phrase, a name or a hangman word — and together with the refusals within the hour it makes five or more: a new send waits a few seconds for the verdicts. It is not a pause: there is no span, a verdict releases it (`xor.ad/docs/chat_EN.md` §8.3, `xor.ad/docs/refusal-wordings_EN.md` §4).
- **A conversation ended for the other person** — a gravestone on the open screen; in the list the row is marked when you open the conversation or try to write, not at once (screen 7, the 2026-09-10 rule; edited 2026-09-14: this said "a marked row in the list" [retired]).
- **The other person stepped away** — a label saying "away" above a live input field, with no span; lifted by their first message or move (screen 8; edited 2026-09-14: this said "a line instead of the input field" [retired]).
- **The identity moved to another device** — the node closed the socket with `4002`, the conversation closes, reconnecting is pointless (screen 8; added 2026-09-04). **Not only in a conversation — added 2026-09-15:** the previous device goes still at once (screen 13), its signature is accepted nowhere, and any screen shows this same state at its first request to the node — the feed, the composer, "Conversations", "Me". **Only on a move** (clarified 2026-09-15 after the review panel): a session locked by the tenth PIN mistake shows "Access locked", a closed identity "The identity is closed"; the client tells the cause apart by an error form that is still open (`xor.ad/docs/protocol_EN.md` §8, item 1).
- **The identity is closed (added 2026-09-15).** On another tab or device the identity was closed with "start over" (screen 12): the session is frozen, and there is nothing to bring this identity back with (`xor.ad/docs/chat_EN.md` §8.2). The line does not offer the paper code — it opens nothing any more.
- **The app is out of date** — the node does not support this version, code `4004`, no reconnection is attempted (screen 8; added 2026-09-04). **Not only in a conversation — one state on every screen** (added 2026-09-15 from the screen-state matrix): any refusal by the node on version grounds — in the feed, the composer, "Conversations", "Me", on any request, not only on the conversation socket — shows this same state with the same wording.
- **An application is waiting (added 2026-09-10).** Somebody applied for the next game at a table and is waiting (screen 19). Neither emptiness nor a refusal: the players decide by the start of the next game. While waiting they are a spectator — they see the board and talk in the chat.
- **You were not taken into the game (added 2026-09-10).** The refusal came with an explanation, and it stands as an ordinary line in the table's conversation, because an application and a refusal are ordinary lines there. There is no separate screen; the state is that the person stays a spectator and may apply again.
- **A line or an application at a table did not pass (added 2026-09-14).** The moderation queue refused it, the class of reason is named, the text stays in the field. No application was made — otherwise the person would wait for an answer to something that does not exist.
- **You did not confirm in time (added 2026-09-10).** The 30 seconds for confirming the line-up ran out and the person became a spectator (`table.confirm.window`). The line is required: without it they come back to the board and find themselves out of the game for no reason at all — and there was a reason, namely that they were not there.
- **The move timed out — a pass was recorded (added 2026-09-14).** The move window ran out and the engine passed on the person's behalf (`table.move.window`, screen 19). The line stands by the board, not only in the console: the console is opened by someone already looking for something, and here the person does not yet know what to look for.
- **Three passes — you are watching now (added 2026-09-14).** A third pass in a row made the person a spectator (`table.pass.limit`). A line and a "Watch" button; an application for the next game can be made once a place frees up. Shown **only to the person themselves** — nobody else is told separately.
- **A report moves into a notice of illegal content (added 2026-09-14).** Support cannot take such a text, so the app opens the Article 16 form with it already in the field (screen 14). A line above the form: "this looks like a report of something illegal — your text is here, confirm and send", and under it "the decision will appear under \"Me\" → \"My notices\"; clear your browser data and you will not see it — leave an email" (edited 2026-09-15: a receipt on the device, `xor.ad/docs/dsa/SPEC_EN.md` §6; [retired] this said "without an email the decision will not reach you" while the decision on a notice went by email only). A report moved silently looks like one that went missing.
- **You were asked to leave the table (added 2026-09-15).** Two of three said "enough" (screen 19). The line does not name who voted and does not lock anyone out: leaving is shown the door, not barred, and one can sit down again if the table is visible.
- **The table is gone (added 2026-09-15).** The table went out on silence while the person was looking at it (screen 19). The line stands by the board, not only in the console (screen 21): otherwise the person writes into nothing.
- **A game for two ended (added 2026-09-15).** The other person stepped away, and for two, one leaving ends the game (screens 18 and 20). The board is gone; the conversation, if alive, goes on.
- **That move is not allowed (added 2026-09-15).** The engine stopped a move the game's rules do not let through (screen 18). The move is not counted and the turn has not passed.
- **A decision on your notice (added 2026-09-15).** The device asked by the receipt, and there is a decision (`xor.ad/docs/dsa/SPEC_EN.md` §6): a dot on "Me" → "My notices", the decision's text only after a tap.
- **An offer's link is switched off (added 2026-09-15).** After reports the link of this offer no longer opens; the offer itself is live (screen 17). A line stands in place of the jump rather than silence.
- **Your own table closed (was "your own table with nobody sitting at it", 2026-09-10; rewritten 2026-09-18 by the owner's decision).** A table closes when the last one stands up — there is no empty table of one's own; the line says the table is closed and can be set again — otherwise the author looks for it in the list.
- **Nothing in "Offers" (added 2026-09-15).** Nobody is waiting for your answer. The line says where offers come from and invites nowhere: an offer cannot be summoned, only received (screen 7).
- **Nothing in "Conversations" (added 2026-09-15).** Not a single open conversation; the line says how one opens and leads to the feed (screen 7).
- **Nothing in "My messages" (added 2026-09-15).** No live phrases — there were none, or stepping away took them down (screens 9 and 20). The line names the free slots and leads to the composer.
- **No support requests (added 2026-09-15).** The list is empty: nothing written yet, or a year has passed (screen 14). The input field is still there.
- **A table outside your bands** — there is no state and there will not be: someone outside the bands is not shown the table at all, because a greyed-out card would itself report who is sitting where (screen 19).
- **Registration step 2 with no connection (added 2026-09-15).** The share exchange with the node comes before the code is shown (screen 2): with no connection no code is shown, and the name, age and PIN stay on the screen. An unfinished row on the node, if it had time to appear, is swept after an hour, as on a drop.
- **The match waits for your name (added 2026-09-15).** While your name stands rejected, the match does not open (screen 6). Only the person whose name failed sees the line; the other side is told nothing — otherwise a rejected name would become visible to a stranger.
- **An offer vanished before your eyes (added 2026-09-15).** The offer went while the match card was open (screen 6): a phrase expired, the other person stepped away or took theirs down — the cause is not named, as everywhere a match burns out (`00-mechanics_EN.md`, "Matches burn out"; corrected 2026-09-15 after the review panel: this said "one of the two phrases expired" [retired] — on a step-away, a phrase taken down or moderation it would have named a false cause). A line in place of the card, not emptiness.
- **A refusal by rate from the address (added 2026-09-15).** The node's per-address limit stands beside the identity's limits (screen 4); on a shared network someone else's sending can hit it. The line names no span: the screen does not describe one, and inventing it is not allowed. **Nor the address** (clarified 2026-09-15 after the review panel): "from this address" would tell the person that someone on their network is posting right now.
- **Checking editions with no connection (added 2026-09-15).** Until `/legal-manifest.json` arrives, the "changed since" mark on screen 15 is neither set nor cleared; the screen shows no error — the documents read from what is already there.
- **"Step away" with no connection (added 2026-09-15).** Stepping away deletes phrases on the node (screen 20), so with no connection it does not happen: the step-away screen shows "No connection", and the chosen span stays.
- **The console is empty (added 2026-09-15).** Nothing has happened yet; the line says events will appear here (screen 21).
- **A move with no connection (added 2026-09-15).** The move code appears after an exchange with the node (screen 13): with no connection no code is shown and the previous device confirms nothing — the identity stays here.
- **The connection dropped at a table (added 2026-09-15).** The node holds the seat, not the tab: the move window runs on without a connection, after five minutes a pass is recorded, after three passes — a spectator (screen 19). A "No connection" line stands by the board and says the move time is running.
- **The current paper code did not match on reissue (added 2026-09-15).** Reissuing only on presenting the current code (screen 12): it did not match — no new one is issued, and the current one stays valid.
- **Appearance with no connection (added 2026-09-15).** The choice applies on the device at once and is saved with the identity by the first request once the connection is back (screen 22). This is not sending a message: there is nothing to lose and nothing to retry by hand.
- **A phrase ended in the viewer (added 2026-09-15).** The phrase expired or was taken down while open full screen (screen 23): it gives way to the next one with a line rather than vanishing silently.
- **The viewer reached the end of the batch (added 2026-09-15).** Next is "show more", as under the feed (screen 3); if there is nothing more, the line leads back to the feed.
- **Registration step 2: this one is on us (added 2026-09-15 from the screen-state matrix).** The share exchange ended in a 5xx answer or a network error while the probe passes (how they are told apart — "The node is unreachable" above): no code is shown, the name, age and PIN stay on the screen, as with no connection, but the line blames us rather than the person's network (screen 2).
- **Unlocking or changing the PIN: this one is on us (added 2026-09-15 from the screen-state matrix).** The PIN is checked against the node, and the node did not answer: the tab stays locked, and the old PIN keeps working. The line says it is not a wrong PIN — otherwise our failure would count against the ten attempts in the person's head (screen 12).
- **A move: this one is on us (added 2026-09-15 from the screen-state matrix).** No move code was issued because we did not answer; the previous device confirms nothing, and the identity stays here (screen 13).
- **A table: this one is on us (added 2026-09-15 from the screen-state matrix).** The move window runs on when the node is not answering too: after five minutes a pass is recorded, after three passes — a spectator (screen 19). A "This one is on us" line stands by the board and says the move time is running. The price is named: a pass for our failure falls on the person.
- **"Step away": this one is on us (added 2026-09-15 from the screen-state matrix).** Stepping away deletes phrases on the node (screen 20), so while we are not answering it does not happen: the step-away screen shows "This one is on us", and the chosen span stays.
- **The console: we did not answer (added 2026-09-15 from the screen-state matrix).** The console has its own line, "we did not answer", separate from "no connection": the console exists to tell causes apart (screen 21). This is "the node did not answer" in the product's words — lines for a person do not name how the system is built.
- **Appearance: this one is on us (added 2026-09-15 from the screen-state matrix).** The choice applies on the device at once and is saved with the identity by the first request we answer (screen 22); the line blames us, not the network.
- **A conversation open, with no lines (added 2026-09-15 from the screen-state matrix).** The conversation has just opened and holds not a single line: instead of an empty stream, the line "the conversation is open, write first" (screen 8).
- **The history stayed on the previous device (added 2026-09-15 from the screen-state matrix).** After a move or a recovery the conversations are the same, but hold no lines (screen 13): the line "the history stayed on the previous device" (screen 8).
- **Geolocation does not exist as a state — edit of 2026-08-28.** Permission is never requested, so "no access" is not an edge case but the norm: the point is worked out from the time zone, the address and the language, labelled as approximate, the circle is wider, and everything is refined by hand on the diagram (`00-mechanics_EN.md` §4).

- **A document changed while the person was away — state added 2026-08-29.**
  The feed reads as usual; at the first attempt to publish or open a chat the
  node answers `legal_reacceptance_required` (`xor.ad/docs/protocol_EN.md` §6),
  and the person lands on a screen listing the documents that changed, with one
  checkbox. **What exactly waits for the checkbox — clarified 2026-09-15 by protocol §6:** phrases, table
  lines and applications, a hangman word (these are publication: another person sees it and the queue checks it), a name change (added 2026-09-15 from the screen-state matrix: others see the name, and the same queue checks it, screen 10) and opening a new conversation; a message in a
  conversation already open and a move in a game — no: a conversation under way is not interrupted by
  changed documents. Reading is left alone **deliberately**: someone who came to read a
  reply should get the reply, not a legal text. Since 2026-09-15 the guidelines wait for the
  same checkbox as the terms and the policy (screen 15; [retired] this said "recorded silently").
- **Nothing liked (added 2026-09-17).** Screen 25 is empty until something in the feed is liked, or everything liked has expired: the line points to the feed rather than explaining the mechanics.

## Wordings

**Written 2026-09-03, before the drawing — and that is a decision.** A mockup
with "Lorem ipsum" lies about the layout: a long line breaks it exactly where
nobody expected, a short one leaves a hole. Below is what a person reads; the
look stays open.

One voice for all of them: say what happened and what to do next. No apologising
twice, no explaining how the system is built, no "oops".

| State | Heading | Line under it | Action |
|---|---|---|---|
| Quota exhausted | That is all for now | Your four phrases are still alive. The next slot frees at HH:MM. | My messages |
| Four already said this hour | Enough for now | Four phrases already said this hour. The next one can go at HH:MM. | — |
| Tab locked | Enter your PIN | Six digits and you are back. | — |
| Locked, fewer than four attempts left | Enter your PIN | Attempts left: N. After that this device is locked until the paper code. | — |
| Waiting before a PIN attempt | Wait a moment | The next attempt is in N seconds or minutes, beyond an hour at HH:MM. The wait grows after the fifth mistake; if you did not cause it, someone else is using your session. | Enter the paper code |
| The tenth PIN mistake | Access locked | Ten wrong PINs — access on this device is locked until the paper code. The correspondence is intact: after the code it opens with the old PIN. | Enter the code · Write to support |
| Locked, no connection | No connection | The PIN is checked on our side, and there is no connection. Unlocking will work once the network is back. | Retry |
| First phrase waiting for a name | Looking at your name | Once the name is accepted, the phrase goes out to the neighbours. | — |
| No one nearby | Quiet around here | Nobody in your circle is talking right now. A wider circle, more voices. | Widen the circle |
| First visit with no phrase of your own | Say something first | A like opens a conversation only when both of you have a live phrase. | Write one |
| The queue has stalled | The check is running late | The phrase is not lost. If the check does not happen within 10 minutes, the text comes back to you. | — |
| The check did not happen | The check did not happen | Your text is saved — send it again. The slot is free, and there is no pause for this. | Send again |
| A support answer is waiting | You have a reply | The reply is under "Me" → "Support". | Open |
| No network | No connection | The internet seems to be gone. What you typed is here, the feed is what made it through. | Retry |
| Waiting for the first answer | — | (a skeleton of cards, no text) | — |
| The node is unreachable | This one is on us | We are not answering — that is our side. What you typed is here. | Retry |
| Moderation refusal | This will not go out | *(the class of reason — `xor.ad/docs/refusal-wordings_EN.md`)* | Edit |
| Fifth refusal within an hour | Fifteen minutes off | The feed, likes on phrases and conversations all work — phrases, table lines, name changes, offer likes while the name is not accepted and hangman words are paused. Another refusal this hour — another 15 minutes. The decision is automatic; the pause ends at HH:MM; ground — the Terms §8 and §15; if you disagree — the Digital Services Coordinator or a court (composition per Art. 17(3), 2026-09-14). | — |
| Hold | One moment | Checking what you sent earlier — the new one goes after the verdict. | — |
| The conversation ended for the other person | The conversation ended | There is nothing here any more. | Close |
| The other person stepped away | Stepped away | — | — |
| The identity moved to another device | Your identity is not here any more | The identity was brought up on another device. It no longer works here, and the correspondence on this device will not open again. If it was not you, you have your paper code. | Enter the code |
| The app is out of date | Time to update | This version is no longer supported. Reload the page and everything is where you left it. | Reload |
| A published phrase was restricted | Your phrase was hidden | What happened, why, who decided and what to do next — all of it here. | Read |
| An application is waiting | Waiting for an answer | The players will decide by the start of the next game. Watch and talk meanwhile. | — |
| You were not taken into the game | Not taken in | The reason is in the table's conversation. You can apply again. | To the table |
| A line at the table did not pass | This will not go out | *(the class of reason)* No application was made, the text is still here. | Edit |
| You did not confirm in time | You are watching now | The confirmation waited 30 seconds. There are no seats in this game — you can apply for the next one. | Watch |
| The move timed out | A pass was recorded | Five minutes went by without a move, and a pass was made for you. | — |
| Three passes | You are watching now | Three moves went by without you. You can apply once a seat frees up. | Watch |
| A report is being moved | This looks like something illegal | Your text is now in the notice form. Confirm and send. The decision will appear under "Me" → "My notices"; clear your browser data and you will not see it — leave an email. | Review and send |
| Your own table closed | The table closed | The last one stood up — the table is closed. Set a new one if you like. | Set a table |
| You missed a message | You missed a message | The text is neither here nor with us — ask them to send it again. | — |
| Nothing in "Offers" | Nobody is calling yet | An offer comes when someone likes a live phrase of yours. | — |
| Nothing in "Conversations" | No conversations yet | A conversation opens once an offer is accepted. | To the feed |
| Nothing in "My messages" | No phrases of yours | Free slots: N of four. | Write one |
| No support requests | No requests yet | Your requests and the answers to them will appear here. | — |
| The move code did not match or expired | The code did not match | The code did not match or has expired. The previous device will show a new one if it is connected. | Enter a new one |
| The move was cancelled | The move was cancelled | This code was entered on one more device, so the move is cancelled. The identity is where it was — start again, with a new code. | — |
| The paper code did not match | The code did not match | Check each group: one wrong character and the code is not found. | Try again |
| Paper code entry is closed | Not taking codes right now | Someone is guessing codes, so entry is closed for everyone. Your identity is intact — try later. | — |
| The PIN cannot be changed offline | No connection | A new PIN has to be agreed with us. The old PIN keeps working meanwhile. | Retry |
| This device was not used for a year | It has been a while | Sign in with your paper code. The old correspondence on this device will not open again. | Enter the code |
| You were asked to leave the table | You were asked to leave | Most of those sitting asked. You can sit down again if the table is visible. | To the feed |
| The table is gone | The table went out | It fell silent, and the table is no more. | To the feed |
| A game for two ended | The game ended | The other person stepped away, and there is no game for two without them. | — |
| That move is not allowed | Not like that | The rules do not let this move through. It is still your turn. | — |
| A decision on your notice | There is a decision | A decision was taken on your notice. | Open |
| An offer's link is switched off | The link is off | After reports this link no longer opens. The offer itself is still here. | — |
| Registration step 2 with no connection | No connection | The internet seems to be gone. Your name, age and PIN are still here — we will show the code once the connection is back. | Retry |
| The match waits for your name | Name first | Your name did not pass the check, and the match will not open until a new one is accepted. | Change the name |
| An offer vanished before your eyes | The offer is gone | The offer has gone. | Close |
| A refusal by rate from the address | A bit later | Too many sends in a row. Try again later. | — |
| "Step away" with no connection | No connection | Stepping away deletes your phrases on our side, and there is no connection. The span is kept — try once the network is back. | Retry |
| The console is empty | — | Events will appear here when something happens. | — |
| The identity is closed | The identity is closed | This identity was closed with "start over". It no longer works here. | Start |
| A move with no connection | No connection | The move code will appear once there is a connection. The identity is still here. | Retry |
| The connection dropped at a table | No connection | The move time runs without a connection: after five minutes a pass is recorded. | Retry |
| The current code did not match on reissue | The code did not match | A new code is issued only on the valid one. The current one still works. | Try again |
| Appearance with no connection | — | Applied. We will save it once the connection is back. | — |
| A phrase ended in the viewer | The phrase has ended | It is no longer here. | — |
| Nothing liked | — | Like a phrase or a table in the feed — they gather here. | To the feed |
| The viewer reached the end | No more phrases | New ones will appear in the feed. | To the feed |
| Registration step 2: this one is on us | This one is on us | We did not answer — that is our side. Your name, age and PIN are still here — we will show the code as soon as we answer. | Retry |
| Locked: this one is on us | This one is on us | The PIN is checked on our side, and we are not answering right now. It is not a wrong PIN — try again a little later. | Retry |
| The PIN cannot be changed: this one is on us | This one is on us | A new PIN has to be agreed with us, and we are not answering right now. The old PIN keeps working meanwhile. | Retry |
| A move: this one is on us | This one is on us | We could not issue the move code — that is our side. The identity is still here. | Retry |
| A table: this one is on us | This one is on us | We are not answering, and the move time is running: after five minutes a pass is recorded. | Retry |
| "Step away": this one is on us | This one is on us | Stepping away deletes your phrases on our side, and we are not answering right now. The span is kept — try again a little later. | Retry |
| The console: we did not answer | — | We did not answer. | — |
| Appearance: this one is on us | — | Applied. We will save it as soon as we answer. | — |
| Tab locked, you are at a table | Enter your PIN | Your move at the table. | — |
| A conversation open, with no lines | The conversation is open | Write first. | — |
| The history stayed on the previous device | The history stayed on the previous device | The conversation is the same, but earlier lines do not move here. | — |
| A document changed | Something changed | Read what is different and accept it — until you do, you cannot publish or open new conversations. Conversations already going carry on. | Read |

Seven lines are deliberately empty (there were five; two added 2026-09-15 from the screen-state matrix: the console line "we did not answer" has no heading, like the empty console — it is a log line, not a screen; appearance when we did not answer has none, as with no connection — the choice is already applied). "Stepped away" has no second line because we
do not know when they are back and will not invent it. "Waiting for the first
answer" has no text at all: the skeleton already says a load is running, and a
caption under it turns a second of waiting into an event. The moderation refusal
has a shared heading, while the reason arrives from the node — one per class. The empty console has no heading: a log with no events is not an event. Nor has appearance with no connection: the choice is already applied and nothing went wrong (added 2026-09-15 after the review panel).

## Open questions

- ~~Exact copy for each state~~ — **written 2026-09-03, the "Wordings" section above**. What stays open is the **visual**: how these lines sit on the screen, with or without an icon, where the action goes.
- ~~Whether the quota recovers over time~~ — **there are two counts and they differ** (decided 2026-08-29). A slot frees **only** when a phrase disappears: it expired or was taken down. The "four per hour" ceiling is a sliding window and releases by itself. So a person can see a free slot and still be refused, and the other way round; a refusal must name which of the two is holding them (`xor.ad/docs/refusal-wordings_EN.md`).
- ~~Behaviour when geolocation access is denied~~ — settled 2026-08-26 (above).
