import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitFormCallback}) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitBtn = this._form.querySelector('.popup__submit-button');
  }

  _getInputValues() {
    this._inputsValues = {};
    this._inputs.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    });
    return this._inputsValues;
  }

  setButtontext(text) {
    this._submitBtn.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormCallback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
