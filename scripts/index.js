const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileAchievements = document.querySelector('.profile__achievements');
const popupForm = document.querySelector('.popup__form');
const popupInputName = document.querySelector('.popup__input-name');
const popupInputAchievements = document.querySelector('.popup__input-achievements');

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
