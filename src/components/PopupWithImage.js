import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector, image, title, imageSelector, titleSelector) {
    super(popupSelector);
    this._image = image;
    this._title = title;
    this._imageSelector = imageSelector;
    this._titleSelector = titleSelector;
  }

  open() {
    super.open();
    const popupImage = this._popup.querySelector(this._imageSelector);
    const popupTitle = this._popup.querySelector(this._titleSelector);
    popupImage.src = this._image;
    popupImage.alt = this._title;
    popupTitle.textContent = this._title;
    }
  }