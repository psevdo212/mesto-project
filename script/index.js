"use strict";
// редактирование профиля
const editButton = document.querySelector(".profile__edit-button");
const closeEditButton = document.querySelector(".popup__close-button");
const editPopup = document.querySelector(".popup");
const addButton = document.querySelector(".profile__add-button");
const closeNewPlaceButton = document.querySelector(".newplace__close-button");
const newPlace = document.querySelector(".newplace");
const username = document.getElementById("username");
const description = document.getElementById("description");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const imgBig = document.querySelector(".image-big");
const closeBigImg = document.querySelector(".image-big__close-button");
const editForm = document.querySelector(".popup__form"); //поиск формы редактирования профиля
const newPlaceFormElement = document.querySelector(".newplace__form"); //поиск формы добавления места
const placeContainer = document.querySelector(".places"); //контейнер с карточками мест

//МОДАЛЬНЫЕ ОКНА
function openModalWindow(modalWindow) {
  //открытие модалки
  modalWindow.classList.add("popup_opened");
}

function closeModalWindow(modalWindow) {
  //закрытие модалки
  modalWindow.classList.remove("popup_opened");
}

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
function openEditPopup() {
  //открытие модалки редактирования
  username.value = profileTitle.textContent; // Заменяем заглушку на имя из профиля
  description.value = profileSubtitle.textContent;
  openModalWindow(editPopup);
}

// Отправка формы редактирования профиля
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  const name = username.value;
  const job = description.value;
  profileTitle.textContent = name; //заменяю текст профиля значением из поля формы
  profileSubtitle.textContent = job;
  closeModalWindow(editPopup); //закрываем окно после нажатия кнопки Сохранить
}

//МЕСТА
//добавляем первые шесть карточек
initialCards.forEach((item) => {
  addCard(placeContainer, createCard(item.name, item.link));
});

//добавление места через кнопку
function openNewPlace() {
  openModalWindow(newPlace);
}

function createCard(placeName, placeUrl) {
  const placeTemplate = document.querySelector("#place-template").content; //получаю содержимое шаблона
  const placeElement = placeTemplate.querySelector(".place").cloneNode(true); //клонирую
  placeElement.querySelector(".place__title").textContent = placeName; //название местности из поля формы
  placeElement.querySelector(".place__image").src = placeUrl; //ссылка на картинку из поля формы
  placeElement.querySelector(".place__image").alt = placeName; //прописываем альтом название места
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
      openImgBig();
    });
  placeElement
    .querySelector(".place__delete")
    .addEventListener("click", function () {
      //удаление карточки
      const placeItem = placeElement.closest(".place"); //ищем ближайший родительский класс .place
      placeItem.remove(); //и удаляем его
    });
  return placeElement;
}

function addCard(сontainer, element) {
  сontainer.prepend(element); //размещение нового элемента в начале списка
}

// Отправка формы нового места
function newPlaceSubmitHandler(evt) {
  evt.preventDefault();
  const name = document.querySelector("#place-name"); //выбор поля с названием
  const url = document.querySelector("#image-link"); //поле со ссылкой
  addCard(placeContainer, createCard(name.value, url.value)); //передаем содержимое полей в функцию добавления
  closeModalWindow(newPlace); //закрываем окно после нажатия кнопки Сохранить
}

//Открытие модалки с большой картинкой
function openImgBig() {
  openModalWindow(imgBig);
}

//СОБЫТИЯ
closeBigImg.addEventListener("click", function () {
  closeModalWindow(imgBig);
}); //открытие большой картинки
editButton.addEventListener("click", openEditPopup); //открытие окна редактирования профиля
closeEditButton.addEventListener("click", function () {
  closeModalWindow(editPopup); //закрытие модалки редактирования
});
addButton.addEventListener("click", openNewPlace); //открытие места
closeNewPlaceButton.addEventListener("click", function () {
  closeModalWindow(newPlace); //закрытие места
});

// Прикрепляем обработчик к форме редактирования профиля:
editForm.addEventListener("submit", editFormSubmitHandler);

// Прикрепляем обработчик к форме нового места:
newPlaceFormElement.addEventListener("submit", newPlaceSubmitHandler);
