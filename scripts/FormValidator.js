export class FormValidator {

  constructor(options, formElement) {
    this._formElement = formElement;
    this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
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

  // Включение или выключение кнопки
  changeSubmitButtonDisableState(buttonElement, isDisabled) {
    if (isDisabled) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled', false);
    }
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this.changeSubmitButtonDisableState(buttonElement, true)
    } else {
      this.changeSubmitButtonDisableState(buttonElement, false)
    }
  };

  // сброс ошибок инпутов и деактивация кнопки сабмита
  resetValidation() {
    this._toggleButtonState(this._inputList, this._submitButton);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }

  //Функция вызывает обработчики событий для инпутов, кнопок
  _setEventListeners() {
    this._toggleButtonState(this._inputList, this._submitButton);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._submitButton);
      });
    });
  };

  //Сама функция валидации
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
};




