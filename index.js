const DODGER = document.getElementById('dodger')
const DODGER_WIDTH=40
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const START = document.getElementById('start')

var gameInterval = null
var dodgerInterval = null

function start() {
  window.addEventListener('keydown', moveDodger)
  START.style.display = 'none'
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}

function createRock(startingLeftPosition) {
  const rock = document.createElement('div')
  GAME.append(rock)
  rock.className = 'rock'
  rock.style.left = `${startingLeftPosition}px`
  var startingTopPosition = 0
  rock.style.top = `${startingTopPosition}px`
  moveRock(rock)
}

function moveRock(rock) {
  rockInterval = setInterval(function() {
    var top=parseInt(rock.style.top.split('px',1))
    if ((top<(GAME_HEIGHT-20)) && (!checkCollision(rock))) {
      rock.style.top=`${top+4}px`
    }
    else if (checkCollision(rock)) {
      clearInterval(rockInterval)
      clearInterval(dodgerInterval)
      endGame()
    }
    else {
      clearInterval(rockInterval)
      rock.remove()
    }
   }, 4)
}

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge+40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge+20;
    if ((rockRightEdge > dodgerLeftEdge) && ((rockRightEdge-dodgerLeftEdge)<60)) {
      rock.remove()
      return true
    }
    else {
      return false
    }
  }
}

function positionToInteger(position) {
  return parseInt(position.split('px')[0]) || 0
}

function moveDodger(e) {
   if (e.which===LEFT_ARROW) {
     e.preventDefault()
     moveDodgerLeft()
     e.stopPropagation()
   }
   else if (e.which===RIGHT_ARROW) {
     e.preventDefault()
     moveDodgerRight()
     e.stopPropagation()
   }
}

function moveDodgerLeft() {
  var left = positionToInteger(DODGER.style.left)  //current left edge of dodger
  clearInterval(dodgerInterval)
  dodgerInterval = setInterval(function() {
    if (left > 0) {
      left -= 1
      DODGER.style.left = `${left}px`
    }
  }, 1)
}


function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left)
  clearInterval(dodgerInterval)
  dodgerInterval = setInterval(function() {
    if (left < ((GAME_WIDTH-DODGER_WIDTH))) {
      left += 1
      DODGER.style.left = `${left}px`
    }
  }, 1)
}

function endGame() {
  clearInterval(gameInterval)
  window.removeEventListener('keydown', moveDodger)
  alert('YOU LOSE!')
  START.style.display = 'block'
  DODGER.style.left = "180px"
}
