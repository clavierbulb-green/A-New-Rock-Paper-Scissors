const MOVES = ["ROCK", "PAPER", "SCISSORS"];

const PLAYER_WIN = 1;
const COMP_WIN = -1;
const DRAW = 0


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

function playRound(playerSelection, computerSelection) {
    /* Plays a single round of Rock Paper Scissors; returns a string that 
     * declares the winner of the round. */
    
    let pIndex = MOVES.indexOf(playerSelection);
    let cIndex = MOVES.indexOf(computerSelection);

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


function game(rounds) {
    /* Plays a game of Rock Paper Scissors for a given number of rounds. */

    let playerScore = 0;
    let computerScore = 0;

    for (let r = 1; r <= rounds; r++) {
        console.log(`Round ${r}:`)

        let compMove = computerPlay();
        let pMove = "";
        while (!MOVES.includes(pMove)) {
            pMove = prompt("Enter your move (rock, paper, or scissors)").toUpperCase();
        }

        let result = playRound(pMove, compMove);
        switch (result) {
            case PLAYER_WIN:
                playerScore++;
                console.log(`You WON this round! ${pMove} beats ${compMove}.`);
                break;
            case COMP_WIN:
                computerScore++;
                console.log(`You LOST this round! ${compMove} beats ${pMove}.`);
                break;
            default:
                console.log(`This round was a DRAW.`);
        }
        console.log(`PLAYER: ${playerScore}, COMPUTER: ${computerScore}`);
        console.log(`\n`);
    }

    /* Print result of game */
    if (playerScore > computerScore) {
        console.log(`Congratulations! You won this game.`);
    }
    else if (playerScore < computerScore) {
        console.log(`Sorry! You lost this game.`);
    }
    else {
        console.log(`This game was a draw!`);
    }
}

let playButtons = document.getElementsByClassName('play');
for (let i = 0; i < playButtons.length; i++) {
    let button = playButtons[i];
    button.addEventListener('click', () => {
        let pMove = button.textContent;
        let cMove = computerPlay();
        console.log(playRound(pMove, cMove));
    });
}
