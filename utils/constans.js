export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const options = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__button_submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};


//Попапы
export const userPopup = document.querySelector('#popup_edit-profile');
export const cardPopup = document.querySelector('#popup_add-elements');
export const photoPopup = document.querySelector("#popup_photo");
//Формы попапов
export const userForm = document.querySelector('#popupForm_edit-profile');
export const cardForm = document.querySelector('#popupForm_add-elements');
//Btn
export const userPopupOpenButton = document.querySelector('.profile__edit-button');
export const cardPopupOpenButton = document.querySelector('.profile__add-button');
// Инпуты
export const nameInput = document.querySelector("input[name='name']");
export const jobInput = document.querySelector("input[name='job']");
export const placeInput = document.querySelector("input[name='place']");
export const linkInput = document.querySelector("input[name='link']");
//Контейнер для карт
export const elements = document.querySelector('.elements');
//Юзер
export const profileName = document.querySelector('.profile__user-name');
export const profileJob = document.querySelector('.profile__user-info');
//Элементы попапа с увеличенной картинкой
export const photoPopupPicture = photoPopup.querySelector('.popup__image');
export const photoPopupCaption = photoPopup.querySelector('.popup__caption');
export const formValidators = {}

