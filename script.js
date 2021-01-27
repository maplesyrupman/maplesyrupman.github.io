const rock = 'ROCK';
const paper = 'PAPER';
const scissors = 'SCISSORS';
const userScorePara = document.getElementById('userScorePara');
const compScorePara = document.getElementById('compScorePara');
const rockBtn = document.getElementById('rockBtn');
const paperBtn = document.getElementById('paperBtn');
const scissorsBtn = document.getElementById('scissorsBtn');
let userChoice; 
let userScore = 0;
let compScore = 0;
let numberOfRounds;
let round = 0;
const pleaseSelect = 'Please select the number of rounds you would like to play!';
const roundSelectors = document.querySelectorAll('.roundBtn');
const roundDisplay = document.getElementById('roundDisplay');
const roundDisplayPara = document.getElementById('roundDisplayPara');
const oneRound = document.getElementById('1');
const threeRounds = document.getElementById('3');
const fiveRounds = document.getElementById('5');
const indefRounds = document.getElementById('indef');
const userWonMessage = `Congratulations, you won ${userScore} out of ${numberOfRounds} rounds!`;
const userLostMessage = `Too bad, you lost ${userScore} out of ${numberOfRounds} rounds. Better luck next time!`;

function getRandNum0to2 () {
    return Math.floor(Math.random()*3)
}

function getCompChoice() {
    const randNum = getRandNum0to2();
    const compChoice = (randNum === 0) ? rock : 
    (randNum === 1) ? paper : scissors;

    return compChoice;
}

function playRound(userChoice) {
    let compChoice = getCompChoice();
    let userWon;

    while (userChoice === compChoice) {
        compChoice = getCompChoice();
    }

    if (userChoice === rock) {
        userWon = (compChoice === paper) ? false: true;
    } else if (userChoice === paper) {
        userWon = (compChoice === scissors) ? false: true;
    } else {
        userWon = (compChoice === rock) ? false: true;
    }

    return userWon; 
}

function updateScore() {
    userWon = playRound(userChoice);
    if (userWon) {
        userScore++;
        userScorePara.textContent = userScore;
    }else {
        compScore++;
        compScorePara.textContent = compScore;
    }
}

function displayEndingMessage(userScore, compScore) {
    roundDisplayPara.textContent = (userScore > compScore) ? userWonMessage : userLostMessage;

    round = 0;
    numberOfRounds = 0;
    userScore = 0;
    compScore = 0;
    userScorePara.textContent = userScore;
    compScorePara.textContent = compScore;
}

function checkGameOver(round, numberOfRounds) {
    if (numberOfRounds > round) {
        return;
    }
    displayEndingMessage(userScore, compScore);
}

rockBtn.onclick = function () {
    if (!numberOfRounds) {
        alert(pleaseSelect)
    } else {
        userChoice = rock;
        updateScore(userChoice);
        round++;
        checkGameOver(round, numberOfRounds);
    }
}

paperBtn.onclick = function () {
    if (!numberOfRounds) {
        alert(pleaseSelect);
    } else {
        userChoice = paper;
        updateScore(userChoice);
        round++;
        checkGameOver(round, numberOfRounds);
    }
}

scissorsBtn.onclick = function () {
    if (!numberOfRounds) {
        alert(pleaseSelect);
    } else {
        userChoice = paper;
        updateScore(userChoice);
        round++;
        checkGameOver(round, numberOfRounds);
    }
}



oneRound.onclick = function () {
    numberOfRounds = Number(oneRound.value);
}

threeRounds.onclick = function () {
    numberOfRounds = Number(threeRounds.value);
}

fiveRounds.onclick = function () {
    numberOfRounds = Number(fiveRounds.value);
}
