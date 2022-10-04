(()=>{"use strict";function e(e){e.classList.add("popup_opened"),document.addEventListener("click",r),document.addEventListener("keydown",n)}function t(){var e=document.querySelector(".popup_opened");e&&(e.classList.remove("popup_opened"),document.removeEventListener("keydown",n),document.removeEventListener("click",r))}function n(e){"Escape"===e.key&&t()}function r(e){e.target.classList.contains("popup_opened")&&t()}var o={baseUrl:"https://nomoreparties.co/v1/plus-cohort-15",headers:{authorization:"65d0f98e-b9df-4c29-9c0d-9c7754189a38","Content-Type":"application/json"}},c=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function a(e,t){return fetch(e,t).then(c)}function i(t,n){var r=document.querySelector("#place-template").content.querySelector(".place").cloneNode(!0),c=r.querySelector(".place__title"),i=r.querySelector(".place__like"),u=r.querySelector(".place__like-count"),l=r.querySelector(".place__image"),s=r.querySelector(".place__delete"),d=document.querySelector(".image-big__image"),m=document.querySelector(".image-big__figcaption"),f="place__like_active",p=t.owner._id===n;return c.textContent=t.name,l.src=t.link,l.alt=t.name,u.textContent=t.likes.length,n&&t.likes.some((function(e){return e._id===n}))&&i.classList.add(f),i.addEventListener("click",(function(e){var n;i.classList.contains(f)?(n=t._id,a("".concat(o.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:o.headers})).then((function(e){u.textContent=e.likes.length,i.classList.remove(f)})).catch((function(e){console.log(e)})):function(e){return a("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:o.headers})}(t._id).then((function(e){u.textContent=e.likes.length,i.classList.add(f)})).catch((function(e){console.log(e)}))})),l.addEventListener("click",(function(){d.src=t.link,d.alt=t.name,m.textContent=t.name,e(h)})),p?s.addEventListener("click",(function(){var e;(e=t._id,a("".concat(o.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:o.headers})).then((function(){r.closest(".place").remove()})).catch((function(e){console.log(e)}))})):s.remove(),r}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var l,s=document.querySelector(".avatar"),d=document.querySelector(".popup_newplace"),m=document.querySelector(".profile__title"),f=document.querySelector(".profile__subtitle"),p=document.querySelector(".popup_edit"),v=document.getElementById("username"),y=document.getElementById("description"),h=document.querySelector(".image-big"),_=Array.from(document.querySelectorAll(".popup__close-button")),b=document.querySelector(".profile__edit-button"),S=document.querySelector(".profile__add-button"),g=document.querySelector(".profile__avatar"),E=document.querySelector(".places"),L=document.getElementById("avatar-link"),C=document.querySelector(".profile__img"),q=document.querySelector("#place-name"),k=document.querySelector("#image-link");function x(e,t){e.prepend(t)}function A(e,t,n){t.textContent=e?"Сохранение...":n}!function(e){function t(t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.disabled=!1,n.classList.remove(e.inactiveButtonClass)):(n.disabled=!0,n.classList.add(e.inactiveButtonClass))}Array.from(document.querySelectorAll(e.formSelector)).forEach((function(n){n.addEventListener("submit",(function(e){e.preventDefault()})),function(n){var r=Array.from(n.querySelectorAll(e.inputSelector)),o=n.querySelector(e.submitButtonSelector);t(r,o),r.forEach((function(c){n.addEventListener("reset",(function(){setTimeout((function(){t(r,o)}),0)})),c.addEventListener("input",(function(){(function(t,n){n.validity.patternMismatch?n.setCustomValidity(n.dataset.errorMessage):n.setCustomValidity(""),n.validity.valid?function(t,n){var r=t.querySelector(".".concat(n.id,"-error"));n.classList.remove(e.inputErrorClass),r.classList.remove(e.errorClass),r.textContent=" "}(t,n):function(t,n,r){var o=t.querySelector(".".concat(n.id,"-error"));n.classList.add(e.inputErrorClass),o.textContent=r,o.classList.add(e.errorClass)}(t,n,n.validationMessage)})(n,c),t(r,o)}))}))}(n)}))}({formSelector:".popup__form",inputSelector:".popup__item",submitButtonSelector:".popup__submit-button",inactiveButtonClass:"popup__submit-button_inactive",inputErrorClass:"popup__item_type_error",errorClass:"popup__input-error_active"}),Promise.all([a("".concat(o.baseUrl,"/users/me"),{headers:o.headers}),a("".concat(o.baseUrl,"/cards"),{headers:o.headers})]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c=[],a=!0,i=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);a=!0);}catch(e){i=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(i)throw o}}return c}}(t,n)||function(e,t){if(e){if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];m.textContent=o.name,f.textContent=o.about,C.src=o.avatar,l=o._id,c.reverse().forEach((function(e){x(E,i(e,l))}))})).catch((function(e){console.log(e)})),_.forEach((function(e){e.addEventListener("click",(function(e){t()}))})),b.addEventListener("click",(function(){v.value=m.textContent,y.value=f.textContent,e(p)})),S.addEventListener("click",(function(){e(d)})),g.addEventListener("click",(function(){e(s)})),d.addEventListener("submit",(function e(n){n.preventDefault();var r,c=n.submitter,u=c.textContent;A(!0,c),(r={name:q.value,link:k.value},a("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify(r)})).then((function(e){var r=i(e,l);x(E,r),n.target.reset(),t()})).catch((function(e){console.log(e)})).finally((function(){A(!1,c,u)})),d.removeEventListener("submit",e)})),p.addEventListener("submit",(function(e){e.preventDefault();var n,r=e.submitter,c=r.textContent;A(!0,r),(n={name:v.value,about:y.value},a("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify(n)})).then((function(n){m.textContent=n.name,f.textContent=n.about,e.target.reset(),t()})).catch((function(e){console.log(e)})).finally((function(){A(!1,r,c)}))})),s.addEventListener("submit",(function(e){e.preventDefault();var n,r=e.submitter,c=r.textContent;A(!0,r),(n=L.value,a("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:n})})).then((function(n){C.src=n.avatar,e.target.reset(),t()})).catch((function(e){console.log(e)})).finally((function(){A(!1,r,c)}))}))})();