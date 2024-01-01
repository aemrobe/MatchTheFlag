export default class View {
  _data = "";
  _parentElement = document.querySelector(".flag-list");

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="src/imgs/icons.svg#icon-loader"></use>
        </svg>
      </div>
    `;

    this.clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerMatch(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const flagItem = e.target.closest(".flag-list__item");
      const countryItem = e.target.closest(".country-list__item");

      /*if the country item or the flag item is not selected it returns from the functoin*/
      if (!(flagItem || countryItem)) return;

      handler();
    });
  }

  render(data) {
    this._data = data;

    const markup = this._generateMarkup();

    this.clear();

    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  clear() {
    this._parentElement.innerHTML = "";
  }
}
