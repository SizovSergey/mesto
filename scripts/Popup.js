export default class Popup {
  constructor(popupSelector) {
    this.popup = popupSelector;
  }

  open() {
   this.popup.classList.add('popup_opened');
  }

  close() {
    this.popup.classList.remove('popup_opened');
  }

  _handleEscape() {

  }

  setEventListeners() {

  }
}
