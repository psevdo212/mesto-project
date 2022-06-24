"use strict";
// редактирование профиля
const editButton = document.querySelector(".profile__edit-button");
const closeEditButton = document.querySelector(".popup__close-button");
const editPopup = document.querySelector(".popup");
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
const editForm = document.querySelector(".popup__form");//поиск формы редактирования профиля
const newplaceFormElement = document.querySelector(".newplace__form");//поиск формы добавления места

//МОДАЛЬНЫЕ ОКНА
function openModalWindow (modalWindow) {//открытие модалки
  modalWindow.classList.add('opened');
}

function closeModalWindow (modalWindow) {//закрытие модалки
  modalWindow.classList.remove('opened');
}

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
function openEditPopup() {//открытие модалки редактирования
  username.value = profileTitle.textContent; // Заменяем заглушку на имя из профиля
  description.value = profileSubtitle.textContent;
  openModalWindow(editPopup);
}

// Отправка формы редактирования профиля
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  const name = username.value;
  const job = description.value;
  profileTitle.textContent = name; //заменяю текс профиля значением из поля формы
  profileSubtitle.textContent = job;
  closeModalWindow(editPopup); //закрываем окно после нажатия кнопки Сохранить
}

//МЕСТА
//добавляем первые шесть карточек
function addDefaultCards() {
  for (let card of initialCards) {
    addCard(card.name, card.link);
  }
}
addDefaultCards();

//добавление места через кнопку
function openNewplace() {
  openModalWindow(newplace);
}

// добавление по одной
function createCard(name, link) {
  //создается DOM элемент карточки
  //в карточку вставляются данные и навешиваются обработчики
  return element; //возвращается созданная карточка
}



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
      openImgBig();
    });
  placeElement
    .querySelector(".place__delete")
    .addEventListener("click", function () {
      //удаление карточки
      const placeItem = placeElement.closest(".place"); //ищем ближайший родительский класс .place
      placeItem.remove(); //и удаляем его
    });
}



// Отправка формы нового места
function newplaceSubmitHandler(evt) {
  evt.preventDefault();
  const name = document.querySelector("#place-name"); //выбор поля с названием
  const url = document.querySelector("#image-link"); //поле со ссылкой
  addCard(name.value, url.value); //передаем содержимое полей в функцию добавления
  closeModalWindow(newplace); //закрываем окно после нажатия кнопки Сохранить
}


//Открытие модалки с большой картинкой
function openImgBig() {
  openModalWindow(imgBig);
}

//СОБЫТИЯ
closeBigImg.addEventListener("click", function() {
  closeModalWindow(imgBig);
});//открытие большой картинки
editButton.addEventListener("click", openEditPopup);//открытие окна редактирования профиля
closeEditButton.addEventListener("click", function() {//закрытие модалки редактирования
  closeModalWindow(editPopup);
});
addButton.addEventListener("click", openNewplace);//открытие места
closeNewplaceButton.addEventListener("click", function() {//закрытие места
  closeModalWindow(newplace);
});

// Прикрепляем обработчик к форме редактирования профиля:
editForm.addEventListener("submit", editFormSubmitHandler);

// Прикрепляем обработчик к форме нового места:
newplaceFormElement.addEventListener("submit", newplaceSubmitHandler);

