import view from "./view.js";

class DisplayFlagsView extends view {
  _parentElement = document.querySelector(".flag-list");

  constructor() {
    super();
    this._addHandlerActiveFlag();
  }

  _addHandlerActiveFlag() {
    this._parentElement.addEventListener("click", function (e) {
      const flagItem = e.target.closest(".flag-list__item");

      if (!flagItem) return;

      //removing the active class from all flag elements
      document.querySelectorAll(".flag-list__item").forEach((flag) => {
        flag.classList.remove("flag-list__item--active");
      });

      /*adding the active class to the selected flag element*/
      flagItem.classList.add("flag-list__item--active");
    });
  }

  _generateMarkup() {
    return this._data[0]
      .map((flag, i) => {
        return `
    <li class="flag-list__item flag-list__item-${i + 1}" data-identifier = "${
          this._data[1][i]
        }">
        <img src="${flag.png}" alt="${
          flag.alt == "" ? "image-of-flag" : flag.alt
        } "/>
  
        </li>`;
      })
      .join("");
  }
}

export default new DisplayFlagsView();
