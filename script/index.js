"use strict";
// редактирование профиля
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const overlay = document.querySelector(".overlay");

import { openNewPlace, openEditPopup } from "./modal.js";

//СОБЫТИЯ

editButton.addEventListener("click", openEditPopup); //открытие окна редактирования профиля

addButton.addEventListener("click", openNewPlace); //открытие места

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
  }
});// закрытие модальных окон по нажатию кнопки Escape

overlay.addEventListener('click', function () {
  document.querySelector('.popup_opened').classList.remove('popup_opened');
});

// -----------------------------------------------------------------------------


