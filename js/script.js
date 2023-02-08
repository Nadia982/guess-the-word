const guessedLettersElement = document.querySelector(".guessed-letters"); // The unordered list where the player’s guessed letters will appear.
const guessButton = document.querySelector(".guess"); // The button with the text “Guess!” in it.
const textInput = document.querySelector(".letter"); // The text input where the player will guess a letter.
const wordInProgress = document.querySelector(".word-in-progress"); // The empty paragraph where the word in progress will appear.
const remainingGuesses = document.querySelector(".remaining"); // The paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".remaining span"); // The span inside the paragraph where the remaining guesses will display.
const message = document.querySelector(".message"); // The empty paragraph where messages will appear when the player guesses a letter.
const playAgain = document.querySelector(".play-again"); // The hidden button that will appear prompting the player to play again.

const word = "magnolia";
const guessedLetters = [];

const addPlaceholders = function (word) {
  const placeholdersArray = [];
  for (const letter of word) {
    console.log(letter);
    placeholdersArray.push("●");
  }
  wordInProgress.innerText = placeholdersArray.join("");
};

addPlaceholders(word);

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";
  //assign the textInput value to the guess variable.
  const guess = textInput.value;

  //Ensure that only one letter has been inputted.
  const validGuess = validatePlayerInput(guess);

  if (validGuess) {
    makeGuess(guess);
  }
  textInput.value = "";
});

// Create a function to check player's input
const validatePlayerInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Please enter a letter!";
  } else if (input.length > 1) {
    message.innerText = "Please enter one letter at a time";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Enter a letter from A to Z";
  } else {
    message.innerText = "That guess was valid";
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText =
      "You have already guessed that letter - please try again";
  } else {
    guessedLetters.push(guess);
  }
  console.log(guessedLetters);
};
