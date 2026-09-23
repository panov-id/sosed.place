// Rubric slides: the formats that carry the series.
//
//   notice    a sheet taped to the entrance door, with tear-off tabs   (sosed · Доска)
//   dict      a page of an old dictionary                              (sosed · Словарь)
//   window    one window, close up, and the line its tenant would post (sosed · Окна)
//   whole     the whole building, a few windows numbered               (sosed · Окна)
//   comic     two grandmothers on the bench, speech bubbles            (sosed · Бабушки)
//   plate     a field-guide plate with an engraving                    (neighbro · Field guide)
//   poster    a film poster for a small neighbourly event              (neighbro · Кинопостеры)
//   overheard one overheard line, set large                            (neighbro · Overheard)
//   postcard  front or back of a postcard from the block               (neighbro · Открытки)
//
// Any of them on a first slide with `facade: k` sits on cover k's slice of the
// building; `object: true` shrinks it to an object on that wall.

(function () {
  "use strict";
  const { esc, inline, P, S, chip } = KIT.h;
  const T = KIT.T;
  const B = window.BRAND;
  const A = window.ART;

  const sub = (x, cls = "") => (S(x) ? `<div class="subl ${cls}">${chip()}<span>${inline(S(x))}</span></div>` : "");
  const lines = (x) => inline(P(x));

  // ---------- notice on the door ----------

  T.notice = (s) => {
    const tabs = s.tabs
      ? `<div class="tabs">${Array.from({ length: s.tabs.n || 7 }, (_, i) =>
          (s.tabs.torn || []).includes(i) ? `<i class="tab torn"></i>` : `<i class="tab"><span>${esc(P(s.tabs.text))}</span></i>`).join("")}</div>`
      : "";
    const replies = (s.replies || []).map((r) =>
      `<div class="reply" style="--rx:${r.x}px;--ry:${r.y}px;--rr:${r.r || 0}deg;--ink:${r.ink || "#b3261e"}">${lines(r.text)}</div>`).join("");
    return `
      ${s.eyebrow ? `<div class="eyebrow on-photo">${lines(s.eyebrow)}</div>` : ""}
      <div class="notice-wrap ${s.object ? "object" : ""}" style="--rot:${s.rot ?? -2}deg">
        <div class="paper ${s.paper || "sq"} ${s.small ? "small" : ""} ${s.replies ? "has-replies" : ""}">
          <i class="tape l"></i><i class="tape r"></i>
          ${s.head ? `<div class="n-head">${lines(s.head)}</div>` : ""}
          <div class="n-body">${lines(s.text)}</div>
          ${s.sign ? `<div class="n-sign">${lines(s.sign)}</div>` : ""}
          ${tabs}
          ${replies}
        </div>
        ${sub(s.text, "under")}
      </div>`;
  };

  // ---------- dictionary page ----------

  T.dict = (s) => `
    <div class="dict-wrap ${s.object ? "object" : ""}">
      <div class="dict">
        <div class="d-run"><span>${esc(s.run[0])}</span><span>${esc(s.run[1])}</span></div>
        ${s.before ? `<div class="d-ghost">${lines(s.before)}</div>` : ""}
        <div class="d-word fit">${esc(s.word)}</div>
        <div class="d-gram">${lines(s.gram)}</div>
        <ol class="d-senses">${s.senses.map((x) => `<li>${lines(x)}</li>`).join("")}</ol>
        ${s.example ? `<div class="d-ex">${lines(s.example)}</div>` : ""}
        ${s.see ? `<div class="d-see">${lines(s.see)}</div>` : ""}
        ${s.after ? `<div class="d-ghost after">${lines(s.after)}</div>` : ""}
      </div>
      ${s.en ? `<div class="subl under">${chip()}<span>${inline(s.en)}</span></div>` : ""}
    </div>`;

  // ---------- windows ----------

  T.window = (s) => `
    <div class="scene-bg">${A.windowScene(s.scene, s.label)}</div>
    <div class="win-card">
      <div class="fcard">
        <div class="fc-top"><span class="fc-tag">${esc(P(s.tag))}</span><span class="fc-plus">${KIT.icon("plus", "ico tiny")}</span></div>
        <div class="fc-text">${lines(s.line)}</div>
        <div class="fc-bot">${KIT.icon("fade", "ico tiny")}<span>${esc(s.time)}</span></div>
      </div>
      ${sub(s.line, "under light")}
    </div>`;

  T.whole = (s) => `
    ${s.eyebrow ? `<div class="eyebrow">${lines(s.eyebrow)}</div>` : ""}
    <div class="whole-wrap">${A.facadeWhole(B.id, s.pins, s.ring)}</div>
    <div class="whole-text">
      <div class="statement s">${lines(s.text)}</div>
      ${sub(s.text)}
    </div>`;

  T.viewfinder = (s) => `
    <div class="vf"><i class="c tl"></i><i class="c tr"></i><i class="c bl"></i><i class="c br"></i>
      <div class="rec"><b></b>REC ${esc(s.clock)}</div></div>
    <div class="vf-title">
      <div class="display h1">${lines(s.title)}</div>
      ${sub(s.title)}
      <div class="vf-meta">${lines(s.meta)}</div>
    </div>`;

  // ---------- comic ----------

  const bubble = (b) => `
    <div class="bubble ${b.side} ${b.shout ? "shout" : ""}" style="--bx:${b.x}px;--by:${b.y}px;--bw:${b.w || 460}px">
      <div class="b-p">${lines(b.text)}</div>${S(b.text) ? `<div class="b-s">${inline(S(b.text))}</div>` : ""}
    </div>`;

  T.comic = (s) => `
    <div class="scene-bg">${A.bench(s.left, s.right, s.bg)}</div>
    ${s.caption ? `<div class="cap-box">${lines(s.caption)}${S(s.caption) ? `<span> / ${inline(S(s.caption))}</span>` : ""}</div>` : ""}
    ${(s.bubbles || []).map(bubble).join("")}
    ${s.panel ? `<div class="panel-n">${esc(s.panel)}</div>` : ""}`;

  T.masthead = (s) => `
    <div class="mast ${s.object ? "object" : ""}">
      <div class="mast-top"><span>${lines(s.issue)}</span><span>${esc(s.price || "")}</span></div>
      <div class="mast-title fit">${lines(s.title)}</div>
      ${sub(s.title, "mast-sub")}
      <div class="mast-panel">${A.bench(s.left, s.right, "#3a2430")}</div>
      <div class="mast-burst">${lines(s.burst)}</div>
    </div>`;

  // ---------- field-guide plate ----------

  T.plate = (s) => `
    <div class="plate-wrap ${s.object ? "object" : ""}">
      <div class="pl">
        <div class="pl-head"><span>${esc(s.series)}</span><span>${esc(s.no)}</span></div>
        <div class="pl-fig">${{ freddo: A.freddo, granatus: A.granatus, felis: A.felis }[s.fig]()}</div>
        <div class="pl-latin fit">${esc(s.latin)}</div>
        <div class="pl-common">${lines(s.common)}</div>
        ${sub(s.common, "pl-sub")}
        ${s.fields ? `<dl class="pl-fields">${s.fields.map((f) => `<dt>${esc(P(f.k))}</dt><dd>${lines(f.v)}</dd>`).join("")}</dl>` : ""}
        ${s.key ? `<div class="pl-key">${s.key.map((k) => `<span><i>${esc(k[0])}</i> ${lines(k[1])}</span>`).join("")}</div>` : ""}
      </div>
    </div>`;

  T.notes = (s) => `
    <div class="notes">
      <div class="nt-head">${lines(s.title)}</div>
      ${sub(s.title)}
      <ul class="nt-list">${s.items.map((it) => `<li><b>${esc(it.d)}</b><span>${lines(it.t)}</span>${S(it.t) ? `<em>${inline(S(it.t))}</em>` : ""}</li>`).join("")}</ul>
      ${s.foot ? `<div class="nt-foot">${lines(s.foot)}</div>${sub(s.foot)}` : ""}
    </div>`;

  // ---------- film poster ----------

  T.poster = (s) => `
    <div class="poster-wrap ${s.object ? "object" : ""}">
      <div class="poster">
        <div class="po-art ${s.art}">${{ ladder: A.ladder, clock: A.clock }[s.art]()}</div>
        <div class="po-top">${esc(s.presents)}</div>
        <div class="po-laurel">${esc(s.laurel)}</div>
        <div class="po-title fit">${esc(s.title)}</div>
        <div class="po-tag">${lines(s.tagline)}</div>
        ${sub(s.tagline, "po-sub")}
        <div class="po-stars">★★★★★ <span>${lines(s.critic)}</span></div>
        <div class="po-billing">${esc(s.billing)}</div>
      </div>
    </div>`;

  T.reviews = (s) => `
    ${s.eyebrow ? `<div class="eyebrow">${lines(s.eyebrow)}</div>` : ""}
    <div class="reviews">${s.items.map((r) => `
      <div class="rv"><div class="rv-stars">${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}</div>
        <div class="rv-q">“${lines(r.q)}”</div>${S(r.q) ? `<div class="rv-s">${inline(S(r.q))}</div>` : ""}
        <div class="rv-by">— ${lines(r.by)}</div></div>`).join("")}
    </div>`;

  // ---------- overheard ----------

  T.overheard = (s) => `
    ${s.eyebrow ? `<div class="eyebrow ${s.facade ? "on-photo" : ""}">${lines(s.eyebrow)}</div>` : ""}
    <div class="oh ${s.facade ? "on-facade" : ""}">
      <div class="oh-q">“</div>
      <div class="oh-text">${lines(s.text)}</div>
      ${sub(s.text, "oh-sub")}
      <div class="oh-by">— ${lines(s.where)}</div>
    </div>`;

  // ---------- postcard ----------

  T.postcard = (s) => s.side === "front" ? `
    <div class="pc-wrap ${s.object ? "object" : ""}" style="--rot:${s.rot ?? 3}deg">
      <div class="pc front">
        ${A.postcardFront()}
        <div class="pc-greet"><span class="g1">${esc(s.greet[0])}</span><span class="g2">${esc(s.greet[1])}</span></div>
        <div class="pc-city">${esc(s.city)}</div>
      </div>
      ${s.sub ? `<div class="subl under">${chip()}<span>${inline(s.sub)}</span></div>` : ""}
    </div>` : `
    <div class="pc-wrap" style="--rot:${s.rot ?? -2}deg">
      <div class="pc back">
        <div class="pc-msg">${lines(s.msg)}</div>
        <div class="pc-right">
          <div class="pc-stamp">${A.stamp(s.stamp[0], s.stamp[1])}</div>
          <div class="pc-pm">${A.postmark(s.postmark[0], s.postmark[1])}</div>
          <div class="pc-addr">${lines(s.to)}</div>
        </div>
      </div>
      ${sub(s.msg, "under")}
    </div>`;
})();
