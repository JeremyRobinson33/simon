var buttonColors = ["red", "green", "blue", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var randomChosenColor;
var gameStart = false;

$(document).click(function () {
  if(!gameStart) {
    setH1();
    nextSequence();
    gameStart = true;
 }
})

$(document).keypress(function() {
  if(!gameStart) {
    setH1();
    nextSequence();
    gameStart = true;
 }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  setH1();
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(buttonColors[randomNumber]);
}

$(".btn").on("click", function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress($(this).attr('id'));

  checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}

function setH1() {
  $("#level-title").text("Level "+ level);
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if(userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {nextSequence();},1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {$("body").removeClass("game-over");}, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
  }

function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
}
