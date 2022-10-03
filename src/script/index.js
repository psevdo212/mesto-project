"use strict";

import { enableValidation } from "./validate.js";
import { openModalWindow, closeModalWindow } from "./modal.js";
import { createCard } from "./cards.js";
import {
  getInitialCards,
  getUserInfo,
  changeUserInfo,
  changeAvatar,
  postNewCard,
} from "./api.js";

const avatar = document.querySelector(".avatar");
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
const avatarButton = document.querySelector(".profile__avatar");
const placeContainer = document.querySelector(".places"); //контейнер с карточками мест
const avatarLink = document.getElementById("avatar-link");
const profileImg = document.querySelector(".profile__img");
let userId;

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

//Редактирование аватарки
function openAvatarPopup() {
  openModalWindow(avatar);
  avatar.addEventListener("submit", avatarSubmitHandler);
}

//получение данных профиля с сервера
getUserInfo()
  .then((res) => {
    profileTitle.textContent = res.name;
    profileSubtitle.textContent = res.about;
    profileImg.src = res.avatar;
    userId = res._id;
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
  changeUserInfo({ name: username.value, about: description.value })
    .then((res) => {
      profileTitle.textContent = res.name;
      profileSubtitle.textContent = res.about;
      closeModalWindow();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, defaultButtonText);
    });
  editPopup.removeEventListener("submit", editFormSubmitHandler);
}

//Отправка нового аватара
function avatarSubmitHandler(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const defaultButtonText = submitButton.textContent;
  renderLoading(true, submitButton);
  changeAvatar(avatarLink.value)
    .then((res) => {
      profileImg.src = res.avatar;
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
  const name = document.querySelector("#place-name"); //выбор поля с названием
  const url = document.querySelector("#image-link"); //поле со ссылкой
  const submitButton = evt.submitter;
  const defaultButtonText = submitButton.textContent;
  renderLoading(true, submitButton);
  postNewCard({
    name: name.value,
    link: url.value,
  })
    .then((res) => {
      const card = createCard(res, userId);
      addCard(placeContainer, card);
      closeModalWindow();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, defaultButtonText);
    });
  //передаем содержимое полей в функцию добавления
  //закрываем окно после нажатия кнопки Сохранить
  evt.target.reset(); //очистка полей формы после отправки
  newPlace.removeEventListener("submit", newPlaceSubmitHandler);
}

//Добавление новой карточки
function addCard(сontainer, element) {
  сontainer.prepend(element); //размещение нового элемента в начале списка
}

//добавляем первые шесть карточек
getInitialCards()
  .then((result) => {
    result.reverse().forEach((item) => {
      addCard(placeContainer, createCard(item, userId));
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

//Изменение текста кнопки при сохранении
function renderLoading(isLoading, submitButton, defaultButtonText) {
  if (isLoading) {
    submitButton.textContent = "Сохранение...";
  } else {
    submitButton.textContent = defaultButtonText;
  }
}

// слушатель на каждую кнопку закрытия модального окна
closeButton.forEach((item) => {
  item.addEventListener("click", (item) => {
    closeModalWindow();
  });
});

editButton.addEventListener("click", openEditPopup); //слушатель на открытие окна редактирования профиля
addButton.addEventListener("click", openNewPlace); //слушатель на добавление нового места
avatarButton.addEventListener("click", openAvatarPopup);
