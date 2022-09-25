"use strict";

import { enableValidation } from "./validate.js";
import { openModalWindow, closeModalWindow } from "./modal.js";
import { initialCards } from "./constants.js";
import { createCard } from "./cards.js";

const newPlace = document.querySelector(".popup_newplace");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const editPopup = document.querySelector(".popup");
const username = document.getElementById("username");
const description = document.getElementById("description");
const imgBig = document.querySelector(".image-big");
const closeButton = Array.from(
  document.querySelectorAll(".popup__close-button")
);
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const placeContainer = document.querySelector(".places"); //контейнер с карточками мест

//включение валидации полей в модальных окнах
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__input-error_active",
});

//Открытие модалки с большой картинкой
export function openImgBig() {
  openModalWindow(imgBig);
}

//открытие окна добавления нового места
function openNewPlace() {
  openModalWindow(newPlace);
  newPlace.addEventListener("submit", newPlaceSubmitHandler);
}

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
function openEditPopup() {
  //открытие модалки редактирования
  username.value = profileTitle.textContent; // Заменяем заглушку на имя из профиля
  description.value = profileSubtitle.textContent;
  openModalWindow(editPopup);
  editPopup.addEventListener("submit", editFormSubmitHandler);
}

// Отправка формы редактирования профиля
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  const name = username.value;
  const job = description.value;
  profileTitle.textContent = name; //заменяю текст профиля значением из поля формы
  profileSubtitle.textContent = job;
  closeModalWindow(); //закрываем окно после нажатия кнопки Сохранить
  editPopup.removeEventListener("submit", editFormSubmitHandler);
}

// Отправка формы нового места
function newPlaceSubmitHandler(evt) {
  evt.preventDefault();
  const name = document.querySelector("#place-name"); //выбор поля с названием
  const url = document.querySelector("#image-link"); //поле со ссылкой
  addCard(placeContainer, createCard(name.value, url.value)); //передаем содержимое полей в функцию добавления
  closeModalWindow(); //закрываем окно после нажатия кнопки Сохранить
  evt.target.reset(); //очистка полей формы после отправки
  newPlace.removeEventListener("submit", newPlaceSubmitHandler);
}

//Добавление новой карточки
function addCard(сontainer, element) {
  сontainer.prepend(element); //размещение нового элемента в начале списка
}

//добавляем первые шесть карточек
initialCards.forEach((item) => {
  addCard(placeContainer, createCard(item.name, item.link));
});

// слушатель на каждую кнопку закрытия модального окна
closeButton.forEach((item) => {
  item.addEventListener("click", (item) => {
    closeModalWindow();
  });
});

editButton.addEventListener("click", openEditPopup); //слушатель на открытие окна редактирования профиля
addButton.addEventListener("click", openNewPlace); //слушатель на добавление нового места
