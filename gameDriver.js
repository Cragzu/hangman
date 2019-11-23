// Scripts to run the game, keep track of score and lives_used, and reset.

// Object and other variable declarations
// Dynamically generate between 0 and 26 buttons with letters of the alphabet.
let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

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

// Randomly select a word from the array
function createWord() {
    let randomNumber = Math.floor(Math.random()*wordList.length);
    let wordObject = wordList[randomNumber];
    let word = wordObject.name;
    console.log("Created word: " + word);

    definitionText.style.visibility="hidden";
    hintButton.innerHTML = "display hint";

    return word.toUpperCase(); // to pass to letter buttons
}

//Game object, holding the word, lives used, score
function Game () {
    this.lives_used = 0;
    this.word = createWord();
    this.score = 0;

    resetGame: {
        this.lives_used = 0;
        this.score = 0;
    }

    incrementScore: {
        this.score++;
    }

    useALife: {
        this.lives++;
    }
}

/*Create the board:
    - the instantiation of the letter buttons
    - instantiation of the game object
 */
let game = new Game();

// Helper functions

function updateGameStats() {
    document.getElementById("score").innerHTML = game.score;
    document.getElementById("lives_used").innerHTML = game.lives_used;
}

// End of Helper functions

// set hint boolean and variables containing refs to frequently accessed elements
let hint = false;
//let definitionText = document.getElementById("definition");

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

// Make the word-button call a random word


/*letterButton functions*/
// Scripts to handle the letter buttons.
let testWord = selectedWord;
console.log("Word is", testWord);

//get user guess
let theWord = '_'.repeat(document.getElementById("displayedWord").innerHTML.length);

function checkIfCorrect(guess) {

}

/*EVENT HANDLERS*/

//Process users guess
function guessMadeHandler(letter) {
    if (checkIfCorrect(letter)) {
        game.incrementScore();
    }
    else {
        game.useALife();
    }

    updateGameStats();
}

//Process game reset (reset lives_used and score to 0)
function resetGameHandler() {
    game.resetGame();

    updateGameStats();
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