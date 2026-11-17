const lomake = document.getElementById('lisayslomake');
const lahetaPainike = document.getElementById('laheta-painike');
const tilaElementti = document.getElementById('tila-alue');
const vastausAlue = document.getElementById('vastaus-alue');

lomake.addEventListener('submit', async (event) => {
  event.preventDefault();

  // 1. ESTETÄÄN KAKSOISLÄHETYS: Lukitaan painike heti lähetyksen alkaessa
  lahetaPainike.disabled = true;
  lahetaPainike.textContent = 'Lähetetään...';
  tilaElementti.textContent = '';
  vastausAlue.style.display = 'none';

  // 2. KERÄTÄÄN TIEDOT FORMDATALLA JA MUUTETAAN OBJEKTIKSI
  const formData = new FormData(lomake);
  const lomakeObjekti = Object.fromEntries(formData.entries());

  try {
    // 3. LÄHETETÄÄN POST-PYYNTÖ JSONINA
    const response = await fetch('https://dummyjason.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lomakeObjekti)
    });

    // 4. KÄSITELLÄÄN 4XX- JA 5XX-TILANTEET ERIKSEEN
    if (!response.ok) {
      if (response.status >= 400 && response.status < 500) {
        throw new Error(`Asiakasvirhe (${response.status}): Tarkista syötetyt tiedot.`);
      } else if (response.status >= 500) {
        throw new Error(`Palvelinvirhe (${response.status}): Palvelimella on tilapäinen häiriö. Yritä myöhemmin uudelleen.`);
      } else {
        throw new Error(`Odottamaton virhe: ${response.status}`);
      }
    }

    // 5. NÄYTETÄÄN PALVELIMEN VASTAUS SIVULLA
    const vastausData = await response.json();
    tilaElementti.textContent = 'Tiedot tallennettu onnistuneesti!';
    vastausAlue.textContent = JSON.stringify(vastausData, null, 2);
    vastausAlue.style.display = 'block';
    lomake.reset();

  } catch (virhe) {
    console.error('Lähetys epäonnistui:', virhe);
    tilaElementti.textContent = virhe.message;
  } finally {
    // Vapautetaan painike lopuksi, onnistui lähetys tai ei
    lahetaPainike.disabled = false;
    lahetaPainike.textContent = 'Lähetä tiedot';
  }
});