"use strict";
import { openImgBig } from "./modal.js";
import { initialCards } from "./constants.js";

export const placeContainer = document.querySelector(".places"); //контейнер с карточками мест

//МЕСТА
//добавляем первые шесть карточек
initialCards.forEach((item) => {
  addCard(placeContainer, createCard(item.name, item.link));
});

export function createCard(placeName, placeUrl) {
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

export function addCard(сontainer, element) {
  сontainer.prepend(element); //размещение нового элемента в начале списка
}
