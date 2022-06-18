'use strict'
// редактирование профиля
let editButton = document.querySelector(".profile__edit-button");
let closePopupButton = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");

let addButton = document.querySelector(".profile__add-button");
let closeNewplaceButton = document.querySelector(".newplace__close-button");
let newplace = document.querySelector(".newplace");
let username = document.getElementById('username');
let description = document.getElementById('decription');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function popupToggle() {
  popup.classList.toggle("popup_opened"); // если класса нет - добавляется, если есть - убираем
  username.value = profileTitle.textContent; // Заменяем заглушку на имя из профиля
  description.value = profileSubtitle.textContent;
}
editButton.addEventListener("click", popupToggle);
closePopupButton.addEventListener("click", popupToggle);

// лайки (пока срабатывает только первый)
let likes = document.querySelectorAll('.place__like'); //выбираю все элементы с этим классом
for (let elem of likes) { // перебираю массив
  elem.addEventListener('click', () => { // на каждый элемент вешается событие
    elem.classList.toggle('place__like_active'); // а тут при клике на событие вызывается функция
  });
}

//добавление места

function newplaceToggle() {
  newplace.classList.toggle("newplace_opened"); // если класса нет - добавляется, если есть - убираем
}
addButton.addEventListener("click", newplaceToggle);
closeNewplaceButton.addEventListener("click", newplaceToggle);
