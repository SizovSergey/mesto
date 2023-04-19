export default class Card {
  constructor({ name, link, likes,cardId, ownerId, userId, handleCardClick, handleDeleteClick,handlelikeClick }, templateSelector) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._cardId = cardId;
    this.ownerId = ownerId;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handlelikeClick = handlelikeClick;
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
    if (this.ownerId !== this._userId){
      this._cardBtnRemove.style.display = 'none';
    }
    this.setLikes(this._likes);
    return this._card;
  }

  _addlike() {
    this._cardBtnLike.classList.add('element__button-like_active');
  }

  _deletelike() {
    this._cardBtnLike.classList.remove('element__button-like_active'); 
  }

  isLiked() {
    const likedCard = this._likes.find(user => user._id == this._userId)
    return likedCard
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this.likeCountElement = this._card.querySelector('.element__like-count');
    this.likeCountElement.textContent = this._likes.length;
    if (this.isLiked()){
      this._addlike();
     } else {
      this._deletelike();
     }
  }

  removeElement() {
    this._card.remove(); 
    this._card = null;
  }

  _setEventListeners() {
    this._cardBtnLike.addEventListener('click', () => {
      // this._likeElement();
      this._handlelikeClick();
    });
    this._cardBtnRemove.addEventListener('click', () => {
      this._handleDeleteClick(this._cardId);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
