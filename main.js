(()=>{"use strict";function e(e){e.classList.add("popup_opened"),document.addEventListener("click",o),document.addEventListener("keydown",n)}function t(){document.querySelector(".popup_opened").classList.remove("popup_opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t()}function o(e){var n=document.querySelector(".popup_opened"),o=e.composedPath();o.includes(n)&&!o.includes(n.querySelector(".popup__form"))&&t()}var c={baseUrl:"https://nomoreparties.co/v1/plus-cohort-15",headers:{authorization:"65d0f98e-b9df-4c29-9c0d-9c7754189a38","Content-Type":"application/json"}},r=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function a(t,n){var o=document.querySelector("#place-template").content.querySelector(".place").cloneNode(!0),a=o.querySelector(".place__like"),i=o.querySelector(".place__like-count"),u="place__like_active",l=t.owner._id===n;return o.querySelector(".place__title").textContent=t.name,o.querySelector(".place__image").src=t.link,o.querySelector(".place__image").alt=t.name,i.textContent=t.likes.length,n&&t.likes.some((function(e){return e._id===n}))&&a.classList.add(u),a.addEventListener("click",(function(e){var n;a.classList.contains(u)?(n=t._id,fetch("".concat(c.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:c.headers}).then(r)).then((function(e){i.textContent=e.likes.length,a.classList.remove(u)})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(c.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:c.headers}).then(r)}(t._id).then((function(e){i.textContent=e.likes.length,a.classList.add(u)})).catch((function(e){console.log(e)}))})),o.querySelector(".place__image").addEventListener("click",(function(){document.querySelector(".image-big__image").src=t.link,document.querySelector(".image-big__image").alt=t.name,document.querySelector(".image-big__figcaption").textContent=t.name,e(v)})),l?o.querySelector(".place__delete").addEventListener("click",(function(){var e;(e=t._id,fetch("".concat(c.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:c.headers}).then(r)).then((function(){o.closest(".place").remove()})).catch((function(e){console.log(e)}))})):o.querySelector(".place__delete").remove(),o}var i,u=document.querySelector(".avatar"),l=document.querySelector(".popup_newplace"),s=document.querySelector(".profile__title"),d=document.querySelector(".profile__subtitle"),m=document.querySelector(".popup"),p=document.getElementById("username"),f=document.getElementById("description"),v=document.querySelector(".image-big"),_=Array.from(document.querySelectorAll(".popup__close-button")),h=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),S=document.querySelector(".profile__avatar"),b=document.querySelector(".places"),g=document.getElementById("avatar-link"),q=document.querySelector(".profile__img");function E(e){e.preventDefault();var n,o=e.submitter,a=o.textContent;x(!0,o),(n={name:p.value,about:f.value},fetch("".concat(c.baseUrl,"/users/me"),{method:"PATCH",headers:c.headers,body:JSON.stringify(n)}).then(r)).then((function(e){s.textContent=e.name,d.textContent=e.about,t()})).catch((function(e){console.log(e)})).finally((function(){x(!1,o,a)})),m.removeEventListener("submit",E)}function C(e){e.preventDefault();var n,o=e.submitter,a=o.textContent;x(!0,o),(n=g.value,fetch("".concat(c.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:c.headers,body:JSON.stringify({avatar:n})}).then(r)).then((function(e){q.src=e.avatar,t()})).catch((function(e){console.log(e)})).finally((function(){x(!1,o,a)}))}function L(e){e.preventDefault();var n,o=document.querySelector("#place-name"),u=document.querySelector("#image-link"),s=e.submitter,d=s.textContent;x(!0,s),(n={name:o.value,link:u.value},fetch("".concat(c.baseUrl,"/cards"),{method:"POST",headers:c.headers,body:JSON.stringify(n)}).then(r)).then((function(e){var n=a(e,i);k(b,n),t()})).catch((function(e){console.log(e)})).finally((function(){x(!1,s,d)})),e.target.reset(),l.removeEventListener("submit",L)}function k(e,t){e.prepend(t)}function x(e,t,n){t.textContent=e?"Сохранение...":n}!function(e){function t(t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.disabled=!1,n.classList.remove(e.inactiveButtonClass)):(n.disabled=!0,n.classList.add(e.inactiveButtonClass))}Array.from(document.querySelectorAll(e.formSelector)).forEach((function(n){n.addEventListener("submit",(function(e){e.preventDefault()})),function(n){var o=Array.from(n.querySelectorAll(e.inputSelector)),c=n.querySelector(e.submitButtonSelector);t(o,c),o.forEach((function(r){r.addEventListener("input",(function(){(function(t,n){n.validity.patternMismatch?n.setCustomValidity(n.dataset.errorMessage):n.setCustomValidity(""),n.validity.valid?function(t,n){var o=t.querySelector(".".concat(n.id,"-error"));n.classList.remove(e.inputErrorClass),o.classList.remove(e.errorClass),o.textContent=" "}(t,n):function(t,n,o){var c=t.querySelector(".".concat(n.id,"-error"));n.classList.add(e.inputErrorClass),c.textContent=o,c.classList.add(e.errorClass)}(t,n,n.validationMessage)})(n,r),t(o,c)}))}))}(n)}))}({formSelector:".popup__form",inputSelector:".popup__item",submitButtonSelector:".popup__submit-button",inactiveButtonClass:"popup__submit-button_inactive",inputErrorClass:"popup__item_type_error",errorClass:"popup__input-error_active"}),fetch("".concat(c.baseUrl,"/users/me"),{headers:c.headers}).then(r).then((function(e){s.textContent=e.name,d.textContent=e.about,q.src=e.avatar,i=e._id})).catch((function(e){console.log(e)})),fetch("".concat(c.baseUrl,"/cards"),{headers:c.headers}).then(r).then((function(e){e.reverse().forEach((function(e){k(b,a(e,i))}))})).catch((function(e){console.log(e)})),_.forEach((function(e){e.addEventListener("click",(function(e){t()}))})),h.addEventListener("click",(function(){p.value=s.textContent,f.value=d.textContent,e(m),m.addEventListener("submit",E)})),y.addEventListener("click",(function(){e(l),l.addEventListener("submit",L)})),S.addEventListener("click",(function(){e(u),u.addEventListener("submit",C)}))})();