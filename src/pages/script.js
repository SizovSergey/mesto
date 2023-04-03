import { options, initialCards, userForm, cardForm, userPopupOpenButton, cardPopupOpenButton, nameInput, jobInput,  formValidators } from '../utils/constans.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { createCard } from'../utils/utils.js';
import './index.css';

// Создаем экземпляр класса PopupWithImage
const popupWithImage = new PopupWithImage('#popup_photo');
popupWithImage.setEventListeners();

//Создаем экземпляр класса UserInfo
const userInfo = new UserInfo('.profile__user-name', '.profile__user-info');

//Создаем экземпляр класса Section,где в функции колбэке render создаем экземпляр класса Card для каждой карточки
const cards = new Section({
  items: initialCards,//создание нового экземпляра section ,который будет вставлять карточки
  renderer: (item) => {//колбэк где описываем как создавать карточки
    const cardElement = createCard(item.name,item.link,popupWithImage);
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

//вызов setEventListeners для формы для редактирования данных пользователя
popupWithUser.setEventListeners();

//Создаем экземпляр класса PopupWithForm для формы добавления новых карточек
const popupWitCard = new PopupWithForm('#popup_add-elements', {
  submitFormCallback: (item) => {
    const cardElement = createCard(item.place,item.link,popupWithImage);
    cards.addItem(cardElement);
    popupWitCard.close();
  }
});

//вызов setEventListeners для формы добавления новых карточек
popupWitCard.setEventListeners();

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


