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
// Инпуты
const nameInput = document.querySelector("input[name='name']");
const jobInput = document.querySelector("input[name='job']");
const placeInput = document.querySelector("input[name='place']");
const linkInput = document.querySelector("input[name='link']");
//Контейнер для карт
const elements = document.querySelector('.elements');
// Template - элементы
const elTemplate = document.querySelector('#element-template').content;
//Элементы фото попапа
const popupPicture = popupPhoto.querySelector('.popup__image');
const popupCaption = popupPhoto.querySelector('.popup__caption');
//Юзер
const profileName = document.querySelector('.profile__user-name');
const profileJob = document.querySelector('.profile__user-info');

//закрытие popup по клавиши ESC
const onEscKeyForClosePopup = (evt) => {
  const popup = document.querySelector(".popup_opened");
  if (evt.key === 'Escape') {
    clickToClosePopup(popup);
  }
};
//закрытие popup по клику на оверлей
const onClickForClosePopup = (evt) => {
  const popup = document.querySelector(".popup_opened");
  if (evt.target === evt.currentTarget) {
    clickToClosePopup(popup);
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
  popup.removeEventListener('click',  onClickForClosePopup);
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
  clickToOpenPopup(popupPhoto);
  popupPicture.src = src;
  popupPicture.alt = alt;
  popupCaption.textContent = textContent;
};

initialCards.forEach(element => renderElement(element)); // перебираем катрочки

buttonOpenEditProfilePopup.addEventListener('click', function () {  // слушатель для кнопки редактирования пользователя
  clickToOpenPopup(popupUser);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  setDefaultErrorState(popupFormUser);
});

popupFormUser.addEventListener('submit', function (evt) {  //Сабмит для формы Пользователя
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  clickToClosePopup(popupUser);
});

//Дефолтное состояние кнопки при открытие
const setDefStateSubmitBtn = () => {
  const buttonElement = popupElement.querySelector('.popup__submit-button');
  buttonElement.classList.add('popup__button_submit_disabled');
};

//Скрываем сообщения об ошибке при открытие
const setDefaultErrorState = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, { inputErrorClass: 'popup__input_type_error', errorClass: 'popup__input-error_visible' });
  });
};

buttonOpenAddElementPopup.addEventListener('click', function () { // слушатель для кнопки добавить Место
  clickToOpenPopup(popupElement);
  popupFormElement.reset();
  setDefStateSubmitBtn();
  setDefaultErrorState(popupFormElement);
});

popupFormElement.addEventListener('submit', evt => { //submit для создания нового элемента (через попап)
  evt.preventDefault(); // отмена обновления страницы
  const addElementPhoto = {  //создаем константу как элемент
    name: placeInput.value,
    link: linkInput.value
  };
  renderElement(addElementPhoto); //вызываем функцию создания элемента,как аргумент передаем константу - объект
  clickToClosePopup(popupElement); // после создания вызываем функцию закрытия попапа
});

