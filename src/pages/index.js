import { options, userForm, cardForm, userPopupOpenButton, cardPopupOpenButton, nameInput, jobInput, formValidators,userAvatarChangeButton,avatarChangeForm } from '../utils/constans.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { createCard } from '../utils/utils.js';
import { api } from '../components/Api.js';
import './index.css';

let userId;

Promise.all([api.getUserinfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about)
   
    cardsData.forEach(data => {
      const cardElement = createCard(data.name, data.link, data.likes, data._id, userId, data.owner._id, popupWithImage ,confirmPopup);
      cards.addItem(cardElement);
    })
  })

  const popupWithImage = new PopupWithImage('#popup_photo');
  popupWithImage.setEventListeners();

//Создаем экземпляр класса UserInfo
const userInfo = new UserInfo('.profile__user-name', '.profile__user-info');

// //Создаем экземпляр класса Section,где в функции колбэке render создаем экземпляр класса Card для каждой карточки
const cards = new Section({
  items: [],
}, ".elements");

//вставка карточек
cards.renderItems();

//Создаем экземпляр класса PopupWithForm для редактирования данных пользователя
const popupWithUser = new PopupWithForm('#popup_edit-profile', {
  submitFormCallback: (data) => {
    api.editProfile(data.name, data.job)
      .then((res) => {
        userInfo.setUserInfo(res.name, res.about);
      })
  }
});

//вызов setEventListeners для формы для редактирования данных пользователя
popupWithUser.setEventListeners();

//Создаем экземпляр класса PopupWithForm для формы добавления новых карточек
const popupWitCard = new PopupWithForm('#popup_add-elements', {
  submitFormCallback: (item) => {
    api.insertNewCard(item.place, item.link)
      .then(res => {
        const cardElement = createCard(res.name, res.link, res.likes, res._id, userId, res.owner._id, popupWithImage ,confirmPopup);
        cards.addItem(cardElement);
      })
    popupWitCard.close();
  }
});

//вызов setEventListeners для формы добавления новых карточек
popupWitCard.setEventListeners();

const confirmPopup = new PopupWithForm('#popup_type_delete-card', {
  submitFormCallback: () => {
   api.deleteCard(id)
  }
});

confirmPopup.setEventListeners();

const editUserAvatarPopup = new PopupWithForm('#popup_edit-userAvatar', {
  submitFormCallback: () => {
   api.editAvatar(link)
  }
});

editUserAvatarPopup.setEventListeners();

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

userAvatarChangeButton.addEventListener('click', () => {
  editUserAvatarPopup.open();
  formValidators[avatarChangeForm.getAttribute('id')].resetValidation()
});



