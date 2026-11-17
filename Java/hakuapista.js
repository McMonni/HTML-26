const hakulomake = document.getElementById('hakulomake');
const hakukentta = document.getElementById('hakukentta');
const tilaElementti = document.getElementById('tila-alue');
const korttiAlue = document.getElementById('kortti-alue');
const uudelleenPainike = document.getElementById('yrita-uudelleen');

let nykyinenController = null;
let viimeisinHakusana = '';

async function haeKayttajat(hakusana = '') {
  // Keskeytetään mahdollinen edellinen keskeneräinen haku
  if (nykyinenController) {
    nykyinenController.abort();
  }

  // Luodaan uusi AbortController tälle haulle
  nykyinenController = new AbortController();
  const signal = nykyinenController.signal;

  // 1. LOADING-TILA
  tilaElementti.textContent = 'Ladataan käyttäjiä...';
  korttiAlue.innerHTML = '';
  uudelleenPainike.style.display = 'none';

  try {
    // Rakennetaan URLSearchParams-hakuparametri
    const params = new URLSearchParams();
    let url = 'https://dummyjason.com/users';

    if (hakusana.trim() !== '') {
      params.append('q', hakusana.trim());
      url = `https://dummyjason.com/search?${params.toString()}`;
    }

    // Välitetään signal fetch-kutsulle
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(`HTTP-virhe! Tilakoodi: ${response.status}`);
    }

    const data = await response.json();
    const users = data.users;

    // 2. EMPTY-TILA
    if (!users || users.length === 0) {
      tilaElementti.textContent = 'Ei hakutuloksia.';
      return;
    }

    // Luodaan ja tulostetaan kortit
    tilaElementti.textContent = '';
    users.forEach(user => {
      const kortti = document.createElement('div');
      kortti.className = 'kortti';
      kortti.innerHTML = `
        <h3>${user.firstName} ${user.lastName}</h3>
        <p>${user.email}</p>
      `;
      korttiAlue.appendChild(kortti);
    });

  } catch (virhe) {
    // Jos virhe johtuu AbortControllerin keskeytyksestä, ei näytetä virheilmoitusta
    if (virhe.name === 'AbortError') {
      console.log('Edellinen haku keskeytettiin uuden haun tieltä.');
      return;
    }

    // 3. ERROR-TILA
    console.error('Virhe tietojen haussa:', virhe);
    tilaElementti.textContent = 'Virhe käyttäjien lataamisessa. Tarkista verkkoyhteys ja yritä uudelleen.';
    uudelleenPainike.style.display = 'inline-block';
  }
}

// Lomakkeen submit-handler
hakulomake.addEventListener('submit', (event) => {
  event.preventDefault(); // Estetään sivun uudelleenlataus
  viimeisinHakusana = hakukentta.value;
  haeKayttajat(viimeisinHakusana);
});

// Yritä uudelleen -painike toistaa viimeisimmän haun
uudelleenPainike.addEventListener('click', () => {
  haeKayttajat(viimeisinHakusana);
});

// Haetaan kaikki käyttäjät heti sivun auetessa
haeKayttajat();