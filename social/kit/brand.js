// sosed.place — voice and chrome. The courtyard face: warm, on «ты», greets with ХОЙ.
window.BRAND = {
  id: "sosed",
  primary: "ru",
  secondary: "en",
  handle: "@sosed.place",
  site: "sosed.place",
  mark: 'сосед<span class="dot">●</span>',
  swipe: { ru: "листай", en: "swipe" },

  // circular stamp on the first slide of a post
  deco(s, i) {
    if (i !== 0 || s.stamp === false || s.type === "avatar" || s.type === "highlight") return "";
    const ring = "СОСЕД · ДВОР · ХОЙ · SOSED · YARD · ";
    return `<svg class="stamp" viewBox="0 0 230 230">
      <defs><path id="sp" d="M115 115 m-88 0 a88 88 0 1 1 176 0 a88 88 0 1 1 -176 0"/></defs>
      <circle cx="115" cy="115" r="111" class="c1"/><circle cx="115" cy="115" r="66" class="c2"/>
      <text><textPath href="#sp">${ring}</textPath></text>
      <text x="115" y="136" class="core">${s.stampCore || "ХОЙ"}</text>
    </svg>`;
  },

  avatar() {
    return `<div class="av-word">ХОЙ</div>`;
  },
};
