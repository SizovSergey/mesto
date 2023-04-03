import Card from '../components/Card.js';


 const createCard = (firstParameter,secondParameter,popupWithImage) =>{  
    const card = new Card({
    name: firstParameter,
    link: secondParameter,
    handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
    }
  }, '#element-template');
  const cardElement = card.generateCard();
  return cardElement;
  }

  export { createCard };


  