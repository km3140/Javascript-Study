const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const SCISSORS = 'SCISSORS';
const PAPER = 'PAPER';

let gamePlaying = false;
//

const playerDetermineCheck = () => {
  let nullCheck = prompt('Choice.. Rock! Scissors! Paper!', '');
  if (!nullCheck) {
    console.log('You must choice in Rock, Scissors, Paper! try again');
    return;
  }
  const checkValue = nullCheck.toUpperCase();
  if (checkValue !== ROCK && checkValue !== SCISSORS && checkValue !== PAPER) {
    console.log('You must choice in Rock, Scissors, Paper! try again');
    return;
  }
  return checkValue;
};

const computerDetermine = () => {
  let computerDet = Math.random();
  if (computerDet < 0.33) {
    return ROCK;
  } else if (computerDet < 0.67) {
    return SCISSORS;
  } else {
    return PAPER;
  }
};

const getWinner = (playerC, computerC) =>
  playerC === computerC
    ? console.log('Draw!')
    : (playerC === ROCK && computerC === SCISSORS) ||
      (playerC === SCISSORS && computerC === PAPER) ||
      (playerC === PAPER && computerC === ROCK)
    ? console.log('Player wins!')
    : console.log('Computer wins!');
// if (playerC === computerC) {
//   console.log('Draw!');
// } else if (
//   (playerC === ROCK && computerC === SCISSORS) ||
//   (playerC === SCISSORS && computerC === PAPER) ||
//   (playerC === PAPER && computerC === ROCK)
// ) {
//   console.log('Player wins!');
// } else {
//   console.log('Computer wins!');
// }

startGameBtn.addEventListener('click', () => {
  if (gamePlaying) {
    return;
  }
  console.log('Game is starting...');
  const playerChoice = playerDetermineCheck();
  if (!playerChoice) {
    return;
  }
  gamePlaying = true;
  const computerChoice = computerDetermine();
  getWinner(playerChoice, computerChoice);
  gamePlaying = false;
});
