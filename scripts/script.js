import { options, initialCards, userPopup, cardPopup, photoPopup, userForm, cardForm, userPopupOpenButton, cardPopupOpenButton, nameInput, jobInput, placeInput, linkInput, elements, profileName, profileJob, photoPopupPicture, photoPopupCaption, formValidators} from '../utils/constans.js';
import  Card  from './Card.js'
import  FormValidator  from './FormValidator.js';
import  Section  from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';

const popupWithImage = new PopupWithImage('#popup_photo');
const userInfo = new UserInfo('.profile__user-name', '.profile__user-info');


const cards = new Section({ items: initialCards,//создание нового экземпляра section,который будет вставлять карточки
  renderer: (item) => {//колбэк где описываем как создавать карточки
  const card = new Card({
    data: item,
    handleCardClick: (name,link) => {
      popupWithImage.open(name,link);
    }
  },
    '#element-template');
        const cardElement = card.generateCard();
        cards.addItem(cardElement);
   }
  },".elements");

  cards.renderItems(); //вставка карточек



  const popupWithUser = new PopupWithForm('#popup_edit-profile', {
    submitFormCallback: (data) => {
      userInfo.setUserInfo(data);
    },
    setInputValues: () => {
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().job;
    }
  });


  //Открыть userPopup
  userPopupOpenButton.addEventListener('click', () => {
    popupWithUser.open();
    formValidators[userForm.getAttribute('id')].resetValidation()
});

const popupWitCard = new PopupWithForm('#popup_add-elements',{
  submitFormCallback: (item) => {
    const insertNewUserCard = new Section({
      data: [item],
      renderer: (item) => {
        const card = new Card({
          data: item,
          handleCardClick: (name,link) => {
            popupWithImage.open(name,link);
          }
        },
          '#element-template');
              const cardElement = card.generateCard();
              insertNewUserCard.addItem(cardElement);
              console.log(cardElement);
         }
        },".elements");
        insertNewUserCard.renderItems();
        popupWitCard.close();
      },
      setInputValues: () =>{
      popupWitCard.close
    }
  }
 )


    cardPopupOpenButton.addEventListener('click',  () => { // слушатель для кнопки добавить Место
      popupWitCard.open();
        formValidators[cardForm.getAttribute('id')].resetValidation()
      });


















// //функция закрытия попапа по клику на кнопку closeBtn
// const clickToCloseButtonToClosePopup = (evt) => {
//   const parent = evt.target.closest(".popup_opened");
//   closePopup(parent);
// };

// const nodeListOfCloseButtons = document.querySelectorAll(".popup__cancel-button"); // получаем Нод лист кнопок закрытия
// nodeListOfCloseButtons.forEach(element => {
//   element.addEventListener("click", clickToCloseButtonToClosePopup);   // прописываем слушатели всем кнопкам закрытия и вызываем функцию закрытия clickToClosePopup
// });

// userPopupOpenButton.addEventListener('click', function () {  // слушатель для кнопки редактирования пользователя
//   openPopup(userPopup);
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
//   formValidators[userForm.getAttribute('id')].resetValidation()
// });

// userForm.addEventListener('submit', function (evt) {  //Сабмит для формы Пользователя
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   closePopup(userPopup);
// });

// cardPopupOpenButton.addEventListener('click', function () { // слушатель для кнопки добавить Место
//   openPopup(cardPopup);
//   cardForm.reset();
//   // validatorFormElement.resetValidation();
//   formValidators[cardForm.getAttribute('id')].resetValidation()
// });

// cardForm.addEventListener('submit', evt => { //submit для создания нового элемента (через попап)
//   evt.preventDefault(); // отмена обновления страницы
//   const addElementPhoto = {  //создаем константу как элемент
//     name: placeInput.value,
//     link: linkInput.value
//   };

//   closePopup(cardPopup); // после создания вызываем функцию закрытия попапа
// });


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



