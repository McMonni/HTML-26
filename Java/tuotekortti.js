const tuote = {
    nimi: 'Langattomat kuulokkeet',
    hinta: 79.90,
    saatavilla: false
};

// 1. Haetaan säiliöelementti luokan perusteella
const productsContainer = document.querySelector('.products');

// 2. Luodaan tarvittavat DOM-elementit
const article = document.createElement('article');
const h2 = document.createElement('h2');
const p = document.createElement('p');
const button = document.createElement('button');

// 3. Täytetään sisältö objektista
h2.textContent = tuote.nimi;
p.textContent = `${tuote.hinta} €`;
button.textContent = tuote.saatavilla ? 'Lisää ostoskoriin' : 'Loppuunmyyty';

// 4. Lisätään "sold-out"-luokka, jos tuote ei ole saatavilla
if (tuote.saatavilla === false) {
    article.classList.add('sold-out');
    button.disabled = true; // Estää napin painamisen (valinnainen lisä)
}

// 5. Kootaan elementit kortin (article) sisälle ja lisätään sivulle
article.append(h2, p, button);
productsContainer.appendChild(article);