let moves = 0;
const board = (() => {
    const spacesArr = Array.from(document.getElementsByClassName('space'));
    let playboardArray = ['','','','','','','','',''];
    let player1;
    let player2;
    let players;
    let isPlaying;

    for (let i=0; i < spacesArr.length; i++) {
        spacesArr[i].addEventListener('click', function(e) {
            const idx = parseInt(e.target.getAttribute('data-index'))
            if (spaceIsEmpty(playboardArray[idx])) {
                recordMove(idx);
                renderBoard();
                moves++;
                toggleWhosMove();
            }
            gameOverRoutine();
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
    const gameOverRoutine = () => {
        if (game.playerWon(playboardArray)) {
            winningPlayer = game.playerWon(playboardArray);
            alert(`${players[winningPlayer[1]].name} wins!`);
            board.reset();
            resetWhosMove();
        } else if (moves === 9) {
            alert("It's a tie!");
            board.reset();
            resetWhosMove();
        }
    }
    function player(name,sym) {
        return {
            name,
            sym,
    
        }
    }
    const playerForm = document.forms[0];
    function makePlayers() {

        player1Name = (playerForm['player1Name'].value) ? playerForm['player1Name'].value : 'Player 1';
        player2Name = (playerForm['player2Name'].value) ? playerForm['player2Name'].value : 'Player 2';
    
        player1 = player(player1Name, 'x');
        player2 = player(player2Name, 'o');
        isPlaying = player1;
        players = {
            'x' : player1,
            'o' : player2
        }
    }
    function togglePlayerPanl() {
        let playerCtrlPanlDisplay = document.getElementById('player-ctrl-panl').style
        playerCtrlPanlDisplay.display = (playerCtrlPanlDisplay.display == '') ? 'none' : '';
    }
    function togglePlayQuitBtn() {
        startQuitBtn.textContent = (startQuitBtn.textContent == 'Start') ? 'Quit' : 'Start';
    }
    function changePlayerNames() {
        let player1Name = document.getElementById('player-1-name');
        let player2Name = document.getElementById('player-2-name');
        player1Name.textContent = player1.name;
        player2Name.textContent = player2.name;
    }
    const toggleWhosMove = () => {
        player1Name = document.getElementById('player-1-name');
        player2Name = document.getElementById('player-2-name');

        if (player1Name.style.backgroundColor == '') {
            player1Name.style.backgroundColor = '#49f477';
            player2Name.style.backgroundColor = '';
        } else {
            player2Name.style.backgroundColor = '#49f477';
            player1Name.style.backgroundColor = '';
        }
    }
    const resetWhosMove = () => {
        let player1Name = document.getElementById('player-1-name');
        let player2Name = document.getElementById('player-2-name');
        player1Name.style.backgroundColor = '#49f477';
        player2Name.style.backgroundColor = '';
    }



    const startQuitBtn = document.getElementById('start-quit-btn')
    startQuitBtn.addEventListener('click', () => {
        if (startQuitBtn.textContent == 'Start') {
            makePlayers();
            togglePlayerPanl();
            togglePlayQuitBtn();
            changePlayerNames();
            toggleWhosMove();
            playerForm.reset();
        } else {
            const player1Name = document.getElementById('player-1-name');
            const player2Name = document.getElementById('player-2-name');
            player1Name.textContent = 'Player 1';
            player2Name.textContent = 'Player 2';
            player1Name.style.backgroundColor = '';
            player2Name.style.backgroundColor = '';
            togglePlayerPanl();
            togglePlayQuitBtn();
            player1 = undefined;
            player2 = undefined;
            players = undefined;
            board.reset();
        }

    });

    return {
        getArray,
        renderBoard,
        reset,
        moves,
        toggleWhosMove,
    }
})();


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

