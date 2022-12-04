// Create global variables to select the following elements:

const guessedLetters = document.querySelector(".guessed-letters")// The unordered list where the player’s guessed letters will appear.
const guessButton = document.querySelector(".guess") // The button with the text “Guess!” in it.
const textInput = document.querySelector(".letter") // The text input where the player will guess a letter.
const wordInProgress = document.querySelector(".word-in-progress") // The empty paragraph where the word in progress will appear.
const remainingGuesses = document.querySelector(".remaining") // The paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".remaining span") // The span inside the paragraph where the remaining guesses will display.
const message = document.querySelector(".message") // The empty paragraph where messages will appear when the player guesses a letter.
const playAgain = document.querySelector(".play-again") // The hidden button that will appear prompting the player to play again.
const word = "magnolia";


const addPlaceholders = function(word){
    let placeholdersArray = []
    for (const letter of word) {
        placeholdersArray.push("●");   
    }
    wordInProgress.innerText = placeholdersArray.join("");
};

addPlaceholders(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const inputValue = textInput.value;
    console.log(inputValue);
    textInput.value = "";
});


// Then, empty the value of the input. You should see the letter you enter into the input field in the console when the Guess button 
// In the command line, add and commit your changes. Push the changes up to GitHub. Copy the link to your repo and submit it below.

{/*
<div class="container">
  <h1><img class="logo" src="img/logo.png" alt="Guess The Word" /></h1>
  <p class="message"></p>
  <p class="word-in-progress"></p>
  <p class="remaining">You have <span>8 guesses</span> remaining.</p>
  <ul class="guessed-letters"></ul>
  <form action="" class="guess-form">
    <label for="letter">Type one letter:</label>
    <input type="text" name="letter" class="letter" />
    <div class="form-element button-element">
      <button class="guess">Guess!</button>
    </div>
  </form>
  <button class="play-again hide">Play Again!</button>
</div> */}