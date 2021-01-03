export class Card {
    constructor(data, cardSelector, popupImage) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._popupImage = popupImage;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.photo-grid__item')
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const cardImage = this._element.querySelector('.photo-grid__image');
        cardImage.src = this._link;
        cardImage.alt = this._name.toLowerCase();
        this._element.querySelector('.photo-grid__title').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.photo-grid__image').addEventListener('click', () => {
            this._popupImage(this._name, this._link);
        });

        this._element.querySelector('.photo-grid__delete-button').addEventListener('click', () => {
           this._deleteCardHandler(); 
        });

        this._element.querySelector('.photo-grid__like').addEventListener('click', () => {
            this._likeCardHandler();
        });
    }

    _deleteCardHandler() {
        this._element.remove();
    }

    _likeCardHandler() {
        this._element.querySelector('.photo-grid__like').classList.toggle('photo-grid__like_active');
    }
}