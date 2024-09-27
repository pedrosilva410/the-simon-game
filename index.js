const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
let userClickedPattern = []; // Create an empty array to track user clicks

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * buttonColours.length);
  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  let selectedButton = document.getElementById(randomChosenColour);

  selectedButton.classList.add("flash");
  playSound(randomChosenColour); // Play sound for the random button

  setTimeout(function () {
    selectedButton.classList.remove("flash");
  }, 100);
}

// Step 2: Create the playSound function
function playSound(name) {
  const audio = new Audio(name + ".mp3"); // Create a new Audio object
  audio.play(); // Play the sound
}

// Step 1: Use vanilla JavaScript to detect button clicks
buttonColours.forEach(function (colour) {
  const button = document.getElementById(colour);
  button.addEventListener("click", function () {
    // Step 2: Create a variable to store the id of the clicked button
    let userChosenColour = colour;

    // Step 4: Add the userChosenColour to the userClickedPattern array
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour); // Play sound for the clicked button
    console.log(userClickedPattern); // Log the array to see the user's clicks
  });
});
