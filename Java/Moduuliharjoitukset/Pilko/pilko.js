// pilko.js – laskenta, DOM-käsittely ja localStorage samassa tiedostossa
// Harjoitus: refaktoroi eri vastuualueet omiin moduuleihinsa.

const STORAGE_KEY = "ostoskorinTuotteet";
let tuotteet = [];

// localStorage: lue tallennetut tuotteet
function lataaTuotteet() {
  try {
    const tallennetut = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    tuotteet = Array.isArray(tallennetut) ? tallennetut : [];
  } catch (virhe) {
    console.error("Tallennettuja tuotteita ei voitu lukea:", virhe);
    tuotteet = [];
  }
}

// localStorage: tallenna tuotteet
function tallennaTuotteet() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tuotteet));
}

// Laskenta: yksittäisen tuotteen rivisumma
function laskeRivisumma(tuote) {
  return tuote.hinta * tuote.maara;
}

// Laskenta: kaikkien tuotteiden kokonaissumma
function laskeYhteensa() {
  return tuotteet.reduce((summa, tuote) => summa + laskeRivisumma(tuote), 0);
}

function muotoileEurot(summa) {
  return summa.toLocaleString("fi-FI", {
    style: "currency",
    currency: "EUR",
  });
}

// DOM: piirrä tuotteet sivulle
function naytaTuotteet() {
  const lista = document.querySelector("#tuotelista");
  const yhteensa = document.querySelector("#yhteensa");

  lista.replaceChildren();

  tuotteet.forEach((tuote, indeksi) => {
    const rivi = document.createElement("li");
    const teksti = document.createElement("span");

    teksti.textContent =
      `${tuote.nimi} – ${tuote.maara} kpl × ` +
      `${muotoileEurot(tuote.hinta)} = ` +
      `${muotoileEurot(laskeRivisumma(tuote))} `;

    const poista = document.createElement("button");
    poista.type = "button";
    poista.textContent = "Poista";

    poista.addEventListener("click", () => {
      tuotteet.splice(indeksi, 1);
      tallennaTuotteet();
      naytaTuotteet();
    });

    rivi.append(teksti, poista);
    lista.appendChild(rivi);
  });

  yhteensa.textContent = muotoileEurot(laskeYhteensa());
}

// DOM + laskenta + localStorage: käsittele lomakkeen lähetys
function lisaaTuote(tapahtuma) {
  tapahtuma.preventDefault();

  const lomake = tapahtuma.currentTarget;

  const nimi = lomake.elements.namedItem("nimi").value.trim();
  const hinta = Number(lomake.elements.namedItem("hinta").value);
  const maara = Number(lomake.elements.namedItem("maara").value);

  if (
    !nimi ||
    !Number.isFinite(hinta) ||
    hinta < 0 ||
    !Number.isInteger(maara) ||
    maara < 1
  ) {
    alert(
      "Anna tuotteen nimi, kelvollinen hinta " +
        "ja positiivinen kokonaislukumäärä.",
    );
    return;
  }

  tuotteet.push({ nimi, hinta, maara });

  tallennaTuotteet();
  naytaTuotteet();
  lomake.reset();
}

// DOM: käynnistä sovellus vasta, kun HTML on ladattu
function kaynnista() {
  lataaTuotteet();
  naytaTuotteet();

  document.querySelector("#tuotelomake").addEventListener("submit", lisaaTuote);
}

document.addEventListener("DOMContentLoaded", kaynnista);
