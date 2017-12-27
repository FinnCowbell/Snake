var c = document.getElementById('canvas'); //canvas html element
var background = document.getElementById('background');
var top = document.getElementById('top');
var ctx = c.getContext('2d');
var d = "left"; //direction
var size = 20;
var score = document.getElementById('score');
var s = 0;
var snake = {
  x: c.width / 2,
  y: c.height / 2,
  d: "left",
  oldX: 0,
  oldY: 0,
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
    ctx.fillStyle = "#ff99e7";
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
    if (this.x == snake.x && this.y == snake.y){
    	snake.x = c.width / 2;
      snake.y = c.height / 2;
      snake.tail = [];
      s = 0;
      snake.d = "left";
    }
    ctx.fillStyle = "ff99e7";
    ctx.fillRect(this.x, this.y, size, size);
  }
}


var fruit = {
  x: (Math.floor(Math.random() * c.width / size) * size),
  y: (Math.floor(Math.random() * c.height / size) * size),
  update: function() {
    ctx.fillStyle = "Tomato"; //Redraw Fruit
    ctx.fillRect(fruit.x + size / 4, fruit.y + size / 4, size / 2, size / 2);
  }
}


function gameLoop() {
  top.style.paddingLeft = (window.innerWidth / 2 - c.width / 2 - 20) + "px"; //formatting
  background.width = window.innerWidth;
  background.height = window.innerHeight;
  ctx.clearRect(0, 0, c.width, c.height); //clear canvas
  snake.update();
  if (snake.tail.length != 0) {
    for (i = 0; i < (snake.tail.length); i++) {
      snake.tail[i].update();
    }
  }
    fruit.update();
  //update score
  score.innerHTML = "Score: " + s;
}
document.addEventListener("keydown", function(event) {
  switch (event.keyCode) {
    case 37:
      if (snake.d != "right") {
        snake.d = "left";
      }
      break;
    case 38:
      if (snake.d != "down") {
        snake.d = "up";
      }
      break;
    case 39:
      if (snake.d != "left") {
        snake.d = "right";
      }
      break;
    case 40:
      if (snake.d != "up") {
        snake.d = "down";
      }
      break;
    default:
      break;
  }
})
setInterval(gameLoop, 125);
