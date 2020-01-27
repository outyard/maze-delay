var socket = io();
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = 0;
var y = 0;
var dx = 0;
var dy = 0;
var playerCenter = {x:500, y:300};
var playerRadius = 50;
var hasCollided = false;
var hasWon = false;
var mapObjects = [
  {x:-50, y:-50, width:100, height:4100},
  {x:-50, y:-50, width:4100, height:100},
  {x:4050, y:-50, width:100, height:4100},
  {x:-50, y:4050, width:4100, height:100},
  {x:0, y:500, width:1750, height:4000},
  {x:2200, y:0, width:5800, height:3500},
  {x:900, y:0, width:250, height:300},
  {x:1450, y:250, width:300, height:300},
  {x:2050, y:500, width:300, height:100},
  {x:1700, y:500, width:150, height:100},
  {x:1700, y:1000, width:320, height:200},
  {x:1900, y:1600, width:300, height:400},
  {x:1700, y:2300, width:200, height:300},
];
var goal = {x:3000, y:3800, radius:20};
var fps = 100
var speed = 4;
// var footstep = new Audio('gravel.mp3');
var time = 0;
var timeHTML = document.getElementById('time');
var victoryTime = 0;

var timeIntervalID = setInterval(increaseTimer, 1000);

function increaseTimer(){
  time += 1;
  timeHTML.innerHTML = ''+(('0'+(Math.floor(time / 60))).slice(-2)) + ':' + (('0'+(Math.floor(time % 60))).slice(-2));
}
function drawplayer(){
  ctx.beginPath();
  ctx.arc(playerCenter.x, playerCenter.y, playerRadius, 0, Math.PI*2);
  ctx.fillStyle = "#E32C2C";
  ctx.fill();
  ctx.closePath();
}

function drawMap(){
  ctx.beginPath();
  ctx.fillStyle = "#0095DD";
  ctx.lineWidth = 100;
  for (var i = 0; i < mapObjects.length; i++) {
    ctx.rect(x+mapObjects[i].x, y+mapObjects[i].y, mapObjects[i].width, mapObjects[i].height);
  }
  ctx.fill();
  ctx.fillStyle = "#468936";
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(x+goal.x, y+goal.y, goal.radius, 0, Math.PI*2);
  ctx.fill();
  ctx.closePath();
}

function checkCollition(){
  for (var i = 0; i < mapObjects.length; i++) {
    if (
      -x+playerCenter.x+playerRadius > mapObjects[i].x &&
      -x+playerCenter.x-playerRadius < mapObjects[i].x+mapObjects[i].width &&
      -y+playerCenter.y+playerRadius > mapObjects[i].y &&
      -y+playerCenter.y-playerRadius < mapObjects[i].y+mapObjects[i].height
    ){
      hasCollided = true;
      console.log("AJ!");
    }
  }
  if(
    -x+playerCenter.x+playerRadius > goal.x+goal.radius &&
    -x+playerCenter.x-playerRadius < goal.x-goal.radius &&
    -y+playerCenter.y+playerRadius > goal.y+goal.radius &&
    -y+playerCenter.y-playerRadius < goal.y-goal.radius
  ){
    hasWon = true;
    console.log("Grattis!");
    console.log("Time: " + timeHTML.innerHTML);
  }
}

function draw() {
  if (!hasCollided && !hasWon) {
    ctx.clearRect(-4000, -4000, canvas.width+4000, canvas.height+4000);
    drawplayer();
    drawMap();
    x += dx;
    y += dy;
    if (dx!=0 || dy!=0) {
      // footstep.play();
      // footstep = footstep.cloneNode(true);
    }
    checkCollition();
  }
  else if (hasCollided){
    ctx.clearRect(-4000, -4000, canvas.width+4000, canvas.height+4000);
    clearInterval(drawIntervalID);
    clearInterval(timeIntervalID);

  }
  else if (hasWon) {
    victoryTime = time;
    clearInterval(drawIntervalID);
    clearInterval(timeIntervalID);
  }
}
var drawIntervalID = setInterval(draw, 1000/fps);

socket.on('buttonPress', function(press){
  if (press.up && !press.down){
    dy = speed;
    playerCenter.y = 295;
  }
  else if (press.down && !press.up) {
    dy = -speed;
    playerCenter.y = 305;
  }
  else {
    dy = 0;
    playerCenter.y = 300;
  }
  if (press.left &&!press.right){
    dx = speed;
    playerCenter.x = 495;
  }
  else if (press.right &&!press.left) {
    dx = -speed;
    playerCenter.x = 505;
  }
  else {
    dx = 0;
    playerCenter.x = 500;
  }
});
socket.on('restart', function(press){
  if (hasCollided || hasWon) {
    x=0;
    y=0;
    hasCollided = false
    hasWon = false;
    time = 0;
    drawIntervalID = setInterval(draw, 1000/fps);
    timeIntervalID = setInterval(increaseTimer, 1000);
  }
});
