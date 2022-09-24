"use strict";
import { addCard, createCard, placeContainer } from "./cards.js";

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

//МОДАЛЬНЫЕ ОКНА
function openModalWindow(modalWindow) {
  //открытие модалки
  modalWindow.classList.add("popup_opened");
  document.addEventListener("click", closeOnOverlay);
  document.addEventListener("keydown", closeOnEscape);
}

function closeModalWindow() {
  //закрытие модалки
  document.querySelector(".popup_opened").classList.remove("popup_opened");
}

//Открытие модалки с большой картинкой
export function openImgBig() {
  openModalWindow(imgBig);
}

//добавление места через кнопку
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
  document.removeEventListener("keydown", closeOnEscape);
}

// Отправка формы нового места
function newPlaceSubmitHandler(evt) {
  evt.preventDefault();
  const name = document.querySelector("#place-name"); //выбор поля с названием
  const url = document.querySelector("#image-link"); //поле со ссылкой
  addCard(placeContainer, createCard(name.value, url.value)); //передаем содержимое полей в функцию добавления
  closeModalWindow(); //закрываем окно после нажатия кнопки Сохранить
  newPlace.removeEventListener("submit", newPlaceSubmitHandler);
  document.removeEventListener("keydown", closeOnEscape);
}

// слушатель на каждую кнопку закрытия модального окна
closeButton.forEach((item) => {
  item.addEventListener("click", (item) => {
    closeModalWindow();
    document.removeEventListener("keydown", closeOnEscape);
  });
});

//слушатель закрытия по ESC
function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    closeModalWindow();
  }
}

//закрытие по клику на оверлей
function closeOnOverlay(evt) {
  const modal = document.querySelector(".popup_opened");
  const composedPath = evt.composedPath();
  const overlayClick =
    composedPath.includes(modal) &&
    !composedPath.includes(modal.querySelector(".popup__form"));
  if (overlayClick) {
    closeModalWindow();
  }
}

editButton.addEventListener("click", openEditPopup); //открытие окна редактирования профиля
addButton.addEventListener("click", openNewPlace); //открытие места
