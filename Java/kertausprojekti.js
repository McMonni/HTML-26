// 1. Taulukko, jossa on 5 kurssiobjektia (mukana id data-course-id:tä varten)
const kurssit = [
    { id: 101, nimi: "HTML & CSS perusteet", taso: "Alkeet", aktiivinen: true },
    { id: 102, nimi: "JavaScript-ohjelmointi", taso: "Keskitaso", aktiivinen: true },
    { id: 103, nimi: "DOM-manipulaatio", taso: "Keskitaso", aktiivinen: false },
    { id: 104, nimi: "React-sovelluskehitys", taso: "Edistynyt", aktiivinen: true },
    { id: 105, nimi: "Tietokannat ja SQL", taso: "Alkeet", aktiivinen: false }
];

// Haetaan HTML-sivulta grid-elementti
const grid = document.querySelector(".grid");

// 2. Käydään kurssit läpi ja rakennetaan jokaisesta article-kortti
for (const kurssi of kurssit) {
    // Luodaan tarvittavat elementit createElement()-menetelmällä
    const article = document.createElement("article");
    const otsikko = document.createElement("h2");
    const tasoTeksti = document.createElement("p");
    const tilaTeksti = document.createElement("p");

    // Asetetaan tekstisisällöt turvallisesti textContentilla (ei innerHTML:ää)
    otsikko.textContent = kurssi.nimi;
    tasoTeksti.textContent = `Taso: ${kurssi.taso}`;
    tilaTeksti.textContent = kurssi.aktiivinen ? "Tila: Aktiivinen" : "Tila: Ei aktiivinen";

    // 3. Käytetään classListia aktiivisen/ei-aktiivisen tyylin näyttämiseen
    article.classList.add("course-card");
    if (kurssi.aktiivinen) {
        article.classList.add("active");
    } else {
        article.classList.add("inactive");
    }

    // 4. Lisätään korttiin data-course-id ja tulostetaan dataset-arvo konsoliin
    article.dataset.courseId = kurssi.id;
    console.log("Kortin courseId:", article.dataset.courseId);

    // Kootaan kortin sisältö ja lisätään valmis kortti grid-elementtiin
    article.append(otsikko, tasoTeksti, tilaTeksti);
    grid.appendChild(article);
}