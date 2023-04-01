import { options, initialCards, userForm, cardForm, userPopupOpenButton, cardPopupOpenButton, nameInput, jobInput, placeInput, linkInput, formValidators } from '../utils/constans.js';
import Card from './Card.js'
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';

const popupWithImage = new PopupWithImage('#popup_photo');

const userInfo = new UserInfo('.profile__user-name', '.profile__user-info');


const cards = new Section({
  items: initialCards,//создание нового экземпляра section ,который будет вставлять карточки
  renderer: (item) => {//колбэк где описываем как создавать карточки
    const card = new Card({
      name: item.name,
      link: item.link,
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      }
    },
      '#element-template');
    const cardElement = card.generateCard();
    cards.addItem(cardElement);
  }
}, ".elements");

cards.renderItems(); //вставка карточек

const popupWithUser = new PopupWithForm('#popup_edit-profile', {
  submitFormCallback: (data) => {
    userInfo.setUserInfo(data);
  },
  setInitiaInputValues: () => {
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().job;
  }
});

//Открыть userPopup
userPopupOpenButton.addEventListener('click', () => {
  popupWithUser.open();
  formValidators[userForm.getAttribute('id')].resetValidation()
});

const popupWitCard = new PopupWithForm('#popup_add-elements', {
  submitFormCallback: (item) => {
    const userCard = new Card({
      name: item.place,
      link: item.link,
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      }
    }, '#element-template');
    const cardElement = userCard.generateCard();
    cards.addItem(cardElement);
    popupWitCard.close();
  },
  setInitiaInputValues: () => {

    placeInput.value = '';
    linkInput.value = '';
  }
})

cardPopupOpenButton.addEventListener('click', () => { // слушатель для кнопки добавить Место
  popupWitCard.open();
  formValidators[cardForm.getAttribute('id')].resetValidation()
});

// Включение валидации
const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(options, formElement)
    const formId = formElement.getAttribute('id')
    formValidators[formId] = validator;
    validator.enableValidation();
  });
};

enableValidation(options);



