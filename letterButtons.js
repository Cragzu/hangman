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

generateButtons();
