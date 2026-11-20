function createCardElement(card) {
  const div = document.createElement("div");
  const isRed = card.suit === "♥" || card.suit === "♦";
  div.className = isRed ? "card red" : "card";

  div.innerHTML = `
    <span>${card.value}${card.suit}</span>
    <span class="suit-center">${card.suit}</span>
    <span class="bottom-val">${card.value}${card.suit}</span>
  `;
  return div;
}

export function renderHands(playerHand, dealerHand, playerScore, dealerScore) {
  const playerContainer = document.getElementById("player-cards");
  const dealerContainer = document.getElementById("dealer-cards");

  playerContainer.replaceChildren(...playerHand.map(createCardElement));
  dealerContainer.replaceChildren(...dealerHand.map(createCardElement));

  document.getElementById("player-score").textContent = playerScore;
  document.getElementById("dealer-score").textContent = dealerScore;
}

export function setMessage(text) {
  document.getElementById("message").textContent = text;
}

export function renderStats(stats) {
  document.getElementById("stats").textContent =
    `Voitot: ${stats.wins} | Tappiot: ${stats.losses} | Tasapelit: ${stats.ties}`;
}

export function setButtonsPlaying(isPlaying) {
  document.getElementById("btn-hit").disabled = !isPlaying;
  document.getElementById("btn-stand").disabled = !isPlaying;
  document.getElementById("btn-new").disabled = isPlaying;
}