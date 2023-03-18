import { initialCards, options } from './constans.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

//Попапы
const userPopup = document.querySelector('#popup_edit-profile');
const cardPopup = document.querySelector('#popup_add-elements');
const photoPopup = document.querySelector("#popup_photo");
//Формы попапов
const userForm = document.querySelector('#popupForm_edit-profile');
const cardForm = document.querySelector('#popupForm_add-elements');
//Btn
const userPopupOpenButton = document.querySelector('.profile__edit-button');
const cardPopupOpenButton = document.querySelector('.profile__add-button');
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
//Элементы попапа с увеличенной картинкой
const photoPopupPicture = popupPhoto.querySelector('.popup__image');
const photoPopupCaption = popupPhoto.querySelector('.popup__caption');

const formValidators = {}

//закрытие popup по клавиши ESC
const handleEscape = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector(".popup_opened");
    closePopup(popupOpen);
  }
};
//закрытие popup по клику на оверлей
const handleOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};


//Открыть попап
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
  popup.addEventListener('click', handleOverlay);
}

//Открыть попап с увеличенной картинкой
const handleCardClick = (name, link) => {
  popupPicture.src = link;
  popupPicture.alt = name;
  popupCaption.textContent = name;
  openPopup(popupPhoto);
}

//Закрыть попап
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
  popup.removeEventListener('click', handleOverlay);
};

//функция закрытия попапа по клику на кнопку closeBtn
const clickToCloseButtonToClosePopup = (evt) => {
  const parent = evt.target.closest(".popup_opened");
  closePopup(parent);
};

const nodeListOfCloseButtons = document.querySelectorAll(".popup__cancel-button"); // получаем Нод лист кнопок закрытия
nodeListOfCloseButtons.forEach(element => {
  element.addEventListener("click", clickToCloseButtonToClosePopup);   // прописываем слушатели всем кнопкам закрытия и вызываем функцию закрытия clickToClosePopup
});

userPopupOpenButton.addEventListener('click', function () {  // слушатель для кнопки редактирования пользователя
  openPopup(userPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  formValidators[userForm.getAttribute('id')].resetValidation()
});

userForm.addEventListener('submit', function (evt) {  //Сабмит для формы Пользователя
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(userPopup);
});

cardPopupOpenButton.addEventListener('click', function () { // слушатель для кнопки добавить Место
  openPopup(cardPopup);
  cardForm.reset();
  // validatorFormElement.resetValidation();
  formValidators[cardForm.getAttribute('id')].resetValidation()
});

cardForm.addEventListener('submit', evt => { //submit для создания нового элемента (через попап)
  evt.preventDefault(); // отмена обновления страницы
  const addElementPhoto = {  //создаем константу как элемент
    name: placeInput.value,
    link: linkInput.value
  };
  insertCard(createCard(addElementPhoto));
  closePopup(cardPopup); // после создания вызываем функцию закрытия попапа
});

// Создание новой карточки
const createCard = (item) => {
  const newCard = new Card(item, '#element-template', handleCardClick);
  const card = newCard.generateCard();
  return card;
}

// Вставка карточки
const insertCard = (cardItem) => {
  elements.prepend(cardItem);
};

//Рендерим карточки
initialCards.forEach((carditem) => {
  const cardElement = createCard(carditem);
  insertCard(cardElement);
});

// Включение валидации
const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(options, formElement)
    const formid = formElement.getAttribute('id')
    formValidators[formid] = validator;
    validator.enableValidation();
  });
};

enableValidation(options);
