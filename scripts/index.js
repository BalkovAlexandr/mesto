import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const validationObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitBtnSelector: '.popup__save-button',
    inactiveBtnClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_state_invalid',
    errorClass: 'error',
  };

const initialCards = [
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

const photoCardTemplate = document.querySelector('.photo-grid');

const sectionProfile = document.querySelector('.profile');
const profileName = sectionProfile.querySelector('.profile__name');
const profileAchievements = sectionProfile.querySelector('.profile__achievements');

const editButton = sectionProfile.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupForm = popupProfileEdit.querySelector('.popup__form');
const popupInputName = popupProfileEdit.querySelector('.popup__input_text_name');
const popupInputAchievements = popupProfileEdit.querySelector('.popup__input_text_achievements');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage= popupTypeImage.querySelector('.popup__image');
const popupImageTitle = popupTypeImage.querySelector('.popup__image-title');

const addCardButton = sectionProfile.querySelector('.profile__add-button');
const popupTypeAddCard = document.querySelector('.popup_type_add');
const popupCardForm = popupTypeAddCard.querySelector('.popup__form');
const popupCardName = popupTypeAddCard.querySelector('.popup__input_card_name');
const popupCardLink = popupTypeAddCard.querySelector('.popup__input_card_link');

function escHandler(evt) {
    if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
    }
};

function popupClickHandler(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    } 
};

function showPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', escHandler);
}

function showPopupImage(name, link) {
    showPopup(popupTypeImage);
    popupImage.src = link;
    popupImage.alt = name.toLowerCase();
    popupImageTitle.textContent = name;
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', escHandler);
}

function popupProfile(evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileAchievements.textContent = popupInputAchievements.value;
    closePopup(popupProfileEdit);
};

popupForm.addEventListener('submit', popupProfile);

popupCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const newCard = {
        name: popupCardName.value,
        link: popupCardLink.value
    };
    photoCardTemplate.prepend(new Card(newCard, '#card', showPopupImage).generateCard());
    closePopup(popupTypeAddCard);
});

editButton.addEventListener('click', function() {
    popupInputName.value = profileName.textContent;
    popupInputAchievements.value = profileAchievements.textContent;
    showPopup(popupProfileEdit);
    validFormPopupProfile.resetValidationState();
});

addCardButton.addEventListener('click', () => { 
    showPopup(popupTypeAddCard)
    popupCardForm.reset();
    validFormPopupAddCard.resetValidationState();
});

Array.from(document.querySelectorAll('.popup__close-button')).forEach(popupClose => {
    popupClose.addEventListener('click', () => closePopup(popupClose.closest('.popup')));
});

Array.from(document.querySelectorAll('.popup')).forEach(popup => {
    popup.addEventListener('mousedown', popupClickHandler);
});

initialCards.forEach(item => {
    const card = new Card(item, '#card', showPopupImage);
    const newCard = card.generateCard();
    document.querySelector('.photo-grid').append(newCard);
});

const validFormPopupProfile = new FormValidator(validationObject, popupProfileEdit);
validFormPopupProfile.enableValidation();

const validFormPopupAddCard = new FormValidator(validationObject, popupTypeAddCard);
validFormPopupAddCard.enableValidation();







