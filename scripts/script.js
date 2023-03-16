import  { initialCards, options } from './constans.js';
import { Card } from './card.js';
import { FormValidator } from './validate.js';

//Попапы
const popupUser = document.querySelector('#popup_edit-profile');
const popupElement = document.querySelector('#popup_add-elements');
//Формы попапов
const popupFormUser = document.querySelector('#popupForm_edit-profile');
const popupFormElement = document.querySelector('#popupForm_add-elements');
//Btn
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddElementPopup = document.querySelector('.profile__add-button');
// Инпуты
const nameInput = document.querySelector("input[name='name']");
const jobInput = document.querySelector("input[name='job']");
const placeInput = document.querySelector("input[name='place']");
const linkInput = document.querySelector("input[name='link']");
//Контейнер для карт
const elements = document.querySelector('.elements');
//Юзер
const profileName = document.querySelector('.profile__user-name');
const profileJob = document.querySelector('.profile__user-info');


//закрытие popup по клавиши ESC
const onEscKeyForClosePopup = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector(".popup_opened");
    clickToClosePopup(popupOpen);
  }
};
//закрытие popup по клику на оверлей
const onClickForClosePopup = (evt) => {
  if (evt.target === evt.currentTarget) {
    const popupOpen = document.querySelector(".popup_opened");
    clickToClosePopup(popupOpen);
  }
};

//Открыть попап
const clickToOpenPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', onEscKeyForClosePopup);
  popup.addEventListener('click', onClickForClosePopup);
};

//Закрыть попап
const clickToClosePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', onEscKeyForClosePopup);
  popup.removeEventListener('click', onClickForClosePopup);
};

//функция закрытия попапа по клику на кнопку closeBtn
const clickToCloseButtonToClosePopup = (evt) => {
  const parent = evt.target.closest(".popup_opened");
  clickToClosePopup(parent);
};


const nodeListOfCloseButtons = document.querySelectorAll(".popup__cancel-button"); // получаем Нод лист кнопок закрытия
nodeListOfCloseButtons.forEach(element => {
  element.addEventListener("click", clickToCloseButtonToClosePopup);   // прописываем слушатели всем кнопкам закрытия и вызываем функцию закрытия clickToClosePopup
});

buttonOpenEditProfilePopup.addEventListener('click', function () {  // слушатель для кнопки редактирования пользователя
  clickToOpenPopup(popupUser);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  validatorFormUser.setDefaultErrorState();
});

popupFormUser.addEventListener('submit', function (evt) {  //Сабмит для формы Пользователя
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  clickToClosePopup(popupUser);

});

buttonOpenAddElementPopup.addEventListener('click', function () { // слушатель для кнопки добавить Место
  clickToOpenPopup(popupElement);
  popupFormElement.reset();
  validatorFormElement.setDefaultErrorState();
});

popupFormElement.addEventListener('submit', evt => { //submit для создания нового элемента (через попап)
  evt.preventDefault(); // отмена обновления страницы
  const addElementPhoto = {  //создаем константу как элемент
    name: placeInput.value,
    link: linkInput.value
  };
  const newElement = new Card(addElementPhoto, '#element-template', clickToOpenPopup);
  const newcardElement = newElement.generateCard();
  elements.prepend(newcardElement); //вызываем функцию создания элемента,как аргумент передаем константу - объект
  clickToClosePopup(popupElement); // после создания вызываем функцию закрытия попапа
});

// Вставляем карточки в разметку

initialCards.forEach((item) => {
  const cardNew = new Card(item, '#element-template', clickToOpenPopup);
  const cardElement = cardNew.generateCard();
  elements.prepend(cardElement);
});


// document.querySelectorAll('.popup__form').forEach((formItem) => {
//   const validator = new FormValidator(options, formItem);
//   console.log(validator)
//   validator.enableValidation();
// });

// Вставляем валидацию для форм

const validatorFormUser = new FormValidator(options, popupFormUser);
validatorFormUser.enableValidation();
const validatorFormElement = new FormValidator(options, popupFormElement);
validatorFormElement.enableValidation();
