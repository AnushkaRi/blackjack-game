// Selecting elements

const dealerEl = document.querySelector(".player--0");
const playerEl = document.querySelector(".player--1");
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

let deck = [],
  dealerCards = [],
  playerCards = [],
  dealerScore = 0,
  playerScore = 0,
  gameStart = false,
  gameOver = false,
  playerWon = false;

// New game funcionality
btnNewGame.addEventListener("click", function () {
  gameStart = true;
  gameOver = false;
  playerWon = false;

  dealerScoreEl.textContent = 0;
  playerScoreEl.textContent = 0;
  resultText.textContent = "";
  dealerCardsEl.classList.add("hidden");
  playerCardsEl.classList.add("hidden");
  resultText.classList.add("hidden");
});

// Deck of cards
function createDeck() {
  let deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      let card = { Value: values[j], Suit: suits[i] };
      deck.push(card);
    }
  }
  return deck;
}
//console.log(createDeck());

// Shuffle the cards
function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[j];
    deck[j] = deck[i];
    deck[i] = temp;
  }
}

let cards = createDeck();
shuffleDeck(cards);

// Display two random cards for dealer and player
function dealCard(deck) {
  return deck.shift();
}

function getCardString(card) {
  return `${card.Value} of ${card.Suit}`;
}

function showText() {
  let dealerCardString = "";
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + "<br />";
  }

  let playerCardString = "";
  for (let i = 0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + "<br />";
  }

  dealerCardsEl.innerHTML = dealerCardString;
  playerCardsEl.innerHTML = playerCardString;

  /*  if (gameOver) {
    if (playerWon) {
      resultText.innerText += "You WIN!";
    } else {
      resultText.innerText += "Dealer WINS!";
    } */
}

// Defining card values
function cardValue(card) {
  switch (card.Value) {
    case "2":
      return 2;
    case "3":
      return 3;
    case "4":
      return 4;
    case "5":
      return 5;
    case "6":
      return 6;
    case "7":
      return 7;
    case "8":
      return 8;
    case "9":
      return 9;
    case "10":
      return 10;
    case "J":
    case "Q":
    case "K":
      return 10;
    case "A":
      return 11;
  }
}

// Calculate the dealer & player score
function getScore(cardArray) {
  let score = 0;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += cardValue(card);
  }
  return score;
}

function updateScore() {
  dealerScore = dealerScoreEl.textContent = getScore(dealerCards);
  playerScore = playerScoreEl.textContent = getScore(playerCards);
  console.log(dealerScore, playerScore);
}

// Play Button funcionality
btnPlay.addEventListener("click", function () {
  dealerCards = [dealCard(cards), dealCard(cards)];
  playerCards = [dealCard(cards), dealCard(cards)];
  showText();
  updateScore();
  dealerCardsEl.classList.remove("hidden");
  playerCardsEl.classList.remove("hidden");
  console.log(dealerCards, playerCards);
});

// Hit Button funcionality
btnHit.addEventListener("click", function () {
  playerCards.push(dealCard(cards));
  updateScore();
  showText();
  isItGameOver();
});

/* // Disable Hit Button
function disableHitButton() {
  btnHit.disabled = true;
} */

//Stay button funcionality
btnStay.addEventListener("click", function () {
  gameOver = true;
  isItGameOver();
  showText();
});

// Game Over rules and results
function isItGameOver() {
  while (dealerScore <= 16) {
    dealerCards.push(dealCard(cards));
    updateScore();
  }

  if (dealerScore > playerScore && dealerScore <= 21) {
    playerWon = false;
    gameOver = true;
    resultText.innerText += "Dealer WINS!";
  } else if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
    resultText.innerText += "You BUSTED!";
  } else if (playerScore > dealerScore || dealerScore > 21) {
    if (playerScore === 21) {
      resultText.innerText += "You hit BLACKJACK!";
    } else {
      playerWon = true;
      gameOver = true;
      resultText.innerText += "YOU WIN!";
    }
  } else {
    gameOver = true;
    resultText.innerText += "It's a DRAW!";
  }
  resultText.classList.remove("hidden");
}
