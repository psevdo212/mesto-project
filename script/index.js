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


  function addCard (placeName, placeUrl) {
    const placeContainer = document.querySelector('.places'); //тут размещаются карточки
    const placeTemplate = document.querySelector('#place-template').content; //получаю содержимое шаблона
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true); //клонирую
    placeElement.querySelector('.place__title').textContent = placeName;//название местности из поля формы
    placeElement.querySelector('.place__image').src = placeUrl;//ссылка на картинку из поля формы
    placeContainer.prepend(placeElement);//размещение нового элемента в начале списка
    placeElement.querySelector('.place__like').addEventListener('click', function (evt) { // на элемент вешается событие
      evt.target.classList.toggle('place__like_active'); // а тут при клике на событие вызывается функция
    });
  }

  // отправка формы нового места
// Находим форму в DOM
const newplaceFormElement = document.querySelector('.newplace__form');

// Обработчик «отправки» формы
function newplaceSubmitHandler (evt) {
  evt.preventDefault();
  const name = document.querySelector('#place-name');//выбор поля с названием
  const url = document.querySelector('#image-link');//поле со ссылкой
  addCard(name.value, url.value);//передаем содержимое полей в функцию добавления
  newplaceToggle(); //закрываем окно после нажатия кнопки Сохранить
}

// Прикрепляем обработчик к форме:
newplaceFormElement.addEventListener('submit', newplaceSubmitHandler);

