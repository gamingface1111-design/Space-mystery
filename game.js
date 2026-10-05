const startButton = document.querySelector("button");

startButton.addEventListener("click", () => {

  document.querySelector("p").textContent =

    "You are on the spaceship! Find your first task. 🚀";

  startButton.textContent = "Game Started!";

});

let taskNumber = 0;

const tasks = [

  "Fix the spaceship engine 🔧",

  "Restore the oxygen system 💨",

  "Repair the navigation computer 🖥️",

  "Find the hidden alien 👽"

];

startButton.addEventListener("click", () => {

  taskNumber++;

  if (taskNumber < tasks.length) {

    document.querySelector("p").textContent = tasks[taskNumber];

  } else {

    document.querySelector("p").textContent =

      "Mission complete! You saved the spaceship! 🚀";

    startButton.textContent = "You Win!";

  }

});