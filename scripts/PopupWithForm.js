import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submitFormCallback}) {
      super(popupSelector);
      this._submitFormCallback = submitFormCallback;
      this._formElement = this._popupElement.querySelector('.popup__form');
    }
  
    _getInputValues() {
      const inputList = this._formElement.querySelectorAll('.popup__input');
      const formValues = {};
      inputList.forEach(input => {
        formValues[input.name] = input.value;
      });
      return formValues;
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitFormCallback(this._getInputValues());
      });
    }
  
    close() {
      super.close();
      this._formElement.reset();
    }
  }