import Popup from './Popup.js'; 
 
export default class PopupWithForm extends Popup { 
  constructor(popupSelector, { handleFormSubmit }) { 
    super(popupSelector); 
    this._handleFormSubmit = handleFormSubmit; 
    this._popupForm = this._popup.querySelector('.popup__form'); 
    this._popupInputs = Array.from(this._popupForm.querySelectorAll('.popup__input')); 
  } 
 
  setEventListeners() { 
    super.setEventListeners(); 
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this._handleFormSubmit(values);
    });
  } 
 
  _getInputValues() {
    const values = {};
    this._popupInputs.forEach((field) => values[field.name] = field.value);
    return values; 
  } 
 
  setInputValues(data) {
    this._popupInputs.forEach(field => {
      if(data[field.name]) {
        field.value = data[field.name]
      }
    });
  }
 
  close() { 
    super.close(); 
    this._popupForm.reset(); 
    this._popupForm.removeEventListener('submit', this._handleFormSubmit); 
  } 
} 

