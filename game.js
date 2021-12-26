var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var level=0;
var curlevel=0;
var started=false;
$(document).keypress(function(){
    if(!started){
        nextSequence();
        started=true;
    }
});
$(".btn").click(function(){
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    animatePress(this.id);
    playSound(userChosenColour);
    checkAnswer(curlevel);
    if(started){
    curlevel++;
    if(curlevel===gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
        userClickedPattern=[];
        curlevel=0;
    }
}
});
function nextSequence(){
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    level++;
    $("h1").text("Level "+level);
}
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]!==gamePattern[currentLevel]){
        //console.log("Success");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function playSound(inp){
    var sound=new Audio("sounds/"+inp+".mp3");
    sound.play();
}
function startOver(){
    gamePattern=[];
    level=0;
    curlevel=0;
    started=false;
}