import View from "./view.js";
import lifeHealthIcon from "url:../../imgs/life-heart.svg";

class LifeHealthView extends View {
  _parentElement = document.querySelector(".life-health");

  _generateMarkup() {
    let lifeHealth = [];

    for (let i = 0; i < this._data; i++)
      lifeHealth.push(`<li class="life-health__item life-health__item-${i + 1}">
          <img src="${lifeHealthIcon}" />
        </li>`);

    return lifeHealth.join("");
  }
}

export default new LifeHealthView();
