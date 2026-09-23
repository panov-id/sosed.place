// Editorial sample: real photos, one line per slide. Credits in caption.txt.
window.POST = {
  rubric: { ru: "Двор", en: "The yard" },
  slides: [
    {
      type: "bleed",
      photo: "/social/img/cat-bench.jpg",
      photoPos: "6% 20%",
      at: "bottom",
      stamp: false,
      title: { ru: "Лавка\n*занята.*", en: "The bench is taken." },
      caption: { ru: "Кот с третьего · знает всех", en: "" },
    },
    {
      type: "bleed",
      photo: "/social/img/lane-bench.jpg",
      photoPos: "40% center",
      at: "bottom",
      title: { ru: "А ты знаешь,\nкто живёт\n*напротив?*", en: "Do you know who lives across the lane?" },
      caption: { ru: "Какопетрия · октябрь", en: "" },
    },
    {
      type: "sticker",
      photo: "/social/img/bench-close.jpg",
      photoPos: "center 60%",
      text: { ru: "Одна фраза — людям рядом.\nЧерез 4 ч 20 мин её нет.", en: "One line to the people nearby. After 4 h 20 min it's gone." },
    },
    {
      type: "ecta",
      tone: "accent",
      title: { ru: "Садись\nрядом.", en: "Take a seat." },
      action: { ru: "Лист ожидания — ссылка в шапке профиля", en: "Waitlist — link in bio" },
    },
  ],
};
