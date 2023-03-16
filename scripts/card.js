const popupPhoto = document.querySelector("#popup_photo");
const popupPicture = popupPhoto.querySelector('.popup__image');
const popupCaption = popupPhoto.querySelector('.popup__caption');
 
 export class Card {
    constructor(data, templateSelector, clickToOpenPopup) {
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._link = data.link;
        this._clickToOpenPopup = clickToOpenPopup;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._card = this._getTemplate();
        this._setEventListeners();
        this._card.querySelector('.element__image').src = this._link;
        this._card.querySelector('.element__image').alt = this._name;
        this._card.querySelector('.element__title').textContent = this._name;
        return this._card;
    }

    _likeElement = () => {
        this._card.querySelector('.element__button-like').classList.toggle('element__button-like_active'); // лайк елементов
    };

    _removeElement = () => {
        this._card.remove(); // удаление элементов
    };

    _openPopupPhoto() { //функция наполнения фото попапа
        popupPicture.src = this._link;
        popupPicture.alt = this._link;
        popupCaption.textContent = this._name;
        this._clickToOpenPopup(popupPhoto);
    };

    _setEventListeners() {
        this._card.querySelector('.element__button-like').addEventListener('click', () => {
            this._likeElement();
        });
        this._card.querySelector('.element__button-remove').addEventListener('click', () => {
            this._removeElement();
        });
        this._card.querySelector('.element__image').addEventListener('click', () => {
            this._openPopupPhoto();
        });
    }
}

