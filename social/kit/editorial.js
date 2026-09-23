// Editorial slides: a real photo carries the meaning, the text is one line.
//
//   bleed    photo edge to edge, one big line on top or bottom, a small caption
//   sticker  photo edge to edge, the product line on a coloured block
//   frame    photo inset on paper, serif headline under it (magazine page)
//   note     paper, one serif sentence, nothing else
//   ecta     solid colour, one word, the site, the way in
//
// Photos live in social/img/ with their licence in social/img/CREDITS.tsv;
// the caption.txt of a post carries the credit line when the licence asks for it.

(function () {
  "use strict";
  const { esc, inline, P, S, chip } = KIT.h;
  const T = KIT.T;
  const B = window.BRAND;

  const sub = (x, cls = "") => (S(x) ? `<div class="e-sub ${cls}">${chip()}<span>${inline(S(x).replace(/\n/g, " "))}</span></div>` : "");

  T.bleed = (s) => `
    <div class="e-bleed at-${s.at || "bottom"}">
      ${s.kicker ? `<div class="e-kicker">${inline(P(s.kicker))}</div>` : ""}
      <div class="e-head">${inline(P(s.title))}</div>
      ${sub(s.title)}
      ${s.caption ? `<div class="e-cap">${inline(P(s.caption))}</div>` : ""}
    </div>`;

  T.sticker = (s) => `
    <div class="e-sticker">
      <div class="e-st-p">${inline(P(s.text))}</div>
      ${sub(s.text, "on-sticker")}
    </div>
    ${s.caption ? `<div class="e-cap corner">${inline(P(s.caption))}</div>` : ""}`;

  T.frame = (s) => `
    <div class="e-photo" style="background-image:url('${s.img}');background-position:${s.pos || "center"}"></div>
    <div class="e-text">
      ${s.kicker ? `<div class="e-kicker">${inline(P(s.kicker))}</div>` : ""}
      <div class="e-serif">${inline(P(s.title))}</div>
      ${sub(s.title)}
      ${s.caption ? `<div class="e-rule"></div><div class="e-cap">${inline(P(s.caption))}</div>` : ""}
    </div>`;

  T.note = (s) => `
    <div class="e-note">
      ${s.kicker ? `<div class="e-kicker">${inline(P(s.kicker))}</div>` : ""}
      <div class="e-serif big">${inline(P(s.text))}</div>
      ${sub(s.text)}
      ${s.foot ? `<div class="e-rule"></div><div class="e-foot">${inline(P(s.foot))}</div>${sub(s.foot)}` : ""}
    </div>`;

  T.ecta = (s) => `
    <div class="e-cta">
      <div class="e-word">${inline(P(s.title))}</div>
      ${sub(s.title)}
      <div class="e-site">${esc(B.site)}</div>
      <div class="e-action">${inline(P(s.action))}</div>
      ${sub(s.action)}
    </div>`;
})();
