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
    this._popupInputs.forEach((input) => values[input.name] = input.value);
    return values; 
  } 
 
  setInputValues(data) {
    this._popupInputs.forEach((input) => {
      if(data[input.name]) {
        input.value = data[input.name]
      }
    });
  }
 
  close() { 
    super.close(); 
    this._popupForm.reset(); 
  } 
} 

