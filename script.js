const cardElements = document.getElementsByClassName('game-card');
const cardElementsArray = [...cardElements];
const imgElements = document.getElementsByClassName('game-card-img');
const imgElementsArray = [...imgElements];
const counter = document.getElementById('moveCounter');
const timer = document.getElementById('timer');

let openedCards = [];
let matchedCards = [];
let moves;
let second = 0,
  minute = 0,
  hour = 0,
  interval,
  time,
  board;

//Fisher-Yates Shuffle
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

function startGame() {
  let shuffledImages = shuffle(imgElementsArray);
  for (i = 0; i < shuffledImages.length; i++) {
    cardElements[i].append(shuffledImages[i]);
    cardElements[i].type = `${shuffledImages[i].alt}`;
  }
  
  flashCards();

  moves = 0;
  counter.innerText = `${moves} move(s)`;
  timer.innerHTML = '0 mins 0 secs';
  clearInterval(interval);
}

window.onload = function () {
  setTimeout(function () {
    startGame()
  }, 1200);
}


function flashCards() {
  for (i = 0; i < cardElements.length; i++) {
    cardElements[i].children[0].classList.add("show-img")
  }

  setTimeout(function () {
    for (i = 0; i < cardElements.length; i++) {
      cardElements[i].children[0].classList.remove("show-img")
    }
  }, 1000)
}

for (let i = 0; i < cardElementsArray.length; i++) {
  cardElementsArray[i].addEventListener("click", displayCard)
}

function displayCard() {
  this.children[0].classList.toggle("show-img");
  this.classList.toggle("disabled");
  cardOpen(this);
}

function cardOpen(card) {
  openedCards.push(card);
  if (openedCards.length === 2) {
    moveCounter();
    disable();
    if (openedCards[0].type === openedCards[1].type) {
      openedCards[0].children[0].classList.add('show-img');
      openedCards[1].children[0].classList.add('show-img');
      matched();
    } else {
      unmatched();
    }
  }
}

function matched() {

  openedCards[0].children[0].classList.add('show-img');
  openedCards[1].children[0].classList.add('show-img');

  openedCards.forEach((card, i, cardElementsArray) => {
    matchedCards.push(card);
  })
  
  openedCards = []
  disable();

  if (matchedCards.length === 10) {
    endGame();
    }
}

function unmatched() {
  disable(); 
  setTimeout(function () {
    openedCards[0].children[0].classList.remove('show-img');
    openedCards[1].children[0].classList.remove('show-img');
    enable();  //allows you to click again after unmatched
    openedCards = [];
  }, 400)
}


function disable() {
  openedCards.forEach((card, i, cardElementsArray) => {
    card.classList.add('disabled');
  })
}

function enable() {
  openedCards.forEach((card, i, cardElementsArray) => {
    card.classList.remove('disabled');
  })
}

function moveCounter() {
  moves++;
  counter.innerHTML = `${moves} move(s)`;

  if (moves === 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
}

function startTimer() {
  interval = setInterval(function () {
    timer.innerHTML = `${minute} mins ${second} secs`;
    second++;
    if (second === 60) {
      minute++;
      second = 0;
    }
    if (minute === 60) {
      hour++;
      minute = 0;
    }
  }, 1000)
}

function endGame() {
    clearInterval(interval);
}















