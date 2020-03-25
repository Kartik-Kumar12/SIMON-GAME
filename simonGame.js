var gamePattern=[];
var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern=[];
var level ;
var started =false;
var numberTimesButtonClicked;
$(document).keypress(function(event){

  if (!started){
    console.log("hello");
    level = 0;
    setTimeout(function(){
      nextSequence();
    },500);
    started=true;
  }
});
$(".btn").click(function(){
        numberTimesButtonClicked++;
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        console.log(gamePattern);

        if ( userChosenColor != gamePattern[numberTimesButtonClicked - 1] )
          gameOver();
        else if( numberTimesButtonClicked === gamePattern.length)
        {
          playSound(userChosenColor);
          animatePress( userChosenColor );
          setTimeout(function(){
            nextSequence();
          },500);

        }
        else
        {

          playSound(userChosenColor);
          animatePress( userChosenColor );

        }

      });
function gameOver(){
   playSound("wrong");
   $("body").addClass("game-over");
   setTimeout(function(){
     $("body").removeClass("game-over");
   },200);

   $("#level-title").text("Game over , press any key to restart");
   userClickedPattern.splice(0, userClickedPattern.length);
   gamePattern.splice(0,gamePattern.length);
   started= false;

}
function nextSequence()
  {
    level++;
    numberTimesButtonClicked = 0;
    $("#level-title").text("Level "+level);
    var randomNumber =  Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[ randomNumber ];
    gamePattern.push(randomChosenColour);
    console.log(" randomly selected "+ randomChosenColour);
    $("#"+randomChosenColour).fadeTo(100, 0.3, function() { $(this).fadeTo(100, 1.0); });
    playSound(randomChosenColour);
  }
function playSound( name )
    {

      var audio = new Audio("sounds/"+name+".mp3");
      audio.play();

    }
function animatePress( currentColor )
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}
