let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileAchievements = document.querySelector('.profile__achievements');
let popupForm = document.querySelector('.popup__form');
let popupInputName = document.querySelector('.popup__input-name');
let popupInputAchievements = document.querySelector('.popup__input-achievements');

function showPopup() {
    popup.classList.add('popup_opened');
    popupInputName.value = profileName.textContent;
    popupInputAchievements.value = profileAchievements.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);

function saveForm(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileAchievements.textContent = popupInputAchievements.value;
    closePopup();
}

popupForm.addEventListener('submit', saveForm);
