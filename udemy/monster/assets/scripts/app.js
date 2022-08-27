const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
//오타를 피하기 위한 전역변수 (feat.if문의조건,자동완성)
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';
const LOG_EVENT_BONUS_LIFE = 'BONUS_LIFE';

//초기 피통 설정을 사용자에게 받음
const enteredValue = prompt('Maximum life for you and the monster.', '100');
let chosenMaxLife = parseInt(enteredValue);
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
adjustHealthBars(chosenMaxLife); //UI 체력바 설정

let battleLog = [];
let lastLoggedEntry;
function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  switch (ev) {
    case LOG_EVENT_PLAYER_ATTACK: //switch문에서의 or연산
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry.target = 'Monster';
      break;
    case LOG_EVENT_MONSTER_ATTACK:
    case LOG_EVENT_PLAYER_HEAL:
      logEntry.target = 'Player';
      break;
    case LOG_EVENT_BONUS_LIFE:
      delete logEntry.value;
      break;
  }
  // if (ev === LOG_EVENT_PLAYER_ATTACK || ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
  //   logEntry.target = 'Monster';
  // } else if (ev === LOG_EVENT_MONSTER_ATTACK || ev === LOG_EVENT_PLAYER_HEAL) {
  //   logEntry.target = 'Player';
  // } else if (ev === LOG_EVENT_BONUS_LIFE) {
  //   delete logEntry.value;
  // }
  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  let gameOverValue;
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    setPlayerHealth(initialPlayerHealth);
    currentPlayerHealth = initialPlayerHealth;
    alert('Bonus life saved you!');
    writeToLog(
      LOG_EVENT_BONUS_LIFE,
      null,
      currentMonsterHealth,
      currentPlayerHealth
    );
    1;
  }
  if (currentMonsterHealth < 0 && currentPlayerHealth > 0) {
    alert('You won!');
    gameOverValue = 'PLAYER WON';
  } else if (currentMonsterHealth > 0 && currentPlayerHealth < 0) {
    alert('You lost!');
    gameOverValue = 'PLAYER LOST';
  } else if (currentMonsterHealth < 0 && currentPlayerHealth < 0) {
    alert('You have a draw!');
    gameOverValue = 'A DRAW';
  }
  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    writeToLog(
      LOG_EVENT_GAME_OVER,
      gameOverValue,
      currentMonsterHealth,
      currentPlayerHealth
    );
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  let attackType;
  switch (mode) {
    case MODE_ATTACK:
      maxDamage = ATTACK_VALUE;
      attackType = LOG_EVENT_PLAYER_ATTACK;
      break;
    case MODE_STRONG_ATTACK:
      maxDamage = STRONG_ATTACK_VALUE;
      attackType = LOG_EVENT_PLAYER_STRONG_ATTACK;
      break;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;

  writeToLog(attackType, damage, currentMonsterHealth, currentPlayerHealth);
  endRound();
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}
function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}
function healPlayerHandler() {
  let adjustedHealValue;
  if (currentPlayerHealth + HEAL_VALUE >= chosenMaxLife) {
    alert("You can't heal to more than your max initial health.");
    adjustedHealValue = chosenMaxLife - currentPlayerHealth;
  } else {
    adjustedHealValue = HEAL_VALUE;
  }
  increasePlayerHealth(adjustedHealValue);
  currentPlayerHealth += adjustedHealValue;

  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    adjustedHealValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function printLogHandler() {
  // for (let i = 0; i < battleLog.length; i++) {
  //   console.log(battleLog[i]);
  // }
  console.log('-------------------------');
  let i = 0;
  for (const logEntry of battleLog) {
    if ((!lastLoggedEntry && lastLoggedEntry !== 0) || lastLoggedEntry < i) {
      console.log(`#${i}`);
      for (const key in logEntry) {
        console.log(`${key} -> ${logEntry[key]}`);
      }
      lastLoggedEntry = i;
      break;
    }
    i++;
  }
  // console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
