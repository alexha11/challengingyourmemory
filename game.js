
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

const compareArrays = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

$(document).keypress(function(){
  if(started == false) {
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();
    $(".btn").click(function() {
      var userChosenColour = $(this).attr("id");
      //alert(userChosenColour);
      userClickedPattern.push(userChosenColour);
    
      animatePress(userChosenColour);
      playSound(userChosenColour);
      if (userClickedPattern.length == gamePattern.length) {
        if (compareArrays(gamePattern, userClickedPattern) == true) {
          $("#level-title").text("Level " + level);
          setTimeout(function(){
            nextSequence();
          }, 1000);
          userClickedPattern = [];
        }
        else {
          $("#level-title").text("loser. Press any key to start");
          var audio = new Audio("wrong.mp3");
          audio.play();
          $("body").addClass("game-over");
          setTimeout(function(){
            $("body").removeClass("game-over");
          }, 100);
          level = 0;
          gamePattern = [];
          userClickedPattern = [];
          started = false;
        }
      } 
    });
  }
});

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  playSound(randomChosenColour);

  level = level + 1;
}
