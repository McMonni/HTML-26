const searchInput = document.getElementById('searchInput');
const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
const statusMessage = document.getElementById('statusMessage');

// Apufunktio korttien suodattamiseen
function filterProducts() {
  const query = searchInput.value.toLowerCase().trim();
  const cards = productList.querySelectorAll('.product-card');

  cards.forEach((card) => {
    const title = card.querySelector('.product-title').textContent.toLowerCase();
    // Piilotetaan kortti, jos otsikko ei vastaa hakusanaa
    card.classList.toggle('hidden', !title.includes(query));
  });
}

// 1. Reaaliaikainen suodatus input-eventillä
searchInput.addEventListener('input', filterProducts);

// 2. Uuden tuotteen lisääminen (submit + preventDefault + FormData)
productForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Luetaan kenttien arvot FormData-oliolla (vaatii name-attribuutit HTML:ssä)
  const formData = new FormData(productForm);
  const title = formData.get('title').trim();
  const price = formData.get('price');

  if (!title || !price) return;

  // Luodaan uusi kortti turvallisesti DOM-metodeilla
  const card = document.createElement('div');
  card.className = 'product-card';

  const infoDiv = document.createElement('div');
  const heading = document.createElement('h3');
  heading.className = 'product-title';
  heading.textContent = title;

  const priceP = document.createElement('p');
  priceP.textContent = `${Number(price).toFixed(2)} €`;

  const favBtn = document.createElement('button');
  favBtn.type = 'button';
  favBtn.dataset.action = 'favorite';
  favBtn.textContent = 'Suosikki';

  infoDiv.append(heading, priceP);
  card.append(infoDiv, favBtn);
  productList.appendChild(card);

  // Tyhjennetään lomake ja päivitetään suodatus
  productForm.reset();
  filterProducts();

  // Näytetään saavutettava statusviesti
  statusMessage.textContent = `Tuote "${title}" lisättiin onnistuneesti!`;
});

// 3. Escape-pikanäppäin lomakkeen tyhjentämiseen
productForm.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    productForm.reset();
    statusMessage.textContent = 'Lomake tyhjennettiin.';
  }
});

// 4. Suosikki-luokan vaihto parent-event delegationilla
productList.addEventListener('click', (event) => {
  const favBtn = event.target.closest('[data-action="favorite"]');
  if (!favBtn) return;

  const card = favBtn.closest('.product-card');
  card.classList.toggle('favorite');
});