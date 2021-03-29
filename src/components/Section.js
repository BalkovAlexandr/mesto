export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer.bind(this);
        this.container = document.querySelector(containerSelector);
    }

    clear() {
        this.container.innerHTML = '';
      }
    
    renderItems() {
        this.clear();
        this._items.forEach(element => { 
            this._renderer(element);
        });
    }

    addCard(card) {
        this.container.prepend(card);
    }

    addItem(element) {
        this._renderer(element);
    }
}
