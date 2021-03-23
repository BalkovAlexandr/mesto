export const validationObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitBtnSelector: '.popup__save-button',
    inactiveBtnClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_state_invalid',
    errorClass: 'error',
  };

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const cardsContainer = ('.photo-grid');
export const template = ('.template');
export const profileName = ('.profile__name');
export const profileAchievements = ('.profile__achievements');
export const editButton = document.querySelector('.profile__edit-button');
export const popupTypeProfile = ('.popup_type_edit');
export const popupTypeImage = ('.popup_type_image');
export const popupImage= ('.popup__image');
export const popupImageTitle = ('.popup__image-title');
export const addCardButton = document.querySelector('.profile__add-button');
export const popupTypeAddCard = ('.popup_type_add');
export const profileForm = document.forms.formEdit;
export const newCardForm = document.forms.formAdd;