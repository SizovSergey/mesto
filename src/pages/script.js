import { options, initialCards, userForm, cardForm, userPopupOpenButton, cardPopupOpenButton, nameInput, jobInput,  formValidators } from '../utils/constans.js';
import Card from '../scripts/Card.js'
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/Section.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import UserInfo from '../scripts/UserInfo.js';
import './index.css';

//Создаем экземпляр класса PopupWithImage
const popupWithImage = new PopupWithImage('#popup_photo');

//Создаем экземпляр класса UserInfo
const userInfo = new UserInfo('.profile__user-name', '.profile__user-info');

//Создаем экземпляр класса Section,где в функции колбэке render создаем экземпляр класса Card для каждой карточки
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

//вставка карточек
cards.renderItems();

//Создаем экземпляр класса PopupWithForm для редактирования данных пользователя
const popupWithUser = new PopupWithForm('#popup_edit-profile', {
  submitFormCallback: (data) => {
    userInfo.setUserInfo(data);
  }
});

//Создаем экземпляр класса PopupWithForm для формы добавления новых карточек
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
  }
})

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

//слушатель для кнопки редактировать данные пользователя
userPopupOpenButton.addEventListener('click', () => {
  popupWithUser.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  formValidators[userForm.getAttribute('id')].resetValidation()
});

// слушатель для кнопки добавить Место(карточку)
cardPopupOpenButton.addEventListener('click', () => {
  popupWitCard.open();
  formValidators[cardForm.getAttribute('id')].resetValidation()
});
