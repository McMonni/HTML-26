// Haetaan elementit DOM:sta
const nameInput = document.getElementById('name');
const previewSpan = document.getElementById('preview');
const charCountSpan = document.getElementById('charCount');

// Kuunnellaan input-tapahtumaa reaaliaikaisesti
nameInput.addEventListener('input', () => {
  // Rajataan teksti varmuuden vuoksi 30 merkkiin
  const text = nameInput.value.slice(0, 30);

  // Päivitetään esikatselu (tyhjänä tai pelkillä välilyönneillä näytetään "vieras")
  if (text.trim() === '') {
    previewSpan.textContent = 'vieras';
  } else {
    previewSpan.textContent = text;
  }

  // Päivitetään merkkimäärä ruudulle
  charCountSpan.textContent = text.length;
});