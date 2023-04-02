import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__caption');
    this.setEventListeners();
  }

  open(name, link) {
    super.open();
    this._popupImage.src = link;
    this._popupCaption.textContent = name;
    this._popupImage.alt = name;
  }
}
