import './index.css';
import { initialCards, 
         cardsContainer,
         template, 
         popupTypeImage, 
         popupImage, 
         popupImageTitle, 
         addCardButton, 
         popupTypeAddCard,  
         editButton, 
         validationObject, 
         popupTypeProfile, 
         profileName, 
         profileAchievements,
         profileForm,
         newCardForm,
         } 
         from '../utils/constants.js';

import Card  from '../components/Card.js';
import FormValidator  from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section  from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
const validFormPopupProfile = new FormValidator(validationObject, profileForm );
const validFormPopupAddCard = new FormValidator(validationObject, newCardForm);
validFormPopupProfile.enableValidation();
validFormPopupAddCard.enableValidation();

const userInfo = new UserInfo(profileName, profileAchievements);

const popupWithImage = new PopupWithImage(popupTypeImage, popupImage, popupImageTitle);

const popupProfile = new PopupWithForm(popupTypeProfile, {
    handleFormSubmit: (values) => {
        userInfo.setUserInfo(values);
        popupProfile.close();
    }
});

const popupAddCard = new PopupWithForm(popupTypeAddCard, {
    handleFormSubmit: (values) => {
        createCard.addItem(values);
        popupAddCard.close();
    }
});

popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupProfile.setEventListeners();

addCardButton.addEventListener('click', function () {
    validFormPopupAddCard.resetValidationState();
    popupAddCard.open();
});

editButton.addEventListener('click', function () {
    popupProfile.setInputValues(userInfo.getUserInfo());
    validFormPopupProfile.resetValidationState();
    popupProfile.open();
});

const createCard = new Section ({
  items: initialCards,
  renderer: (item) => {
    const cardImage = item.link;
    const cardTitle = item.name;
    const card = new Card(cardTitle, cardImage, template, {
      handleCardClick: (image, title) => {
        popupWithImage.open(image, title);
        }
    });
    const cardElement = card.generateCard();
    card.addCard(createCard, cardElement);
  }
}, cardsContainer);

createCard.renderItems();



