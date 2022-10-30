export default class FormValidator {
    constructor (objectValidation, formElement) {
        this._formElement = formElement;
        this._inputSelector = objectValidation.inputSelector;
        this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(objectValidation.submitButtonSelector);
        this._inactiveButtonClass = objectValidation.inactiveButtonClass;
        this._inputErrorClass = objectValidation.inputErrorClass;
        this._errorClass = objectValidation.errorClass;
    }

    //метод проверки валидност поля
    _isValid (element) {
        if (!element.validity.valid) {
            this._showInputError(element, element.validationMessage);
        } else {
            this._hideInputError(element);
        }
    }
    
    //метод добавления ошибки
    _showInputError (element, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${element.id}-error`);
        element.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
      }

    //метод скрытия ошибки
    _hideInputError (element) {
        const errorElement = this._formElement.querySelector(`.${element.id}-error`);
        element.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }

    //метод стилизации кнопок
    _toggleButtonState () {
        //if (this._hasInvalidInput(this._inputList)) {
        if (this._hasInvalidInput()) {
            this._buttonElement.disabled = true;
            this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }

    //вернет true если хотя бы одно поле невалидно
    _hasInvalidInput() {
        return this._inputList.some((element) => {
            return !element.validity.valid;
        });
    }

    //метод включения валидации формы
    enableValidation () {
        this._formElement.addEventListener ('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
        }

    //метод поиска всех полей формы
    _setEventListeners () {
        this._toggleButtonState();
        this._formElement.addEventListener("reset", () => {
            setTimeout(() => {
                this._toggleButtonState();
            }, 0);
        });
        this._inputList.forEach((element) => {
            element.addEventListener("input", () => {
                this._isValid(element);
                this._toggleButtonState();
            });
        });
  }
}