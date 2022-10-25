"use strict";
import { openImgBig } from "./index.js";
import { deleteCard, setLike, deleteLike } from "./api.js";
//import PopupWithImage from "./components/PopupWithImage.js";

export function createCard(card, userId) {
  const placeTemplate = document.querySelector("#place-template").content; //получаю содержимое шаблона
  const placeElement = placeTemplate.querySelector(".place").cloneNode(true); //клонирую
  const placeTitle = placeElement.querySelector(".place__title");
  const likeButton = placeElement.querySelector(".place__like");
  const likeCounter = placeElement.querySelector(".place__like-count");
  const placeImg = placeElement.querySelector(".place__image");
  const placeDeleteButton = placeElement.querySelector(".place__delete");
  const image = document.querySelector(".image-big__image");
  const figcaption = document.querySelector(".image-big__figcaption");
  //const bigImg = document.querySelector(".image-big");
  //const imgBig = new PopupWithImage(bigImg); //тут создается экземпляр класса попапа с большой картинкой
  const likeActive = "place__like_active";
  const isUserOwner = card.owner._id === userId;
  placeTitle.textContent = card.name; //название местности из поля формы
  placeImg.src = card.link; //ссылка на картинку из поля формы
  placeImg.alt = card.name; //прописываем альтом название места
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
  placeImg.addEventListener("click", function () {
    image.src = card.link;
    image.alt = card.name;
    figcaption.textContent = card.name;
    openImgBig();  }
    );
  if (isUserOwner) {
    placeDeleteButton.addEventListener("click", function () {
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
    placeDeleteButton.remove();
  }
  return placeElement;
}
