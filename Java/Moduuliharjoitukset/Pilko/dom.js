// Tuodaan laskenta-työkalut sisään
import { laskeRivisumma, laskeYhteensa, muotoileEurot } from "./laskenta.js";

// Jaetaan piirtofunktio ulos päämoduulille
export function naytaTuotteet(tuotteet, poistaTuoteCallback) {
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

    // Kutsutaan päämoduulin antamaa poistofunktiota, kun nappia painetaan
    poista.addEventListener("click", () => {
      poistaTuoteCallback(indeksi);
    });

    rivi.append(teksti, poista);
    lista.appendChild(rivi);
  });

  yhteensa.textContent = muotoileEurot(laskeYhteensa(tuotteet));
}