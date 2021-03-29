export default class Card {
    constructor(title, image, cardSelector, { handleCardClick }) {
        this._title = title;
        this._image = image;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
        const cardImage = this._element.querySelector('.photo-grid__image');
        cardImage.src = this._image;
        cardImage.alt = this._title;
        this._element.querySelector('.photo-grid__title').textContent = this._title;
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.photo-grid__image').addEventListener('click', () => {
            this._handleCardClick(this._image, this._title);
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

