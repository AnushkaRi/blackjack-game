// Selecting elements
let dealerScoreEl = document.getElementById("score--0");
let playerScoreEl = document.getElementById("score--1");
const dealerCardsEl = document.getElementById("dealer-cards");
const playerCardsEl = document.getElementById("player-cards");
const resultText = document.querySelector(".result-text");

const btnNewGame = document.querySelector(".btn--new");
const btnPlay = document.querySelector(".btn--play");
const btnHit = document.querySelector(".btn--hit");
const btnStay = document.querySelector(".btn--stay");

const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["\u2764", "\u2666", "\u2660", "\u2663"];

let dealerCards = [],
  playerCards = [],
  dealerScore = 0,
  playerScore = 0;

// Deck of cards
function createDeck() {
  let deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      let card = { value: values[j], suit: suits[i] };
      deck.push(card);
    }
  }
  return deck;
}

// Shuffle the cards
function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length); // random number from 1 to 52 (npr 30)
    let temp = deck[j]; // assigns random card from deck to temp variable
    deck[j] = deck[i]; // 30 karta u decku će postati i-ta karta u decku
    deck[i] = temp; // i-ta karta će postat j-ta (30) karta u decku
  }

  return deck;
}

const orderedDeck = createDeck();
let shuffledDeck = shuffleDeck([...orderedDeck]);

// Display two random cards for dealer and player
function dealCard() {
  return shuffledDeck.shift();
}

function getCard(card) {
  const color = card.suit === "\u2764" || card.suit === "\u2666" ? "red" : "black";
  return `${card.value} of <span style="color: ${color}">${card.suit}</span>`;
}

function showText() {
  let dealerCard = "";
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCard += getCard(dealerCards[i]) + "<br />";
  }

  let playerCard = "";
  for (let i = 0; i < playerCards.length; i++) {
    playerCard += getCard(playerCards[i]) + "<br />";
  }

  dealerCardsEl.innerHTML = dealerCard;
  playerCardsEl.innerHTML = playerCard;
}

// Defining card values
function getCardValue(value) {
  const cardValueMap = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 10,
    Q: 10,
    K: 10,
    A: 11,
  };

  return cardValueMap[value];
}

// Calculate the dealer & player score
function getScore(cards) {
  let score = 0;
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    score += getCardValue(card.value);
  }
  return score;
}

function updateScore() {
  dealerScore = dealerScoreEl.textContent = getScore(dealerCards);
  playerScore = playerScoreEl.textContent = getScore(playerCards);
}

// New game funcionality
btnNewGame.addEventListener("click", function () {
  shuffledDeck = shuffleDeck([...orderedDeck]);
  dealerScoreEl.textContent = 0;
  playerScoreEl.textContent = 0;
  resultText.textContent = "";
  dealerCardsEl.classList.add("hidden");
  playerCardsEl.classList.add("hidden");
  resultText.classList.add("hidden");
  btnHit.disabled = false;
  btnStay.disabled = false;
  btnPlay.disabled = false;
});

// Play Button funcionality
btnPlay.addEventListener("click", function () {
  dealerCards = [dealCard(), dealCard()];
  playerCards = [dealCard(), dealCard()];
  showText();
  updateScore();
  dealerCardsEl.classList.remove("hidden");
  playerCardsEl.classList.remove("hidden");
  checkScore(false);
});

// Hit Button funcionality
btnHit.addEventListener("click", function () {
  deal(false);
  updateScore();
  showText();
  checkScore(false);
});

//Stay button funcionality
btnStay.addEventListener("click", function () {
  deal(true);
  updateScore();
  checkScore(true);
  showText();
});

function deal(isPlayerDone) {
  if (dealerScore <= 16) {
    if (dealerScore < playerScore) {
      dealerCards.push(dealCard());
    }
  }
  if (!isPlayerDone) {
    playerCards.push(dealCard());
  }
}

// Game Over rules and results
function checkScore(isGameEnded) {
  if (playerScore < 21 && !isGameEnded) {
    return;
  }

  if (dealerScore > playerScore && dealerScore <= 21) {
    resultText.innerText += "Dealer WINS!";
  } else if (playerScore > 21) {
    resultText.innerText += "You BUSTED!";
  } else if (playerScore > dealerScore || dealerScore > 21) {
    if (playerScore === 21) {
      resultText.innerText += "You hit BLACKJACK!";
    } else {
      resultText.innerText += "YOU WIN!";
    }
  } else {
    resultText.innerText += "It's a DRAW!";
  }
  resultText.classList.remove("hidden");
  btnHit.disabled = true;
  btnStay.disabled = true;
  btnPlay.disabled = true;
}
