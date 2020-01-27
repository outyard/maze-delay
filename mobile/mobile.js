var socket = io();

var up = false;
var down = false;
var left = false;
var right = false;

var middle = document.getElementById('middle');
middle.addEventListener("touchstart", () => socket.emit('restart',{}));
middle.addEventListener('mousedown', () => socket.emit('restart',{}));

var upLeftButton = document.getElementById('upLeft');
upLeftButton.addEventListener("touchstart", () => {up = true; left = true; sendDirection();});
upLeftButton.addEventListener("touchend", () => {up = false; left = false; sendDirection();});
upLeftButton.addEventListener("touchcancel", () => {up = false; left = false; sendDirection();});
upLeftButton.addEventListener('mousedown', () => {up = true; left = true; sendDirection();});
upLeftButton.addEventListener('mouseup', () => {up = false; left = false; sendDirection();});

var upButton = document.getElementById('up');
upButton.addEventListener("touchstart", () => {up = true; sendDirection();});
upButton.addEventListener("touchend", () => {up = false; sendDirection();});
upButton.addEventListener("touchcancel", () => {up = false; sendDirection();});
upButton.addEventListener('mousedown', () => {up = true; sendDirection();});
upButton.addEventListener('mouseup', () => {up = false; sendDirection();});

var upRightButton = document.getElementById('upRight');
upRightButton.addEventListener("touchstart", () => {up = true; right = true; sendDirection();});
upRightButton.addEventListener("touchend", () => {up = false; right = false; sendDirection();});
upRightButton.addEventListener("touchcancel", () => {up = false; right = false; sendDirection();});
upRightButton.addEventListener('mousedown', () => {up = true; right = true; sendDirection();});
upRightButton.addEventListener('mouseup', () => {up = false; right = false; sendDirection();});

var leftButton = document.getElementById('left');
leftButton.addEventListener("touchstart", () => {left = true; sendDirection();});
leftButton.addEventListener("touchend", () => {left = false; sendDirection();});
leftButton.addEventListener("touchcancel", () => {left = false; sendDirection();});
leftButton.addEventListener('mousedown', () => {left = true; sendDirection();});
leftButton.addEventListener('mouseup', () => {left = false; sendDirection();});

var rightButton = document.getElementById('right');
rightButton.addEventListener("touchstart", () => {right = true; sendDirection();});
rightButton.addEventListener("touchend", () => {right = false; sendDirection();});
rightButton.addEventListener("touchcancel", () => {right = false; sendDirection();});
rightButton.addEventListener('mousedown', () => {right = true; sendDirection();});
rightButton.addEventListener('mouseup', () => {right = false; sendDirection();});

var downLeftButton = document.getElementById('downLeft');
downLeftButton.addEventListener("touchstart", () => {down = true; left = true; sendDirection();});
downLeftButton.addEventListener("touchend", () => {down = false; left = false; sendDirection();});
downLeftButton.addEventListener("touchcancel", () => {down = false; left = false; sendDirection();});
downLeftButton.addEventListener('mousedown', () => {down = true; left = true; sendDirection();});
downLeftButton.addEventListener('mouseup', () => {down = false; left = false; sendDirection();});

var downButton = document.getElementById('down');
downButton.addEventListener("touchstart", () => {down = true; sendDirection();});
downButton.addEventListener("touchend", () => {down = false; sendDirection();});
downButton.addEventListener("touchcancel", () => {down = false; sendDirection();});
downButton.addEventListener('mousedown', () => {down = true; sendDirection();});
downButton.addEventListener('mouseup', () => {down = false; sendDirection();});

var downRightButton = document.getElementById('downRight');
downRightButton.addEventListener("touchstart", () => {down = true; right = true; sendDirection();});
downRightButton.addEventListener("touchend", () => {down = false; right = false; sendDirection();});
downRightButton.addEventListener("touchcancel", () => {down = false; right = false; sendDirection();});
downRightButton.addEventListener('mousedown', () => {down = true; right = true; sendDirection();});
downRightButton.addEventListener('mouseup', () => {down = false; right = false; sendDirection();});


function sendDirection() {
  console.log([up, down, left, right]);
  socket.emit('buttonPress', {up:up, down:down, left:left, right:right});
}
// var intervalID = setInterval(sendDirection, 100);
