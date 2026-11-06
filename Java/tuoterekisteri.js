const tuotteet = [
    { id: 1, nimi: "Maito", hinta: 1.85, saldo: 15 },
    { id: 2, nimi: "Kahvi", hinta: 5.95, saldo: 8 },
    { id: 3, nimi: "Leipä", hinta: 3.20, saldo: 0 }, // Saldo asetettu nollaksi
    { id: 4, nimi: "Juusto", hinta: 6.40, saldo: 4 }
];

console.log("Alkuperäiset tuotteet:");
console.log(tuotteet);
console.log("\n-----------------------------------\n");

// 3. Haetaan id 2 ja id 99 sekä ilmoitetaan jos ei löydy
const etsitytIdt = [2, 99];

etsitytIdt.forEach(id => {
    const loytynytTuote = tuotteet.find(tuote => tuote.id === id);
    
    if (loytynytTuote) {
        console.log(`Tuote id:llä ${id} löytyi:`, loytynytTuote);
    } else {
        console.log(`Tuotetta id:llä ${id} ei löytynyt.`);
    }
});

console.log("\n-----------------------------------\n");

// 4. Tehdään uusi taulukko, jossa id 2:n hinta on 19.90 (säilyttäen alkuperäinen taulukko)
const paivitetytTuotteet = tuotteet.map(tuote => {
    if (tuote.id === 2) {
        // Luodaan uusi objekti ja muutetaan vain hinta
        return { ...tuote, hinta: 19.90 };
    }
    // Palautetaan muut tuotteet sellaisenaan
    return tuote;
});

console.log("Uusi päivitetty taulukko (id 2 hinta muutettu):");
console.log(paivitetytTuotteet);

console.log("\nVarmistus: Alkuperäinen taulukko pysyi muuttumattomana:");
console.log(tuotteet);
// Haaste: Suodatetaan tuotteet, joiden saldo > 0, ja muodostetaan niistä nimitekstit
const haasteTulokset = tuotteet
    .filter(tuote => tuote.saldo > 0)
    .map(tuote => `${tuote.nimi} - ${tuote.hinta.toFixed(2)} €`);

console.log("Haasteen tulos (tuotteet, joiden varastossa on tavaraa):");
console.log(haasteTulokset);