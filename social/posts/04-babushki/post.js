// Names in speech are vocative/nominative only (memory: names-not-declined).
window.POST = {
  rubric: { ru: "Бабушки на лавке", en: "The bench" },
  slides: [
    {
      type: "masthead",
      facade: 4,
      object: true,
      stamp: false,
      issue: { ru: "Выпуск № 1 · октябрь", en: "" },
      price: "0 €",
      title: { ru: "Бабушки\nна лавке\nуволены", en: "The bench grannies have been fired" },
      left: { scarf: "#8a2a3a", coat: "#6b4a8a", mood: "sly", prop: "seeds" },
      right: { coat: "#2f5d6a", mood: "shock", prop: "cane" },
      burst: { ru: "Комикс!", en: "" },
    },
    {
      type: "comic",
      panel: "1",
      caption: { ru: "Лимассол. Октябрь. +29", en: "Limassol. October. 29 °C" },
      left: { scarf: "#8a2a3a", coat: "#6b4a8a", mood: "talk", prop: "seeds" },
      right: { coat: "#2f5d6a", mood: "flat", prop: "cane" },
      bubbles: [
        { side: "l", x: 60, y: 250, w: 520, text: { ru: "Люда, слыхала? Молодёжь теперь в «соседе» знакомится.", en: "Heard? The young ones meet on 'sosed' now." } },
        { side: "r", x: 600, y: 440, w: 380, text: { ru: "И что пишут?", en: "And what do they write?" } },
      ],
    },
    {
      type: "comic",
      panel: "2",
      left: { scarf: "#8a2a3a", coat: "#6b4a8a", mood: "shock", prop: "seeds" },
      right: { coat: "#2f5d6a", mood: "shock", prop: "cane" },
      bubbles: [
        { side: "l", x: 50, y: 170, w: 600, shout: true, text: { ru: "А не узнаешь! Через четыре часа всё исчезает!", en: "You'll never know! It all vanishes in four hours!" } },
        { side: "r", x: 560, y: 450, w: 420, text: { ru: "Как — исчезает?!", en: "What do you mean, vanishes?!" } },
      ],
    },
    {
      type: "comic",
      panel: "3",
      left: { scarf: "#8a2a3a", coat: "#6b4a8a", mood: "shock", prop: "seeds" },
      right: { coat: "#2f5d6a", mood: "sly", prop: "phone" },
      bubbles: [
        { side: "r", x: 440, y: 170, w: 560, text: { ru: "Ни почты, ни телефона… Не выяснишь, кто написал. Придётся самой спросить.", en: "No email, no phone number… You can't find out who wrote it. I'll have to ask myself." } },
        { side: "l", x: 60, y: 490, w: 300, shout: true, text: { ru: "Люда!!!", en: "" } },
      ],
    },
    {
      type: "cta",
      tone: "accent",
      eyebrow: { ru: "Мораль", en: "The moral" },
      title: { ru: "Бабушки\nсдались.\nА ты?", en: "The grannies gave in. And you?" },
      action: { ru: "Лист ожидания — ссылка в шапке профиля", en: "Waitlist — link in bio" },
      chip: { ru: "по приглашению · скоро", en: "by invitation · soon" },
    },
  ],
};
