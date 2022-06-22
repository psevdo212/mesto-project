"use strict";
// редактирование профиля
const editButton = document.querySelector(".profile__edit-button");
const closePopupButton = document.querySelector(".popup__close-button");
const popup = document.querySelector(".popup");
const addButton = document.querySelector(".profile__add-button");
const closeNewplaceButton = document.querySelector(".newplace__close-button");
const imgCloseButton = document.querySelector(".image-big__close-button");
const newplace = document.querySelector(".newplace");
const username = document.getElementById("username");
const description = document.getElementById("description");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const imgBig = document.querySelector(".image-big");
const closeBigImg = document.querySelector(".image-big__close-button");

function popupToggle() {
  popup.classList.toggle("popup_opened"); // если класса нет - добавляется, если есть - убираем
  username.value = profileTitle.textContent; // Заменяем заглушку на имя из профиля
  description.value = profileSubtitle.textContent;
}
editButton.addEventListener("click", popupToggle);
closePopupButton.addEventListener("click", popupToggle);

//добавление места

function newplaceToggle() {
  newplace.classList.toggle("newplace_opened"); // если класса нет - добавляется, если есть - убираем
}
addButton.addEventListener("click", newplaceToggle);
closeNewplaceButton.addEventListener("click", newplaceToggle);

// отправка формы редактирования профиля
// Находим форму в DOM
const formElement = document.querySelector(".popup__form");

// Обработчик «отправки» формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  const name = username.value;
  const job = description.value;
  profileTitle.textContent = name; //заменяю текс профиля значением из поля формы
  profileSubtitle.textContent = job;
  popupToggle(); //закрываем окно после нажатия кнокпи Сохранить
}

// Прикрепляем обработчик к форме:
formElement.addEventListener("submit", formSubmitHandler);

//ДОБАВЛЕНИЕ КАРТОЧЕК
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//добавляем первые шесть карточек
function addDefaultCards() {
  for (let card of initialCards) {
    addCard(card.name, card.link);
  }
}
addDefaultCards();

// добавление по одной
function addCard(placeName, placeUrl) {
  const placeContainer = document.querySelector(".places"); //тут размещаются карточки
  const placeTemplate = document.querySelector("#place-template").content; //получаю содержимое шаблона
  const placeElement = placeTemplate.querySelector(".place").cloneNode(true); //клонирую
  placeElement.querySelector(".place__title").textContent = placeName; //название местности из поля формы
  placeElement.querySelector(".place__image").src = placeUrl; //ссылка на картинку из поля формы
  placeElement.querySelector(".place__image").alt = placeName; //прописываем альтом название места
  placeContainer.prepend(placeElement); //размещение нового элемента в начале списка
  placeElement
    .querySelector(".place__like")
    .addEventListener("click", function (evt) {
      // на элемент вешается событие
      evt.target.classList.toggle("place__like_active"); // а тут при клике на событие вызывается функция
    });
  placeElement
    .querySelector(".place__image")
    .addEventListener("click", function () {
      document.querySelector(".image-big__image").src = placeUrl;
      document.querySelector(".image-big__image").alt = placeName;
      document.querySelector(".image-big__figcaption").textContent = placeName;
      imgBigToggle();
    });
  placeElement
    .querySelector(".place__delete")
    .addEventListener("click", function () {
      //удаление карточки
      const placeItem = placeElement.closest(".place"); //ищем ближайший родительский класс .place
      placeItem.remove(); //и удаляем его
    });
}

// отправка формы нового места
const newplaceFormElement = document.querySelector(".newplace__form");

// Обработчик «отправки» формы
function newplaceSubmitHandler(evt) {
  evt.preventDefault();
  const name = document.querySelector("#place-name"); //выбор поля с названием
  const url = document.querySelector("#image-link"); //поле со ссылкой
  addCard(name.value, url.value); //передаем содержимое полей в функцию добавления
  newplaceToggle(); //закрываем окно после нажатия кнопки Сохранить
}

// Прикрепляем обработчик к форме:
newplaceFormElement.addEventListener("submit", newplaceSubmitHandler);

//Большая картинка
function imgBigToggle() {
  imgBig.classList.toggle("image-big_opened");
}

closeBigImg.addEventListener("click", imgBigToggle);
