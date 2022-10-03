"use strict";
import { openImgBig } from "./index.js";
import { deleteCard, setLike, deleteLike } from "./api.js";

export function createCard(card, userId) {
  const placeTemplate = document.querySelector("#place-template").content; //получаю содержимое шаблона
  const placeElement = placeTemplate.querySelector(".place").cloneNode(true); //клонирую
  const likeButton = placeElement.querySelector(".place__like");
  const likeCounter = placeElement.querySelector(".place__like-count");
  const likeActive = "place__like_active";
  const isUserOwner = card.owner._id === userId;
  placeElement.querySelector(".place__title").textContent = card.name; //название местности из поля формы
  placeElement.querySelector(".place__image").src = card.link; //ссылка на картинку из поля формы
  placeElement.querySelector(".place__image").alt = card.name; //прописываем альтом название места
  likeCounter.textContent = card.likes.length;
  if (userId) {
    const likedByUser = card.likes.some((userInfo) => {
      //Проверяю ставился ли лайк на карточку текущим пользователем
      return userInfo._id === userId;
    });
    if (likedByUser) {
      likeButton.classList.add(likeActive); //Если да - добавляю класс активного лайка
    }
  }
  likeButton.addEventListener("click", function (evt) {
    // на элемент вешается событие
    if (likeButton.classList.contains(likeActive)) {
      //Если лайк уже активен - удаляю лайк
      deleteLike(card._id)
        .then((res) => {
          likeCounter.textContent = res.likes.length;
          likeButton.classList.remove(likeActive);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLike(card._id)
        .then((res) => {
          likeCounter.textContent = res.likes.length;
          likeButton.classList.add(likeActive);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  placeElement
    .querySelector(".place__image")
    .addEventListener("click", function () {
      document.querySelector(".image-big__image").src = card.link;
      document.querySelector(".image-big__image").alt = card.name;
      document.querySelector(".image-big__figcaption").textContent = card.name;
      openImgBig();
    });
  if (isUserOwner) {
    placeElement
      .querySelector(".place__delete")
      .addEventListener("click", function () {
        deleteCard(card._id) //удаление карточки
          .then(() => {
            const placeItem = placeElement.closest(".place"); //ищем ближайший родительский класс .place
            placeItem.remove(); //и удаляем его
          })
          .catch((err) => {
            console.log(err);
          });
      });
  } else {
    placeElement.querySelector(".place__delete").remove();
  }
  return placeElement;
}
