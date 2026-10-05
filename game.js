// SPACE MYSTERY - first playable version

const canvas = document.getElementById("game-canvas");

const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("start-screen");

const gameScreen = document.getElementById("game-screen");

const startButton = document.getElementById("start-button");

// The player position.

// x means left/right. y means up/down.

const player = {

  x: 400,

  y: 300,

  radius: 18,

  speed: 4

};

const keys = {

  up: false,

  down: false,

  left: false,

  right: false

};

let gameStarted = false;

function resizeCanvas() {

  canvas.width = window.innerWidth;

  canvas.height = window.innerHeight;

  // Put the player in the middle if the game has not started yet.

  if (!gameStarted) {

    player.x = canvas.width / 2;

    player.y = canvas.height / 2;

  }

}

function drawSpaceship() {

  // Space outside the ship

  ctx.fillStyle = "#02050d";

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const margin = 70;

  // Main spaceship floor

  ctx.fillStyle = "#17283a";

  ctx.fillRect(

    margin,

    margin,

    canvas.width - margin * 2,

    canvas.height - margin * 2

  );

  // Outer walls

  ctx.strokeStyle = "#74d8ff";

  ctx.lineWidth = 10;

  ctx.strokeRect(

    margin,

    margin,

    canvas.width - margin * 2,

    canvas.height - margin * 2

  );

  // Floor lines

  ctx.strokeStyle = "#243d54";

  ctx.lineWidth = 2;

  for (let x = margin + 50; x < canvas.width - margin; x += 50) {

    ctx.beginPath();

    ctx.moveTo(x, margin);

    ctx.lineTo(x, canvas.height - margin);

    ctx.stroke();

  }

  for (let y = margin + 50; y < canvas.height - margin; y += 50) {

    ctx.beginPath();

    ctx.moveTo(margin, y);

    ctx.lineTo(canvas.width - margin, y);

    ctx.stroke();

  }

  // A glowing spaceship console

  ctx.fillStyle = "#123e52";

  ctx.fillRect(canvas.width - 190, 100, 80, 55);

  ctx.fillStyle = "#5ff3ff";

  ctx.fillRect(canvas.width - 178, 112, 56, 20);

}

function drawPlayer() {

  // Shadow

  ctx.beginPath();

  ctx.ellipse(

    player.x,

    player.y + 18,

    20,

    8,

    0,

    0,

    Math.PI * 2

  );

  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";

  ctx.fill();

  // Body

  ctx.beginPath();

  ctx.arc(

    player.x,

    player.y,

    player.radius,

    0,

    Math.PI * 2

  );

  ctx.fillStyle = "#ffcc3d";

  ctx.fill();

  // Outline

  ctx.strokeStyle = "#fff1a6";

  ctx.lineWidth = 3;

  ctx.stroke();

  // Visor

  ctx.beginPath();

  ctx.ellipse(

    player.x + 7,

    player.y - 5,

    10,

    7,

    0,

    0,

    Math.PI * 2

  );

  ctx.fillStyle = "#75e6ff";

  ctx.fill();

  // Little feet

  ctx.fillStyle = "#d99f20";

  ctx.fillRect(player.x - 13, player.y + 12, 8, 12);

  ctx.fillRect(player.x + 5, player.y + 12, 8, 12);

}

function movePlayer() {

  if (keys.up) {

    player.y -= player.speed;

  }

  if (keys.down) {

    player.y += player.speed;

  }

  if (keys.left) {

    player.x -= player.speed;

  }

  if (keys.right) {

    player.x += player.speed;

  }

  // Keep the player inside the spaceship.

  const wall = 82;

  player.x = Math.max(

    wall,

    Math.min(canvas.width - wall, player.x)

  );

  player.y = Math.max(

    wall,

    Math.min(canvas.height - wall, player.y)

  );

}

function gameLoop() {

  movePlayer();

  drawSpaceship();

  drawPlayer();

  requestAnimationFrame(gameLoop);

}

function startGame() {

  startScreen.classList.add("hidden");

  gameScreen.classList.remove("hidden");

  gameStarted = true;

  resizeCanvas();

  player.x = canvas.width / 2;

  player.y = canvas.height / 2;

}

// Keyboard controls

window.addEventListener("keydown", (event) => {

  if (event.key === "ArrowUp" || event.key === "w") {

    keys.up = true;

  }

  if (event.key === "ArrowDown" || event.key === "s") {

    keys.down = true;

  }

  if (event.key === "ArrowLeft" || event.key === "a") {

    keys.left = true;

  }

  if (event.key === "ArrowRight" || event.key === "d") {

    keys.right = true;

  }

});

window.addEventListener("keyup", (event) => {

  if (event.key === "ArrowUp" || event.key === "w") {

    keys.up = false;

  }

  if (event.key === "ArrowDown" || event.key === "s") {

    keys.down = false;

  }

  if (event.key === "ArrowLeft" || event.key === "a") {

    keys.left = false;

  }

  if (event.key === "ArrowRight" || event.key === "d") {

    keys.right = false;

  }

});

// Touchscreen movement controls

function addTouchControl(buttonId, direction) {

  const button = document.getElementById(buttonId);

  button.addEventListener("pointerdown", (event) => {

    event.preventDefault();

    keys[direction] = true;

  });

  button.addEventListener("pointerup", (event) => {

    event.preventDefault();

    keys[direction] = false;

  });

  button.addEventListener("pointercancel", () => {

    keys[direction] = false;

  });

  button.addEventListener("pointerleave", () => {

    keys[direction] = false;

  });

}

addTouchControl("up-button", "up");

addTouchControl("down-button", "down");

addTouchControl("left-button", "left");

addTouchControl("right-button", "right");

startButton.addEventListener("click", startGame);

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

gameLoop();