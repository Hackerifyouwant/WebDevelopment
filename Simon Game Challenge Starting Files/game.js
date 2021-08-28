var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var flag = 0;
var level = 0;



function MakeSound(currentColor) {
    var audio = new Audio("sounds/" + currentColor + ".mp3");
    audio.play();
}

function animationPress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(".btn").click(function() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    MakeSound(userChosenColor);
    animationPress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    flag = 1;
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.round(Math.random() * 10) % 4;
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animationPress(randomChosenColor);
    MakeSound(randomChosenColor);

}



function GameStart(event) {
    if (flag == 0) {
        $("h1").text("Level 0");
        nextSequence();
    }

}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function() {
                nextSequence();
            }, 1000);

        }

    } else {

        console.log("wrong");
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    flag = 0;
    level = 0;
    gamePattern.length = 0;
}


document.addEventListener("keypress", GameStart);