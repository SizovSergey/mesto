import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitFormConfirmation) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this.submitFormConfirmation = submitFormConfirmation
  }

  updateSubmitFormConfirmation(newSubmit) {
    this.submitFormConfirmation = newSubmit;
  }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
        this.submitFormConfirmation();
    });
  }
}
