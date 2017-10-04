document.addEventListener("DOMContentLoaded", function(event) {
  let resetButton = document.getElementById("reset-button");

  let firstSquare = null;
  let colors = [];
  let gameSquares = [];
  let matchedPairs = 0;

  let count = 10, timer = setInterval(function() {
    document.getElementById('counter').innerHTML = count--;
    if(count === 0) {
      clearInterval(timer);
      // clearGame();
    }
  }, 1000);

  for (let i = 0; i < 10; i++) {
    colors.push('square-' + i);
  }

  class GameSquare {
    constructor(el, color) {
      this.el = el;
      this.isOpen = false;
      this.isLocked = false;
      this.el.addEventListener("click", this, false);
      this.setColor(color);
    }

    handleEvent(e) {
      switch (e.type) {
      case "click":
        if (this.isOpen || this.isLocked) {
          return;
        }
        this.isOpen = true;
        this.el.classList.add('flip');
        checkGame(this);
      }
    }

    reset() {
      this.isOpen = false;
      this.isLocked = false;
      this.el.classList.remove('flip');
    }

    lock() {
      this.isLocked = true;
      this.isOpen = true;
    }

    setColor(color) {
      this.el.children[0].children[1].classList.remove(this.color);
      this.color = color;
      this.el.children[0].children[1].classList.add(color);
    }
  }

  const getSomeColors = () => {
    var colorscopy = colors.slice();
    var randomColors = [];
    for (var i = 0; i < 8; i++) {
      var index = random(colorscopy.length);
      randomColors.push(colorscopy.splice(index, 1)[0]);
    }
    return randomColors.concat(randomColors.slice());
  }

  const random = (n) => {
    return Math.floor(Math.random() * n);
  }
  function randomizeColors() {
    var randomColors = getSomeColors();
    gameSquares.forEach(function(gameSquare) {
      var color = randomColors.splice(random(randomColors.length), 1)[0];
      gameSquare.setColor(color);
    });
  }

  const setupGame = () => {
    var array = document.getElementsByClassName("game-square");
    var randomColors = getSomeColors();             // Get an array of 8 random color pairs
    for (var i = 0; i < array.length; i++) {
      var index = random(randomColors.length);      // Get a random index
      var color = randomColors.splice(index, 1)[0]; // Get the color at that index
      // Use that color to initialize the GameSquare
      gameSquares.push(new GameSquare(array[i], color));
    }
  }

  function checkGame(gameSquare) {
    if (firstSquare === null) {
      firstSquare = gameSquare;
      return
    }

    if (firstSquare.color === gameSquare.color) {
      firstSquare.lock();
      gameSquare.lock();
      matchedPairs++;
      if(matchedPairs === 8) { clearGame(); }
    } else {
      let a = firstSquare;
      let b = gameSquare;
      setTimeout(function() {
        a.reset();
        b.reset();
        firstSquare = null;
      }, 400);
    }
    firstSquare = null;
  }

  clearGame = () => {
    gameSquares.forEach(function(gameSquare) {
      gameSquare.reset();
    });
    setTimeout(function() {
      randomizeColors();
    }, 500);
  }

  resetButton.onclick = () => clearGame();
  setupGame();
});
