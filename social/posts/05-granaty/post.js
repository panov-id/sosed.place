window.POST = {
  rubric: { ru: "Доска у подъезда", en: "The door board" },
  slides: [
    {
      type: "notice",
      facade: 5,
      object: true,
      stamp: false,
      rot: 2.5,
      eyebrow: { ru: "Доска у подъезда · 02", en: "The door board · 02" },
      head: { ru: "Раздаю гранаты!", en: "" },
      text: { ru: "Дерево не остановить.\nБерите сколько унесёте.", en: "Giving away pomegranates! The tree won't stop. Take as many as you can carry." },
      sign: { ru: "— 3 эт.", en: "" },
      tabs: { n: 6, text: { ru: "гранат ×1", en: "pomegranate ×1" }, torn: [0, 1, 3, 5] },
    },
    {
      type: "phone",
      eyebrow: { ru: "Как это выглядит в «соседе»", en: "How it looks on sosed" },
      title: { ru: "Офферы\nсоседей", en: "Neighbours' offers" },
      screen: { ru: "Рядом", en: "Nearby" },
      radius: "1 km",
      cards: [
        { offer: true, tag: { ru: "дом · 30 м", en: "" }, text: { ru: "Раздаю гранаты. Дерево не остановить, я на третьем.", en: "" }, time: "3:12" },
        { offer: true, tag: { ru: "двор · 200 м", en: "" }, text: { ru: "Отдам детский велосипед, ребёнок вырос за лето.", en: "" }, time: "1:40" },
        { offer: true, tag: { ru: "квартал · 800 м", en: "" }, text: { ru: "Лишний билет на концерт сегодня. Отдам даром.", en: "" }, time: "0:25" },
      ],
    },
    {
      type: "zeros",
      eyebrow: { ru: "Сколько стоит", en: "What it costs" },
      title: { ru: "Отдать по-соседски", en: "Giving, neighbour-style" },
      items: [
        { n: "0", t: { ru: "за размещение оффера", en: "to post an offer" } },
        { n: "0", t: { ru: "внутреннего баланса и монеток", en: "in-app balance or coins" } },
        { n: "∞", t: { ru: "гранатов на третьем этаже", en: "pomegranates on the third floor" } },
      ],
      note: { ru: "Сервис денег не берёт. Живёт на добровольных донатах.", en: "The service takes no money. It runs on voluntary donations." },
    },
    {
      type: "notice",
      tone: "accent",
      rot: -1.5,
      eyebrow: { ru: "Объявление", en: "Notice" },
      head: { ru: "Гранаты кончились", en: "" },
      text: { ru: "Зато открывается «сосед».\nЛист ожидания —\nв шапке профиля.", en: "Pomegranates are gone. sosed is coming instead. Waitlist — link in bio." },
      tabs: { n: 5, text: { ru: "sosed.place", en: "sosed.place" }, torn: [1, 2] },
    },
  ],
};
