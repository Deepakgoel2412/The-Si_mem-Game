var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

$(".simon").on("click", function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $(".simon").addClass("disabled");
    }
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    // console.log(userClickedPattern);
    // console.log(gamePattern);

    checkAnswer(userClickedPattern.length - 1);
});

//  generate next Sequence

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    // console.log(gamePattern);


    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

// check answer with computer

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 500);

        $("#level-title").text("Game Over, Click on Play to Restart");

        $(".simon").removeClass("disabled");
        startOver();

        // console.log("Game over");
    }
}

// For playing sound on click

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//  for click animation

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


// Restart game after loss

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}