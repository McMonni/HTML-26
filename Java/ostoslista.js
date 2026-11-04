// Apufunktion luominen tuotteiden tulostamiseen HTML-listaan (ul)
    function tulostaLista(elementinId, taulukko) {
        const listaElementti = document.getElementById(elementinId);
        listaElementti.innerHTML = ""; // Tyhjennetään lista varmuuden vuoksi
        
        taulukko.forEach(tuote => {
            const li = document.createElement("li");
            li.textContent = tuote;
            listaElementti.appendChild(li);
        });
    }

    // 1. Alkuperäinen 5 tuotteen taulukko
    let tuotteet = ["Maito", "Leipä", "Kahvi", "Juusto", "Omena"];
    tulostaLista("alkuperainen", tuotteet);

    // 2. Lisätään tuote push-metodilla
    tuotteet.push("Banaani");
    tulostaLista("push-vaihe", tuotteet);

    // 3. Poistetaan viimeinen tuote pop-metodilla
    let poistettuLopusta = tuotteet.pop();
    document.getElementById("pop-log").textContent = `Poistettiin lopusta: "${poistettuLopusta}"`;
    tulostaLista("pop-vaihe", tuotteet);

    // 4. Poistetaan ensimmäinen tuote shift-metodilla
    let poistettuAlusta = tuotteet.shift();
    document.getElementById("shift-log").textContent = `Poistettiin alusta: "${poistettuAlusta}"`;
    tulostaLista("lopullinen", tuotteet);
