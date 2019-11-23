// Scripts to run the game, keep track of score and lives, and reset.

// ----->                                OBJECT and other VARIABLE declarations

// set hint boolean and variables containing refs to frequently accessed elements
let hint = false; // Put this into Game

//Game object, holding the word, lives used, score
function Game () {
    this.lives = 7;
    this.word = createWord();
    this.score = 0;
    this.hint = false;

    // These functions aren't resolvable.... I've no idea why not
    this.resetGame = function() {
        this.lives = 0;
        this.score = 0;
        document.getElementById('score').innerHTML = this.score;
        document.getElementById('lives').innerHTML = this.lives;

        for (i = 0; i < letterButtons.length; i++)
            letterButtons[i].className = ''; // Remove classes from all buttons
    };

    this.incrementScore = function() {
        this.score++;
    };

    this.useALife = function() {
        this.lives--;
    };

    this.toggleHint = function() {
        if (this.hint === false) {
            document.getElementById("definition").style.visibility= "visible";
            hintButton.innerHTML = "hide hint";
            this.hint = true;
        }
        else {
            document.getElementById("definition").style.visibility= "hidden";
            hintButton.innerHTML = "display hint";
            this.hint = false;
        }
    };
}

//          <Generate Letter Buttons>

function Button(label, word) {
    this.btn = document.createElement("BUTTON");
    this.btn.innerHTML = label;

    this.btn.onclick = function() { // method for click behaviour
        if (word.includes(label)) { // the guess was correct
            this.className = "correctGuessButton"; // update button class to disable and change colour
            game.incrementScore();
            console.log('Score:', game.score)
        }
        else { // the guess was incorrect
            this.className = "wrongGuessButton";
            game.useALife();
            console.log('Lives: ', game.lives)
        }
        
        // updateGameStats(); This function doesn't exist..
    };
}

let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let letterButtons = []; // Store button refs in array for updates later

function generateButtons(word) {

    for (let i = 0; i < letters.length; i++) {
        let currentLetter = letters[i];
        let b = new Button(currentLetter, word); // create a new button object

        letterButtons.push(b.btn);
        document.getElementById('letterButtonContainer').appendChild(b.btn);
    }
}

//          <Select random word with definition>

function Word(name, definition) {
    this.name = name;
    this.definition = definition;
}

// Array of word objects to pick from
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

// Select a random word
function createWord() {
    let randomNumber = Math.floor(Math.random()*wordList.length);
    let wordObject = wordList[randomNumber];

    console.log("Created word: " + wordObject.name);

    //definitionText.style.visibility="hidden";
    // hintButton.innerHTML = "display hint";

    return wordObject.name.toUpperCase(); // to pass to letter buttons
}

// ----->                                   <HELPER FUNCTIONS>

// ----->                                   </HELPER FUNCTIONS>

//get user guess
// let theWord = '_'.repeat(document.getElementById("displayedWord").innerHTML.length);

// Compare the users guess to the word
// NOTE: ensure that the onclick function of Button meshes well with this function (maybe place the function invocation there)

// ----->                                    <EVENT HANDLERS>

//Process game reset (reset lives and score to 0)
function resetGameHandler(game) {
    game.resetGame();
    for (i = 0; i < letterButtons.length; i++)
        letterButtons[i].className = ''; // Remove classes from all buttons

    updateGameStats();
}

// Make the hints invisible or visible.
function toggleHintVisibility() {
    if (hint === false) {
        document.getElementById("definition").style.visibility= "visible";
        hintButton.innerHTML = "hide hint";
        hint = true;
    }
    else {
        document.getElementById("definition").style.visibility= "hidden";
        hintButton.innerHTML = "display hint";
        hint = false;
    }
} // Put this into Game

//Output the end-of-game
function endGame(didUserWin, element_id) {
    if (didUserWin) {
        document.getElementById(element_id).innerHTML = "Wow! You won! Press reset to play again";
    }
    else {
        document.getElementById(element_id).innerHTML = "You've lost!";
    }
}
// ----->                                    </EVENT HANDLERS>