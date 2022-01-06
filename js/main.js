/*----- constants -----*/
const SOURCE_CARDS = [
  { img: 'https://i.imgur.com/ZXPKaiN.jpg', matched: false },
  { img: 'https://i.imgur.com/XMEsZBX.jpg', matched: false },
  { img: 'https://i.imgur.com/6jX1bMT.jpg', matched: false },
  { img: 'https://i.imgur.com/yKdqsBv.jpg', matched: false },
  { img: 'https://i.imgur.com/1BV3HLr.jpg', matched: false },
  { img: 'https://i.imgur.com/QYmN6Hp.jpg', matched: false },
  { img: 'https://i.imgur.com/D5pWE05.jpg', matched: false },
  { img: 'https://i.imgur.com/Ss4Xo3x.jpg', matched: false },
  { img: 'https://i.imgur.com/nxTA5dz.jpg', matched: false },
  { img: 'https://i.imgur.com/0O71Cci.jpg', matched: false },
];

const cardBack = 'https://i.imgur.com/WoEmI2M.jpg';
const DISPLAY_CARD_TIME = 1000;
const startingSeconds = 1;

/*----- app's state (variables) -----*/
let cards; //array of source cars x2, shufled 
let selectedCard;
let playerScore;
let ignoreClick;
let winner;
let lose;
let time = startingSeconds;
let timer;
let score;

/*----- cached element references -----*/
const cardImgEls = document.querySelectorAll('main > img');
const playerScoreEl = document.querySelector('h3');
const btnEl = document.querySelector('button');
const countdownEl = document.getElementById('countdown');


/*----- event listeners -----*/
document.querySelector('main').addEventListener('click', handleChoice);
btnEl.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
  console.log('hitting this function');
  buildShuffledCards();
  doCountdown();
  selectedCard = null;
  playerScore = 0;
  score = 0;
  ignoreClick = false;
  winner = false;
  lose = false;
  time = startingSeconds * 60;
  playerScoreEl.innerHTML = 'You have 60 seconds to match all the pairs.';
  render();
};

function handleChoice(evt) {
  const cardIdx = parseInt(evt.target.id);
  const card = cards[cardIdx];
  if (ignoreClick || isNaN(cardIdx) || card.matched) return;
  if (selectedCard && selectedCard === card) {
    playerScore++;
    selectedCard = null;
  } else if (selectedCard) {
    if (card.img === selectedCard.img) {
      card.matched = selectedCard.matched = true;
      selectedCard = null;
      winner = cards.every(card => card.matched);
    } else {
      ignoreClick = true;
      playerScore++;
      card.matched = true;
      setTimeout(function () {
        ignoreClick = false;
        selectedCard = null;
        card.matched = false;
        render();
      }, DISPLAY_CARD_TIME);
    }
  } else {
    selectedCard = card;
  }
  render();
}

function doCountdown() {
  console.log('hitting countdown');
  timer = setInterval(() => {
    seconds = time % 60;
    countdownEl.innerHTML = `: ${seconds}`;
    time--;
    time = time < 0 ? 0 : time;
    setTimeout(checkWinOrLose, 6100)
  }, 1000);
}

function checkWinOrLose() {
  lose = time <= 0 && !cards.every(card => card.matched);
  if (lose) {
    playerScoreEl.innerHTML = `Oh no! You're out of time. You lose. Would you like to replay?`;
  } else if (winner) {
    clearTimeout(timer)
    playerScoreEl.innerHTML = `You selected all the matches! You win! Would you like to replay?`;
  }
  ignoreClick === true;
  btnEl.style.visibility = lose || winner ? 'visible' : 'hidden';
}

function render() {
  btnEl.style.visibility = winner ? 'visible' : 'hidden';
  renderBoard();
}

function buildShuffledCards() {
  console.log('building shuffled cards');
  const tempCards = [];
  cards = [];
  SOURCE_CARDS.forEach(function (card) {
    tempCards.push({ ...card }, { ...card });
  });
  while (tempCards.length) {
    const randomIdx = Math.floor(Math.random() * tempCards.length);
    const randomCard = tempCards.splice(randomIdx, 1)[0];
    cards.push(randomCard);
  }
}

function renderBoard() {
  cards.forEach(function (card, idx) {
    const src = card.matched || selectedCard === card ? card.img : cardBack;
    cardImgEls[idx].src = src;
  });
}
