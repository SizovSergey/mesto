import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitFormCallback, setInitiaInputValues }) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._setInitiaInputValues = setInitiaInputValues;
    this.setEventListeners();
  }

  open() {
    super.open();
    this._setInitiaInputValues();
  }


  _getInputValues() {
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    this._inputsValues = {};
    this._inputs.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    });
    return this._inputsValues;
  }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormCallback(this._getInputValues());
      this.close();
    });

  }

  close() {
    super.close();
    this._form.reset();
  }
}
