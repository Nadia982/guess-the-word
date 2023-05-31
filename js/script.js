const guessedLettersElement = document.querySelector(".guessed-letters"); // The unordered list where the player’s guessed letters will appear.
const guessButton = document.querySelector(".guess"); // The button with the text “Guess!” in it.
const textInput = document.querySelector(".letter"); // The text input where the player will guess a letter.
const wordInProgress = document.querySelector(".word-in-progress"); // The empty paragraph where the word in progress will appear.
const remainingGuesses = document.querySelector(".remaining"); // The paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".remaining span"); // The span inside the paragraph where the remaining guesses will display.
const message = document.querySelector(".message"); // The empty paragraph where messages will appear when the player guesses a letter.
const playAgain = document.querySelector(".play-again"); // The hidden button that will appear prompting the player to play again.

const word = "cat";
const guessedLetters = [];

// function to add placeholders for each letter
const addPlaceholders = function (word) {
  const placeholdersArray = [];
  for (const letter of word) {
    console.log(letter);
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
  }
  console.log(guessedLetters);
  updateWordinProgress(guessedLetters);
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

// Create a function to update the word in progress, which accepts the guessedLetters array as a param
// This function will replace the circle symbols with the correct letters guessed.
const updateWordinProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  console.log(wordArray);
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

// Create a function to check if the player won
const checkIfPlayerWon = function () {
  if (wordInProgress.innerText === word.toUpperCase()) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
  }
};
