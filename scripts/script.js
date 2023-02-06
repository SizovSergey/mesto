const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
  }
];
let profileName = document.querySelector('.profile__user-name');
let profileJob = document.querySelector('.profile__user-info');
let editButton = document.querySelector('.profile__edit-button');
let popupUser = document.querySelector('#popup__user');
let popupElement = document.querySelector('#popup__element');
let popupFormUser = document.querySelector('#popupForm__user');
let popupFormElement = document.querySelector('#popupForm__element');
let nameInput = document.querySelector("input[name='name']");
let jobInput = document.querySelector("input[name='job']");
let elementTitle = document.querySelector("#element__title");
let closeButtonUser = document.querySelector('#close__buttonForUser');
let closeButtonElement = document.querySelector('#close__buttonForEl');
let addButton = document.querySelector('.profile__add-button');
let saveButton = document.querySelector('.popup__save-button');
const elements = document.querySelector('.elements');
const elTemplate = document.querySelector('#element-template').content;
let placeInput = document.querySelector("input[name='place']");
let linkInput = document.querySelector("input[name='link']");



editButton.addEventListener('click', function () {
  popupUser.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

function ClosePopupUser() {
  popupUser.classList.remove('popup_opened');
}

closeButtonUser.addEventListener('click', ClosePopupUser);

popupFormUser.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  ClosePopupUser();
});


// 2 спринт
const createElements = ({link, name}) => {
  const element = elTemplate
    .querySelector('.element')
    .cloneNode(true);
  element.querySelector('.element__image').src = link;
  element.querySelector('.element__image').alt = name;
  element.querySelector('.element__title').textContent = name;
  elements.prepend(element);
  const placeLike = element.querySelector('.element__button-like');
  placeLike.addEventListener('click', (evt) => {
    placeLike.classList.toggle('element__button-like_active')
  });
//   const placeRemoveButton = element.querySelector('.element__button-remove').closest(elements);
//   placeRemoveButton.addEventListener('click', () => {
//   element.remove();  
// });
}

const addElements = initialCards.forEach((item, link) => {
  createElements(item, link);
});

addButton.addEventListener('click', function () {
  popupElement.classList.add('popup_opened');
});

function ClosePopupEl() {
  popupElement.classList.remove('popup_opened');
}

closeButtonElement.addEventListener('click', ClosePopupEl);

popupFormElement.addEventListener('submit', evt => {
  evt.preventDefault();
  const addElementPhoto = {
  name: placeInput.value ,
  link: linkInput.value
};
  createElements(addElementPhoto);
  ClosePopupEl();
  placeInput.value = '';
  linkInput.value = '';
});
