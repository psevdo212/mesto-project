import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._figcaption = this._popup.querySelector(".image-big__figcaption");
    this._image = this._popup.querySelector(".image-big__image");
  }

  open(name, url) {
    super.open();
    this._name = name;
    this._url = url;
    this._image.src = this._url;
    this._image.alt = this._name;
    this._figcaption.textContent = this._name;
  }
}
