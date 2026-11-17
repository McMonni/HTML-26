 ==========================================================================
   1. API-KERROS (Erotettu omiin funktioihinsa + Map-välimuisti + AbortController)
   ========================================================================== */
const BASE_URL = 'https://typicode.com';
const apiCache = new Map();
let currentController = null;

/**
 * Yleiskäyttöinen GET-hakufunktio välimuistilla ja virheentarkistuksella.
 */
async function fetchWithCache(endpoint, { signal, forceRefresh = false } = {}) {
  if (!forceRefresh && apiCache.has(endpoint)) {
    return apiCache.get(endpoint);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, { signal });
  
  // Tarkistetaan response.ok
  if (!response.ok) {
    throw new Error(`HTTP-virhe! Status: ${response.status}`);
  }

  const data = await response.json();
  apiCache.set(endpoint, data);
  return data;
}

/**
 * Hakee käyttäjät ja tehtävät rinnakkain Promise.allilla.
 */
async function fetchInitialData(forceRefresh = false) {
  // Peruutetaan edellinen keskeneräinen pyyntö, jos sellainen on
  if (currentController) {
    currentController.abort();
  }
  currentController = new AbortController();
  const { signal } = currentController;

  // Rinnakkaiset pyynnöt Promise.allilla
  const [users, todos] = await Promise.all([
    fetchWithCache('/users', { signal, forceRefresh }),
    fetchWithCache('/todos?_limit=30', { signal, forceRefresh })
  ]);

  return { users, todos };
}

/**
 * Lähettää uuden tehtävän (POST) ja palauttaa luodun objektin.
 */
async function createTodo(title, userId = 1) {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ title, userId, completed: false })
  });

  if (!response.ok) {
    throw new Error(`Tallennus epäonnistui (Status: ${response.status})`);
  }

  const newTodo = await response.json();
  // JSONPlaceholder palauttaa aina id:n 201, tehdään siitä uniikki demoa varten
  newTodo.id = Date.now(); 
  return newTodo;
}


/* ==========================================================================
   2. SOVELLUKSEN TILA & DOM-ELEMENTIT
   ========================================================================== */
const state = {
  users: [],
  todos: [],
  searchQuery: '',
  selectedUser: 'all'
};

const dom = {
  liveRegion: document.getElementById('liveRegion'),
  addForm: document.getElementById('addForm'),
  newTitle: document.getElementById('newTitle'),
  submitBtn: document.getElementById('submitBtn'),
  searchInput: document.getElementById('searchInput'),
  userFilter: document.getElementById('userFilter'),
  refreshBtn: document.getElementById('refreshBtn'),
  loadingState: document.getElementById('loadingState'),
  errorState: document.getElementById('errorState'),
  errorMessage: document.getElementById('errorMessage'),
  retryBtn: document.getElementById('retryBtn'),
  emptyState: document.getElementById('emptyState'),
  todoList: document.getElementById('todoList')
};


/* ==========================================================================
   3. UI- JA RENDERÖINTIFUNKTIOT
   ========================================================================== */
function announce(message) {
  dom.liveRegion.textContent = message;
}

function setUIState(viewState, errorMsg = '') {
  dom.loadingState.classList.toggle('visible', viewState === 'loading');
  dom.errorState.classList.toggle('visible', viewState === 'error');
  dom.emptyState.classList.toggle('visible', viewState === 'empty');
  dom.todoList.style.display = viewState === 'data' ? 'block' : 'none';

  if (viewState === 'error') {
    dom.errorMessage.textContent = errorMsg;
    announce(`Virhe: ${errorMsg}`);
  } else if (viewState === 'loading') {
    announce('Ladataan tietoja...');
  }
}

function populateUserFilter() {
  // Säilytetään ensimmäinen "Kaikki käyttäjät" -valinta
  dom.userFilter.innerHTML = '<option value="all">Kaikki käyttäjät</option>';
  
  state.users.forEach(user => {
    const option = document.createElement('option');
    option.value = user.id;
    option.textContent = user.name;
    dom.userFilter.appendChild(option);
  });
}

