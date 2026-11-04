// Luodaan muuttuja ja annetaan sille testiarvo
let ika = 25; 

// Haetaan HTML-elementti, johon vastaus tulostetaan
const tulosAlue = document.getElementById("tulos-alue");

// Suoritetaan luokittelu
if (ika < 0) {
    tulosAlue.innerHTML = "<strong>Testattu ikä:</strong> " + ika + "<br>Virhe: Ikä ei voi olla negatiivinen.";
    tulosAlue.style.borderLeftColor = "red";
} else if (ika <= 17) {
    tulosAlue.innerHTML = "<strong>Testattu ikä:</strong> " + ika + "<br>Ikäluokka: Lapsi / Nuori";
    tulosAlue.style.borderLeftColor = "#007BFF"; // Palautetaan oletussininen
} else if (ika <= 64) {
    tulosAlue.innerHTML = "<strong>Testattu ikä:</strong> " + ika + "<br>Ikäluokka: Aikuinen";
    tulosAlue.style.borderLeftColor = "#007BFF";
} else {
    tulosAlue.innerHTML = "<strong>Testattu ikä:</strong> " + ika + "<br>Ikäluokka: Seniori";
    tulosAlue.style.borderLeftColor = "#007BFF";
}
