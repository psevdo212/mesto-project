export const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "65d0f98e-b9df-4c29-9c0d-9c7754189a38",
    "Content-Type": "application/json",
  },
};

export const newPlace = document.querySelector(".popup_newplace");
export const avatar = document.querySelector(".avatar");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const editPopup = document.querySelector(".popup_edit");
export const username = document.getElementById("username");
export const description = document.getElementById("description");
export const imgBig = document.querySelector(".image-big");
export const closeButtons = Array.from(
   document.querySelectorAll(".popup__close-button")
 );
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const avatarButton = document.querySelector(".profile__avatar");
export const placeContainer = document.querySelector(".places"); //контейнер с карточками мест
export const avatarLink = document.getElementById("avatar-link");
export const profileImg = document.querySelector(".profile__img");
export const name = document.querySelector("#place-name"); //выбор поля с названием
export const url = document.querySelector("#image-link"); //поле со ссылкой
