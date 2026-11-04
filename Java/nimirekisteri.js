// 1. Luodaan alkuperäinen nimilista ja tulostetaan se
let nimet = ["Anna", "Matti", "Ville", "Eeva"];
console.log("Alkuperäinen lista:", nimet);

// 2. Lisätään listaan uusia nimiä push-metodilla
nimet.push("Kalle");
nimet.push("Sari");
console.log("\nLista uusien nimien lisäyksen jälkeen:", nimet);

// 3. Haetaan nimilistasta ja käytetään indexOf-metodia indeksin selvittämiseen
function haeNimi(lista, etsittavaNimi) {
    // indexOf palauttaa nimen paikan (0, 1, 2...) tai -1 jos nimeä ei löydy
    let indeksi = lista.indexOf(etsittavaNimi);
    
    if (indeksi !== -1) {
        console.log(`Haku: Nimi "${etsittavaNimi}" LÖYTYI listalta indeksistä ${indeksi}!`);
    } else {
        console.log(`Haku: Nimeä "${etsittavaNimi}" EI LÖYTYNYT listalta.`);
    }
}

console.log("\n--- Tehdään haut ---");
haeNimi(nimet, "Ville"); // Löytyy
haeNimi(nimet, "Mikko"); // Ei löydy

// 4. Kopioidaan lista spread-operaattorilla ja järjestetään kopio sort()-metodilla
let jarjestetytNimet = [...nimet].sort();

// 5. Tulostetaan molemmat listat join()-metodin avulla eroteltuna
console.log("\n--- Tulokset muotoiltuna (join) ---");
console.log("Alkuperäinen lista ennallaan:", nimet.join(", "));
console.log("Aakkosjärjestetty kopio :", jarjestetytNimet.join(", "));