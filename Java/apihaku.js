const statusEl = document.getElementById("status");
const retryBtn = document.getElementById("retry-btn");
const productListEl = document.getElementById("product-list");

async function loadProducts() {
  // 1. loading true (ja nollataan edelliset virheilmoitukset/napit)
  statusEl.textContent = "Ladataan tuotteita...";
  retryBtn.style.display = "none";
  productListEl.innerHTML = "";

  try {
    // 2. fetch (heittää automaattisesti verkkovirheen, jos yhteys katkeaa)
    const response = await fetch("https://example.com");

    // 3. response.ok (käsitellään HTTP-virheet kuten 404 tai 500 omana virheenä)
    if (!response.ok) {
      throw new Error(`HTTP-virhe! Tilakoodi: ${response.status}`);
    }

    // 4. json (muunnetaan vastaus ja varmistetaan datan muoto)
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Palvelimelta saatu data ei ole odotetussa taulukkomuodossa.");
    }

    // 5. render (renderöidään data vasta kaikkien tarkistusten jälkeen)
    statusEl.textContent = "";
    renderProducts(data);

  } catch (error) {
    // 6. catch (tekninen virhe konsoliin, selkeä viesti käyttäjälle)
    console.error("Tuotteiden lataus epäonnistui:", error);
    statusEl.textContent = "Tuotteiden lataaminen epäonnistui. Tarkista verkkoyhteys ja yritä uudelleen.";

    // Haaste: näytetään Retry-painike virhetilanteessa
    retryBtn.style.display = "inline-block";

  } finally {
    // 7. finally (suoritetaan aina riippumatta siitä, onnistuiko haku vai ei)
    // Jos käytössä olisi erillinen latausanimaatio (spinner), se piilotettaisiin tässä:
    // loaderEl.hidden = true;
    console.log("Latausprosessi päättyi.");
  }
}

function renderProducts(products) {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = product.name;
    productListEl.appendChild(li);
  });
}

// Haaste: Retry-painike kutsuu funktiota uudelleen ilman sivun päivitystä
retryBtn.addEventListener("click", loadProducts);

// Käynnistetään ensimmäinen lataus
loadProducts();