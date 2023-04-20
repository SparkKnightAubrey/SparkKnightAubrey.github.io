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
  var player2Score = factory("#player2Score")
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle
  $(document).on("keydown", handleKeyDown);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    

  }
  /*
  Handle key events
  */

function handleKeyDown(event) {
  var keycode = event.which;
  console.log(keycode)

  if (keycode === KEYCODE.KEY_W) {
    console.log('W pressed')
   }
  else if (keycode === KEYCODE.KEY_S) {
    console.log('S pressed')
  } 
  else if (keycode === KEYCODE.KEY_UP){
    console.log("Up pressed")
  }
  else if (keycode === KEYCODE.KEY_DOWN){
    console.log("Down pressed")
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

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
