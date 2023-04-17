import Card from '../components/Card.js';
import { api } from '../components/Api.js';



const createCard = (name, link, likes, _id, userId, ownerId, popupWithImage, confirmPopup) => {
  console.log(likes)
  const card = new Card({
    name: name,
    link: link,
    likes: likes,
    cardId: _id,
    userId: userId,
    ownerId: ownerId,
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleDeleteClick: (_id) => {
      confirmPopup.open()
      confirmPopup.changeSubmitFormCallback(() => {
        api.deleteCard(_id)
          .then(res => {
            card.removeElement();
            confirmPopup.close();
          })
      })
    },
    handlelikeClick: () => {
     if(card.isLiked()){
     api.deleteCardLike(_id)
        .then(res => {
          card.setLikes(res.likes)
        })
      } else {
      api.addCardLike(_id)
        .then(res => {
          card.setLikes(res.likes)
        })
      }
    }
  }, '#element-template');
  const cardElement = card.generateCard();
  return cardElement;
}


export { createCard };


