

export class FormValidator {

  constructor(options, formElement) {
    this._formElement = formElement;
    this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;

  }

  //Функция показывает сообщение об ошибке
  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  //Функция прячет сообщение об ошибке
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  //проверяем есть ли инпуты не прошедшие валидацию
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return (!inputElement.validity.valid || !inputElement.value);
    });
  };

  // Функция показывает/скрывает ошибку у инпута
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //Дефолтное состояние кнопки при открытие
  _setDefaultButtonState(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
  };
  
  // сброс ошибок формы
  setDefaultErrorState() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  //Функция вызывает обработчики событий для инпутов, кнопок
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  //Сама функция валидации
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
      this._setDefaultButtonState(buttonElement);
    });
    this._setEventListeners();
  };
};





// //Функция показывает сообщение об ошибке
// const showInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
//   inputElement.classList.add(inputErrorClass);
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(errorClass);
// };

// //Функция прячет сообщение об ошибке
// const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = '';
// };

// //Скрываем сообщения об ошибке при открытие
// const setDefaultErrorState = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
//   inputList.forEach((inputElement) => {
//     hideInputError(formElement, inputElement, options);
//   });
// };

// // проверяем есть ли инпуты не прошедшие валидацию
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return (!inputElement.validity.valid || !inputElement.value);
//   });
// };

// // Функция показывает/скрывает ошибку у инпута
// const checkInputValidity = (formElement, inputElement, options) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, options);
//   } else {
//     hideInputError(formElement, inputElement, options);
//   }
// };

// //Дефолтное состояние кнопки при открытие
// const setDefaultButtonState = (buttonElement, inactiveButtonClass) => {
//   buttonElement.classList.add(inactiveButtonClass);
// };

// //Функция делает кнопку активной/неактивной, если инпуты прошли/не прошли валидацию
// const toggleButtonState = (inputList, buttonElement, { inactiveButtonClass }) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(inactiveButtonClass);
//   } else {
//     buttonElement.classList.remove(inactiveButtonClass);
//   }
// };

// //Функция вызывает обработчики событий для инпутов, кнопок
// const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...options }) => {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   toggleButtonState(inputList, buttonElement, options);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement, options);
//       toggleButtonState(inputList, buttonElement, options);
//     });
//   });
// };

// //Сама функция валидации
// const enableValidation = ({ formSelector, ...options }) => {
//   const formList = Array.from(document.querySelectorAll(formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//       const buttonElement = formElement.querySelector(options.submitButtonSelector);
//       setDefaultButtonState(buttonElement, options.inactiveButtonClass);
//     });
//     setEventListeners(formElement, options);
//   });
// };

// //Вызов функции enableValidation и передача ей объекта, как аргумента
// enableValidation(options);


