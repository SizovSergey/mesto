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
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
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
  _changeSubmitButtonDisableState(isDisabled) {
    if (isDisabled) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled', false);
    }
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._changeSubmitButtonDisableState(true)
    } else {
      this._changeSubmitButtonDisableState(false)
    }
  };

  // сброс ошибок инпутов и деактивация кнопки сабмита
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }

  //Функция вызывает обработчики событий для инпутов, кнопок
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
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




