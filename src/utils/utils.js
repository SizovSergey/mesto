import Card from '../components/Card.js';


const createCard = (name, link, popupWithImage) => {
  const card = new Card({
    name: name,
    link: link,
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    }
  }, '#element-template');
  const cardElement = card.generateCard();
  return cardElement;
}


export { createCard };


