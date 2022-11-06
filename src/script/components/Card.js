export default class Card {
  constructor(
    { data, handleCardClick, handleLikeClick, handleDeliteClick },
    selector,
    api,
    userId
  ) {
    this._name = data.name;
    this._id = data._id;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner._id;
    this._selector = selector;
    this._api = api;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeliteClick = handleDeliteClick;
  }

  //клонируем и возвращаем разметку формы
  _getElement() {
    const placeElement = document
      .querySelector(this._selector)
      .content.querySelector(".place")
      .cloneNode(true);
    return placeElement;
  }

  //наполнение разметки карточки
  generate() {
    this._element = this._getElement();
    this._placeImg = this._element.querySelector(".place__image");
    this._placeImg.src = this._link;
    this._placeImg.alt = this._name;
    this._element.querySelector(".place__title").textContent = this._name;
    this._title = this._element.querySelector(".place__title");
    this._title.textContent = this._name;
    this._likeButton = this._element.querySelector(".place__like");
    this._likeCounter = this._element.querySelector(".place__like-count");
    this._placeDeleteButton = this._element.querySelector(".place__delete");
    this._likeCounter.textContent = this._likes.length;
    if (!(this._owner === this._userId)) {
      this._placeDeleteButton.style.display = "none";
    }
    if (this._likes.find((obj) => this._userId === obj._id)) {
      this._likeButton.classList.add("place__like_active");
    }
    this._setEventListenersCard();
    return this._element;
  }

  isLiked() {
    return Boolean(!this._likeButton.classList.contains("place__like_active"));
  }

  addLIke(data) {
    this._likes = data.likes;
    if (this.isLiked()) {
      this._likeButton.classList.add("place__like_active");
      } else {
      this._likeButton.classList.remove("place__like_active");
    }
    this._likeCounter.textContent = this._likes.length;
  }

  //удаление карточки
  deleteCard() {
    this._element.closest(".place").remove();
  }

  //установка слушателей
  _setEventListenersCard() {
    this._placeImg.addEventListener("click", () => {
      this._handleCardClick({
        link: this._link,
        name: this._name,
        alt: this._name,
      });
    });
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });
    this._placeDeleteButton.addEventListener("click", () => {
      this._handleDeliteClick();
    });
  }
}
