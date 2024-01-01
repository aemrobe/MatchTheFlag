import view from "./view.js";

class DisplayCountryView extends view {
  _parentElement = document.querySelector(".country-list");

  constructor() {
    super();

    this._addHandlerActiveCountry();
  }

  _shuffleArray = function (arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  _addHandlerActiveCountry() {
    this._parentElement.addEventListener("click", function (e) {
      const countryItem = e.target.closest(".country-list__item");

      if (!countryItem) return;

      /*removing the active class from all of the country names*/

      document.querySelectorAll(".country-list__item").forEach((country) => {
        country.classList.remove("country-list__item--active");
      });

      /*adding the active class to the selected country name*/
      countryItem.classList.add("country-list__item--active");
    });
  }

  _generateMarkup() {
    let shuffledData = [
      ...this._data.map((country, i) => {
        return `<li class="country-list__item country-list__item-${
          i + 1
        }" data-identifier = "${country}">${country}</li>`;
      }),
    ];

    this._shuffleArray(shuffledData);

    return shuffledData.join("");
  }
}

export default new DisplayCountryView();