function renderTodos() {
  const query = state.searchQuery.toLowerCase().trim();
  const userIdFilter = state.selectedUser;

  // Suodatetaan data
  const filtered = state.todos.filter(todo => {
    const author = state.users.find(u => u.id === todo.userId);
    const authorName = author ? author.name.toLowerCase() : '';
    
    const matchesSearch = todo.title.toLowerCase().includes(query) || authorName.includes(query);
    const matchesUser = userIdFilter === 'all' || String(todo.userId) === userIdFilter;

    return matchesSearch && matchesUser;
  });

  // Tyhjennetään lista ennen uudelleenrenderöintiä
  dom.todoList.innerHTML = '';

  // Tarkistetaan empty-tila
  if (filtered.length === 0) {
    setUIState('empty');
    announce('Ei hakutuloksia.');
    return;
  }

  setUIState('data');

  // Luodaan DOM-elementit turvallisesti (textContent estää XSS-haavoittuvuudet)
  const fragment = document.createDocumentFragment();

  filtered.forEach(todo => {
    const author = state.users.find(u => u.id === todo.userId);
    const li = document.createElement('li');

    const titleSpan = document.createElement('span');
    titleSpan.textContent = todo.title;
    if (todo.completed) titleSpan.classList.add('done');

    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = author ? author.name : 'Tuntematon';

    li.append(titleSpan, badge);
    fragment.appendChild(li);
  });

  dom.todoList.appendChild(fragment);
  announce(`Näytetään ${filtered.length} tehtävää.`);
}


/* ==========================================================================
   4. TAPAHTUMANKÄSITTELIJÄT JA OHJAUSLOGIIKKA
   ========================================================================== */
async function loadApp(forceRefresh = false) {
  setUIState('loading');

  try {
    const { users, todos } = await fetchInitialData(forceRefresh);
    state.users = users;
    state.todos = todos;

    populateUserFilter();
    renderTodos();
  } catch (error) {
    // Ohitetaan virheilmoitus, jos pyyntö peruttiin tarkoituksella AbortControllerilla
    if (error.name === 'AbortError') return;
    
    setUIState('error', `Tietojen haku epäonnistui: ${error.message}`);
  }
}

// Haku- ja suodatustapahtumat
dom.searchInput.addEventListener('input', (e) => {
  state.searchQuery = e.target.value;
  renderTodos();
});

dom.userFilter.addEventListener('change', (e) => {
  state.selectedUser = e.target.value;
  renderTodos();
});

// Uudelleenyritys ja välimuistin ohitus
dom.retryBtn.addEventListener('click', () => loadApp(true));
dom.refreshBtn.addEventListener('click', () => loadApp(true));

// Lomakkeen lähetys (POST)
dom.addForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = dom.newTitle.value.trim();
  if (!title) return;

  dom.submitBtn.disabled = true;
  dom.submitBtn.textContent = 'Tallennetaan...';
  announce('Tallennetaan uutta tehtävää...');

  try {
    const selectedUserId = state.selectedUser !== 'all' ? Number(state.selectedUser) : 1;
    const createdTodo = await createTodo(title, selectedUserId);

    // Lisätään uusi tehtävä tilan alkuun ja päivitetään välimuisti
    state.todos.unshift(createdTodo);
    apiCache.set('/todos?_limit=30', state.todos);

    dom.newTitle.value = '';
    renderTodos();
    announce(`Tehtävä "${createdTodo.title}" lisätty.`);
  } catch (error) {
    alert(`Tallennusvirhe: ${error.message}`);
    announce('Tehtävän tallennus epäonnistui.');
  } finally {
    dom.submitBtn.disabled = false;
    dom.submitBtn.textContent = 'Lisää';
  }
});

// Käynnistetään sovellus
loadApp();