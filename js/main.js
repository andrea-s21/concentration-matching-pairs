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

const cardBack = 'https://i.imgur.com/WoEmI2M.jpg';
const DISPLAY_CARD_TIME = 3000;
//const cardflipAduio = new Audio('https://www.soundsnap.com/user_interface_design_element_organic_material_business_card_flipping_over_2');


/*----- app's state (variables) -----*/
let cards; //array of source cars x2, shufled 
let selectedCard;
let badGuess;
let ignoreClick;
let winner;
let score;

/*----- cached element references -----*/
const cardImgEls = document.querySelectorAll('main > img');
const badCountEl = document.querySelector('h3');
const btnEl = document.querySelector('button');
//const countdownEl = document.getElementById('countdown');


/*----- event listeners -----*/
document.querySelector('main').addEventListener('click', handleChoice);
btnEl.addEventListener('click', init);
//countdownEl.addEventListener('click', init);


/*----- functions -----*/
init();

function init() {
  buildShuffledCards();
  selectedCard = null;
  badGuess = 0;
  score = 0;
  ignoreClick = false;
  winner = false;
  render();
  };


  function handleChoice(evt) {
    const cardIdx = parseInt(evt.target.id);
    const card = cards[cardIdx];
    if (ignoreClick || isNaN(cardIdx) || card.matched) return;
    if (selectedCard && selectedCard === card) {
      badGuess++;
      selectedCard = null;
    } else if (selectedCard) {
      // check for match
      if (card.img === selectedCard.img) {
        card.matched = selectedCard.matched = true;
        selectedCard = null;
        winner = cards.every(card => card.matched);
      } else {
        ignoreClick = true;
        badGuess++;
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

// function doCountdown(cb) {
//   let count = 3;
//   countdownEl.textContent = count;
//   countdownEl.style.visibility = 'visible';
//   countdownAudio.currentTime = 0;
//   countdownAudio.play();
//   const timerId = setInterval(function () {
//     count--;
//     if (count <= 0) {
//       clearInterval(timerId);
//       countdownEl.style.visibility = 'hidden';
//       cb();
//     } else {
//       countdownEl.textContent = count;
//     }
//   }, 1000);
// }

function render() {
  // ternary expression -> <expression> ? <truthy val> : <falsy val>;
  btnEl.style.visibility = winner ? 'visible' : 'hidden';
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

// function renderMessage() {
//   if (winner <= numGuesses) {
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
        badCountEl.innerHTML = 'You win!';
    } else {
        badCountEl.innerHTML = `Wrong Guesses: ${badGuess}`;
    }
}