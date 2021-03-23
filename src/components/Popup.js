export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._handleEscClose = (evt) => {
            if (evt.key === 'Escape') {
                this.close();
        }
    }
        this._handlePopupClick = (evt) => {
            if (evt.target.classList.contains('popup')) {
                this.close();
            } 
        }

        this._handleClose = () => {
            this.close();
        }
    }

    open() {
        this._popup.classList.add('popup_opened');
        this._setEventListeners();
    }

    close() {
        this._popup.classList.remove('popup_opened');
        this._removeEventListeners();
    }

    _setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', this._handlePopupClick);
        this._closeButton.addEventListener('click', this._handleClose);
    }

    _removeEventListeners() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', this._handlePopupClick);
        this._closeButton.addEventListener('click', this._handleClose);
    }
}