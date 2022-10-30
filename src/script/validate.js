// export function enableValidation(setting) {
//   const formList = Array.from(document.querySelectorAll(setting.formSelector));
//   //перебираем коллекцию форм
//   formList.forEach((formElement) => {
//     setEventListeners(formElement, setting);
//   });
// }

// //поиск всех полей формы
// const setEventListeners = (formElement, setting) => {
//   const inputList = Array.from(
//     formElement.querySelectorAll(setting.inputSelector)
//   );
//   const buttonElement = formElement.querySelector(setting.submitButtonSelector);
//   toggleButtonState(inputList, buttonElement, setting);
//   formElement.addEventListener("reset", () => {
//     setTimeout(() => {
//       toggleButtonState(inputList, buttonElement, setting);
//     }, 0);
//   });
//   inputList.forEach((element) => {
//     element.addEventListener("input", function () {
//       isValid(formElement, element, setting);
//       toggleButtonState(inputList, buttonElement, setting);
//     });
//   });
// };

// //функция которая проверяет валидность поля
// const isValid = (formElement, element, setting) => {
//   if (!element.validity.valid) {
//     showInputError(formElement, element, element.validationMessage, setting);
//   } else {
//     hideInputError(formElement, element, setting);
//   }
// };

// //функция добавления обшибки
// const showInputError = (formElement, element, errorMessage, setting) => {
//   const errorElement = formElement.querySelector(`.${element.id}-error`);
//   element.classList.add(setting.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(setting.errorClass);
// };

// //функция скрытия ошибки
// const hideInputError = (formElement, element, setting) => {
//   const errorElement = formElement.querySelector(`.${element.id}-error`);
//   element.classList.remove(setting.inputErrorClass);
//   errorElement.classList.remove(setting.errorClass);
//   errorElement.textContent = "";
// };

// //стилизация кнопки (активна-нет)
// function toggleButtonState(inputList, buttonElement, setting) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.disabled = true;
//     buttonElement.classList.add(setting.inactiveButtonClass);
//   } else {
//     buttonElement.disabled = false;
//     buttonElement.classList.remove(setting.inactiveButtonClass);
//   }
// }

// //вернет true если хотя бы одно поле невалидно
// function hasInvalidInput(inputList) {
//   return inputList.some((element) => {
//     return !element.validity.valid;
//   });
// }
