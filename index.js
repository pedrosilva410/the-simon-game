// Constants
const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = []; // Store the game sequence
let userClickedPattern = []; // Store the user's clicks
let level = 0; // Initialize the level
let gameStarted = false; // Track if the game has started

// Update title based on the current level
function updateTitle() {
  document.querySelector("h1").innerText = "Level " + level;
}

// Generate the next sequence in the game
function nextSequence() {
  userClickedPattern = []; // Reset user clicked pattern for the new level
  level++; // Increase the level
  updateTitle(); // Update the title

  const randomNumber = Math.floor(Math.random() * buttonColours.length); // Randomly select a color
  const randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour); // Add to game sequence
  flashButton(randomChosenColour); // Flash the button and play sound
}

// Flash the button and play sound
function flashButton(colour) {
  const selectedButton = document.getElementById(colour);
  selectedButton.classList.add("flash"); // Flash the button
  playSound(colour); // Play corresponding sound

  // Remove flash effect after 200ms (increased duration)
  setTimeout(() => {
    selectedButton.classList.remove("flash");
  }, 200);
}

// Play sound based on button color
function playSound(name) {
  const audio = new Audio(`${name}.mp3`);
  audio.play();
}

// Animate button press
function animatePress(currentColour) {
  const button = document.getElementById(currentColour);
  button.classList.add("pressed"); // Add pressed effect

  // Remove pressed effect after 200ms (increased duration)
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 200);
}

// Handle user clicks
function handleUserClick(colour) {
  userClickedPattern.push(colour); // Track user clicks

  // Check if the user's choice is correct
  const currentLevel = userClickedPattern.length - 1;
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    playSound(colour); // Play sound for correct choice
    animatePress(colour); // Animate button

    // Check if user has completed the pattern
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence(); // Proceed to the next sequence
      }, 1000); // Wait 1 second before starting the next sequence
    }
  } else {
    playSound("wrong"); // Play wrong sound
    console.log("Wrong choice!"); // Debug message
    // Optionally reset the game or handle game over logic
    startOver(); // Reset the game
  }

  console.log(userClickedPattern); // Log user's clicks
}

// Reset the game
function startOver() {
  level = 0; // Reset level
  gamePattern.length = 0; // Clear the game pattern
  gameStarted = false; // Reset game state
  document.querySelector("h1").innerText = "Press A Key to Start"; // Reset title
}

// Set up click event listeners for each button
buttonColours.forEach((colour) => {
  document
    .getElementById(colour)
    .addEventListener("click", () => handleUserClick(colour));
});

// Detect keyboard key press to start the game
document.addEventListener("keydown", () => {
  if (!gameStarted) {
    // If the game hasn't started yet
    gameStarted = true; // Set the game as started
    nextSequence(); // Start the first sequence
    updateTitle(); // Initialize title
  }
});
