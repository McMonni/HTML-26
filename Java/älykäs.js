const form = document.getElementById('signup-form');
const inputs = Array.from(form.querySelectorAll('input'));
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');

const errorSummary = document.getElementById('error-summary');
const errorSummaryList = document.getElementById('error-summary-list');
const successMessage = document.getElementById('success-message');

// 1. Pieni apufunktio: Tarkistaa salasanan kriteerit ja päivittää reaaliaikaisen listan
function updatePasswordFeedback(value) {
  const rules = {
    length: value.length >= 8,
    upper: /[A-ZÅÄÖ]/.test(value),
    number: /\d/.test(value)
  };

  document.getElementById('rule-length').dataset.valid = rules.length;
  document.getElementById('rule-upper').dataset.valid = rules.upper;
  document.getElementById('rule-number').dataset.valid = rules.number;

  return rules.length && rules.upper && rules.number;
}

// 2. Pieni apufunktio: Asettaa mukautetut validointisäännöt (setCustomValidity)
function applyCustomConstraints(input) {
  if (input.id === 'password') {
    const isStrong = updatePasswordFeedback(input.value);
    if (input.value && !isStrong) {
      input.setCustomValidity('Salasanan tulee täyttää kaikki yllä olevat vaatimukset.');
    } else {
      input.setCustomValidity('');
    }
  }

  if (input.id === 'confirmPassword') {
    if (input.value && input.value !== passwordInput.value) {
      input.setCustomValidity('Salasanat eivät täsmää.');
    } else {
      input.setCustomValidity('');
    }
  }
}

// 3. Pieni apufunktio: Muodostaa selkeän suomenkielisen virhetekstin
function getFieldErrorMessage(input) {
  const { validity } = input;

  if (validity.valueMissing) return 'Tämä kenttä on pakollinen.';
  if (validity.typeMismatch) return 'Syötä kelvollinen sähköpostiosoite.';
  if (validity.tooShort) return `Syötteen tulee olla vähintään ${input.minLength} merkkiä.`;
  if (validity.tooLong) return `Syöte saa olla enintään ${input.maxLength} merkkiä.`;
  if (validity.customError) return input.validationMessage;

  return 'Tarkista kentän tiedot.';
}

// 4. Pieni apufunktio: Validoi yhden kentän ja päivittää UI:n + ARIA-tilat
function validateField(input) {
  applyCustomConstraints(input);
  const errorSpan = document.getElementById(`${input.id}-error`);

  if (!input.checkValidity()) {
    const message = getFieldErrorMessage(input);
    errorSpan.textContent = message;
    input.setAttribute('aria-invalid', 'true');
    return { isValid: false, input, message };
  }

  errorSpan.textContent = '';
  input.setAttribute('aria-invalid', 'false');
  return { isValid: true, input, message: '' };
}

// 5. Pieni apufunktio: Rakentaa klikattavan virheyhteenvedon sivun yläosaan
function renderErrorSummary(invalidResults) {
  errorSummaryList.innerHTML = '';

  if (invalidResults.length === 0) {
    errorSummary.classList.add('hidden');
    return;
  }

  invalidResults.forEach(({ input, message }) => {
    const label = form.querySelector(`label[for="${input.id}"]`).textContent.replace(' *', '');
    const li = document.createElement('li');
    const link = document.createElement('a');

    link.href = `#${input.id}`;
    link.textContent = `${label}: ${message}`;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      input.focus();
    });

    li.appendChild(link);
    errorSummaryList.appendChild(li);
  });

  errorSummary.classList.remove('hidden');
}

// 6. Pieni apufunktio: Muuntaa FormDatan tavalliseksi JavaScript-objektiksi
function getFormDataObject(formElement) {
  const formData = new FormData(formElement);
  return Object.fromEntries(formData.entries());
}

// 7. Pieni apufunktio: Nollaa lomakkeen ja käyttöliittymän tilat onnistumisen jälkeen
function resetFormState() {
  form.reset();
  updatePasswordFeedback('');
  errorSummary.classList.add('hidden');
  errorSummaryList.innerHTML = '';

  inputs.forEach((input) => {
    input.removeAttribute('aria-invalid');
    input.setCustomValidity('');
    document.getElementById(`${input.id}-error`).textContent = '';
  });
}

// Tapahtumakuuntelijat reaaliaikaiseen palautteeseen
passwordInput.addEventListener('input', () => {
  updatePasswordFeedback(passwordInput.value);
  if (passwordInput.getAttribute('aria-invalid') === 'true') {
    validateField(passwordInput);
  }
  if (confirmInput.value) {
    validateField(confirmInput);
  }
});

inputs.forEach((input) => {
  input.addEventListener('blur', () => validateField(input));

  input.addEventListener('input', () => {
    if (input.id !== 'password' && input.getAttribute('aria-invalid') === 'true') {
      validateField(input);
    }
  });
});

// Lomakkeen lähetys
form.addEventListener('submit', (event) => {
  event.preventDefault();
  successMessage.classList.add('hidden');

  const results = inputs.map((input) => validateField(input));
  const invalidResults = results.filter((result) => !result.isValid);

  // Estetään lähetys virhetilanteessa, näytetään yhteenveto ja fokusoidaan ensimmäiseen virheeseen
  if (invalidResults.length > 0) {
    renderErrorSummary(invalidResults);
    invalidResults[0].input.focus();
    return;
  }

  // Kerätään tiedot objektiksi ja tulostetaan
  const dataObject = getFormDataObject(form);
  console.log('Lomake validi! FormData-objekti:', dataObject);

  // Nollataan lomake ja näytetään onnistumisviesti
  resetFormState();
  successMessage.textContent = `Kiitos ${dataObject.fullName}! Käyttäjätili luotiin osoitteelle ${dataObject.email}.`;
  successMessage.classList.remove('hidden');
});