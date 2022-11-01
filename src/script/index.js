
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Api from "./components/Api.js";
import { config, objectValidation, imgBig, placeContainer, newPlace, addButton } from "./utils/constants.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import Card from "./components/Card.js";
const editButton = document.querySelector(".profile__edit-button");
const avatarButton = document.querySelector(".profile__avatar");
const getApi = new Api(config); //новый экземпляр класса Api
//const userApi = getApi.getUserInfo(); //тут получаем инфу о пользователе
//const initCards = getApi.getInitialCards(); //тут получаем изначальный массив карточек
const profileInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileSubtitle: ".profile__subtitle",
  profileImg: ".profile__img",
}); //новый экземпляр класса UserInfo

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
const userEditPopup = new PopupWithForm({
  selector: ".popup_edit",
  handleFormSubmit: (formValues) => {
    const name = formValues["username"];
    const about = formValues["description"];
    userEditPopup.renderLoading(true);
    getApi
      .changeUserInfo({ name, about })
      .then((res) => {
        profileInfo.setUserInfo(res);
        userEditPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        userEditPopup.renderLoading(false);
      });
  },
});

//Редактирование аватарки
const avatarPopup = new PopupWithForm({
  selector: ".avatar",
  handleFormSubmit: (formValues) => {
    const avaLink = formValues["avatar-link"];
    avatarPopup.renderLoading(true);
    getApi
      .changeAvatar(avaLink)
      .then((res) => {
        profileInfo.setUserInfo(res);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avatarPopup.renderLoading(false);
      });
  },
});
 
// ----- ПОПАП НОВОГО МЕСТА  -----

const newPlacePopup = new PopupWithForm ({
  selector: ".popup_newplace",
  handleFormSubmit: (formValues) => {
    const name = formValues["place-name"];
    const url = formValues["image-link"];
    newPlacePopup.renderLoading(true);
    getApi
      .postNewCard({name, url})
      .then((res) => {
        section (res);
        newPlacePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        newPlacePopup.renderLoading(false);
      });
  }
})



//слушатель на открытие окна редактирования профиля
editButton.addEventListener("click", () => {
  const { name, about } = profileInfo.getUserInfo();
  userEditPopup.setInputValues({ username: name, description: about });
  enableValidation(objectValidation);
  userEditPopup.open();
});

addButton.addEventListener("click", () => {
  newPlacePopup.open();
  enableValidation(objectValidation);
}); //слушатель на добавление нового места


avatarButton.addEventListener("click", () => {
  avatarPopup.open();
  enableValidation(objectValidation);
});


//подключение валидации
//объект со всеми экземплярами класса для каждой формы 
const formValidatorArray = {};
const enableValidation = (objectValidation) => {
  //собираем и обрабатываем массив форм
  const formList = Array.from(document.querySelectorAll(objectValidation.formSelector));
  formList.forEach((formElement) => {
    //созлаем экземпляр класса FormValidator
    const isValidation = new FormValidator(objectValidation, formElement);
    //в объект под именем формы записываем экземпляр
    const formName = formElement.getAttribute('name');
    formValidatorArray[formName] = isValidation;

    isValidation.enableValidation();
  })
}
enableValidation(objectValidation);

//const popupImg = new PopupWithImage(imgBig);

function createCard(data) {
  const card = new Card({
    data: {data, userId: profileInfo.userId },
    handleCardClick: (name, link) => {
      popupImg.open(name, link);
    },

    handleLikeClick: () => {
      if (card.usersLike()) {
        getApi
        .deleteLike(card.id())
        .then((res) => {
          card.updateLikes(res)
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        getApi
        .setLike(card.id())
        .then((res) => {
          card.updateLikes(res)
        })
        .catch((err) => {
          console.log (err)
        })
      }
    },

    handleDeliteClick: () => {
      getApi
      .then(() => {
        card.deleteCard()
      })
      .catch((err) => {
        console.log (err)
      })
    }
}, '#place-template');
return card.generate();
}
createCard();

const section = new Section ({ renderer: createCard}, placeContainer);

//Получение данных профиля и отрисовка начальных карточек
Promise.all([getApi.getUserInfo(), getApi.getInitialCards()])
  .then(([userData, cards]) => {
    // тут установка данных пользователя
    profileInfo.setUserInfo(userData);
    section.renderEl(cards.reverse());
  })
  .catch((err) => {
    console.log(err);
  })
