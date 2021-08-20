'use strict';

const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentZero = document.getElementById('current--0');
const currentOne = document.getElementById('current--1');
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const btnThreshold = document.getElementById('threshbutton');
const inputThresHold = document.getElementById('threshold');
let thresHold = 0;
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const inputCheck = () => {
  if (thresHold === String) {
    console.log('No Number');
  } else {
    thresHold = Number(document.getElementById('threshold').value);
    console.log(thresHold);
  }
};

//THIS IS A FUNCTION RESET GAME
const newGame = () => {
  playing = true;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  thresHold = 0;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  diceElement.classList.add('hidden');
  currentZero.textContent = 0;
  currentOne.textContent = 0;
  activePlayer = 0;
  scores = [0, 0];
  currentScore = 0;
  // btnHold.disabled = false;
  // btnRoll.disabled = false;
  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--active');
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';
  document.getElementById('threshold').value = '';
  document.getElementById('threshold').disabled = false;
};
newGame();

//THIS IS A FUNCTION WINNER FUNCTION
const winNer = () => {
  console.log(`Player ${activePlayer + 1} Won the GAME!`);
  // playerOne.classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //playerwin
  document.getElementById(`name--${activePlayer}`).textContent = `Player ${
    activePlayer + 1
  } WIN!`;
  document.getElementById('threshold').value = '';
  thresHold = 0;
  document.getElementById('threshold').disabled = true;
  //   document.getElementById(`name--${activePlayer}`).

  // btnHold.disabled = true;
  // btnRoll.disabled = true;
};

//THIS IS A FUNCTION SWITCH PLAYER FUNCTION
const switchPlayer = () => {
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
};

btnRoll.addEventListener('click', () => {
  //generate a random dice roll
  if (playing && thresHold != 0 && thresHold > 0) {
    const rollDice = Math.trunc(Math.random() * 6) + 1;
    console.log('dice : ', rollDice);

    //display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `./images/dice-${rollDice}.png`;

    // check for rolled 1
    if (rollDice !== 1) {
      currentScore += rollDice;
      // currentZero.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      console.log('Current Score:', currentScore);
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  // 1. Add current score to actvie player's score

  if (playing && thresHold != 0 && thresHold > 0) {
    console.log('Hold Button');
    //scores[1] = scores[1] + currentScore;
    scores[activePlayer] += currentScore;

    document.getElementById(`current--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= thresHold) {
      playing = false;
      winNer();
    } else {
      // 2. Check if player's score is >=100
      // Finish the game

      // Switch to the next player
      switchPlayer();
    }
    console.log(
      `score of player ${activePlayer + 1} : ${scores[activePlayer]}`
    );
  }
});

btnNew.addEventListener('click', newGame);

btnThreshold.addEventListener('click', inputCheck);

inputThresHold.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    inputCheck();
  }
});
