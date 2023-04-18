import {options, userForm, cardForm, userPopupOpenButton, cardPopupOpenButton, nameInput, jobInput, formValidators, userAvatarChangeButton, avatarChangeForm } from '../utils/constans.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { createCard } from '../utils/utils.js';
import { api } from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import './index.css';

let userId;

Promise.all([api.getUserinfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about)
    userInfo.setAvatarUser(userData.avatar)
    //Забираем полученные из Api карточки в item класса section
    cards.setItems(cardsData);
    cards.renderItems();
  })
  .catch((err) => console.log(`Загрузка карточек и информации о пользователе невозможна: ${err}`));


const popupWithImage = new PopupWithImage('#popup_photo');

//Создаем экземпляр класса UserInfo
const userInfo = new UserInfo('.profile__user-name', '.profile__user-info', '.profile__avatar');

//Создаем экземпляр класса Section,где в функции колбэке render создаем экземпляр класса Card для каждой карточки
const cards = new Section({
  items: [],
  renderer: (data) => {
    const cardElement = createCard(data.name, data.link, data.likes, data._id, userId, data.owner._id, popupWithImage, confirmPopup);
    cards.addItem(cardElement);
  }
}, ".elements");

//Создаем экземпляр класса PopupWithForm для редактирования данных пользователя
const popupWithUser = new PopupWithForm('#popup_edit-profile', {
  submitFormCallback: (data) => {
    popupWithUser.setButtontext('Сохранение...')
    api.editProfile(data.name, data.job)
      .then((res) => {
        userInfo.setUserInfo(res.name, res.about);
        popupWithUser.close()
      })
      .catch((err) => console.log(`Редактирование информации о пользователе завершилось ошибкой: ${err}`))
      .finally(() => {
        popupWithUser.setButtontext('Сохранить')
      })
  }
});

//Создаем экземпляр класса PopupWithForm для формы добавления новых карточек
const popupWitCard = new PopupWithForm('#popup_add-elements', {
  submitFormCallback: (item) => {
    popupWitCard.setButtontext('Сохранение...');
    api.insertNewCard(item.place, item.link)
      .then(res => {
        const cardElement = createCard(res.name, res.link, res.likes, res._id, userId, res.owner._id, popupWithImage, confirmPopup);
        cards.addItem(cardElement);
        popupWitCard.close()
      })
      .catch((err) => console.log(`Добавление нового места завершилось ошибкой: ${err}`))
      .finally(() => {
        popupWitCard.setButtontext('Создать')
      })
  }
});

const confirmPopup = new PopupWithConfirmation('#popup_type_delete-card', () => {
  api.deleteCard
});

const editUserAvatarPopup = new PopupWithForm('#popup_edit-userAvatar', {
  submitFormCallback: (item) => {
    editUserAvatarPopup.setButtontext('Сохранение...');
    api.editAvatar(item.link)
      .then(res => {
        userInfo.setAvatarUser(res.avatar)
        editUserAvatarPopup.close()
      })
      .catch((err) => console.log(`Смена аватара пользователя завершилась ошибкой: ${err}`))
      .finally(() => {
        popupWitCard.setButtontext('Сохранить')
      })
  }
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

userAvatarChangeButton.addEventListener('click', () => {
  editUserAvatarPopup.open();
  formValidators[avatarChangeForm.getAttribute('id')].resetValidation()
});

popupWithImage.setEventListeners();
popupWithUser.setEventListeners();
popupWitCard.setEventListeners();
confirmPopup.setEventListeners();
editUserAvatarPopup.setEventListeners();

enableValidation(options);

