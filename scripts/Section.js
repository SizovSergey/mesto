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


