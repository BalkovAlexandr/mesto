export default class Card {
  constructor({data, handleCardClick, handleTrashClick, handleLikeClick}, cardSelector, userId) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._idOwner = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._picture = this._element.querySelector('.element__pic');
    this._picture.src = this._link;
    this._picture.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');

    if (this._userId !== this._idOwner) {
      this._deleteButton.remove();
    }

    this.currentLikes(this._likes);
    this._setEventListeners();

    return this._element;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _checkLike() {
    return this._likes.some(like => {
      return like._id === this._userId;
    });
  }

  currentLikes(arr) {
    this._element.querySelector('.element__current-likes').textContent = arr.length;
    this._likes = arr;
    if (this._checkLike()) {
      this._likeButton.classList.add('element__like-button_active');
    } else {
      this._likeButton.classList.remove('element__like-button_active');
    }
  }

  _setEventListeners() {
    this._picture.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleTrashClick(this._cardId, this);
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this._checkLike(), this);
    });
  }
}
