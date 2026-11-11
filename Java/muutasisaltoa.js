// 1. Hae h1 ID:n avulla
const otsikko = document.getElementById("title");

// 2. Vaihda otsikoksi “DOM toimii!”
otsikko.textContent = "DOM toimii!";

// 3. Hae status-luokka
const statusTeksti = document.querySelector(".status");

// 4. Vaihda tekstiksi “Valmis”
statusTeksti.textContent = "Valmis";

// Lisää status-elementille luokka "success"
statusTeksti.classList.add("success");