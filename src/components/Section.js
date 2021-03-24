export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer.bind(this);
        this._container = document.querySelector(containerSelector);
    }

    clear() {
        this._container.innerHTML = '';
      }
    
    renderItems() {
        this.clear();
        this._items.forEach(element => { 
            this._renderer(element);
        });
    }

    addItem(element) {
        this._renderer(element);
    }
}
