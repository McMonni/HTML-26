//   Lähtötaulukko
const pisteet = [60, 80, 95, 70, 85, 90];

// Laske kaikkien pisteiden summa reduce()-metodilla
const summa = pisteet.reduce((acc, nykyinen) => acc + nykyinen, 0);
console.log("Pisteiden summa:", summa); // Tulostaa: 480


// Tarkista some()-metodilla, onko joku saanut vähintään 95 pistettä
const onkoVahintaan95 = pisteet.some(piste => piste >= 95);
console.log("Onko joku saanut vähintään 95 pistettä:", onkoVahintaan95); // Tulostaa: true


// Tarkista every()-metodilla, ovatko kaikki pisteet välillä 0–100
const kaikkiValilla0_100 = pisteet.every(piste => piste >= 0 && piste <= 100);
console.log("Ovatko kaikki pisteet välillä 0–100:", kaikkiValilla0_100); // Tulostaa: true


//HAASTE
// Tehdään funktio, jotta se osaa käsitellä myös tyhjän taulukon oikein
// "Keskiarvo on 80 ja vähintään 70 pisteen tuloksia on 5. Tyhjälle taulukolle tulosta Ei pisteitä."
function suoritaHaaste(taulukko) {
  if (taulukko.length === 0) {
    console.log("Ei pisteitä");
    return;
  }

  // Lasketaan keskiarvo hyödyntämällä reduce-metodia
  const sum = taulukko.reduce((acc, curr) => acc + curr, 0);
  const keskiarvo = sum / taulukko.length;

  // Suodatetaan vähintään 70 pisteen tulokset ja katsotaan määrä (.length)
  const vahintaan70Maara = taulukko.filter(piste => piste >= 70).length;

  console.log(`Keskiarvo on ${keskiarvo} ja vähintään 70 pisteen tuloksia on ${vahintaan70Maara}.`);
}

// Testataan haastetta annetuilla pisteillä
suoritaHaaste(pisteet); // Tulostaa lauseen: Keskiarvo on 80 ja vähintään 70 pisteen tuloksia on 5.

// Testataan haastetta tyhjällä taulukolla
suoritaHaaste([]); // Tulostaa: Ei pisteitä