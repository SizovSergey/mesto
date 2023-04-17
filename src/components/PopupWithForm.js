import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitFormCallback}) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  open() {
    super.open();
  }


  _getInputValues() {
    this._inputsValues = {};
    this._inputs.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    });
    return this._inputsValues;
  }

  changeSubmitFormCallback(newSubmitFormCallback) {
    this._submitFormCallback = newSubmitFormCallback;
  }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormCallback(this._getInputValues());
      this.close();
    });

  }

  serButtontext(text) {
    this._form.querySelector('.popup__submit-button').textContent = text;
  }

  close() {
    super.close();
    this._form.reset();
  }
}
