// Scripts to run the game, keep track of score and lives_used, and reset.

//Game object, holding the word, lives used, score
function Game () {
    this.lives_used = 0;
    this.word = '';
    this.score = 0;

    resetLives: {
        this.lives = 0;
    }
}

/*Create the board:
    - the instantiation of the letter buttons
    - instantiation of the game object
 */
let game = new Game();
game.word = createWord();

/*EVENT HANDLERS*/

//Process users guess
function guessMadeHandler(guessedCorrectLetter) {
    if (guessedCorrectLetter) {
        updateScore(1);
    }
    else {
        updateLives(-1);
    }
}

//Process game reset (reset lives_used and score to 0)
function resetGameHandler() {
    game.lives_used = 0;
    game.score = 0;

    document.getElementById("lives_used").innerHTML = "You've used: " + game.lives_used + " lives_used";
    document.getElementById("score").innerText = game.score;
}

/*Helper functions*/

function updateScore(scoreChange) {
    game.score += scoreChange;
    document.getElementById("score").innerHTML = game.score;
}

function updateLives(lifeChange) {
    game.lives += lifeChange;
    document.getElementById("lives_used").innerHTML = game.lives;
}

//Output the end-of-game
function endGame(didUserWin, element_id) {
    if (didUserWin) {
        document.getElementById(element_id).innerHTML = "Wow! You won! Press reset to play again";
    }
    else {
        document.getElementById(element_id).innerHTML = "You've lost!";
    }
}