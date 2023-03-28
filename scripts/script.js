import { options, initialCards, userPopup, cardPopup, photoPopup, userForm, cardForm, userPopupOpenButton, cardPopupOpenButton, nameInput, jobInput, placeInput, linkInput, elements, profileName, profileJob, photoPopupPicture, photoPopupCaption, formValidators} from '../utils/constans.js';
import  Card  from './Card.js'
import  FormValidator  from './FormValidator.js';
import  Section  from './Section.js';

//Открыть попап с увеличенной картинкой
const handleCardClick = (name, link) => {
  photoPopupPicture.src = link;
  photoPopupPicture.alt = name;
  photoPopupCaption.textContent = name;
  openPopup(photoPopup);
}
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

  closePopup(cardPopup); // после создания вызываем функцию закрытия попапа
});


const cards = new Section({ items: initialCards,
  renderer: (item) => {
  const card = new Card(item, '#element-template', handleCardClick);
        const cardElement = card.generateCard();
        cards.addItem(cardElement);
   }
  },".elements");

  cards.renderItems();

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



