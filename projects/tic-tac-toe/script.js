function player(name,sym) {
    return {
        name,
        sym,

    }
}

let player1 = player('player 1','x');
let player2 = player('player 2','o');
let players = {
    'x' : player1,
    'o' : player2
}
let moves = 0;
const board = (() => {
    const spacesArr = Array.from(document.getElementsByClassName('space'));
    let playboardArray = ['','','','','','','','',''];
    let isPlaying = player1;


    for (let i=0; i < spacesArr.length; i++) {
        spacesArr[i].addEventListener('click', function(e) {
            const idx = parseInt(e.target.getAttribute('data-index'))
            if (spaceIsEmpty(playboardArray[idx])) {
                recordMove(idx);
                renderBoard();
                moves++;
            }
            if (game.playerWon(playboardArray)) {
                winningPlayer = game.playerWon(playboardArray);
                alert(`${players[winningPlayer[1]].name} has won!`);
                board.reset();
            } else if (moves === 9) {
                alert("It's a tie!");
                board.reset();
            }
        })
    }
    const renderBoard = () => {
        for (let i=0; i < spacesArr.length; i++) {
            spacesArr[i].textContent = playboardArray[i];
        }
    }
    const reset = () => {
        playboardArray = playboardArray.map(function() {
            return '';
        });
        renderBoard();
        isPlaying = player1;
        moves = 0;
    }
    const spaceIsEmpty = (item) => {
        return item === '';
    };
    const recordMove = (idx) => {
        if (spaceIsEmpty(playboardArray[idx])) {
            playboardArray[idx] = isPlaying.sym;
        }
        isPlaying = (isPlaying == player1) ? player2 : player1;
    }
    const getArray = function() {
        return playboardArray
    }

    return {
        getArray,
        renderBoard,
        reset,
        moves
    }
})();

const resetBtn = document.getElementById('reset-btn')
resetBtn.addEventListener('click', board.reset);

const game = (() => {

    const playerWon = (boardArray) => {
        let winningPlayer;
        switch (true) {
            //checks for row
            case (boardArray[1] && boardArray[0]==boardArray[1] && boardArray[1]==boardArray[2]):
                winningPlayer = [true, boardArray[0]];
                break;
            case (boardArray[4] && boardArray[3]==boardArray[4] && boardArray[4]==boardArray[5]):
                winningPlayer = [true, boardArray[3]];
                break;
            case (boardArray[7] && boardArray[6]==boardArray[7] && boardArray[7]==boardArray[8]):
                winningPlayer = [true,boardArray[7]];
                break;
            //checks for column
            case (boardArray[3] && boardArray[0]==boardArray[3] && boardArray[3]==boardArray[6]):
                winningPlayer = [true, boardArray[0]];
                break;
            case (boardArray[4] && boardArray[1]==boardArray[4] && boardArray[4]==boardArray[7]):
                winningPlayer = [true, boardArray[1]];
                break;
            case (boardArray[5] && boardArray[2]==boardArray[5] && boardArray[5]==boardArray[8]):
                winningPlayer = [true, boardArray[2]];
                break;
            //checks for diagonal 
            case (boardArray[4] && boardArray[0]==boardArray[4] && boardArray[4]==boardArray[8]):
                winningPlayer = [true, boardArray[4]];
                break;
            case (boardArray[4] && boardArray[2]==boardArray[4] && boardArray[4]==boardArray[6]):
                winningPlayer = [true, boardArray[4]];
                break;
            default:
                winningPlayer = false;
        }
        return winningPlayer;
    }

    return {
        playerWon,
    }
})()