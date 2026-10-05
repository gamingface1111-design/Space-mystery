const startButton = document.querySelector("button");

startButton.addEventListener("click", () => {

  document.querySelector("p").textContent =

    "You are on the spaceship! Find your first task. 🚀";

  startButton.textContent = "Game Started!";

});