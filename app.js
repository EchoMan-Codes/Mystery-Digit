// SEARCH ELEMENTS
const generateBtn = document.querySelector(".primary"); // GENERATE RANDOM NUMBER BUTTON
const checkBtn = document.querySelector(".secondary"); // CHECK GUESS BUTTON
const numberBox = document.querySelector(".number-box"); // INITIALLY EMPTY BOX
const guessInput = document.querySelector("input"); // INPUT FIELD
const gameCard = document.querySelector(".game-card"); // GAME CARD FOR EXTRA CREATION OF ELEMENTS STYLING AND APPENDING

// CREATE WON/LOST MESSAGE ELEMENT
const message = document.createElement("p");
message.style.textAlign = "center";
message.style.marginTop = "10px";
message.style.fontSize = "25px";
message.style.opacity = "0.9";
message.style.fontFamily = "Fredoka";

// ATTEMPTS ELEMENT
const attemptsText = document.createElement("p");
attemptsText.style.textAlign = "center";
attemptsText.style.fontSize = "25px";
attemptsText.style.opacity = "0.8";
attemptsText.style.fontFamily = "Fredoka";

// RESTART BUTTON
const restartBtn = document.createElement("button");
restartBtn.textContent = "Restart Game";
restartBtn.className = "btn secondary";
restartBtn.style.display = "none";
restartBtn.style.fontFamily = "Fredoka";

// APPEND ELEMENTS
gameCard.append(message);
gameCard.append(attemptsText);
gameCard.append(restartBtn);

// GAME VARIABLES
let randomNumber;
let attempts = 0;
let maxAttempts = 5;
let isGenerated = false; // INTIALLY NUMBER IS NOT GENERATED, SPACE IS EMPTY

// GENERATE RANDOM NUMBER
generateBtn.addEventListener("click", () => {
  randomNumber = Math.floor(Math.random() * 101);
  console.log(randomNumber);
  // attempts = 0;
  isGenerated = true;

  numberBox.textContent = "??";
  message.textContent = "Number generated, Start guessing!";
  message.style.color = "#9fc5ff";

  attemptsText.textContent = "Attempts left: 5";
  restartBtn.style.display = "none"; // INITIALLY HIDE RESTART BUTTON

  guessInput.value = ""; // RESET INPUT VALUE AFTER GENERATION
});

// CHECK GUESS
checkBtn.addEventListener("click", () => {
  if (isGenerated === false) {
    message.textContent = "Generate a number first!";
    message.style.color = "#ffb3b3";
    return; // EXIT FUNCTION
  }

  if (guessInput.value === "") {
    // EMPTY INPUT
    message.textContent = "Enter a number!";
    message.style.color = "#ffb3b3";
    return;
  }

  let userGuess = Number(guessInput.value); // CONVERT TO NUMBER

  if (userGuess < 0 || userGuess > 100) {
    message.textContent = "Guess must be between 0 & 100";
    message.style.color = "#ffb3b3";
    return;
  }

  attempts++; // INITIAL ATTEMPTS IS 0, INCREMENT ATTEMPTS

  // CORRECT GUESS
  if (userGuess === randomNumber) {
    numberBox.textContent = randomNumber;
    message.textContent = "Correct! You Won 🎉";
    message.style.color = "#9dffb3";
    attemptsText.textContent = "Attempts used: " + attempts;
    isGenerated = false;
    restartBtn.style.display = "block";
    return;
  }

  // WRONG GUESS
  if (userGuess < randomNumber) {
    message.textContent = "To low, Try a higher number!";
  } else {
    message.textContent = "To high, Try a lower number!";
  }
  message.style.color = "#ffd59f";
  guessInput.value = "";

  let remaining = maxAttempts - attempts;
  attemptsText.textContent = "Attempts left: " + remaining;

  // If attempts finished
  if (attempts === maxAttempts) {
    numberBox.textContent = randomNumber;
    message.textContent = "Game over! The number was revealed";
    message.style.color = "#ffb3b3";
    isGenerated = false;
    restartBtn.style.display = "block"; // DISPLAY BLOCK MEANS VISIBLE
  }

  if (attempts === maxAttempts || guessInput.value === randomNumber) {
    generateBtn.disabled = true;
    checkBtn.disabled = true;
  }
});

// Restart game
restartBtn.addEventListener("click", function () {
  numberBox.textContent = "Empty";
  message.textContent = "Click Generate to start a new game";
  message.style.color = "#9fc5ff";
  attemptsText.textContent = "";
  guessInput.value = "";
  restartBtn.style.display = "none";
  generateBtn.disabled = false;
  checkBtn.disabled = false;
});
