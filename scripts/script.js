const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
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
let addButton = document.querySelector('.profile__add-button');
let saveButton = document.querySelector('.popup__save-button');
const elements = document.querySelector('.elements');
const elTemplate = document.querySelector('#element-template').content;
let placeInput = document.querySelector("input[name='place']");
let linkInput = document.querySelector("input[name='link']");
const popupPhoto = document.querySelector("#popup__photo");
const popupPicture = popupPhoto.querySelector('.popup__image')
const popupCaption = popupPhoto.querySelector('.popup__caption')
const popup = document.querySelector('.popup')



editButton.addEventListener('click', function () {
  popupUser.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});


popupFormUser.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popup);
});


// 5 спринт
// клонирование и создание карточки
const createElements = ({ link, name }) => { //создаем функцию с аргументами link и name
  const element = elTemplate.querySelector('.element').cloneNode(true);//клонируем template 
  const elementImg = element.querySelector('.element__image'); //выбираем картинку элемента
  elementImg.src = link;//присваеваем картинке ссылку из массива элементов
  elementImg.alt = name;//присваеваем картинке alt (name) из массива элементов
  const elementTitle = element.querySelector('.element__title');//выбираем название картинки
  elementTitle.textContent = name; //присваеваем тайтлу элемента название из свойства объекта
  elements.prepend(element); //вставляем элемент

  const placeLike = element.querySelector('.element__button-like'); //выбираем кнопку лайка элемента
  placeLike.addEventListener('click', () => { //добавляем слушателя (при клике на кнопку добавиться или удалится класс) element__button-like_active
    placeLike.classList.toggle('element__button-like_active');
  });

  const placeRemove = document.querySelector('.element__button-remove'); //выбираем кнопку удаления элемента
  placeRemove.addEventListener('click', (evt) => { // вешаем слушатель,при клике выполняетс функция
    evt.target.closest('.element').remove();//находим родителя кнопки и удаляем
  });
  
  elementImg.addEventListener('click', () => openImage(elementImg.src, elementImg.alt, elementTitle.textContent)) //слушатель срабатывает при клике - открывается попап картинки в функцию
                                                                                                                  // openImage как аргумениты передаются ссылка алт и название
}


const addElements = initialCards.forEach((item, link) => { //перебираем массив и выполняем функцию создания карточки для каждого объекта массива
  createElements(item, link);
});


popupFormElement.addEventListener('submit', evt => { //submit для создания нового элемента (через попап)
  evt.preventDefault(); // отмена обновления страницы

  const addElementPhoto = {  //создаем константу как элемент 
    name: placeInput.value,
    link: linkInput.value
  };
  createElements(addElementPhoto); //вызываем функцию создания элемента,как аргумент передаем константу - объект
  closePopup(popup); // после создания вызываем функцию закрытия попапа

  placeInput.value = ''; // присваеваем инпутам в попапе значения по умолчанию
  linkInput.value = '';
});

const openPopupPhoto = () => {
  popupPhoto.classList.add('popup_opened');
};

function openImage(image, alt, caption) { //функция наполнения картинки в попапе для картинки
  openPopupPhoto();
  popupPicture.src = image
  popupPicture.alt = alt
  popupCaption.textContent = caption
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');// функция закрытия попапа  - удаляем класс popup_opened из списка классов 
};

const clickExit = (evt) => {
  togglePopup(evt.target.closest(".popup"));
};

const exit = Array.from(document.querySelectorAll(".popup__cancel-button")).forEach(
  (element) => {
    element.addEventListener("click", clickExit);
  }
);

const togglePopup = (popup) => {
  popup.classList.toggle('popup_opened');
};
