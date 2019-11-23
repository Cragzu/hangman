// Scripts to run the game, keep track of score and lives, and reset.

//Code for PLAYING the game
function Game () {
    this.lives = 0;
    this.word = '';
    this.score = 0;

    resetLives: {
        this.lives = 0;
    }
}

//create_board
/*This is:
    - the instantiation of the letters,
    - the (hidden) word selection,
    - instantiation of the game object,
    - setting event handlers up
    - other stuff???
 */

let game = new Game();
game.word = createWord();
let guess = '';
let letter_occurrences = 0;

//Event handlers can go here
document.getElementById("resetBtn").onclick = resetGameHandler;

//get user guess
let theWord = '_'.repeat(document.getElementById("displayedWord").innerHTML.length)
document.getElementById("displayedWord").innerHTML = theWord

function checkIfCorrect(guess)
    
//update score based on guess
updateScoreHandler(letter_occurrences)


/*EVENT HANDLERS*/
//Process game reset
function resetGameHandler() {
    game.lives = 0;
    document.getElementById("lives").innerHTML = "You've used: " + game.lives + " lives";
}

//Change users score
function updateScoreHandler(occurrences) {
    game.lives += occurrences;

    if (occurrences === 0) {
        game.lives--;
    }

    document.elementFromPoint("score").value = game.lives;
}