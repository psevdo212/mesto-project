//import { enableValidation } from "./validate.js";
import { openModalWindow, closeModalWindow } from "./modal.js";
import { createCard } from "./cards.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Api from "./components/Api.js";
import { config, objectValidation } from "./utils/constants.js";
import FormValidator from "./components/FormValidator.js";

const newPlace = document.querySelector(".popup_newplace");
const imgBig = document.querySelector(".image-big");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__avatar");
const placeContainer = document.querySelector(".places"); //контейнер с карточками мест
const avatarLink = document.getElementById("avatar-link");
const name = document.querySelector("#place-name"); //выбор поля с названием
const url = document.querySelector("#image-link"); //поле со ссылкой
let userId;

const getApi = new Api(config); //новый экземпляр класса Api
const userApi = getApi.getUserInfo(); //тут получаем инфу о пользователе
const initCards = getApi.getInitialCards(); //тут получаем изначальный массив карточек
const profileInfo = new UserInfo({
  profileTitle: ".profile__title",
  profileSubtitle: ".profile__subtitle",
  profileImg: ".profile__img",
}); //новый экземпляр класса UserInfo

//включение валидации полей в модальных окнах
// enableValidation({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__item",
//   submitButtonSelector: ".popup__submit-button",
//   inactiveButtonClass: "popup__submit-button_inactive",
//   inputErrorClass: "popup__item_type_error",
//   errorClass: "popup__input-error_active",
// });

//Открытие модалки с большой картинкой классом ВКЛЮЧИТЬ ПОЗЖЕ
// const popupImg = new PopupWithImage ({
//   selector: ".image-big",
// })
export function openImgBig() {
  openModalWindow(imgBig);
}

//открытие окна добавления нового места
function openNewPlace() {
  openModalWindow(newPlace);
}

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

//Получение данных профиля и отрисовка начальных карточек
Promise.all([userApi, initCards])
  .then(([userData, cards]) => {
    // тут установка данных пользователя
    profileInfo.setUserInfo(userData);
    // profileTitle.textContent = userData.name;
    // profileSubtitle.textContent = userData.about;
    // profileImg.src = userData.avatar;
    userId = userData._id;
    // и тут отрисовка карточек
    cards.reverse().forEach((item) => {
      addCard(placeContainer, createCard(item, userId));
    });
  })
  .catch((err) => {
    console.log(err);
  });



// ----- ПОПАП НОВОГО МЕСТА КЛАССОМ ВКЛЮЧИТЬ ПОЗЖЕ  -----

/*const newPlacePopup = new PopupWithForm ({
  selector: ".popup_newplace",
  handleFormSubmit: (formValues) => {
    const name = formValues["place-name"];
    const url = formValues["image-link"];
    newPlacePopup.renderLoading(true);
    getApi
      .postNewCard({name, url})
      .then((res) => {
        // ВОТ ТУТ НАДО МЕТОД ВСТАВКИ
        newPlacePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        newPlacePopup.renderLoading(false);
      });
  }
})*/


function newPlaceSubmitHandler(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const defaultButtonText = submitButton.textContent;
  renderLoading(true, submitButton);
  getApi
    .postNewCard({
      name: name.value,
      link: url.value,
    })
    .then((res) => {
      const card = createCard(res, userId);
      addCard(placeContainer, card);
      evt.target.reset(); //очистка полей формы после отправки
      closeModalWindow();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, defaultButtonText);
    });
}

//Добавление новой карточки
function addCard(сontainer, element) {
  сontainer.prepend(element); //размещение нового элемента в начале списка
}

//Изменение текста кнопки при сохранении
function renderLoading(isLoading, submitButton, defaultButtonText) {
  if (isLoading) {
    submitButton.textContent = "Сохранение...";
  } else {
    submitButton.textContent = defaultButtonText;
  }
}

//слушатель на каждую кнопку закрытия модального окна
// closeButtons.forEach((item) => {
//   item.addEventListener("click", (item) => {
//      closeModalWindow();
//    });
//  });

//слушатель на открытие окна редактирования профиля
editButton.addEventListener("click", () => {
  const { name, about } = profileInfo.getUserInfo();
  userEditPopup.setInputValues({ username: name, description: about });
  enableValidation(objectValidation);
  userEditPopup.open();
});

addButton.addEventListener("click", openNewPlace); //слушатель на добавление нового места

//avatarButton.addEventListener("click", openAvatarPopup);
avatarButton.addEventListener("click", () => {
  openAvatarPopup ();
  enableValidation(objectValidation);
});
newPlace.addEventListener("submit", newPlaceSubmitHandler);
//editPopup.addEventListener("submit", editFormSubmitHandler);
avatar.addEventListener("submit", avatarSubmitHandler);

//подключение валидации
//объект со всеми экземплярами класса для каждой формы 
const formValidatorArray = {};
const enableValidation = (objectValidation) => {
  console.log ('а тут все норм');
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

newPlace.addEventListener("submit", newPlaceSubmitHandler);

