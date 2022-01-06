/*----- constants -----*/
const SOURCE_CARDS = [
    {img: 'https://i.imgur.com/ZXPKaiN.jpg', matched: false},
    {img: 'https://i.imgur.com/XMEsZBX.jpg', matched: false},
    {img: 'https://i.imgur.com/6jX1bMT.jpg', matched: false},
    {img: 'https://i.imgur.com/yKdqsBv.jpg', matched: false},
    {img: 'https://i.imgur.com/1BV3HLr.jpg', matched: false},
    {img: 'https://i.imgur.com/QYmN6Hp.jpg', matched: false},
    {img: 'https://i.imgur.com/D5pWE05.jpg', matched: false},
    {img: 'https://i.imgur.com/Ss4Xo3x.jpg', matched: false},
];

const sounds = {
  cardFlipAudio: ('https://assets.codepen.io/7198953/card-flip.mp3'),
  matchAudio: ('https://assets.codepen.io/7198953/mixkit-winning-notification-2018.mp3'),
  noMatchAudio: ('https://assets.codepen.io/7198953/mixkit-losing-bleeps-2026.mp3'),
};

const cardBack = 'https://i.imgur.com/WoEmI2M.jpg';
const DISPLAY_CARD_TIME = 2000;
const startingSeconds = 59;

/*----- app's state (variables) -----*/
let cards; //array of source cars x2, shufled 
let selectedCard;
let playerScore;
let ignoreClick;
let winner;
let lose;
let time = startingSeconds;
let score;

/*----- cached element references -----*/
const cardImgEls = document.querySelectorAll('main > img');
const playerScoreEl = document.querySelector('h3');
const btnEl = document.querySelector('button');
const countdownEl = document.getElementById('countdown');
const player = new Audio();



/*----- event listeners -----*/
document.querySelector('main').addEventListener('click', handleChoice);
btnEl.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
  buildShuffledCards();
  selectedCard = null;
  playerScore = 0;
  score = 0;
  ignoreClick = false;
  winner = false;
  lose = true;
  render();
  };

function handleChoice(evt) {
  const cardIdx = parseInt(evt.target.id);
  const card = cards[cardIdx];
  if (ignoreClick || isNaN(cardIdx) || card.matched) return;
  //if (evt.target.cards !== doCountdown);
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
        // hack/cludge
      card.matched = true;
      setTimeout(function() {
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

setInterval(doCountdown, 1000);

function doCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  countdownEl.innerHTML = `${minutes}: ${seconds}`
  time--;
  time = time-- < 0 ? 0 : time;
  render();
}

function render() {
    btnEl.style.visibility = winner ? 'visible': 'hidden';
  renderBoard();
}

function buildShuffledCards() {
    const tempCards = [];
    cards = [];
    SOURCE_CARDS.forEach(function(card) {
        tempCards.push({...card}, {...card});
    }); 
    while (tempCards.length) {
        const randomIdx = Math.floor(Math.random() * tempCards.length);
        const randomCard = tempCards.splice(randomIdx, 1)[0];
        cards.push(randomCard);
    }
}

// function getWinner() {
//   if (winner === cardIdx.length) {
//     playerScoreEl.innerHTML = scores[score];
//     scores[winner]++;
//   }
// }

function renderBoard () {
    cards.forEach(function(card, idx) {
        const src = card.matched || selectedCard === card ? card.img : cardBack;
        cardImgEls[idx].src = src;
    });
    if (winner) {
      playerScoreEl.innerHTML = 'You win!';
    } else if (time === 0) {
      playerScoreEl.innerHTML = `Out of time. You lose. Select a card to play again.`;
    // } else if (time === 0) {
    //   countdownEl.innerHTML = `Out of time. You lose. Select a card to play again.`;
    //   countdownEl = doCountdown;
      //btnEl.style.visibility = 'visible';
    }
}