let lives = 3;
let score = 0;

const mosquitoLife = 1500;
const multiply = 1;

/*
 * Game screen size
 */

let margin = 100;
let width = 0;
let height = 0;

function adjustGameScreenSize() {
  width = window.innerWidth;
  height = window.innerHeight;
}

adjustGameScreenSize();

/*
 * Mosquito Logic
 */

function randomMosquitoPosition() {
  // Remove the previous mosquito (if there's any...)
  if (document.getElementById("mosquito")) {
    document.getElementById("mosquito").remove();

    if (lives > 0) {
      document.getElementById("life" + lives).src = "images/empty_heart.png";
      lives--;
    }

    if (lives <= 0) {
      window.location.href = "gameOver.html?" + score;
    }
  }
  //background-size 1280x1017
  //! Needs to add mobile resposiveness
  var maxWidth = width / 2 + 640;
  var minWidth = width / 2 - 640;

  var positionX = 0;
  if (width >= 1024) {
    positionX =
      Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth - margin;
  } else {
    positionX = Math.floor(Math.random() * width) - margin;
    minWidth = 0;
  }

  var positionY = Math.floor(Math.random() * height) - margin;

  positionX = Math.max(positionX < minWidth ? minWidth : positionX, margin);
  positionY = Math.max(positionY < 0 ? 0 : positionY, margin);

  // Create the html element
  const mosquito = document.createElement("img");
  mosquito.src = "images/mosquito.png";
  mosquito.className = randomMosquitoSize() + " " + randomMosquitoDirection();
  mosquito.style.left = positionX + "px";
  mosquito.style.top = positionY + "px";
  mosquito.style.position = "absolute";
  mosquito.id = "mosquito";
  mosquito.onclick = function () {
    this.remove();
    score += multiply;
    document.getElementById("current-score").innerHTML = score;
  };

  document.body.appendChild(mosquito);
}

function randomMosquitoSize() {
  const mosquitoSizeClass = Math.floor(Math.random() * 3);

  switch (mosquitoSizeClass) {
    case 0:
      return "mosquito1";
    case 1:
      return "mosquito2";
    case 2:
      return "mosquito3";
  }
}

function randomMosquitoDirection() {
  const mosquitoDirectionClass = Math.floor(Math.random() * 2);

  switch (mosquitoDirectionClass) {
    case 0:
      return "direction_left";
    case 1:
      return "direction_right";
  }
}

const createMosquitoInterval = setInterval(function () {
  randomMosquitoPosition();
}, mosquitoLife);

/*
 * Timer
 */

let time = 60;

const chronometerElement = document.getElementById("chronometer");
chronometerElement.textContent = Math.floor(time);

const chronometerInterval = setInterval(function () {
  time--;
  if (time < 0) {
    clearInterval(chronometerInterval);
    clearInterval(createMosquitoInterval);
    window.location.href = "gameOver.html?" + score;
  } else {
    document.getElementById("chronometer").innerHTML = Math.floor(time);
  }
}, 1000);
