const form = document.getElementById('feedback-form');
const topicSelect = document.getElementById('topic');
const ratingGroup = document.getElementById('rating-group');
const ratingInputs = form.querySelectorAll('input[name="rating"]');
const messageTextarea = document.getElementById('message');
const charCounter = document.getElementById('char-counter');
const contactCheckbox = document.getElementById('contact-permission');

const summarySection = document.getElementById('summary-section');
const summaryList = document.getElementById('summary-list');

const MIN_MESSAGE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 300;

// 1. Textarea-kentän merkkilaskuri ja custom validity -tarkistus
function updateTextareaState() {
  const trimmedLength = messageTextarea.value.trim().length;
  const rawLength = messageTextarea.value.length;

  charCounter.textContent = `${rawLength} / ${MAX_MESSAGE_LENGTH} merkkiä (väh. ${MIN_MESSAGE_LENGTH})`;

  if (trimmedLength >= MIN_MESSAGE_LENGTH) {
    charCounter.classList.add('valid');
  } else {
    charCounter.classList.remove('valid');
  }

  // Asetetaan custom validity liian lyhyelle palautteelle
  if (trimmedLength === 0) {
    messageTextarea.setCustomValidity('Palauteviesti on pakollinen.');
  } else if (trimmedLength < MIN_MESSAGE_LENGTH) {
    const missing = MIN_MESSAGE_LENGTH - trimmedLength;
    messageTextarea.setCustomValidity(
      `Palaute on liian lyhyt. Kirjoita vielä vähintään ${missing} merkkiä.`
    );
  } else {
    // Tyhjä merkkijono tarkoittaa, että custom validity on kunnossa
    messageTextarea.setCustomValidity('');
  }
}

// 2. Yksittäisten kontrollien validointi ja virheviestien näyttö
function validateTopic() {
  const errorEl = document.getElementById('topic-error');
  if (!topicSelect.checkValidity()) {
    errorEl.textContent = 'Valitse palautteen aihe valikosta.';
    topicSelect.setAttribute('aria-invalid', 'true');
    return false;
  }
  errorEl.textContent = '';
  topicSelect.setAttribute('aria-invalid', 'false');
  return true;
}

function validateRating() {
  const errorEl = document.getElementById('rating-error');
  const isChecked = Array.from(ratingInputs).some((radio) => radio.checked);

  if (!isChecked) {
    errorEl.textContent = 'Valitse arvosana asteikolla 1–5.';
    ratingGroup.setAttribute('aria-invalid', 'true');
    return false;
  }
  errorEl.textContent = '';
  ratingGroup.setAttribute('aria-invalid', 'false');
  return true;
}

function validateMessage() {
  updateTextareaState();
  const errorEl = document.getElementById('message-error');

  if (!messageTextarea.checkValidity()) {
    errorEl.textContent = messageTextarea.validationMessage;
    messageTextarea.setAttribute('aria-invalid', 'true');
    return false;
  }
  errorEl.textContent = '';
  messageTextarea.setAttribute('aria-invalid', 'false');
  return true;
}

// Tapahtumakuuntelijat reaaliaikaiseen palautteeseen
topicSelect.addEventListener('change', validateTopic);

ratingInputs.forEach((radio) => {
  radio.addEventListener('change', validateRating);
});

messageTextarea.addEventListener('input', () => {
  updateTextareaState();
  if (messageTextarea.getAttribute('aria-invalid') === 'true') {
    validateMessage();
  }
});

messageTextarea.addEventListener('blur', validateMessage);

// 3. Yhteenvedon rakentaminen sivulle turvallisesti (textContent estää XSS-riskit)
function renderSummary(data) {
  summaryList.innerHTML = '';

  const items = [
    { label: 'Aihe', value: data.topic },
    { label: 'Arvosana', value: `${data.rating} / 5` },
    { label: 'Palauteviesti', value: data.message },
    { label: 'Yhteydenottolupa', value: data.contactPermission }
  ];

  items.forEach((item) => {
    const dt = document.createElement('dt');
    dt.textContent = item.label;

    const dd = document.createElement('dd');
    dd.textContent = item.value;

    summaryList.appendChild(dt);
    summaryList.appendChild(dd);
  });

  summarySection.classList.remove('hidden');
}

// 4. Lomakkeen lähetys
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const isTopicValid = validateTopic();
  const isRatingValid = validateRating();
  const isMessageValid = validateMessage();

  if (!isTopicValid) {
    topicSelect.focus();
    return;
  }
  if (!isRatingValid) {
    ratingInputs[0].focus();
    return;
  }
  if (!isMessageValid) {
    messageTextarea.focus();
    return;
  }

  // Kerätään tiedot FormData-objektista
  const formData = new FormData(form);
  const submissionData = {
    topic: formData.get('topic'),
    rating: formData.get('rating'),
    message: formData.get('message').trim(),
    contactPermission: contactCheckbox.checked ? 'Kyllä, minuun saa ottaa yhteyttä' : 'Ei yhteydenottolupaa'
  };

  console.log('Lähetetty FormData:', Object.fromEntries(formData.entries()));

  // Näytetään yhteenveto sivulla ja nollataan lomake
  renderSummary(submissionData);
  form.reset();
  updateTextareaState();
  
  topicSelect.removeAttribute('aria-invalid');
  ratingGroup.removeAttribute('aria-invalid');
  messageTextarea.removeAttribute('aria-invalid');
});