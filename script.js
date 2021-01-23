const rock = 'ROCK';
const paper = 'PAPER';
const scissors = 'SCISSORS';
userScorePara = document.getElementById('userScorePara');
compScorePara = document.getElementById('compScorePara');

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
        compChoice = getCompChoice;
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


function playGame(howManyRounds) {
    let userScore = 0;
    let compScore = 0;
    let round = 0;
    let playing = howManyRounds > round;

    while (playing) {
        //let choice;
        const rockBtn = document.getElementById('rockBtn');
        const paperBtn = document.getElementById('paperBtn');
        const scissorsBtn = document.getElementById('scissorsBtn');
        rockBtn.addEventListener('click', function() {
            userChoice = rockBtn.value;
        });
        paperBtn.addEventListener('click', function() {
            userChoice = paperBtn.value;
        });
        scissorsBtn.addEventListener('click', function() {
            userChoice = paperBtn.value;
        });
        if (playRound(userChoice)) {
            ++userScore
            userScorePara.textContent = userScore;
        }else {
            ++compScore;
            compScorePara.textContent = compScore;
        }
        ++round;

        };
    };
};

