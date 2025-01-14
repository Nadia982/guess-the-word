const guessedLettersElement = document.querySelector(".guessed-letters"); // The unordered list where the player’s guessed letters will appear.
const guessButton = document.querySelector(".guess"); // The button with the text “Guess!” in it.
const textInput = document.querySelector(".letter"); // The text input where the player will guess a letter.
const wordInProgress = document.querySelector(".word-in-progress"); // The empty paragraph where the word in progress will appear.
const remainingGuessesPara = document.querySelector(".remaining"); // The paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".remaining span"); // The span inside the paragraph where the remaining guesses will display.
const message = document.querySelector(".message"); // The empty paragraph where messages will appear when the player guesses a letter.
const playAgain = document.querySelector(".play-again"); // The hidden button that will appear prompting the player to play again.
const label = document.querySelector("label"); // The "type one letter" label
const input = document.querySelector("input"); // The letter input field

let word = "cat";
let guessedLetters = [];
let remainingGuesses = 10;

// Async function to fetch words from external file:
const getWord = async function () {
  const response = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await response.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  addPlaceholders(word);
};

//Start game
getWord();

// function to add placeholders for each letter
const addPlaceholders = function (word) {
  const placeholdersArray = [];
  for (const letter of word) {
    placeholdersArray.push("●");
  }
  wordInProgress.innerText = placeholdersArray.join("");
};

//Call the function, passing the word variable as the argument.
addPlaceholders(word);

//add an event listener for when a player clicks the "guess" button
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
    message.classList.remove("correct");
    message.classList.add("error");
    message.innerText = "Please enter a letter!";
  } else if (input.length > 1) {
    message.classList.remove("correct");
    message.classList.add("error");
    message.innerText = "Please enter one letter at a time";
  } else if (!input.match(acceptedLetter)) {
    message.classList.remove("correct");
    message.classList.add("error");
    message.innerText = "Enter a letter from A to Z";
  } else {
    message.classList.remove("error");
    message.classList.add("correct");
    message.innerText = "That guess was valid";
    return input;
  }
};

// Create a function to capture input
const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.classList.remove("correct");
    message.classList.add("error");
    message.innerText =
      "You have already guessed that letter - please try again";
  } else {
    guessedLetters.push(guess);
    showGuessedLetters();
    updateRemainingGuesses(guess);
    updateWordinProgress(guessedLetters);
  }
};

//Create a function to show the guessed letters
const showGuessedLetters = function () {
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

// Create a function to update the word in progress, which accepts the guessedLetters array as a parameter
// This function will replace the circle symbols with the correct letters guessed.
const updateWordinProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }

  wordInProgress.innerText = revealWord.join("");

  checkIfPlayerWon();
};

// Function to count guesses remaining
const updateRemainingGuesses = function (guess) {
  const wordUpper = word.toUpperCase();
  if (!wordUpper.includes(guess.toUpperCase())) {
    message.classList.remove("correct");
    message.classList.add("error");
    message.innerText = `The word doesn't contain the letter ${guess}`;
    remainingGuesses--;
  } else {
    message.classList.remove("error");
    message.classList.add("correct");
    message.innerText = `Good guess! The word contains the letter ${guess}.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};

// Create a function to check if the player won
const checkIfPlayerWon = function () {
  if (wordInProgress.innerText === word.toUpperCase()) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the word correctly! Congrats!</p>`;
    startOver();
  }
};

// Function to hide and show elements
const startOver = function () {
  remainingGuessesPara.classList.add("hide");
  label.classList.add("hide");
  input.classList.add("hide");
  guessButton.classList.add("hide");
  playAgain.classList.remove("hide");
};

// Add a click event to the play again button to reset to original values and get a new word
playAgain.addEventListener("click", function () {
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 10;
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  guessedLettersElement.innerHTML = "";
  message.innerText = "";

  guessedLettersElement.classList.remove("hide");

  remainingGuessesPara.classList.remove("hide");
  label.classList.remove("hide");
  input.classList.remove("hide");
  guessButton.classList.remove("hide");
  playAgain.classList.add("hide");
  getWord();
});
