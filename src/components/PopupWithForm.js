import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupInputs = Array.from(this._popupForm.querySelectorAll('.popup__input'));
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popupForm.addEventListener('submit', this._handleFormSubmit);
  }

  _getInputValues() {
       const dataForm = this._popupInputs.map((data) => {
          return data.value;
      });
    return dataForm;
  }

  _setInputValues(value) {
    this._popupInputs.forEach((input, i) => {
      input.value = value[i];
    })
  }

  close() {
    super.close();
    this._popupForm.reset();
    this._popupForm.removeEventListener('submit', this._handleFormSubmit);
  }
}

