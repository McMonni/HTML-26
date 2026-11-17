const tilaElementti = document.getElementById('tila-alue');
const listaElementti = document.getElementById('kayttajalista');
const uudelleenPainike = document.getElementById('yrita-uudelleen');

async function haeKayttajat() {
  // 1. LOADING-TILA
  tilaElementti.textContent = 'Ladataan käyttäjiä...';
  listaElementti.innerHTML = '';
  uudelleenPainike.style.display = 'none';

  try {
    const response = await fetch('https://dummyjson.com/users');

    if (!response.ok) {
      throw new Error(`HTTP-virhe! Tilakoodi: ${response.status}`);
    }

    const data = await response.json();
    const users = data.users; // Tallennetaan käyttäjätaulukko omaan muuttujaansa

    // 2. EMPTY-TILA
    if (!users || users.length === 0) {
      tilaElementti.textContent = 'Ei näytettäviä käyttäjiä.';
      return;
    }

    // Tulostetaan käyttäjät listaan
    tilaElementti.textContent = '';
    users.forEach(kayttaja => {
      const listakohta = document.createElement('li');
      listakohta.textContent = `${kayttaja.firstName} ${kayttaja.lastName} – ${kayttaja.email}`;
      listaElementti.appendChild(listakohta);
    });

  } catch (virhe) {
    // 3. ERROR-TILA
    console.error('Virhe tietojen haussa:', virhe);
    tilaElementti.textContent = 'Virhe käyttäjien lataamisessa. Tarkista verkkoyhteys ja yritä uudelleen.';
    uudelleenPainike.style.display = 'inline-block';
  }
}

uudelleenPainike.addEventListener('click', haeKayttajat);

haeKayttajat()