// Scripts to run the game, keep track of score and lives, and reset.

// ----->                                OBJECT and other VARIABLE declarations

//Game object, holding the word, lives used, score
function Game () {
    this.lives = 7;
    this.word = createWord().toLowerCase();
    this.score = 0;
    this.hint = false;
    this.lettersLeft = this.word.length;
    this.wordArray = this.word.split('');
    this.underscore_list = makeUnderscores(this.word);

    // Update lives and score display. This should only be called the Game functions themselves.
    this.updateStats = function () {
        document.getElementById('scoreValue').innerHTML = this.score;
        document.getElementById('livesValue').innerHTML = this.lives;
    };

    // This call seems weirdly placed but means that, upon instantiation (or a reset) the fields will be updated
    this.updateStats();

    this.correctLetterChosen = function(letter) {
        for (let i = 0; i < this.wordArray.length; i++) {
            if (this.wordArray[i] === letter) {
                this.lettersLeft--;
                this.score++;
            }
        }

        this.updateStats();

        if (this.lettersLeft === 0) {
            endGame(true, 'specialMessage');
        }
    };

    this.incorrectLetterChosen = function() {
        if (this.score > 0) {
            this.score--;
        }

        this.lives--;
        if (this.lives === 0) {
            endGame(false, 'specialMessage')
        }
        this.updateStats();
    };

    this.alterUnderscoreList = function(underscore_list, word, label){
        let underscoreArray = underscore_list;
            for (let i = 0; i < underscore_list.length; i++){
            if (word[i] === (label.toLowerCase())){
                underscoreArray[i] = label;
            }}
            let new_message = "";
        for(let i = 0; i < underscore_list.length; i++){
            new_message= new_message.concat(underscoreArray[i]);
        }
        document.getElementById("displayedWord").innerHTML= new_message;
    };

  this.toggleHintVisibility = function() {
        if (this.hint === false) {
            document.getElementById("definition").style.visibility= "visible";
            hintButton.innerHTML = "Hide Hint";
            this.hint = true;
        }
        else {
            document.getElementById("definition").style.visibility= "hidden";
            hintButton.innerHTML = "Display Hint";
            this.hint = false;
        }
    };
}

// <Generate Letter Buttons>

function makeUnderscores(word){
    let underscore_list = [];
    for (let i = 0; i < word.length; i++){
        underscore_list.push("_ ");
    }

    let underscores="";
    for(let i = 0; i < underscore_list.length; i++){
        underscores= underscores.concat(underscore_list[i]);
    }

    document.getElementById("displayedWord").innerHTML = underscores;
    return underscore_list;
}

function Button(label, word, underscore_list) {
    this.btn = document.createElement("BUTTON");
    this.btn.innerHTML = label;
    this.underscore_list = underscore_list;

    this.btn.onclick = function() { // method for click behaviour
        if (word.includes(label.toLowerCase())) { // the guess was correct
            this.className = "correctGuessButton"; // update button class to disable and change colour
            game.correctLetterChosen(label.toLowerCase());
            game.alterUnderscoreList(underscore_list, word, label);
        }
        else { // the guess was incorrect
            this.className = "wrongGuessButton";
            game.incorrectLetterChosen();
        }
    }
}

let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let letterButtons = []; // Store button refs in array for updates later

function generateButtons(word) {

    for (let i = 0; i < letters.length; i++) {
        let currentLetter = letters[i];
        let b = new Button(currentLetter, word, game.underscore_list); // create a new button object

        letterButtons.push(b.btn);
        document.getElementById('letterButtonContainer').appendChild(b.btn);
    }
}

// <Select random word with definition>

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
    new Word("tattoo", "a form of body modification where a design is made by inserting ink"),
    new Word("electricity", "is the set of physical phenomena associated with the presence and " +
        "motion of electric charge."),
    new Word("corruption", "When there are problems in a political structure due to the personal " +
        "interests of politicians conflicting with the interests of the population.")
];

// Select a random word
function createWord() {
    let randomNumber = Math.floor(Math.random()*wordList.length);
    let wordObject = wordList[randomNumber];

    //definitionText.style.visibility="hidden";
    document.getElementById('definition').innerHTML = wordObject.definition;


    return wordObject.name.toUpperCase(); // to pass to letter buttons
}

// Make the hints invisible or visible.
 // Put this into Game

// Output the end-of-game
function endGame(didUserWin, element_id) {
    if (didUserWin) {
        document.getElementById(element_id).innerHTML = "Wow! You won! Press reset to play again";
    }
    else {
        document.getElementById(element_id).innerHTML = `You've lost! The word was "${game.word}"`;
    }

    for (let i = 0; i < letterButtons.length; i++) {
        letterButtons[i].disabled = true;
    }

    window.scrollTo(0,0);
}