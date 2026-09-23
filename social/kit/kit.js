// Slide kit: turns a piece (window.POST from <piece>/post.js) into slides.
//
// Every text field is { ru, en }. BRAND.primary is set large, BRAND.secondary
// as a small line under it, marked with a language chip. A plain string is
// used as-is for both. Inside text: *word* is the accent, \n breaks the line.
//
// Modes (query string):
//   ?src=posts/01-hoy          the slides, one after another, full size
//   ?src=...&sheet=1           contact sheet: every slide at 1/4
//   ?grid=posts/01,posts/02    profile grid preview, newest first, 3:4 crop
//
// window.__ready turns true once fonts and photos are in. A slide whose text
// leaves its safe area logs a warning, and the renderer fails on warnings.

(function () {
  "use strict";
  const B = window.BRAND;
  const KIT = (window.KIT = {});

  // ---------- text ----------

  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inline = (s) => esc(s)
    .replace(/\*([\s\S]+?)\*/g, '<em class="hl">$1</em>')
    .replace(/_(.+?)_/g, '<span class="dim">$1</span>')
    .replace(/\n/g, "<br>");
  const P = (x) => (x && typeof x === "object" ? x[B.primary] ?? "" : x ?? "");
  const S = (x) => (x && typeof x === "object" ? x[B.secondary] ?? "" : "");
  const chip = () => `<i class="lang">${B.secondary}</i>`;

  // primary + secondary pair; cls names the size of the primary
  function dual(x, cls = "") {
    if (!x) return "";
    const s = S(x);
    return `<div class="dual ${cls}"><div class="p">${inline(P(x))}</div>` +
      (s ? `<div class="s">${chip()}<span>${inline(s)}</span></div>` : "") + `</div>`;
  }
  // display headline + its translation as a quieter subline
  function head(x, size = "h2") {
    if (!x) return "";
    const s = S(x);
    return `<h2 class="display ${size}">${inline(P(x))}</h2>` +
      (s ? `<div class="dsub">${chip()}<span>${inline(s.replace(/\n/g, " "))}</span></div>` : "");
  }
  const eyebrow = (x) => (x ? `<div class="eyebrow">${inline(P(x))}${S(x) ? ` <span class="dim">/ ${inline(S(x))}</span>` : ""}</div>` : "");

  // ---------- icons (24 grid, stroke) ----------

  const ICON = {
    pen: '<path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17v3z"/><path d="M14.5 7.5l3 3"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    heart: '<path d="M12 20s-7.5-4.6-9.3-9.2C1.6 7.9 3.4 5 6.4 5c2 0 3.4 1.1 4.1 2.4h3C14.2 6.1 15.6 5 17.6 5c3 0 4.8 2.9 3.7 5.8C19.5 15.4 12 20 12 20z"/>',
    chat: '<path d="M4 5h16v11H9l-5 4V5z"/><path d="M8 9.5h8M8 12.5h5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    fade: '<circle cx="12" cy="12" r="9" stroke-dasharray="2.2 3"/><path d="M12 7v5l3.5 2"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
    gift: '<rect x="3.5" y="8.5" width="17" height="4" rx="1"/><path d="M5 12.5V20h14v-7.5M12 8.5V20M12 8.5C10.5 5 7 4.5 7 7c0 1.5 2.5 1.5 5 1.5zM12 8.5c1.5-3.5 5-4 5-1.5 0 1.5-2.5 1.5-5 1.5z"/>',
    dice: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.2" fill="currentColor"/><circle cx="15" cy="15" r="1.2" fill="currentColor"/><circle cx="15" cy="9" r="1.2" fill="currentColor"/><circle cx="9" cy="15" r="1.2" fill="currentColor"/>',
    paper: '<path d="M6 3h9l3 3v15H6z"/><path d="M9 10h6M9 13.5h6M9 17h3"/>',
    wave: '<path d="M3 12h2l2-5 3 10 3-13 3 13 2-5h3"/>',
    door: '<path d="M6 21V4h12v17"/><path d="M4 21h16"/><circle cx="14.5" cy="12.5" r="1" fill="currentColor"/>',
    table: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M6 12v8M18 12v8"/><circle cx="7" cy="5" r="1.6"/><circle cx="12" cy="4.4" r="1.6"/><circle cx="17" cy="5" r="1.6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    check: '<path d="M4.5 12.5l5 5 10-11"/>',
    arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  };
  const icon = (name, cls = "ico") =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICON[name] || ""}</svg>`;
  KIT.icon = icon;

  // ---------- slide types ----------
  // Each returns the inner HTML of .body; photo/tone are handled by the frame.

  const T = {};

  T.cover = (s) => `
    <div class="cover-top">${s.eyebrow ? `<div class="eyebrow">${inline(P(s.eyebrow))}</div>` : ""}</div>
    <div class="cover-main">
      <h1 class="display h1">${inline(P(s.title))}</h1>
      ${S(s.title) ? `<div class="dsub big">${chip()}<span>${inline(S(s.title).replace(/\n/g, " "))}</span></div>` : ""}
      ${s.lead ? `<div class="rule"></div>${dual(s.lead, "lead")}` : ""}
    </div>`;

  T.statement = (s) => `
    ${eyebrow(s.eyebrow)}
    <div class="grow center-v">
      <div class="statement ${s.size || ""}">${inline(P(s.text))}</div>
      ${S(s.text) ? `<div class="dsub">${chip()}<span>${inline(S(s.text).replace(/\n/g, " "))}</span></div>` : ""}
    </div>
    ${s.note ? dual(s.note, "note") : ""}`;

  T.steps = (s) => `
    ${eyebrow(s.eyebrow)}
    ${head(s.title)}
    <ol class="steps grow">
      ${s.items.map((it, i) => `
        <li>
          <div class="step-mark"><span class="num">${String(i + 1).padStart(2, "0")}</span>${icon(it.icon, "ico step-ico")}</div>
          <div class="step-text">${dual(it.t, "item")}</div>
        </li>`).join("")}
    </ol>`;

  T.list = (s) => `
    ${eyebrow(s.eyebrow)}
    ${head(s.title)}
    <ul class="rules grow">
      ${s.items.map((it, i) => `
        <li><span class="rnum">${it.mark ? icon(it.mark, "ico rico") : String(i + 1)}</span>
        <div>${dual(it.t, "item")}${it.d ? dual(it.d, "itemd") : ""}</div></li>`).join("")}
    </ul>`;

  // 24-hour dial with the life of a message as an arc
  T.timer = (s) => {
    const size = 720, c = size / 2, r = 290, w = 54;
    const C = 2 * Math.PI * r, f = s.minutes / s.total;
    const ticks = Array.from({ length: 24 }, (_, h) => {
      const a = (h / 24) * 2 * Math.PI - Math.PI / 2, major = h % 6 === 0;
      const r1 = r + w / 2 + 14, r2 = r1 + (major ? 26 : 12);
      return `<line x1="${c + r1 * Math.cos(a)}" y1="${c + r1 * Math.sin(a)}" x2="${c + r2 * Math.cos(a)}" y2="${c + r2 * Math.sin(a)}" class="${major ? "tick major" : "tick"}"/>`;
    }).join("");
    const labels = [0, 6, 12, 18].map((h) => {
      const a = (h / 24) * 2 * Math.PI - Math.PI / 2, rr = r + w / 2 + 62;
      return `<text x="${c + rr * Math.cos(a)}" y="${c + rr * Math.sin(a) + 9}" class="dial-lbl">${String(h).padStart(2, "0")}</text>`;
    }).join("");
    const end = f * 2 * Math.PI - Math.PI / 2;
    return `
      ${eyebrow(s.eyebrow)}
      ${head(s.title, "h3")}
      <div class="grow dial-wrap">
        <svg class="dial" viewBox="-40 -40 ${size + 80} ${size + 80}" width="${size}" height="${size}">
          <circle cx="${c}" cy="${c}" r="${r}" class="dial-bg" stroke-width="${w}" fill="none"/>
          <circle cx="${c}" cy="${c}" r="${r}" class="dial-arc" stroke-width="${w}" fill="none"
            stroke-dasharray="${f * C} ${C}" transform="rotate(-90 ${c} ${c})"/>
          <circle cx="${c + r * Math.cos(end)}" cy="${c + r * Math.sin(end)}" r="${w / 2 + 6}" class="dial-end"/>
          ${ticks}${labels}
        </svg>
        <div class="dial-center">
          <div class="dial-num">${esc(s.value)}</div>
          ${dual(s.unit, "unit")}
        </div>
      </div>
      ${s.note ? dual(s.note, "note") : ""}`;
  };

  // blur rings on a log scale: the address becomes a circle
  T.radius = (s) => {
    const size = 860, c = size / 2;
    const rOf = (m) => 70 + ((Math.log10(m) - 2) / 2) * 340;
    const rings = s.rings.map((m, i) => {
      const r = rOf(m), on = i === s.active;
      const a = -Math.PI / 4 - i * 0.16;
      return `<circle cx="${c}" cy="${c}" r="${r}" class="ring ${on ? "on" : ""}"/>
        <text x="${c + r * Math.cos(a) + 12}" y="${c + r * Math.sin(a) - 8}" class="ring-lbl ${on ? "on" : ""}">${esc(P(s.labels[i]))}</text>`;
    }).join("");
    return `
      ${eyebrow(s.eyebrow)}
      ${head(s.title, "h3")}
      <div class="grow radius-wrap">
        <svg viewBox="0 0 ${size} ${size}" width="${size * 0.86}" height="${size * 0.86}" class="radius">
          <circle cx="${c}" cy="${c}" r="${rOf(s.rings[s.active])}" class="ring-fill"/>
          ${rings}
          <circle cx="${c}" cy="${c}" r="13" class="me"/>
          <circle cx="${c}" cy="${c}" r="26" class="me-halo"/>
        </svg>
      </div>
      ${s.note ? dual(s.note, "note") : ""}`;
  };

  // a range handle on a log track
  T.slider = (s) => {
    const lo = Math.log10(s.min), hi = Math.log10(s.max);
    const pos = (v) => ((Math.log10(v) - lo) / (hi - lo)) * 100;
    return `
      ${eyebrow(s.eyebrow)}
      ${head(s.title)}
      <div class="grow center-v">
        <div class="slider">
          <div class="track"><div class="fill" style="width:${pos(s.value)}%"></div>
            ${s.marks.map((m) => `<div class="tmark" style="left:${pos(m.v)}%"><span>${esc(P(m.l))}</span></div>`).join("")}
            <div class="knob" style="left:${pos(s.value)}%"><b>${esc(P(s.valueLabel))}</b></div>
          </div>
        </div>
        ${s.body ? dual(s.body, "lead mt") : ""}
      </div>
      ${s.note ? dual(s.note, "note") : ""}`;
  };

  T.compare = (s) => `
    ${eyebrow(s.eyebrow)}
    ${head(s.title, "h3")}
    <div class="grow center-v">
      <table class="cmp">
        <thead><tr><th></th><th>${inline(P(s.cols[0]))}</th><th class="us">${inline(P(s.cols[1]))}</th></tr></thead>
        <tbody>${s.rows.map((r) => `
          <tr><td>${dual(r.t, "row")}</td>
            <td><span class="yn">${inline(P(r.a))}</span></td>
            <td class="us"><span class="yn">${inline(P(r.b))}</span></td></tr>`).join("")}
        </tbody>
      </table>
    </div>
    ${s.note ? dual(s.note, "note") : ""}`;

  T.zeros = (s) => `
    ${eyebrow(s.eyebrow)}
    ${s.title ? head(s.title, "h3") : ""}
    <div class="zeros grow">
      ${s.items.map((it) => `
        <div class="zero"><div class="znum">${esc(it.n)}</div><div class="ztxt">${dual(it.t, "item")}</div></div>`).join("")}
    </div>
    ${s.note ? dual(s.note, "note") : ""}`;

  const card = (c) => `
    <div class="fcard ${c.offer ? "offer" : ""}">
      <div class="fc-top"><span class="fc-tag">${c.offer ? icon("gift", "ico tiny") : ""}${esc(P(c.tag))}</span>
        <span class="fc-plus">${icon(c.offer ? "heart" : "plus", "ico tiny")}</span></div>
      <div class="fc-text">${inline(P(c.text))}</div>
      <div class="fc-bot">${icon("fade", "ico tiny")}<span>${esc(c.time)}</span></div>
    </div>`;

  T.phone = (s) => `
    ${eyebrow(s.eyebrow)}
    ${head(s.title, "h3")}
    <div class="phone ${s.tall ? "tall" : ""}">
      <div class="ph-bar"><span>${esc(P(s.screen))}</span><span class="ph-r">${icon("pin", "ico tiny")}${esc(s.radius || "3 km")}</span></div>
      <div class="ph-feed">${s.cards.map(card).join("")}</div>
    </div>
    ${s.note ? `<div class="phone-note">${dual(s.note, "note")}</div>` : ""}`;

  T.card = (s) => `
    ${eyebrow(s.eyebrow)}
    ${s.title ? head(s.title, "h3") : ""}
    <div class="grow center-v">
      <div class="bigcard">${card(s.card)}</div>
    </div>
    ${s.note ? dual(s.note, "note") : ""}`;

  // two people, one conversation, two clocks
  T.lanes = (s) => {
    const span = s.span;
    const pct = (m) => (m / span) * 100;
    return `
      ${eyebrow(s.eyebrow)}
      ${head(s.title, "h3")}
      <div class="grow center-v lanes">
        ${s.lanes.map((l) => {
          const last = Math.max(...l.msgs), gone = last + l.limit;
          return `
          <div class="lane">
            <div class="lane-who">${dual(l.who, "row")}<span class="lane-lim">${esc(P(l.limitLabel))}</span></div>
            <div class="lane-track">
              <div class="lane-live" style="left:0;width:${pct(last)}%"></div>
              <div class="lane-silence" style="left:${pct(last)}%;width:${pct(l.limit)}%"></div>
              ${l.msgs.map((m) => `<i class="msg" style="left:${pct(m)}%"></i>`).join("")}
              <div class="lane-end" style="left:${pct(gone)}%">${icon("x", "ico tiny")}</div>
            </div>
          </div>`;
        }).join("")}
        <div class="lane-axis">${s.axis.map((a) => `<span style="left:${pct(a.m)}%">${esc(P(a.l))}</span>`).join("")}</div>
        ${s.chips ? `<div class="chips">${s.chips.map((c, i) => `<span class="chipb ${s.chipOn === i ? "on" : ""}">${esc(P(c))}</span>`).join("")}</div>` : ""}
      </div>
      ${s.note ? dual(s.note, "note") : ""}`;
  };

  // two circles, overlap = the match
  T.venn = (s) => `
    ${eyebrow(s.eyebrow)}
    ${head(s.title, "h3")}
    <div class="grow venn-wrap">
      <svg viewBox="0 0 900 560" width="900" height="560" class="venn">
        <circle cx="330" cy="280" r="230" class="v-a"/>
        <circle cx="570" cy="280" r="230" class="v-b"/>
        <text x="215" y="290" class="v-lbl">${esc(P(s.a))}</text>
        <text x="685" y="290" class="v-lbl">${esc(P(s.b))}</text>
        <g transform="translate(414 222) scale(3.5)" class="v-heart"><path d="${ICON.heart.match(/d="([^"]+)"/)[1]}"/></g>
      </svg>
      ${dual(s.caption, "lead center")}
    </div>
    ${s.note ? dual(s.note, "note") : ""}`;

  T.split = (s) => `
    ${eyebrow(s.eyebrow)}
    ${head(s.title, "h3")}
    <div class="split grow">
      ${[s.left, s.right].map((side, i) => `
        <div class="half ${i ? "now" : "then"}">
          ${side.photo ? `<div class="half-photo" style="background-image:url('${side.photo}')"></div>` : ""}
          <div class="half-lbl">${esc(P(side.label))}</div>
          ${icon(side.icon, "ico half-ico")}
          ${dual(side.text, "item")}
        </div>`).join("")}
    </div>
    ${s.note ? dual(s.note, "note") : ""}`;

  T.cta = (s) => `
    ${eyebrow(s.eyebrow)}
    <div class="grow center-v">
      ${head(s.title, "h2")}
      <div class="site">${esc(B.site)}</div>
      <div class="cta-row">${icon("arrow", "ico cta-ico")}${dual(s.action, "lead")}</div>
    </div>
    <div class="cta-chip">${esc(P(s.chip))}${S(s.chip) ? ` · <span class="dim">${esc(S(s.chip))}</span>` : ""}</div>`;

  // story-only: one big line, space left for an Instagram sticker
  T.story = (s) => `
    ${eyebrow(s.eyebrow)}
    <div class="grow center-v">
      ${head(s.title, s.size || "h1")}
      ${s.body ? `<div class="rule"></div>${dual(s.body, "lead")}` : ""}
      ${s.sticker ? `<div class="sticker-slot">${dual(s.sticker, "note")}</div>` : ""}
    </div>`;

  // profile avatar and highlight covers: brand-drawn, no chrome
  T.avatar = () => `<div class="avatar">${B.avatar()}</div>`;
  T.highlight = (s) => `<div class="hl-cover">${icon(s.icon, "ico hl-ico")}<div class="hl-txt">${esc(P(s.label))}</div></div>`;

  KIT.T = T;
  KIT.h = { esc, inline, P, S, chip, dual, head, eyebrow, icon };

  // ---------- frame ----------

  const SIZES = { post: 1350, story: 1920, square: 1080 };

  function frame(post, s, i, n) {
    const fmt = s.format || post.format || "post";
    const bare = s.type === "avatar" || s.type === "highlight";
    const tone = s.tone || (s.photo || s.facade ? "photo" : "dark");
    const bg = s.facade
      ? `${window.ART.facadeSlice(B.id, s.facade)}<div class="shade facade-shade ${s.shade || ""}"></div>`
      : s.photo ? `<div class="bgphoto" style="background-image:url('${s.photo}');${s.photoPos ? `background-position:${s.photoPos}` : ""}"></div><div class="shade ${s.shade || ""}"></div>` : "";
    const chrome = bare ? "" : `
      <header class="top"><span class="mark">${B.mark}</span><span class="idx"><b>${String(i + 1).padStart(2, "0")}</b> / ${String(n).padStart(2, "0")}</span></header>
      <footer class="bot"><span>${esc(P(post.rubric))}${S(post.rubric) ? ` <span class="dim">/ ${esc(S(post.rubric))}</span>` : ""}</span><span>${i === 0 && n > 1 && fmt === "post" ? `${esc(P(B.swipe))} →` : esc(B.handle)}</span></footer>`;
    const deco = B.deco ? B.deco(s, i, n, fmt) : "";
    const html = T[s.type](s, post);
    return `<section class="slide f-${fmt} t-${s.type} tone-${tone} ${s.facade ? "has-facade" : ""} ${s.photo ? `shade-${s.at === "top" ? "top" : "bottom"}` : ""}" style="height:${SIZES[fmt]}px" data-i="${i + 1}"${s.t != null ? ` data-t="${s.t}"` : ""}>
      ${bg}${deco}${chrome}<div class="body">${html}</div></section>`;
  }

  // ---------- motion ----------
  // A slide may be drawn as CSS animation on a timeline. seek() parks every
  // animation under root at t seconds and redraws the counters, so one slide
  // gives several carousel stills (slide.t). Opened by hand, the page plays.
  //
  //   data-count="from,to,t0,t1"   seconds counted down as H:MM:SS, eased in
  //   data-clock="HH:MM,min,t0,t1"  a wall clock moved on by min minutes, eased in

  const hms = (v) => {
    v = Math.max(0, Math.round(v));
    return `${Math.floor(v / 3600)}:${String(Math.floor(v / 60) % 60).padStart(2, "0")}:${String(v % 60).padStart(2, "0")}`;
  };
  function seek(root, t) {
    root.getAnimations({ subtree: true }).forEach((a) => { a.pause(); a.currentTime = t * 1000; });
    root.querySelectorAll("[data-count]").forEach((el) => {
      const [from, to, t0, t1] = el.dataset.count.split(",").map(Number);
      const k = Math.min(1, Math.max(0, (t - t0) / (t1 - t0)));
      el.textContent = hms(from + (to - from) * Math.pow(k, 1.8));
    });
    root.querySelectorAll("[data-clock]").forEach((el) => {
      const [hm, add, t0, t1] = el.dataset.clock.split(",");
      const [h, m] = hm.split(":").map(Number);
      const k = Math.min(1, Math.max(0, (t - t0) / (t1 - t0)));
      const v = Math.floor(h * 60 + m + Number(add) * Math.pow(k, 1.8)) % 1440;
      el.textContent = `${String(Math.floor(v / 60)).padStart(2, "0")}:${String(v % 60).padStart(2, "0")}`;
    });
  }
  KIT.seek = seek;
  KIT.h.hms = hms;

  // ---------- loading ----------

  function loadScript(src) {
    return new Promise((ok, fail) => {
      const el = document.createElement("script");
      el.src = src + "?t=" + Date.now();
      el.onload = ok;
      el.onerror = () => fail(new Error(`cannot load ${src}`));
      document.head.appendChild(el);
    });
  }
  async function loadPost(src) {
    window.POST = null;
    await loadScript(`/social/${src}/post.js`);
    if (!window.POST) throw new Error(`${src}/post.js did not set window.POST`);
    return window.POST;
  }
  function photos(root) {
    const urls = new Set();
    root.querySelectorAll("[style*='background-image']").forEach((el) => {
      const m = /url\('([^']+)'\)/.exec(el.getAttribute("style"));
      if (m) urls.add(m[1]);
    });
    return Promise.all([...urls].map((u) => new Promise((ok, fail) => {
      const im = new Image();
      im.onload = ok;
      im.onerror = () => fail(new Error(`photo missing: ${u}`));
      im.src = u;
    })));
  }

  // text must stay inside the body box, and the body box inside the slide
  function checkFit() {
    document.querySelectorAll(".slide").forEach((slide) => {
      const body = slide.querySelector(".body");
      if (!body) return;
      const sr = slide.getBoundingClientRect(), br = body.getBoundingClientRect();
      if (!slide.classList.contains("t-phone") && body.scrollHeight > body.clientHeight + 2)
        console.warn(`overflow: slide ${slide.dataset.i} body is ${body.scrollHeight - body.clientHeight}px too tall`);
      body.querySelectorAll(".e-head, .e-serif, .e-word, .e-st-p, .e-sub, .e-site, .p, .s, .display, .statement, .site, .dial-num, .znum, td, th, .fc-text, .fit, .d-word, .po-title, .mast-title, .pl-latin, .n-head, .n-body, .b-p, .oh-text, .rv-q, .pc-msg, .nt-list span").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || el.closest(".phone")) return; // the phone bleeds off the edge on purpose
        if (r.right > sr.right - 40 || r.left < sr.left + 40 || r.bottom > sr.bottom - 40)
          console.warn(`overflow: slide ${slide.dataset.i} "${el.textContent.trim().slice(0, 40)}" leaves the safe area`);
        if (el.scrollWidth > el.clientWidth + 2)
          console.warn(`overflow: slide ${slide.dataset.i} "${el.textContent.trim().slice(0, 40)}" is clipped`);
      });
    });
  }

  // shrink .fit elements until their longest word fits the box
  function autofit() {
    document.querySelectorAll(".fit").forEach((el) => {
      let size = parseFloat(getComputedStyle(el).fontSize);
      while (el.scrollWidth > el.clientWidth + 1 && size > 24) {
        size *= 0.95;
        el.style.fontSize = size + "px";
      }
    });
  }

  KIT.boot = async function () {
    const q = new URLSearchParams(location.search);
    try {
      if (q.get("grid")) {
        // every post at the cell it holds once all nine are out; a post not
        // made yet shows its bare slice of the facade, dimmed
        const bySlot = {};
        for (const src of q.get("grid").split(",")) {
          const k = parseInt(src.split("/").pop(), 10);
          if (k >= 1 && k <= 9) bySlot[k] = src;
        }
        const cells = [];
        for (let k = 9; k >= 1; k--) {
          let inner;
          if (bySlot[k]) {
            const post = await loadPost(bySlot[k]);
            inner = frame(post, post.slides[0], 0, post.slides.length);
          } else {
            inner = `<section class="slide f-post tone-photo empty-slot has-facade" style="height:1350px">${window.ART.facadeSlice(B.id, k)}<div class="slot-n">${k}</div></section>`;
          }
          cells.push(`<div class="gcell"><div class="gin">${inner}</div></div>`);
        }
        document.body.className = "gridmode";
        document.body.innerHTML = `<div class="gbar"><b>${esc(B.handle)}</b><span>${Object.keys(bySlot).length} of 9 · final layout · 3:4 crop</span></div><div class="grid">${cells.join("")}</div>`;
      } else {
        const post = await loadPost(q.get("src"));
        const n = post.slides.length;
        document.body.innerHTML = post.slides.map((s, i) => frame(post, s, i, n)).join("");
        if (q.get("sheet")) document.body.className = "sheet";
      }
      await document.fonts.ready;
      await photos(document.body);
      autofit();
      // a still is never shot mid-animation: without its own t it shows the end state
      document.querySelectorAll(".slide").forEach((el) => seek(el, el.dataset.t ? parseFloat(el.dataset.t) : 999));
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      if (!q.get("sheet") && !q.get("grid")) checkFit();
      window.__ready = true;
    } catch (e) {
      window.__error = e.message;
    }
  };
})();
