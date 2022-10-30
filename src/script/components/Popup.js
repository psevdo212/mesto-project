export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closeButton = this._popup.querySelector(".popup__close-button");
  }

  open() {
    this._popup.classList.add("popup_opened");
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closeOnEscape);
    document.removeEventListener("mousedown", this._closeOnOverlay);
  }

  _setEventListeners() {
    document.addEventListener("mousedown", this._closeOnOverlay);
    document.addEventListener("keydown", this._closeOnEscape);
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }

  _closeOnEscape = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _closeOnOverlay = (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      this.close();
    }
  };
}
