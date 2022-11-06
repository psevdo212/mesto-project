export const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "65d0f98e-b9df-4c29-9c0d-9c7754189a38",
    "Content-Type": "application/json",
  },
};

export const objectValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__input-error_active",
};
export const addButton = document.querySelector(".profile__add-button");
export const editButton = document.querySelector(".profile__edit-button");
export const avatarButton = document.querySelector(".profile__avatar");
