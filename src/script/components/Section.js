export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }

  //отрисовка всех элементов
  renderEl(items) {
    items.forEach((item) => this._renderer(item));
  }

  //добавляет DOM элемент в контейнер
  addItem(element) {
    this._selector.prepend(element);
  }
}
