'use strict'
// редактирование профиля
let editButton = document.querySelector(".profile__edit-button");
let closePopupButton = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");

let addButton = document.querySelector(".profile__add-button");
let closeNewplaceButton = document.querySelector(".newplace__close-button");
let newplace = document.querySelector(".newplace");
let username = document.getElementById('username');
let description = document.getElementById('description');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function popupToggle() {
  popup.classList.toggle("popup_opened"); // если класса нет - добавляется, если есть - убираем
  username.value = profileTitle.textContent; // Заменяем заглушку на имя из профиля
  description.value = profileSubtitle.textContent;
}
editButton.addEventListener("click", popupToggle);
closePopupButton.addEventListener("click", popupToggle);


// лайки
let likes = document.getElementsByClassName('place__like'); //выбираю все элементы с этим классом
function likeButton () {
  for (let elem of likes) { // перебираю массив
  elem.addEventListener('click', () => { // на каждый элемент вешается событие
    elem.classList.toggle('place__like_active'); // а тут при клике на событие вызывается функция
  });
}
}
likeButton();

//добавление места

function newplaceToggle() {
  newplace.classList.toggle("newplace_opened"); // если класса нет - добавляется, если есть - убираем
}
addButton.addEventListener("click", newplaceToggle);
closeNewplaceButton.addEventListener("click", newplaceToggle);

// отправка формы редактирования профиля
// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function formSubmitHandler (evt) {
  evt.preventDefault();
// Эта строчка отменяет стандартную отправку формы.
// Так мы можем определить свою логику отправки.
// О том, как это делать, расскажем позже.
// Получите значение полей jobInput и nameInput из свойства value
let name = username.value;
let job = description.value;
// Выберите элементы, куда должны быть вставлены значения полей
profileTitle.textContent = name;
profileSubtitle.textContent = job;
popupToggle(); //закрываем окно псле нажатия кнокпи Сохранить
}

// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', formSubmitHandler);

//ДОБАВЛЕНИЕ КАРТОЧЕК
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

  const placeName = document.querySelector('#place-name');
  const placeUrl = document.querySelector('#image-link');
  function addCard () {
    const placeContainer = document.querySelector('.places');
    placeContainer.insertAdjacentHTML('afterbegin', `
    <div class="place">
    <button class="place__delete" type="button" aria-label="Удалить"></button>
    <img
      class="place__image"
      src="${placeUrl.value}"
      alt="${placeName.value}"
    />
    <div class="place__title-wrap">
      <h2 class="place__title">${placeName.value}</h2>
      <button
        type="button"
        aria-label="Нравится"
        class="place__like"
      ></button>
    </div>
  </div>`);
  }

  // отправка формы нового места
// Находим форму в DOM
const newplaceFormElement = document.querySelector('.newplace__form');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function newplaceSubmitHandler (evt) {
  evt.preventDefault();
  addCard();
  newplaceToggle(); //закрываем окно псле нажатия кнокпи Сохранить
}

// Прикрепляем обработчик к форме:
newplaceFormElement.addEventListener('submit', newplaceSubmitHandler);

