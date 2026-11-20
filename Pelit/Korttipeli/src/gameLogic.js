export function calculateScore(hand) {
  let score = 0;
  let aces = 0;

  for (const card of hand) {
    if (card.value === "A") {
      aces += 1;
      score += 11;
    } else if (["K", "Q", "J"].includes(card.value)) {
      score += 10;
    } else {
      score += Number(card.value);
    }
  }

  // Muutetaan ässä 11 -> 1, jos pisteet menevät yli 21
  while (score > 21 && aces > 0) {
    score -= 10;
    aces -= 1;
  }

  return score;
}

export function determineWinner(playerScore, dealerScore) {
  if (playerScore > 21) {
    return { result: "loss", text: "Yli meni! Jakaja voitti." };
  }
  if (dealerScore > 21) {
    return { result: "win", text: "Jakajalla meni yli! Voitit!" };
  }
  if (playerScore > dealerScore) {
    return { result: "win", text: "Onneksi olkoon, voitit kierroksen!" };
  }
  if (dealerScore > playerScore) {
    return { result: "loss", text: "Jakaja voitti paremmalla kädellä." };
  }
  return { result: "tie", text: "Tasapeli!" };
}