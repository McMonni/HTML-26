const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
const countSpan = document.getElementById('count');

// 1. Luodaan count-muuttuja
let count = 0;

// Asetetaan minus-painike pois käytöstä heti alussa, koska arvo on 0
minusBtn.disabled = true;

// Apufunktio näkymän ja painikkeen tilan päivittämiseen
function updateDisplay() {
  // 4. Päivitetään spanin textContent
  countSpan.textContent = count;
  
  // Disabloidaan minus-painike, jos arvo on 0 (tai pienempi)
  minusBtn.disabled = count <= 0;
}

// 2. Lisätään click-listener plus-napille
plusBtn.addEventListener('click', () => {
  // 3. Kasvatetaan count-arvoa
  count++;
  updateDisplay();
});

// 2. Lisätään click-listener minus-napille
minusBtn.addEventListener('click', () => {
  // Estetään arvon meneminen alle nollan
  if (count > 0) {
    // 3. Pienennetään count-arvoa
    count--;
    updateDisplay();
  }
});