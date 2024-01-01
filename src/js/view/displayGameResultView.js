import View from "./view.js";

class DisplayGameResult extends View {
  _parentElement = document.querySelector(".result");
  game = document.querySelector(".game");
  header = document.querySelector("header");
  container = document.querySelector(".container");
  homeWindow = document.querySelector(".home");

  constructor() {
    super();
    this._addHandlerBackToHome();
  }

  _toogle() {
    this._parentElement.classList.toggle("hidden");
    this.game.classList.toggle("hidden");
    this.header.classList.toggle("hidden");
    this.container.classList.toggle("fadeout");
  }

  _addHandlerRematch(handler) {
    const tryAgainBtn = document.querySelector(".btn--rematch");

    tryAgainBtn.addEventListener("click", function () {
      handler();
    });
  }

  _addHandlerBackToHome() {
    this._parentElement.addEventListener(
      "click",
      function (e) {
        const homeBtn = e.target.closest(".btn--home");

        if (!homeBtn) return;

        this.homeWindow.classList.toggle("hidden");

        this._parentElement.classList.toggle("hidden");

        this.header.classList.toggle("hidden");

        this.container.classList.toggle("fadeout");
      }.bind(this)
    );
  }

  _generateMarkup() {
    return `
     <p class="message">${this._data[2]}</p>

      <p class="score">${this._data[0]}</p>

      <div class="highScore">
        <p>Current HighScore!</p>
        <p class="highScore__result">${this._data[1]}</p>
      </div>

      <div class="list-of-btns">
      <button class="btn btn--green btn--home">Home</button>
      <button class="btn btn--red btn--rematch">Try Again</button> 
      </div>
    `;
  }
}

export default new DisplayGameResult();
