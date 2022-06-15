let addButton = document.querySelector(".profile__add-button");
let closePopupButton = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");
function popupToggle() {
  popup.classList.toggle("popup_opened"); // если класса нет - добавляется, если есть - убираем
}
addButton.addEventListener("click", popupToggle);
closePopupButton.addEventListener("click", popupToggle);
