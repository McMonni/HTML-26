const form = document.getElementById('todoForm');
const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');

// 1. Dynaaminen DOM: Luodaan uusi li-elementti ja painikkeet lomaketta lähetettäessä
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Estetään sivun uudelleenlataus

  const text = input.value.trim();
  if (text === '') return;

  // Luodaan li-elementti ja sen sisältö
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${text}</span>
    <button data-action="toggle">Valmis</button>
    <button data-action="delete">Poista</button>
  `;

  list.appendChild(li);
  input.value = ''; // Tyhjennetään kenttä
});

// 2. Delegoitu tapahtumankäsittely: Yksi click-listener ul-elementtiin
list.addEventListener('click', (event) => {
  // Tarkistetaan, klikattiinko poista-painiketta
  const deleteBtn = event.target.closest('[data-action="delete"]');
  if (deleteBtn) {
    const li = deleteBtn.closest('li');
    li.remove();
    return;
  }

  // Tarkistetaan, klikattiinko valmis-painiketta (toggle)
  const toggleBtn = event.target.closest('[data-action="toggle"]');
  if (toggleBtn) {
    const li = toggleBtn.closest('li');
    li.classList.toggle('completed');
  }
});