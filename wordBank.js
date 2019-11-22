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
var selectedWord = createWord(); // global variable, used throughout the game
document.getElementById("makeWord").onclick = selectedWord;

// Make the hint button bring up a hint
hintButton.onclick = toggleVisibility;