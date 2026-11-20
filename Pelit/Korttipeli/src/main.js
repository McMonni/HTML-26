import { createDeck, drawCard } from "./deck.js";
import { calculateScore, determineWinner } from "./gameLogic.js";
import { loadStats, saveStats } from "./storage.js";
import {
  renderHands,
  setMessage,
  renderStats,
  setButtonsPlaying,
} from "./gameView.js";

function init() {
  let deck = [];
  let playerHand = [];
  let dealerHand = [];
  let stats = loadStats();

  renderStats(stats);

  function updateView() {
    const pScore = calculateScore(playerHand);
    const dScore = calculateScore(dealerHand);
    renderHands(playerHand, dealerHand, pScore, dScore);
  }

  function endRound(outcome) {
    setMessage(outcome.text);
    setButtonsPlaying(false);

    if (outcome.result === "win") stats.wins += 1;
    else if (outcome.result === "loss") stats.losses += 1;
    else stats.ties += 1;

    saveStats(stats);
    renderStats(stats);
  }

  function startNewRound() {
    deck = createDeck();
    playerHand = [drawCard(deck), drawCard(deck)];
    dealerHand = [drawCard(deck)];

    setButtonsPlaying(true);
    setMessage("Nosta kortti tai jää!");
    updateView();

    // Tarkistetaan heti mahdollinen välitön Blackjack (21)
    if (calculateScore(playerHand) === 21) {
      handleStand();
    }
  }

  function handleHit() {
    playerHand.push(drawCard(deck));
    updateView();

    const pScore = calculateScore(playerHand);
    if (pScore > 21) {
      endRound({ result: "loss", text: "Yli meni! Jakaja voitti." });
    } else if (pScore === 21) {
      handleStand();
    }
  }

  function handleStand() {
    // Jakaja nostaa kortteja, kunnes pistemäärä on vähintään 17
    while (calculateScore(dealerHand) < 17) {
      dealerHand.push(drawCard(deck));
    }

    updateView();

    const pScore = calculateScore(playerHand);
    const dScore = calculateScore(dealerHand);
    const outcome = determineWinner(pScore, dScore);
    endRound(outcome);
  }

  document.getElementById("btn-new").addEventListener("click", startNewRound);
  document.getElementById("btn-hit").addEventListener("click", handleHit);
  document.getElementById("btn-stand").addEventListener("click", handleStand);
}

init();