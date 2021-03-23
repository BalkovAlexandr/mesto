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

const createCard = new Section ({
    items: initialCards,
    renderer: (item) => {
        const cardImage = item.link;
        const cardTitle = item.name;
        const card = new Card(cardTitle, cardImage, template, {
            handleCardClick: (title, image) => {
                const popupWithImage = new PopupWithImage(popupTypeImage, title, image, popupImage, popupImageTitle);
                popupWithImage.open();
            }
        });  
        const cardElement = card.generateCard();
        createCard._container.prepend(cardElement);
    }
}, cardsContainer);

createCard.renderItems();

addCardButton.addEventListener('click', function() {
    const popupAddCard = new PopupWithForm(popupTypeAddCard, {
        handleFormSubmit: (evt) => {
            evt.preventDefault();
            const values = popupAddCard._getInputValues();
            const card = {
                name: values[0],
                link: values[1]
            };
        createCard.addItem(card);
        popupAddCard.close();
        }
    });
    validFormPopupAddCard.resetValidationState();
    popupAddCard.open();
});
const userInfo = new UserInfo(profileName, profileAchievements);

editButton.addEventListener('click', function() {
    const popupProfile = new PopupWithForm(popupTypeProfile, {
        handleFormSubmit: (evt) => {
            evt.preventDefault();
            const values = popupProfile._getInputValues();
            userInfo.setUserInfo(values[0], values[1]);
            popupProfile.close();
        }
    });
    popupProfile._setInputValues(userInfo.getUserInfo());
    validFormPopupProfile.resetValidationState();
    popupProfile.open();

});

