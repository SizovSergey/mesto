class Card {
    constructor(data, templateSelector) {
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._link = data.link;
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

    _openPopupPhoto() { //функция наполнения картинки в попапе для картинки
        popupPicture.src = this._link;
        popupPicture.alt = this._link;
        popupCaption.textContent = this._name;
        clickToOpenPopup(popupPhoto);
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

initialCards.forEach((item) => {
    const cardNew = new Card(item, '#element-template');
    const cardElement = cardNew.generateCard();
    elements.prepend(cardElement);
});