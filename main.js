document.addEventListener('DOMContentLoaded', function() {
var c = document.getElementById('canvas'); //canvas html element
var head = document.getElementById('head');
var background = document.getElementById('background');
var top = document.getElementById('top');
var ctx = c.getContext('2d');
var size = 20;
var score = document.getElementById('score');
var s = 0;
var sColor = "#ff99e7";
var fColor = "Tomato";
var snake = {
  x: c.width / 2,
  y: c.height / 2,
  d: "left",
  nd: "null", //Next direction. Used if two inputs are put on the same tick.
  oldX: 0,
  oldY: 0,
  input: false,
  tail: [],
  update: function() {
    snake.oldX = snake.x;
    snake.oldY = snake.y;
    switch (snake.d) {
      case "left":
        snake.x += -size;
        break;
      case "right":
        snake.x += size;
        break;
      case "up":
        snake.y += -size;
        break;
      case "down":
        snake.y += size;
        break;
      default:
        break;
    }
    if (snake.x >= c.width) {
      snake.x = 0
    };
    if (snake.x < 0) {
      snake.x = (c.width - 20);
    };
    if (snake.y >= c.height) {
      snake.y = 0;
    };
    if (snake.y < 0) {
      snake.y = (c.height - 20);
    };
    console.log(snake.x + " " + snake.y)
      //draw snake
    ctx.fillStyle = sColor;
    ctx.fillRect(snake.x, snake.y, size, size);

    if (fruit.x == snake.x && fruit.y == snake.y) { //Checking if fruit is touched
      fruit.y = (Math.floor(Math.random() * c.height / size) * size);
      fruit.x = (Math.floor(Math.random() * c.width / size) * size);
      s++;
      if (snake.tail.length == 0) {
        snake.tail.push(new tailPiece(snake.oldX, snake.oldY, s - 1))
      } else {
        snake.tail.push(new tailPiece(snake.tail[snake.tail.length - 1].oldX, snake.tail[snake.tail.length - 1].oldY, s - 1))
      }
    }
  }
}

function format() {
  top.style.paddingLeft = (window.innerWidth / 2 - c.width / 2 - 20) + "px"; //formatting
  background.width = window.innerWidth;
  background.height = window.innerHeight;
};

function tailPiece(x, y, order) {
  this.x = x;
  this.y = y;
  this.oldX = x;
  this.oldY = y;
  this.order = order;
  this.update = function() {
    this.oldX = this.x;
    this.oldY = this.y;
    if (order == 0) {
      this.x = snake.oldX;
      this.y = snake.oldY;
    } else {
      this.x = snake.tail[(order - 1)].oldX;
      this.y = snake.tail[(order - 1)].oldY;
    }
    if (this.x == snake.x && this.y == snake.y) {
      snake.x = c.width / 2;
      snake.y = c.height / 2;
      snake.tail = [];
      background.style.background = "linear-gradient(to right, #ff99e7, #ffcef3)"
      sColor = "#ff99e7";
      fColor = "Tomato";
      s = 0;
      snake.d = "left";
    }
    ctx.fillStyle = sColor;
    ctx.fillRect(this.x, this.y, size, size);
  }
}


var fruit = {
  x: (Math.floor(Math.random() * c.width / size) * size),
  y: (Math.floor(Math.random() * c.height / size) * size),
  update: function() {
    ctx.fillStyle = fColor; //Redraw Fruit
    ctx.fillRect(fruit.x + size / 4, fruit.y + size / 4, size / 2, size / 2);
  }
}


function gameLoop() {
  ctx.clearRect(0, 0, c.width, c.height); //clear canvas
  snake.update();
  if (snake.tail.length != 0) {
    for (i = 0; i < (snake.tail.length); i++) {
      snake.tail[i].update();
    }
  }
  fruit.update();
  score.innerHTML = "Score: " + s;  //update score
	if(snake.input && snake.nd != "null"){ // Allows user to buffer Directions
  	snake.d = snake.nd;
    snake.nd = "null";
    snake.input = false;
	}else{
		snake.input = false;
	}
  if(s >= 10){
    head.style.visibility = "visible";
  } else {head.style.visibility = "hidden"}
  if(s >= 20){
    background.style.background = "linear-gradient(to right, #3379ea, #86aeef)"
    sColor = "DodgerBlue";
    fColor = "SlateBlue";
  } else{
    background.style.background = "linear-gradient(to right, #ff99e7, #ffcef3)"
    sColor = "#ff99e7";
    fColor = "Tomato";
  }
};
window.addEventListener('resize', function() {
  format();
})
document.addEventListener("keydown", function(event) {
if(snake.input == false){
    switch (event.keyCode) {
      case 37:
        if (snake.d != "right") {
          snake.d = "left";
          snake.input = true;
        }
        break;
      case 38:
        if (snake.d != "down") {
          snake.d = "up";
          snake.input = true;
        }
        break;
      case 39:
        if (snake.d != "left") {
          snake.d = "right";
          snake.input = true;
        }
        break;
      case 40:
        if (snake.d != "up") {
          snake.d = "down";
          snake.input = true;
        }
        break;
      default:
        break;
    }
  } else {
      switch (event.keyCode) {
      case 37:
        if (snake.d != "right") {
          snake.nd = "left";
          snake.input = true;
        }
        break;
      case 38:
        if (snake.d != "down") {
          snake.nd = "up";
          snake.input = true;
        }
        break;
      case 39:
        if (snake.d != "left") {
          snake.nd = "right";
          snake.input = true;
        }
        break;
      case 40:
        if (snake.d != "up") {
          snake.nd = "down";
          snake.input = true;
        }
        break;
      default:
        break;
    }
  }
})
format();
setInterval(gameLoop, 125);

}, false);
