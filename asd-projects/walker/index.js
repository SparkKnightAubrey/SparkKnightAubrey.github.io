/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  };
  // Puts key presses into an object
  // Game Item Objects
  var xPosition = 0;
  var yPosition = 0;
  var xSpeed = 0;
  var ySpeed = 0;
  // position for walker
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown); // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem()
    redrawGameItem()
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      xSpeed = -5
    } else if (event.which === KEY.UP) {
      ySpeed = -5
    } else if (event.which === KEY.RIGHT) {
      xSpeed = 5
    } else if (event.which === KEY.DOWN) {
      ySpeed = 5
    }
  }
  function handleKeyUp(event) {
    if (event.which === KEY.LEFT){
      xSpeed = 0
    }
    else if (event.which === KEY.UP) {
      ySpeed = 0
    }
    else if (event.which === KEY.RIGHT){
      xSpeed = 0
    }
    else if (event.which === KEY.DOWN){
      ySpeed = 0
    }
  }
  // Identifies what key is pressed
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem() {
    xPosition += xSpeed
    yPosition += ySpeed
  }
  function redrawGameItem() {
    $("#walker").css("left", xPosition)
    $("#walker").css("top", yPosition)
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
