"use strict";

import { enableValidation } from "./validate.js";
import { openModalWindow, closeModalWindow } from "./modal.js";
import { createCard } from "./cards.js";
// import {
//   getInitialCards,
//   getUserInfo,
//   changeUserInfo,
//   changeAvatar,
//   postNewCard,
// } from "./api.js";
import Api from "./components/Api.js";
import { config } from "./utils/constants.js";

const avatar = document.querySelector(".avatar");
const newPlace = document.querySelector(".popup_newplace");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const editPopup = document.querySelector(".popup_edit");
const username = document.getElementById("username");
const description = document.getElementById("description");
const imgBig = document.querySelector(".image-big");
const closeButtons = Array.from(
  document.querySelectorAll(".popup__close-button")
);
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__avatar");
const placeContainer = document.querySelector(".places"); //контейнер с карточками мест
const avatarLink = document.getElementById("avatar-link");
const profileImg = document.querySelector(".profile__img");
const name = document.querySelector("#place-name"); //выбор поля с названием
const url = document.querySelector("#image-link"); //поле со ссылкой
let userId;

const getApi = new Api (config); //новый экземпляр класса Api
const userInfo = getApi.getUserInfo(); //тут получаем инфу о пользователе
const initCards = getApi.getInitialCards(); //тут получаем изначальный массив карточек

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
}

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
function openEditPopup() {
  //открытие модалки редактирования
  username.value = profileTitle.textContent; // Заменяем заглушку на имя из профиля
  description.value = profileSubtitle.textContent;
  openModalWindow(editPopup);
}

//Редактирование аватарки
function openAvatarPopup() {
  openModalWindow(avatar);
}

//Получение данных профиля и отрисовка начальных карточек
Promise.all([userInfo, initCards])
  .then(([userData, cards]) => {
    // тут установка данных пользователя
    profileTitle.textContent = userData.name;
    profileSubtitle.textContent = userData.about;
    profileImg.src = userData.avatar;
    userId = userData._id;
    // и тут отрисовка карточек
    cards.reverse().forEach((item) => {
      addCard(placeContainer, createCard(item, userId));
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Отправка формы редактирования профиля
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const defaultButtonText = submitButton.textContent;
  renderLoading(true, submitButton);
  getApi.changeUserInfo({ name: username.value, about: description.value })
    .then((res) => {
      profileTitle.textContent = res.name;
      profileSubtitle.textContent = res.about;
      evt.target.reset(); //очистка полей формы после отправки
      closeModalWindow();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, defaultButtonText);
    });
}

//Отправка нового аватара
function avatarSubmitHandler(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const defaultButtonText = submitButton.textContent;
  renderLoading(true, submitButton);
  getApi.changeAvatar(avatarLink.value)
    .then((res) => {
      profileImg.src = res.avatar;
      evt.target.reset(); //очистка полей формы после отправки
      closeModalWindow();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, defaultButtonText);
    });
}

// Отправка формы нового места
function newPlaceSubmitHandler(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const defaultButtonText = submitButton.textContent;
  renderLoading(true, submitButton);
  getApi.postNewCard({
    name: name.value,
    link: url.value,
  })
    .then((res) => {
      const card = createCard(res, userId);
      addCard(placeContainer, card);
      evt.target.reset(); //очистка полей формы после отправки
      closeModalWindow();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, defaultButtonText);
    });
}

//Добавление новой карточки
function addCard(сontainer, element) {
  сontainer.prepend(element); //размещение нового элемента в начале списка
}

//Изменение текста кнопки при сохранении
function renderLoading(isLoading, submitButton, defaultButtonText) {
  if (isLoading) {
    submitButton.textContent = "Сохранение...";
  } else {
    submitButton.textContent = defaultButtonText;
  }
}

// слушатель на каждую кнопку закрытия модального окна
closeButtons.forEach((item) => {
  item.addEventListener("click", (item) => {
    closeModalWindow();
  });
});

editButton.addEventListener("click", openEditPopup); //слушатель на открытие окна редактирования профиля
addButton.addEventListener("click", openNewPlace); //слушатель на добавление нового места
avatarButton.addEventListener("click", openAvatarPopup);
newPlace.addEventListener("submit", newPlaceSubmitHandler);
editPopup.addEventListener("submit", editFormSubmitHandler);
avatar.addEventListener("submit", avatarSubmitHandler);
