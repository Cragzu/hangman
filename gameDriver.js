// Scripts to run the game, keep track of score and lives_used, and reset.

// Helper functions

function updateScore(scoreChange) {
    game.score += scoreChange;
    document.getElementById("score").innerHTML = game.score;
}

function updateLives(lifeChange) {
    game.lives += lifeChange;
    document.getElementById("lives_used").innerHTML = game.lives;
}

// End of Helper functions

/*wordBank*/
// Scripts to handle word generation and display.

function Word(name, definition) {
    this.name = name;
    this.definition = definition;
}

let wordList = [
    new Word("committee", "A group of people in charge of something"),
    new Word("happy", "How you feel when you do well on an assignment"),
    new Word("humanitarian", "Way to describe something that benefit people"),
    new Word("sausage", "A great food to have with your eggs and toast."),
    new Word("helix", "DNA is a double ___"),
    new Word("fortification", "To reinforce something against a destructive force."),
    new Word("psychedelic", "An adjective people used to describe everything in the sixties"),
    new Word("maternal", "Anything to do with mothers"),
    new Word("fraternity", "Where college dudes can throw sick parties."),
    new Word("corruption", "When there are problems in a political structure due to the personal " +
        "interests of politicians conflicting with the interests of the population.")
];

// set hint boolean and variables containing refs to frequently accessed elements
let hint = false;
let definitionText = document.getElementById("definition");
let hintButton = document.getElementById("hintButton");

// Allow the hint-button to make the hints invisible or visible.
function toggleVisibility() {
    if (hint === false) {
        definitionText.style.visibility= "visible";
        hintButton.innerHTML = "hide hint";
        hint = true;
    }
    else {
        definitionText.style.visibility= "hidden";
        hintButton.innerHTML = "display hint";
        hint = false;
    }
}

// Randomly select a word from the array
function createWord() {
    let randomNumber = Math.floor(Math.random()*wordList.length);
    let wordObject = wordList[randomNumber];
    let word = wordObject.name;
    console.log(word);

    definitionText.style.visibility="hidden";
    document.getElementById("displayedWord").innerHTML = word;
    definitionText.innerHTML = wordObject.definition;
    console.log('description:', wordObject.definition);
    hintButton.innerHTML = "display hint";

    return word.toUpperCase(); // to pass to letter buttons
}

// Make the word-button call a random word
// var selectedWord = createWord(); // global variable, used throughout the game  <-- relocated to the Game constructor
document.getElementById("makeWord").onclick = selectedWord;

// Make the hint button bring up a hint
hintButton.onclick = toggleVisibility;


/*letterButton functions*/
// Scripts to handle the letter buttons.

// Dynamically generate between 0 and 26 buttons with letters of the alphabet.
let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let testWord = selectedWord;
console.log("Word is", testWord);

function Button(label) {
    this.btn = document.createElement("BUTTON");
    this.btn.innerHTML = label;

    this.btn.onclick = function() { // method for click behaviour
        if (testWord.includes(label)) { // the guess was correct
            this.className = "correctGuessButton"; // update button class to disable and change colour
        }
        else { // the guess was incorrect
            this.className = "wrongGuessButton";
        }
    };
    document.body.appendChild(this.btn);
}

function generateButtons() {
    for (let i = 0; i < letters.length; i++) {
        let currentLetter = letters[i];
        new Button(currentLetter); // create a new button object
    }
}

//generateButtons(); <-- Re-located to index.html


//Game object, holding the word, lives used, score
function Game () {
    this.lives_used = 0;
    this.word = createWord();
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


//get user guess
let theWord = '_'.repeat(document.getElementById("displayedWord").innerHTML.length)
document.getElementById("displayedWord").innerHTML = theWord

function checkIfCorrect(guess) {

}

//update score based on guess
function updateScoreHandler(letter_occurrences) {

}
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

//Output the end-of-game
function endGame(didUserWin, element_id) {
    if (didUserWin) {
        document.getElementById(element_id).innerHTML = "Wow! You won! Press reset to play again";
    }
    else {
        document.getElementById(element_id).innerHTML = "You've lost!";
    }
}