import { addCard, createCard, placeContainer } from "./cards.js";

export const newPlace = document.querySelector(".newplace");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const editPopup = document.querySelector(".popup");
export const username = document.getElementById("username");
export const description = document.getElementById("description");
export const imgBig = document.querySelector(".image-big");
const closeBigImg = document.querySelector(".image-big__close-button");
const closeButton = Array.from(document.querySelectorAll(".popup__close-button"));


//МОДАЛЬНЫЕ ОКНА
export function openModalWindow(modalWindow) {
  //открытие модалки
  modalWindow.classList.add("popup_opened");
}

export function closeModalWindow() {
  //закрытие модалки
  document.querySelector(".popup_opened").classList.remove("popup_opened");
}

// слушатель на каждую кнопку закрытия модального окна
closeButton.forEach((item) => {
  item.addEventListener('click', (item) => {
    closeModalWindow(item);
  });
});

//Открытие модалки с большой картинкой
export function openImgBig() {
  openModalWindow(imgBig);
}

//добавление места через кнопку
export function openNewPlace() {
  openModalWindow(newPlace);
  newPlace.addEventListener('submit', newPlaceSubmitHandler);
}

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
export function openEditPopup() {
  //открытие модалки редактирования
  username.value = profileTitle.textContent; // Заменяем заглушку на имя из профиля
  description.value = profileSubtitle.textContent;
  openModalWindow(editPopup);
  editPopup.addEventListener('submit', editFormSubmitHandler);
}

// Отправка формы редактирования профиля
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  const name = username.value;
  const job = description.value;
  profileTitle.textContent = name; //заменяю текст профиля значением из поля формы
  profileSubtitle.textContent = job;
  closeModalWindow(editPopup); //закрываем окно после нажатия кнопки Сохранить
  editPopup.removeEventListener('submit', editFormSubmitHandler);
}

// Отправка формы нового места
export function newPlaceSubmitHandler(evt) {
  evt.preventDefault();
  const name = document.querySelector("#place-name"); //выбор поля с названием
  const url = document.querySelector("#image-link"); //поле со ссылкой
  addCard(placeContainer, createCard(name.value, url.value)); //передаем содержимое полей в функцию добавления
  closeModalWindow(newPlace); //закрываем окно после нажатия кнопки Сохранить
  newPlace.removeEventListener('submit', newPlaceSubmitHandler);
}
