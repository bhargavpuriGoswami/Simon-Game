var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomChosenColor = [];
var userClickedPattern=[];
var level=0;
var started = false;


$(document).keypress(function(){
    if (!started){
        nextSequence();
        started = true;
    }
});

$(".btn").click(function (){
    var userChosenColour = this.id;
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut();
    $("#" + randomChosenColor).fadeIn();
    playSound(randomChosenColor); 
};

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        if(gamePattern.length==userClickedPattern.length){
            var result = "right";
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }
    else{
        var result = "wrong";
        playSound(result);
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press any key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
            }, 200);
        startOver();
    }
    console.log(result);
};


function startOver(){
    level = 0;
    gamePattern=[];
    started=false;
};


function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
};

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
};





