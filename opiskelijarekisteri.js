//  Luodaan opiskelijat-taulukko objekteina
// Lisätään id-kentät haastetehtävää varten
const opiskelijat = [
  { id: 1, nimi: "Aino", pisteet: 82, aktiivinen: true },
  { id: 2, nimi: "Mika", pisteet: 64, aktiivinen: false },
  { id: 3, nimi: "Sara", pisteet: 78, aktiivinen: true }
];

//  Valitse aktiiviset opiskelijat filter()-metodilla
const aktiiviset = opiskelijat.filter(o => o.aktiivinen);


//  Muodosta heistä tekstit ”Nimi – pisteet p” map()-metodilla
const muotoillutTekstit = aktiiviset.map(o => `${o.nimi} – ${o.pisteet} p`);
console.log("Muotoillut tekstit:", muotoillutTekstit);
// Tulostaa: [ 'Aino – 82 p', 'Sara – 78 p' ]


// Laske aktiivisten pisteet yhteen reduce()-metodilla. Jaa heidän määrällään, jos määrä on yli 0.
const aktiivistenMaara = aktiiviset.length;
let aktiivistenKeskiarvo = 0;

if (aktiivistenMaara > 0) {
  const pisteidenSumma = aktiiviset.reduce((acc, o) => acc + o.pisteet, 0);
  aktiivistenKeskiarvo = pisteidenSumma / aktiivistenMaara;
}
console.log("Aktiivisten pisteiden keskiarvo:", aktiivistenKeskiarvo); // Tulostaa: 80


//  HAASTE
// "Aktiivisten keskiarvo on 80. Hae id 2 ja id 99 find()-metodilla. Ilmoita, jos opiskelijaa ei löydy."
console.log(`\n★ HAASTE: Aktiivisten keskiarvo on ${aktiivistenKeskiarvo}.`);

// Apufunktio opiskelijan hakemiseen ja ilmoittamiseen
function haeOpiskelijaIdlla(etsittavaId) {
  const loytynyt = opiskelijat.find(o => o.id === etsittavaId);
  
  if (loytynyt) {
    console.log(`Löytyi opiskelija id:llä ${etsittavaId}: ${loytynyt.nimi}`);
  } else {
    console.log(`Opiskelijaa id:llä ${etsittavaId} ei löytynyt.`);
  }
}

// Haetaan id 2 (Mika) ja id 99 (ei olemassa)
haeOpiskelijaIdlla(2);  // Tulostaa: Löytyi opiskelija id:llä 2: Mika
haeOpiskelijaIdlla(99); // Tulostaa: Opiskelijaa id:llä 99 ei löytynyt.