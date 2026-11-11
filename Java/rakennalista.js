const kielet = ['HTML', 'CSS', 'JavaScript'];
const lista = document.querySelector('#languages');

for (const kieli of kielet) {
    // 1. Luo uusi <li>-elementti
    const li = document.createElement('li');
    
    // 2. Aseta tekstisisältö
    li.textContent = kieli;
    
    // 3. Lisää luokka "language-item"
    li.classList.add('language-item');
    
    // 4. Lisää elementti listaan
    lista.appendChild(li);
}