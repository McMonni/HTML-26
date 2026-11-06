const asetukset = { id: 1, teema: 'dark', kieli: 'fi' };

// 2. Pura teema ja kieli omiksi muuttujiksi
const { teema, kieli } = asetukset;
console.log("Teema:", teema); // 'dark'
console.log("Kieli:", kieli); // 'fi'

console.log("\n-----------------------------------\n");

// 3. Pura fonttikoko oletusarvolla 16. Testataan eri tilanteet:
console.log("--- Fonttikoon testaus ---");

// Tilanne A: fonttikoko puuttuu (käyttää oletusta 16)
const { fonttikoko: fsA = 16 } = asetukset;
console.log("A (puuttuu):", fsA); // 16

// Tilanne B: fonttikoko on 20
const asetukset20 = { ...asetukset, fonttikoko: 20 };
const { fonttikoko: fsB = 16 } = asetukset20;
console.log("B (arvo 20):", fsB); // 20

// Tilanne C: fonttikoko on null
// Huom: JS-oletusarvo aktivoituu vain jos arvo on undefined. Null on arvo itsessään.
const asetuksetNull = { ...asetukset, fonttikoko: null };
const { fonttikoko: fsC = 16 } = asetuksetNull;
console.log("C (arvo null):", fsC); // null

console.log("\n-----------------------------------\n");

// 4. Poimi id erikseen ja kerää loput asetukset uuteen objektiin rest-operaattorilla (...)
const { id, ...loputAsetukset } = asetukset;
console.log("Poimittu ID:", id); // 1
console.log("Loput asetukset uutena objektina:", loputAsetukset); // { teema: 'dark', kieli: 'fi' }

console.log("\n-----------------------------------\n");

// 5. HAASTE: Funktio, joka käyttää destructuringia suoraan parametrilistassa
function kasitteleAsetukset({ teema, kieli, fonttikoko = 16 }) {
    console.log(`Funktion sisällä -> Teema: ${teema}, Kieli: ${kieli}, Fonttikoko: ${fonttikoko}`);
}

console.log("--- Haastetehtävän funktion ajo ---");
kasitteleAsetukset(asetukset); // Tulostaa oletusfonttikoolla 16
kasitteleAsetukset({ teema: 'light', kieli: 'en', fonttikoko: 24 }); // Tulostaa annetuilla arvoilla