"use strict";

//МОДАЛЬНЫЕ ОКНА
export function openModalWindow(modalWindow) {
  //открытие модалки
  modalWindow.classList.add("popup_opened");
  document.addEventListener("click", closeOnOverlay);
  document.addEventListener("keydown", closeOnEscape);
}

export function closeModalWindow() {
  //закрытие модалки
  document.querySelector(".popup_opened").classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEscape);
}

//слушатель закрытия по ESC
function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    closeModalWindow();
  }
}

//закрытие по клику на оверлей
function closeOnOverlay(evt) {
  const modal = document.querySelector(".popup_opened");
  const composedPath = evt.composedPath();
  const overlayClick =
    composedPath.includes(modal) &&
    !composedPath.includes(modal.querySelector(".popup__form"));
  if (overlayClick) {
    closeModalWindow();
  }
}
