import View from "./view.js";
import crownImg from "url:../../imgs/crown-svgrepo-com.svg";
import globeImg from "url:../../imgs/globe-svgrepo-com.svg";
import userImg from "url:../../imgs/user-plus-alt-1-svgrepo-com.svg";

class DisplayHomeView extends View {
  _parentElement = document.querySelector(".home");
  game = document.querySelector(".game");
  container = document.querySelector(".container");
  globeImg = document.querySelector(".globe-big");
  overlay = document.querySelector(".overlay");
  header = document.querySelector("header");
  closeBtn = document.querySelector(".library-close-btn");

  constructor() {
    super();
    this.addHandlerRotate();
    this.addHanlerCloseBtn();
  }

  addHandlerStartGameAndGoToLibrary(handler, libraryHandler = false) {
    this._parentElement.addEventListener(
      "click",
      function (e) {
        const startBtn = e.target.closest(".btn--start");
        const libraryBtn = e.target.closest(".btn--library");

        //ignoring the cases where the user clicks other than the two buttons
        if (!(startBtn || libraryBtn)) return;

        //if the user clicks the start button
        if (startBtn && !libraryHandler) {
          this._parentElement = document.querySelector(".home");
          handler();
          this.game.classList.toggle("hidden");
          this._parentElement.classList.toggle("hidden");
          this.container.style.padding = "1.6rem";
        } else if (libraryBtn && libraryHandler) {
          //if the user clicks the library button
          this._parentElement = document.querySelector(".library");
          handler();
          this.overlay.classList.toggle("hidden");
        }
      }.bind(this)
    );
  }

  addHandlerRotate() {
    this.globeImg.addEventListener("mouseover", function () {
      this.classList.add("rotate-right");
    });

    this.globeImg.addEventListener("mouseout", function () {
      this.classList.remove("rotate-right");
    });
  }

  addHanlerCloseBtn() {
    this.overlay.addEventListener(
      "click",
      function (e) {
        const closeBtn = e.target.closest(".library-close-btn");
        const overlay = e.target == this.overlay;

        if (!(closeBtn || overlay)) return;

        this.overlay.classList.toggle("hidden");
      }.bind(this)
    );
  }

  _generateMarkup() {
    const data = [];
    for (let i = 0; i < this._data.flags.length; i++) {
      data.push(` <div class="library__item">
              <div class="library__container">
                <!--flag-->
                <img
                  src="${this._data.flags[i].png}"
                  alt="${
                    this._data.flags[i].alt == ""
                      ? "image-of-flag"
                      : this._data.flags[i].alt
                  }"
                  class="library__flag-img"
                />

                <!--country name-->
                <p class="library__country-name">${
                  this._data.countryNames[i]
                }</p>

                <div class="library__statics">
                  <!--capital city info-->
                  <div class="library__statics-item">
                    <!--crown image-->
                    <img
                      class="library__statics-img"
                      src="${crownImg}"
                      alt=""
                    />

                    <p class="library__statics-capital-city">
                   ${this._data.capitals[i]}
                    </p>
                  </div>

                  <!--continent info-->
                  <div class="library__statics-item">
                    <!--small globe image-->
                    <img
                      class="library__statics-img"
                      src="${globeImg}"
                      alt=""
                    />

                    <!--continent name-->
                    <p class="library__statics-continent-name">
                      ${this._data.continents[i]}
                    </p>
                  </div>

                  <!--population info-->
                  <div class="library__statics-item">
                    <!--small globe image-->
                    <img
                      class="library__statics-img"
                      src="${userImg}"
                      alt=""
                    />

                    <!--country population-->
                    <p class="library__statics-population">      ${
                      this._data.populations[i]
                    }</p>
                  </div>
                </div>
              </div>
            </div>`);
    }

    return data.join("");
  }
}

export default new DisplayHomeView();
