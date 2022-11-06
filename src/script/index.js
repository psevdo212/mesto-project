import UserInfo from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Api from "./components/Api.js";
import { config, objectValidation, addButton } from "./utils/constants.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import Card from "./components/Card.js";
const editButton = document.querySelector(".profile__edit-button");
const avatarButton = document.querySelector(".profile__avatar");
const getApi = new Api(config); //новый экземпляр класса Api
const popupImg = new PopupWithImage(".image-big");
const profileInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileSubtitle: ".profile__subtitle",
  profileImg: ".profile__img",
}); //новый экземпляр класса UserInfo
let userId = null;

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
const newPlacePopup = new PopupWithForm({
  selector: ".popup_newplace",
  handleFormSubmit: (formValues) => {
    const name = formValues["place-name"];
    const link = formValues["image-link"];
    newPlacePopup.renderLoading(true);
    getApi
      .postNewCard({ name, link })
      .then((res) => {
        initialCards.addItem(createCard(res));
        newPlacePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        newPlacePopup.renderLoading(false);
      });
  },
});

//слушатели
editButton.addEventListener("click", () => {
  const { name, about } = profileInfo.getUserInfo();
  userEditPopup.setInputValues({ username: name, description: about });
  formValidatorArray["profile-edit"].resetValid();
  userEditPopup.open();
});

addButton.addEventListener("click", () => {
  formValidatorArray["place-add"].resetValid();
  newPlacePopup.open();
});

avatarButton.addEventListener("click", () => {
  formValidatorArray["avatar"].resetValid();
  avatarPopup.open();
});

//подключение валидации
const formValidatorArray = {};
const enableValidation = (objectValidation) => {
  const formList = Array.from(
    document.querySelectorAll(objectValidation.formSelector)
  );
  formList.forEach((formElement) => {
    //созлаем экземпляр класса FormValidator
    const isValidation = new FormValidator(objectValidation, formElement);
    //в объект под именем формы записываем экземпляр
    const formName = formElement.getAttribute("name");
    formValidatorArray[formName] = isValidation;

    isValidation.enableValidation();
  });
};
enableValidation(objectValidation);

const createCard = (data) => {
  const card = new Card(
    {
      data: data,
      handleCardClick: () => {
        popupImg.open(data);
      },

      handleLikeClick: () => {
        if(!card.isLiked()) {
          getApi
          .deleteLike(data._id)
          .then((res) => {
            card.addLIke(res);
          })
          .catch((res) => {
            console.log (res)
          })
        } else {
          getApi
          .setLike(data._id)
          .then((res) => {
            card.addLIke(res);
          })
          .catch((res) => {
            console.log (res)
          })
        }
      },

      handleDeliteClick: () => {
        getApi
          .deleteCard(data._id)
          .then(() => {
            card.deleteCard();
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    "#place-template",
    getApi,
    userId
  );
  return card.generate();
};

const initialCards = new Section(
  {
    renderer: (data) => {
      initialCards.addItem(createCard(data));
    },
  },
  ".places"
);

//Получение данных профиля и отрисовка начальных карточек
Promise.all([getApi.getUserInfo(), getApi.getInitialCards()])
  .then(([userData, cards]) => {
    // тут установка данных пользователя
    userId = userData._id;
    profileInfo.setUserInfo(userData);
    initialCards.renderEl(cards);
  })
  .catch((err) => {
    console.log(err);
  });
