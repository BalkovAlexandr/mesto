const photoCardTemplate = document.querySelector('.photo-grid');

const sectionProfile = document.querySelector('.profile');
const editButton = sectionProfile.querySelector('.profile__edit-button');
const profileName = sectionProfile.querySelector('.profile__name');
const profileAchievements = sectionProfile.querySelector('.profile__achievements');
const addCardButton = sectionProfile.querySelector('.profile__add-button');

const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupForm = popupProfileEdit.querySelector('.popup__form');
const popupInputName = popupProfileEdit.querySelector('.popup__input_text_name');
const popupInputAchievements = popupProfileEdit.querySelector('.popup__input_text_achievements');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage= popupTypeImage.querySelector('.popup__image');
const popupImageTitle = popupTypeImage.querySelector('.popup__image-title');

const popupTypeAddCard = document.querySelector('.popup_type_add');
const popupCardForm = popupTypeAddCard.querySelector('.popup__form');
const popupCardName = popupTypeAddCard.querySelector('.popup__input_card_name');
const popupCardLink = popupTypeAddCard.querySelector('.popup__input_card_link');

function addPhotoCard(photo) {
    const cardElement = document.querySelector('.photo-template').content.cloneNode(true);
    const cardImage = cardElement.querySelector('.photo-grid__image');
    const cardTitle = cardElement.querySelector('.photo-grid__title');
    cardImage.src = photo.link;
    cardTitle.textContent = photo.name;
    cardElement.querySelector('.photo-grid__image').alt = photo.name.toLowerCase();

    cardImage.addEventListener('click', function() {
        popupImageTitle.textContent = photo.name;
        popupImage.src = cardImage.src;
        popupImage.alt = cardImage.alt;
        showPopup(popupTypeImage);
    });
    
    cardElement.querySelector('.photo-grid__delete-button').addEventListener('click', event => {
        const gridItem = event.target.closest('.photo-grid__item');
        gridItem.remove();
    });
    
    cardElement.querySelector('.photo-grid__like').addEventListener('click', event => {
        event.target.classList.toggle('photo-grid__like_active');
    });

    return cardElement;
};      

initialCards.forEach(function (card, newCard) {
    newCard = addPhotoCard(card);
    photoCardTemplate.append(newCard);
});

function escHandler(event) {
    if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
    }
};

function popupClickHandler(event) {
    if (event.target.classList.contains('popup_opened')) {
        closePopup(event.target);
    } 
};

function showPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', escHandler);
    const form = popup.querySelector(validationConfig.formSelector);
    const saveButton = form.querySelector(validationConfig.submitButtonSelector);
    setButtonState(saveButton, form.checkValidity(), validationConfig);

};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', escHandler);

};

function popupProfile(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileAchievements.textContent = popupInputAchievements.value;
    closePopup(popupProfileEdit);
};

function popupAddCard(event) {
    event.preventDefault();
    const newCard = {
            name: popupCardName.value,
            link: popupCardLink.value
        };
    photoCardTemplate.prepend(addPhotoCard(newCard));
    closePopup(popupTypeAddCard);
    popupCardForm.reset();
};

Array.from(document.querySelectorAll('.popup__close-button')).forEach(popupClose => {
    popupClose.addEventListener('click', () => closePopup(popupClose.closest('.popup')));
});

Array.from(document.querySelectorAll('.popup')).forEach(popup => {
    popup.addEventListener('mousedown', popupClickHandler);
});

popupForm.addEventListener('submit', popupProfile);
popupCardForm.addEventListener('submit', popupAddCard);
editButton.addEventListener('click', function() {
    popupInputName.value = profileName.textContent;
    popupInputAchievements.value = profileAchievements.textContent;
    showPopup(popupProfileEdit);
});
addCardButton.addEventListener('click', () => showPopup(popupTypeAddCard));






