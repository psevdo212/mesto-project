export default class Card {
    constructor ({ data: { _id, link, name, likes, userId, owner }, handleCardClick, handleLikeClick, handleDeliteClick }, selector) {
        
        this._id = _id;
        this._link = link;
        this._name = name;
        this._likes = likes;
        this._userId = userId;
        this._owner = owner._id;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeliteClick = handleDeliteClick;
    }

    //получить id карточки
    id() {
        return this._id
    }

    //клонируем и возвращаем разметку формы
    _getElement () {
        const placeElement = document
            .querySelector (this._selector)
            .content
            .querySelector ('.place')
            .cloneNode (true);

        return placeElement;
    }

    //наполнение разметки карточки
    generate () {
        this._element = this._getElement ();
        this._placeImg = placeElement.querySelector(".place__image");
        this._placeImg.src = this._link;
        this._placeImg.alt = this._name;
        this._name = this._element.querySelector(".place__title").textContent;
        this._likeButton = this._element.querySelector(".place__like");
        this._likeCounter = this._element.querySelector(".place__like-count");
        this._placeImg = this._element.querySelector(".place__image");
        this._placeDeleteButton = this._element.querySelector(".place__delete");
        this._likeCounter.textContent = this._likeCounter.length;

        this._setEventListenersCard();
        this._addLike();
        
        return this._element;

    }

    //Проверка на наличие лайка пользователя
    usersLike() {
        return Boolean (this._likes.find(userData => userData._id === this._userId))
    }

    //поставить лайк, в зависимости от наличия лайка пользователя
    _addLike () {
        if (this.usersLike()) {
            this._likeButton.classList.add('place__like_active');
        } else {
            this._likeButton.classList.remove('place__like_active');
        }
    }

    //обновить количество лайков
    updateLikes(res) {
        this._likes = res._likes;
        _addLike ();
      };
    

    //удаление карточки
    deleteCard () {
        this._element.remove();
        //this._element = null;
    }

    //установка слушателей
    _setEventListenersCard() {
        this._placeImg.setEventListener ('click', () => {
            this._handleCardClick();
        })

        this._likeButton.setEventListener ('click', () => {
            this._handleLikeClick();
        })

        if (this._userId === this._owner) {
            this._placeDeleteButton.setEventListener ('click', () => {
                this._handleDeliteClick();
            })
        }
    }
}