export const options = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__button_submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

//Формы попапов
export const userForm = document.querySelector('#popupForm_edit-profile');
export const cardForm = document.querySelector('#popupForm_add-elements');
export const avatarChangeForm = document.querySelector('#popupForm_edit-userAvatar');
//Btn
//Btn
export const userPopupOpenButton = document.querySelector('.profile__edit-button');
export const userAvatarChangeButton = document.querySelector('.profile__avatar-change-button');
export const cardPopupOpenButton = document.querySelector('.profile__add-button');
// Инпуты
export const nameInput = userForm.querySelector("input[name='name']");
export const jobInput = userForm.querySelector("input[name='job']");
export const userAvatar = document.querySelector(".profile__avatar");

export const formValidators = {};


