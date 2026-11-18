// Vaihda gender=male, jos haluat miehiä
const apiUrl = 'https://randomuser.me/api/?results=50&gender=female&nat=FI';

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('user-cards');
    
    data.results.forEach(user => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
       <img src="${user.picture.large}" alt="Profiilikuva">
        <p><strong>Gender:</strong> ${user.gender}</p>
        <p><strong>Nationality:</strong> ${user.nat}</p>
        <p><strong>Email:</strong> ${user.email}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => console.error('Virhe tietojen haussa:', error));