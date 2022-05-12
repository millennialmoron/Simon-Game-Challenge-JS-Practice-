var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).one("keydown", function() {
  nextSequence();
  $("h1").text("Level " + level);
});

function nextSequence() {
  level = level + 1;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColor = buttonColors[randomNumber];
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  gamePattern.push(randomChosenColor);
  makeSound(randomChosenColor);
}


function makeSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play(sound);
}

$(".btn").click(function(e) {
  var userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor);
  makeSound(userChosenColor);
  animatePress(userChosenColor);
  if (userClickedPattern.length === gamePattern.length){
    answerCheck(userClickedPattern.length);
  }

  // answerCheck();
});

function animatePress(currentColor) {
  var classColor = currentColor;
  $("." + classColor).addClass("pressed").delay(100).queue(function() {
    $(this).removeClass("pressed");
    $(this).dequeue();
  });
}

function answerCheck(currentLevel){
  for(var i = 0; i<=currentLevel; i++){
    if(userClickedPattern[i]!==gamePattern[i]){
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play(wrong);
      $("body").addClass("game-over").delay(200).queue(function() {
        $(this).removeClass("game-over");
        $(this).dequeue();
      });
      $("h1").text("Game Over, Press Any Key to Restart");
      console.log("WRONG!!");
      startOver();
      return false;
    }else{}
  }
  console.log("Yep.");
  setTimeout(function() {
    nextSequence();
  }, 1000);
  userClickedPattern = [];
}

function startOver(){
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  $(document).one("keydown", function() {
    nextSequence();
    $("h1").text("Level " + level);
  });
}
