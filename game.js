const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

const levelTitle = $("#level-title");

$(document).keypress(() => {
  if (!started) {
    levelTitle.text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    levelTitle.text("Game Over, Press Any Key to Restart");

    setTimeout(() => $("body").removeClass("game-over"), 200);
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  levelTitle.text(`Level ${level}`);

  const randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => $(`#${currentColor}`).removeClass("pressed"), 100);
}

function playSound(name) {
  new Audio(`sounds/${name}.mp3`).play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
