export default class Card {
  constructor({ name, link, ownerId, userId, like, cardId, handleCardClick }, templateSelector) {
    this._name = name;
    this._link = link;
    this.ownerId = ownerId;
    this.userId = userId;
    this.like = like;
    this.cardId = cardId;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
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
    this._cardImage = this._card.querySelector('.element__image');
    this._cardTitle = this._card.querySelector('.element__title');
    this._cardBtnLike = this._card.querySelector('.element__button-like');
    this._cardBtnRemove = this._card.querySelector('.element__button-remove');
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    if (this.ownerId !== this.userId){
      this._cardBtnRemove.style.display = 'none';
    }
    return this._card;
  }

  _likeElement() {
    this._cardBtnLike.classList.toggle('element__button-like_active'); // лайк елементов
  }

  _removeElement() {
    this._card.remove(); // удаление элементов
    this._card = null;
  }

  _setEventListeners() {
    this._cardBtnLike.addEventListener('click', () => {
      this._likeElement();
    });
    this._cardBtnRemove.addEventListener('click', () => {
      this._removeElement();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
