
export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (event.target === this._popup) {
        this.close();
      }
    });
    document.addEventListener('keydown', this._handleEscClose);
  }
}



