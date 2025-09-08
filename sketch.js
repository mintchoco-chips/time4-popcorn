let snake = [];
let headImg, Snake_game_kernelImg;
let popcorn;
let gridSize = 20;
let xdir = 0, ydir = 0;
let score = 0;
let gameOver = false;

function preload() {
  headImg = loadImage("head.png");   // your cartoon snake head
  popcornImg = loadImage("Snake_game_kernel.png");  // your popcorn image
}

function setup() {
  createCanvas(400, 400);
  frameRate(10);
  resetGame();
}

function draw() {
  background(220);

  if (gameOver) {
    drawGameOver();
    return;
  }

  // Move snake
  let head = snake[0].copy();
  head.x += xdir;
  head.y += ydir;

  // Check wall collision
  if (head.x < 0 || head.x >= width / gridSize || head.y < 0 || head.y >= height / gridSize) {
    gameOver = true;
    return;
  }

  // Check self collision
  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver = true;
      return;
    }
  }

  // Check if popcorn eaten
  if (head.x === popcorn.x && head.y === popcorn.y) {
    snake.unshift(head); // grow snake
    score++;
    placePopcorn();
  } else {
    snake.pop();
    snake.unshift(head);
  }

  // Draw popcorn
  image(popcornImg, popcorn.x * gridSize, popcorn.y * gridSize, gridSize, gridSize);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      image(headImg, snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
    } else {
      image(popcornImg, snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
    }
  }

  // Draw score
  fill(0);
  textSize(20);
  text("Score: " + score, 10, 25);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && xdir !== 1) {
    xdir = -1; ydir = 0;
  } else if (keyCode === RIGHT_ARROW && xdir !== -1) {
    xdir = 1; ydir = 0;
  } else if (keyCode === UP_ARROW && ydir !== 1) {
    xdir = 0; ydir = -1;
  } else if (keyCode === DOWN_ARROW && ydir !== -1) {
    xdir = 0; ydir = 1;
  }
}

function placePopcorn() {
  popcorn = createVector(floor(random(width / gridSize)), floor(random(height / gridSize)));
}

function resetGame() {
  snake = [];
  snake.push(createVector(floor(width / gridSize / 2), floor(height / gridSize / 2)));
  xdir = 0;
  ydir = 0;
  score = 0;
  gameOver = false;
  placePopcorn();
}

function drawGameOver() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("GAME OVER", width / 2, height / 2 - 40);
  textSize(20);
  text("Final Score: " + score, width / 2, height / 2);
  
  // Restart button
  fill(200, 0, 0);
  rect(width / 2 - 60, height / 2 + 40, 120, 40, 10);
  fill(255);
  text("Restart", width / 2, height / 2 + 60);
}

function mousePressed() {
  if (gameOver) {
    // Check if click inside restart button
    if (mouseX > width / 2 - 60 && mouseX < width / 2 + 60 &&
        mouseY > height / 2 + 40 && mouseY < height / 2 + 80) {
      resetGame();
    }
  }
}
