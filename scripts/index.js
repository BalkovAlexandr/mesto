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
const element = document.querySelector('.elements');

const sectionProfile = document.querySelector('.profile');
const editButton = sectionProfile.querySelector('.profile__edit-button');
const profileName = sectionProfile.querySelector('.profile__name');
const profileAchievements = sectionProfile.querySelector('.profile__achievements');
const addCardButton = sectionProfile.querySelector('.profile__add-button');

const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupForm = popupProfileEdit.querySelector('.popup__form');
const popupInputName = popupProfileEdit.querySelector('.popup__input_text_name');
const popupInputAchievements = popupProfileEdit.querySelector('.popup__input_text_achievements');
const popupCloseProfile = popupProfileEdit.querySelector('.popup__close-button');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage= popupTypeImage.querySelector('.popup__image');
const popupImageTitle = popupTypeImage.querySelector('.popup__image-title');
const popupCloseImage = popupTypeImage.querySelector('.popup__close-button');

const popupTypeAddCard = document.querySelector('.popup_type_add');
const popupCardForm = popupTypeAddCard.querySelector('.popup__form');
const popupCardName = popupTypeAddCard.querySelector('.popup__input_card_name');
const popupCardLink = popupTypeAddCard.querySelector('.popup__input_card_link');
const popupCloseCard = popupTypeAddCard.querySelector('.popup__close-button');

function addPhotoCard(photoArr) {
    const cardElement = document.querySelector('.photo-template').content.cloneNode(true);
    const cardImage = cardElement.querySelector('.photo-grid__image');
    const cardTitle = cardElement.querySelector('.photo-grid__title');
    cardImage.src = photoArr.link;
    cardTitle.textContent = photoArr.name;
    cardElement.querySelector('.photo-grid__image').alt = photoArr.name.toLowerCase();

    cardElement.querySelector('.photo-grid__delete-button').addEventListener('click', event => {
        const gridItem = event.target.closest('.photo-grid__item');
        gridItem.remove();
    });

    cardElement.querySelector('.photo-grid__like').addEventListener('click', event => {
        event.target.classList.toggle('photo-grid__like_active');
    });

    cardImage.addEventListener('click', function() {
        showPopup(popupTypeImage);
        popupImageTitle.textContent = photoArr.name;
        popupImage.src = cardImage.src;
        popupImage.alt = cardImage.alt;

    });
    return cardElement;
};      

initialCards.forEach(function (card, newCard) {
    newCard = addPhotoCard(card);
    photoCardTemplate.append(newCard);
});

function showPopup(popup) {
    popup.classList.add('popup_opened');
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
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

popupCloseProfile.addEventListener('click', () => closePopup(popupProfileEdit));
popupCloseImage.addEventListener('click', () => closePopup(popupTypeImage));
popupCloseCard.addEventListener('click', function () {
    popupCardForm.reset();
    closePopup(popupTypeAddCard)});

popupForm.addEventListener('submit', popupProfile);
popupCardForm.addEventListener('submit', popupAddCard);
editButton.addEventListener('click', function() {
    showPopup(popupProfileEdit);
    popupInputName.value = profileName.textContent;
    popupInputAchievements.value = profileAchievements.textContent;
  });
addCardButton.addEventListener('click', () => showPopup(popupTypeAddCard));










