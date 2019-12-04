const MOVES = ["ROCK", "PAPER", "SCISSORS"];

const PLAYER_WIN = 1;
const COMP_WIN = -1;
const DRAW = 0

let pScore = 0;
let cScore = 0;
let rounds = 0;

function randomChoice(iterable) {
    /* Returns a random element from an iterable collection */

    return iterable[Math.floor(Math.random() * iterable.length)];
}

function simplifyCircularIndex(circular_index, length) {
    /* Given an index that could be used to access a circular array of a 
     * given length, return the corresponding simple index to access a normal
     * array of the same length.
     *
     * ex:
     * given array length = 3,
     *
     * circular-index -1 => simple-index 2
     * circular-index 3 => simple-index 0
     */

    return ((circular_index % length) + length) % length
}


function computerPlay() {
    /* Return a random move ('ROCK', 'PAPER', or 'SCISSORS') to simulate
     * the computer's play. */
    
    return randomChoice(MOVES);
}

function playRound(playerMove, computerMove) {
    /* Plays a single round of Rock Paper Scissors */
    
    let pIndex = MOVES.indexOf(playerMove);
    let cIndex = MOVES.indexOf(computerMove);

    let losesToPlayer = simplifyCircularIndex(pIndex - 1, MOVES.length);
    let winsOverPlayer= simplifyCircularIndex(pIndex + 1, MOVES.length);

    if (cIndex === losesToPlayer) {
        return PLAYER_WIN;
    }
    else if (cIndex === winsOverPlayer) {
        return COMP_WIN;
    }
    else {
        return DRAW;
    }
}


let startButton = document.getElementById("start");
startButton.addEventListener("click", () => {

    // hide dimmer and start display (TODO put into separate function
    const dimmer = document.getElementById("dimmer");
    const newGameContainer = document.getElementById("new_game");
    dimmer.style.display = "none";
    newGameContainer.style.display = "none";

});

function computeNewScore(pScore, cScore, result) {
    /* Given a pair of player and computer scores, return a new pair of player 
     * and computer scores that reflects the result of a given round of play. */

    let newPScore = pScore;
    let newCScore = cScore;

    switch (result) {
        case PLAYER_WIN:
            newPScore++;
            break;
        case COMP_WIN:
            newCScore++;
            break;
    } 

    return [newPScore, newCScore];
}

function updateScoreBoard(pScore, cScore) {
    /* Updates the DOM scoreboard with the given player and computer scores */

    const pScoreDisplay = document.querySelector('#player ');
    const cScoreDisplay = document.querySelector('#computer'); 

    pScoreDisplay.textContent = pScore;
    cScoreDisplay.textContent = cScore;
}


let playButtons = document.getElementsByClassName('play');
for (let i = 0; i < playButtons.length; i++) {
    let button = playButtons[i];
    button.addEventListener('click', () => {

        let pMove = (button.id).toUpperCase();
        let cMove = computerPlay();
        let result = playRound(pMove, cMove);
        
        [pScore, cScore] = computeNewScore(pScore, cScore, result);
        updateScoreBoard(pScore, cScore);
        alertResult(pMove, cMove, result); //TODO
        rounds++;

        if (rounds === 5) {
            alertVictory(pScore, cScore); //TODO
            clear();
        }
    });
}

function clear() {
    pScore = 0;
    cScore = 0;
    updateScoreBoard(pScore, cScore);
    rounds = 0;
}

function alertResult(pMove, cMove, result) {
    switch (result) {
        case PLAYER_WIN:
            alert(`You WON this round! ${pMove} beats ${cMove}.`);
            break;
        case COMP_WIN:
            alert(`You LOST this round! ${cMove} beats ${pMove}.`);
            break;
        case DRAW:
            alert(`This round was a DRAW.`);
    }
}

function alertVictory(pScore, cScore) {
    /* Print result of game */

    if (pScore > cScore) {
        alert(`Congratulations! You won this game.`);
    }
    else if (pScore < cScore) {
        alert(`Sorry! You lost this game.`);
    }
    else {
        alert(`This game was a draw!`);
    }
}
