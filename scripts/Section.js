export default class Section {
    constructor({ items, renderer },containerSelector){
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.append(element);
      }

      _close() {
        this._container.innerHTML = '';
      }

    renderItems() {
      this._close()
        this._items.forEach((item) => {
        this._renderer(item)})
      }
}


// // Создание новой карточки
// const createCard = (item) => {
//     const newCard = new Card(item, '#element-template', handleCardClick);
//     const card = newCard.generateCard();
//     return card;
//   }

//   // Вставка карточки
//   const insertCard = (cardItem) => {
//     elements.prepend(cardItem);
//   };

//   //Рендерим карточки
//   initialCards.forEach((carditem) => {
//     const cardElement = createCard(carditem);
//     insertCard(cardElement);
//   });
