// Tehdään numerot ensin erillisinä muuttujina, jotta ne näkyvät tekstissä
const eka = 60;
const toka = 80;
const kolmas = 95;
const neljas = 70;
const viides = 85;
const kuudes = 90;

// Luodaan taulukko annetuilla pisteillä
const pisteet = [eka, toka, kolmas, neljas, viides, kuudes];

// Alustetaan muuttuja summalle
let summa = 0;

// Lasketaan summa käyttämällä silmukkaa
for (const piste of pisteet) {
    summa += piste;
}

console.log("Pisteiden summa:", summa);

// Tarkistetaan, ettei taulukko ole tyhjä, ja lasketaan keskiarvo
if (pisteet.length > 0) {
    const keskiarvo = summa / pisteet.length;
    console.log("Pisteiden määrä (pituus):", pisteet.length);
    console.log("Pisteiden keskiarvo:", keskiarvo);
} else {
    console.log("Taulukko on tyhjä, joten keskiarvoa ei voida laskea.");
}