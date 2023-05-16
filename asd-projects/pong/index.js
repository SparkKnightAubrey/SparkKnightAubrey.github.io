/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEYCODE = {
    KEY_W: 87,
    KEY_S: 83,
    KEY_UP: 38,
    KEY_DOWN: 40,
   }
   const BOARD_WIDTH = $("#board").width()
   const BOARD_HEIGHT = $("#board").height()
  // Game Item Objects
  function factory(id){
    var object = {};
    object.id = id;
    object.x = parseFloat($(id).css("left"))
    object.y = parseFloat($(id).css("top"))
    object.width = $(id).width()
    object.height = $(id).height()
    object.speedX = 0
    object.speedY = 0
    return object;
  }
  var ball = factory("#ball")
  var player1 = factory("#leftPaddle")
  var player2 = factory("#rightPaddle")
  var player1Score = factory("#player1Score")
  player1Score.score = 0
  var player2Score = factory("#player2Score")
  player2Score.score = 0
  var button = factory("#button")
  var cheer = factory("#cheer")
  //calling handleGameStart
  $("#button").on("click", handleGameStart)
  // one-time setup
  let interval 
  function handleGameStart(){ 
  interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
  $(document).on('eventType', handleEvent);                          
  $(document).on("keydown", handleKeyDown);
  $(document).on('keyup', handleKeyUp)
  startBall();
  $("#button").hide()
  }
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem(ball)
    redrawGameItem(ball)
    repositionGameItem(player1)
    redrawGameItem(player1)
    repositionGameItem(player2)
    redrawGameItem(player2)
    ballDetection()
    if (wallCollision(ball, player1)){
      ball.speedX = ball.speedX * -1
    }
    if (wallCollision(ball, player2)){
      ball.speedX = ball.speedX * -1
    }
    if (player1.y <= 0){
      player1.speedY = 0
      player1.y = 0
    }
    if (player1.y + player1.height >= 770){
      player1.speedY = 0
      player1.y = 600
    }
    if (player2.y <= 0){
      player2.speedY = 0
      player2.y = 0
    }
    if (player2.y + player2.height >= 770){
      player2.speedY = 0
      player2.y = 600
    }
  }
  /*
  Handle key events
  */

function handleKeyDown(event) {
  var keycode = event.which;
  console.log(keycode)

  if (keycode === KEYCODE.KEY_W) {
    player1.speedY = -5
    console.log('W pressed')
   }
  else if (keycode === KEYCODE.KEY_S) {
    player1.speedY = 5
    console.log('S pressed')
  } 
  else if (keycode === KEYCODE.KEY_UP){
    player2.speedY = -5
    console.log("Up pressed")
  }
  else if (keycode === KEYCODE.KEY_DOWN){
    player2.speedY = 5
    console.log("Down pressed")
  }
}
// Key up function
function handleKeyUp(event){
  var keycode = event.which;
  console.log(keycode)

  if (keycode === KEYCODE.KEY_W) {
    player1.speedY = 0
    console.log('W let go')
   }
  else if (keycode === KEYCODE.KEY_S) {
    player1.speedY = 0
    console.log('S let go')
  } 
  else if (keycode === KEYCODE.KEY_UP){
    player2.speedY = 0
    console.log("Up let go")
  }
  else if (keycode === KEYCODE.KEY_DOWN){
    player2.speedY = 0
    console.log("Down let go")
  }
}
// detects for winner
// function handleGameEnding(){
//   if (player1Score.score === 11){
//     endGame()
//   }
//   else if (player2.score === 11){
//     endGame()
//   }
// }
// Detects wall collisions
  function wallCollision(object1, object2){
    object1.left = object1.x
    object1.right = object1.x + object1.width
    object1.top = object1.y
    object1.bottom = object1.y + object1.height

    object2.left = object2.x
    object2.right = object2.x + object2.width
    object2.top = object2.y
    object2.bottom = object2.y + object2.height
     if (object1.left < object2.right &&
         object1.bottom > object2.top &&
         object1.right > object2.left &&
         object1.top < object2.bottom) {
          return true
         }
    else {
      return false
    }
  }
  function ballDetection(){
    if (ball.y > BOARD_HEIGHT){
        ball.speedY = -ball.speedY
    }
    if (ball.y < 0){
      ball.speedY = ball.speedY * -1
    }
    if (ball.x > BOARD_WIDTH){
      startBall()
      player1Score.score = player1Score.score + 1
      $("#text1").text(player1Score.score)
      if (player1Score.score === 11){
        endGame()
      }
    }
    if (ball.x < 0){
      startBall()
      player2Score.score = player2Score.score + 1
      $("#text2").text(player2Score.score)
      if (player2Score.score === 11){
        endGame()
      }
    }
  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {
 
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Gets the ball moving
  function startBall(){
    ball.x = 360;
    ball.y = 360;
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = (Math.random() * 2) * (Math.random() > 0.5 ? -1 : 1)
  }

  function repositionGameItem(object) {
    object.x += object.speedX
    object.y += object.speedY
  }
  function redrawGameItem(object) {
    $(object.id).css("left", object.x)
    $(object.id).css("top", object.y)
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
