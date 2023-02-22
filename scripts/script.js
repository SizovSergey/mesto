//Попапы
const popupUser = document.querySelector('#popup_edit-profile');
const popupElement = document.querySelector('#popup_add-elements');
const popupPhoto = document.querySelector("#popup_photo");
//Формы попапов
const popupFormUser = document.querySelector('#popupForm_edit-profile');
const popupFormElement = document.querySelector('#popupForm_add-elements');
//Btn
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddElementPopup = document.querySelector('.profile__add-button');
const saveButton = document.querySelector('.popup__save-button');
// Инпуты
const nameInput = document.querySelector("input[name='name']");
const jobInput = document.querySelector("input[name='job']");
const placeInput = document.querySelector("input[name='place']");
const linkInput = document.querySelector("input[name='link']");
//Контейнер для карт
const elements = document.querySelector('.elements');
// Template - жлементы
const elTemplate = document.querySelector('#element-template').content;
//Элементы фото попапа
const popupPicture = popupPhoto.querySelector('.popup__image');
const popupCaption = popupPhoto.querySelector('.popup__caption');
//Юзер 
const profileName = document.querySelector('.profile__user-name');
const profileJob = document.querySelector('.profile__user-info');

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape' ) {
    const popup = document.querySelector('.popup_opened');
    togglePopup(popup);
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

const togglePopup = (popup) => {  
  popup.classList.toggle('popup_opened');
  document.addEventListener('keydown', onEscKeyDown);
};

const clickToClosePopup = (evt) => {    
  const parent = evt.target.closest(".popup_opened");
  togglePopup(parent);
};

const nodeListOfCloseButtons = document.querySelectorAll(".popup__cancel-button"); // получаем Нод лист кнопок закрытия
nodeListOfCloseButtons.forEach(element => {  
    element.addEventListener("click", clickToClosePopup);   // прописываем слушатели всем кнопкам закрытия и вызываем функцию закрытия clickToClosePopup
  });

//  функция клонирование и заполнение элементов
const createElement = (element) => { 
  const clone = elTemplate.querySelector('.element').cloneNode(true);
  const imgClone = clone.querySelector('.element__image');
  const titleClone = clone.querySelector('.element__title');
  const btnLikeClone = clone.querySelector('.element__button-like');
  const btnRemoveClone = clone.querySelector('.element__button-remove');
  imgClone.src = element.link;
  imgClone.alt = element.name;
  titleClone.textContent = element.name;
// слушатели 
  btnLikeClone.addEventListener('click', likeElement);
  btnRemoveClone.addEventListener('click', removeElement);
  imgClone.addEventListener('click', () => openImage(imgClone.src, imgClone.alt, titleClone.textContent));
  return clone;
};

const renderElement = (data) => {
  // Создаем карточку на основе данных
  const element = createElement(data);
  // Помещаем ее в контейнер карточек
  elements.prepend(element);
};

const likeElement = (evt) => {
  evt.target.classList.toggle('element__button-like_active'); // лайк елементов
};

const removeElement = (evt) => {
  evt.target.closest('.element').remove(); // удаление элементов
};

function openImage(src, alt, textContent) { //функция наполнения картинки в попапе для картинки
  togglePopup(popupPhoto);
  popupPicture.src = src;
  popupPicture.alt = alt;
  popupCaption.textContent = textContent;
};

initialCards.forEach(element => renderElement(element)); // перебираем катрочки
buttonOpenEditProfilePopup.addEventListener('click', function () {  // слушатель для кнопки редактирования пользователя
  togglePopup(popupUser);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

popupFormUser.addEventListener('submit', function (evt) {  //Сабмит для формы Пользователя
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popupUser);
});

buttonOpenAddElementPopup.addEventListener('click', function () { // слушатель для кнопки добавить Место
  togglePopup(popupElement);
  popupFormElement.reset();
});

popupFormElement.addEventListener('submit', evt => { //submit для создания нового элемента (через попап)
  evt.preventDefault(); // отмена обновления страницы
  const addElementPhoto = {  //создаем константу как элемент 
    name: placeInput.value,
    link: linkInput.value
  };
  renderElement(addElementPhoto); //вызываем функцию создания элемента,как аргумент передаем константу - объект
  togglePopup(popupElement); // после создания вызываем функцию закрытия попапа
});

