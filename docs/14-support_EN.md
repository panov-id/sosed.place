# Screen 14 — Support

## Purpose

A support contact button, reachable from the app at any time.

## Screen elements

- **A "Support" item under "Me"** (screen 10) — a permanent place, decided 2026-09-14. **With a mark when an answer is waiting** (decided 2026-08-29): a dot on this item and on "Me" in the bottom navigation rather than in the inbox. [retired] This said "a support button/icon — always available… a dot on the icon itself", which contradicted the 2026-09-02 decision below: there is no separate icon, so there was nowhere to put the dot. The inbox collects conversations between people, and the platform's own voice in that list would read as one more neighbour. The price is named plainly: the dot is seen only by someone who looks there, and people look there rarely.
- **Common questions above the input** (added 2026-08-29): where a phrase went, why liking is unavailable, where a conversation disappeared to. These are the product's three most frequent "it broke" cases, which are in fact how it works. The price is named: a list in front of the field reads as an attempt to talk you out of writing, so it stays short and does not block the field.
- A message input for the support request.
- **A line about where the answer will arrive** (added 2026-08-29): "the answer comes here, into this application; leave an email if you might lose access to your identity". The warning belongs **here** rather than on the start-over screen: there the decision is already made, here the person is still choosing what to pay.
- **Your own tickets as a list** (added 2026-08-29): number, date, answer. Today the number is shown once and never again. The price is accepted: a product that erases everything gains a list that lives a year — which is honest, because the ticket is kept for a year anyway (`00-mechanics_EN.md` §7).
- A send button.

## Logic

- The sent message lands in the `support_requests` table in the database beside the node — **the eleventh table of the first migration** (decided 2026-09-14, `xor.ad/docs/chat_EN.md` §13): otherwise the list of requests and the answer attached to the identity promised here would have nothing to stand on.
- A new ticket fires a notification (email/webhook) for the team.
- **No number is promised for the reply time — decided 2026-08-29.** The line tells the truth: "we read everything, we do not answer at once — there are few of us". A number here would be a promise held by one person on holiday. The exception is a report of something unlawful: it enters the notice register and takes its deadlines, and that is said in a line of its own, because those deadlines are the law's rather than ours.
- There's no automated handling — just logging the request and notifying the team.
- **A confirmation is shown immediately**, with a request number: a person has to see that they were heard (settled 2026-08-26).
- **The answer arrives in the app at the next visit — settled 2026-08-27.** No email is needed for that: the answer waits attached to the identity and is shown when the person comes back. The mechanism is not new — it is exactly how the legal spec delivers an Article 17 statement of reasons to someone with no contact (`xor.ad/docs/dsa/SPEC_EN.md` §7). The screen used to know one path only — email — and demanded it precisely where a person feels bad and is asking for help.

  The cost is named: the answer lives with the identity. Start over, or lose the device without the paper code, and the answer will not be seen, because there is nobody to show it to.
- **Email remains, optional**, and is asked of someone who wants the answer another way — waiting for it on a different device, say. The product lives without email by construction, and collecting it where it can be avoided means creating a record about a person for nothing.
- **A content report sent here is accepted as an Article 16 notice — settled 2026-08-27.** The law does not require the right form: if we were told about something illegal, that is "actual knowledge", whatever the channel is called (Article 16(3)). The message moves into the same register as notices from the form (screen 5) and gets the same deadlines. Sending a person off to retype their text into another form is not an option: some will simply leave, while the knowledge is already ours — which is the very case the article was written against.
  **A request moved into the register leaves the support list — decided 2026-09-14 after the review panel.** A notice carries no notifier identity, and the request row is deleted in the same transaction: otherwise "who reported" could be recovered by matching the text (`xor.ad/docs/chat_EN.md` §13). That the report was passed to the register, the person sees on their own device; the decision on it reaches them only by email, if they leave one.
  **One kind of body support cannot take, though, and that is said here since 2026-09-10.** A report that **quotes** what it is reporting — `<script>`, `../../uploads/…`, `data:…;base64` — is cut by the WAF on its way to the node: a quoted attack is indistinguishable from an attack, and rules do not fix it (measured 2026-09-03, `xor.ad/docs/open-work_EN.md`). Notices moved to a separate host without a WAF for the sake of such bodies; support stayed behind it, because a second unprotected public route is a second attack surface with nothing but the node itself to guard it.
  So that the decision above does not turn into a lie, **the client moves the text, not the person**: on a refusal the app says "this looks like a report of something illegal" and **opens the Article 16 form with that text already in the field** — name and email empty, the good-faith box and the §5.1 line seen and ticked by the person themselves (decided 2026-09-14). Nothing has to be retyped; one tap is needed. [retired] This said "sends the very same text… with no copy-and-paste": the Article 16 form requires a good-faith confirmation (`xor.ad/docs/dsa/SPEC_EN.md` §4), and ticking it on the person's behalf was not an option.
- **A message is kept for a year** (`00-mechanics_EN.md` §7) and is tied to the identity, because otherwise there is nowhere to show the answer. On "start over" the link is broken **in the same transaction that closes the identity** (clarified 2026-09-14 after the review panel: before, it would only have broken with the deletion 30 days later): the message stays with us as a record of the review, and the new identity has nothing to do with it.

## Open questions

- ~~Exactly where the button is reachable from~~ — **from wherever a person is stuck** (decided 2026-09-02): a refusal state, an error, the settings. There will be no separate icon in the header of every screen — the entrance sits at the place of the event, as for the other screens. The promise that support is "always reachable from the app" holds because getting stuck only happens where the button is.
- ~~How a person learns an answer has arrived~~ — **by the mark on the "Support" item under "Me"** (decided 2026-08-29, place clarified 2026-09-14, above). The answer deliberately does not enter the inbox.
- ~~Confirmation and reply~~ — settled 2026-08-26 (above).
