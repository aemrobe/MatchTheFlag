class DisplayScoreView {
  _parentElement = document.querySelector(".score");
  _data;

  render(data) {
    this._data = data;
    this._parentElement.textContent = `${this._data}`;
  }
}

export default new DisplayScoreView();
