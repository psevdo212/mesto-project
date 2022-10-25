import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, { submit }) {
    super(selector);
    this._submit = submit;
    this._form = this._popup.document.querySelector(".popup__form");
    this._inputList = this._popup.document.querySelectorAll(".popup__item");
    this._submitButton = this._popup.document.querySelector(
      ".popup__submit-button"
    );
    this._defaultButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(getData) {
    this._inputList.forEach((item) => {
      item.value = getData[item.id];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._renderLoading(true);
      this._submit(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          this._renderLoading(false);
        });
    });
  }

  //Изменение текста кнопки при сохранении
  _renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = this._defaultButtonText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
