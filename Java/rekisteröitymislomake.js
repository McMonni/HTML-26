const form = document.getElementById('register-form');
const inputs = form.querySelectorAll('input');
const successBox = document.getElementById('form-success');

// Palauttaa selkeän suomenkielisen virheviestin HTML5 ValidityState-tilan perusteella
function getErrorMessage(input) {
  const validity = input.validity;

  if (validity.valueMissing) {
    if (input.type === 'checkbox') {
      return 'Sinun täytyy hyväksyä käyttöehdot jatkaaksesi.';
    }
    return 'Tämä kenttä on pakollinen.';
  }

  if (validity.typeMismatch && input.type === 'email') {
    return 'Syötä kelvollinen sähköpostiosoite (esim. nimi@esimerkki.fi).';
  }

  if (validity.tooShort) {
    return `Syötteen tulee olla vähintään ${input.minLength} merkkiä pitkä.`;
  }

  if (validity.tooLong) {
    return `Syöte saa olla enintään ${input.maxLength} merkkiä pitkä.`;
  }

  return 'Tarkista kentän tiedot.';
}

// Validoi yksittäisen kentän ja päivittää UI:n sekä ARIA-attribuutit
function validateField(input) {
  const errorElement = document.getElementById(`${input.id}-error`);

  if (!input.checkValidity()) {
    const message = getErrorMessage(input);
    errorElement.textContent = message;
    input.setAttribute('aria-invalid', 'true');
    return false;
  } else {
    errorElement.textContent = '';
    input.setAttribute('aria-invalid', 'false');
    return true;
  }
}

// Reaaliaikainen validointi kun käyttäjä poistuu kentästä tai korjaa virhettä
inputs.forEach((input) => {
  input.addEventListener('blur', () => validateField(input));
  
  input.addEventListener('input', () => {
    if (input.getAttribute('aria-invalid') === 'true') {
      validateField(input);
    }
  });
});

// Lomakkeen lähetys
form.addEventListener('submit', (event) => {
  event.preventDefault();
  successBox.classList.remove('visible');
  successBox.textContent = '';

  let isFormValid = true;
  let firstInvalidInput = null;

  // Tarkistetaan kaikki kentät
  inputs.forEach((input) => {
    const isValid = validateField(input);
    if (!isValid) {
      isFormValid = false;
      if (!firstInvalidInput) {
        firstInvalidInput = input;
      }
    }
  });

  // Jos lomakkeessa on virheitä, viedään kohdistus ensimmäiseen virheelliseen kenttään
  if (!isFormValid) {
    firstInvalidInput.focus();
    return;
  }

  // Kerätään tiedot FormData-objektiin ja tulostetaan konsoliin
  const formData = new FormData(form);
  console.log('Lomakkeen lähetys onnistui! FormData-sisältö:');
  console.log(Object.fromEntries(formData.entries()));

  // Annetaan käyttäjälle selkeä palaute ja nollataan lomake
  successBox.textContent = 'Rekisteröityminen onnistui! Tiedot on lähetetty.';
  successBox.classList.add('visible');
  form.reset();
  
  inputs.forEach((input) => input.removeAttribute('aria-invalid'));
});