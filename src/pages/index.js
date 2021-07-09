import './index.css';

import {
  validationObject,
  selectorObj,
  editButton,
  addPhotoButton,
  popupProfileInputs,
  changeAvatarButton
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '0af055c9-79b9-44ba-8e1d-d9f40bb0506f',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  selectorName: selectorObj.profileNameSelector,
  selectorJob: selectorObj.profileJobSelector,
  selectorAvatar: selectorObj.avatarSelector,
});

const validFormPopupAddCard = new FormValidator(validationObject, selectorObj.popupAddCardSelector);
validFormPopupAddCard.enableValidation();

const validFormPopupProfile = new FormValidator(validationObject, selectorObj.popupProfileSelector);
validFormPopupProfile.enableValidation();

const validFormPopupChangeAvatar = new FormValidator(validationObject, selectorObj.popupChangeAvatarSelector);
validFormPopupChangeAvatar.enableValidation();

function handlePopupProfile(values) {
  popupFormProfile.renderSaving(true);

  api.updateUserInfo(values)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupFormProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormProfile.renderSaving(false);
    })
}

function handleTextInput() {
  const userData = userInfo.getUserInfo();
  popupProfileInputs.forEach(input => {
    input.value = userData[input.name];
  });
}

function handlePopupChangeAvatar(values) {
  popupFormChangeAvatar.renderSaving(true);

  api.setNewAvatar(values)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupFormChangeAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormChangeAvatar.renderSaving(false);
    })
}

function handleCardClick(title, link) {
  popupWithImage.open(title, link);
}

function handleTrashClick(id, card) {
  popupWithConfirm.setSubmitAction(() => handlePopupConfirm(id, card))
  popupWithConfirm.open();
}

function handlePopupConfirm(id, card) {
  api.deleteCard(id)
    .then(() => {
      card.removeCard();
      popupWithConfirm.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleLikeClick(id, isLiked, card) {
  if (isLiked) {
    api.removeCardLike(id)
      .then((data) => {
        card.currentLikes(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.addLikeCard(id)
      .then((data) => {
        card.currentLikes(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function createCard(dataCard, id) {
  const card = new Card({
      data: dataCard,
      handleCardClick,
      handleTrashClick,
      handleLikeClick,
    },
    selectorObj.cardId,
    id);

  const newCard = card.generateCard();

  return newCard;
}

function handlePopupAddCard(values) {
  popupFormAddCard.renderSaving(true);

  api.addCard(values)
    .then((data) => {
      cardList.addItemPrepend(createCard(data, data.owner._id));
      popupFormAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormAddCard.renderSaving(false);
    })
}

editButton.addEventListener('click', () => {
  popupFormProfile.open();
  handleTextInput();
  validFormPopupProfile.resetValidationState();
});

addPhotoButton.addEventListener('click', () => {
  popupFormAddCard.open();
  validFormPopupAddCard.resetValidationState();
});

changeAvatarButton.addEventListener('click', () => {
  popupFormChangeAvatar.open();
  validFormPopupAddCard.resetValidationState();
});

const cardList = new Section({
    renderer: (cardItem, id) => {
      cardList.addItem(createCard(cardItem, id));
    },
  },
  selectorObj.elementsSelector
);

const popupWithImage = new PopupWithImage(selectorObj.popupImageSelector);
popupWithImage.setEventListeners();

const popupWithConfirm = new PopupWithConfirm(selectorObj.popupConfirmSelector);
popupWithConfirm.setEventListeners();

const popupFormProfile = new PopupWithForm(selectorObj.popupProfileSelector, handlePopupProfile);
popupFormProfile.setEventListeners();

const popupFormAddCard = new PopupWithForm(selectorObj.popupAddCardSelector, handlePopupAddCard);
popupFormAddCard.setEventListeners();

const popupFormChangeAvatar = new PopupWithForm(selectorObj.popupChangeAvatarSelector, handlePopupChangeAvatar);
popupFormChangeAvatar.setEventListeners();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((values) => {
    userInfo.setUserInfo(values[0])
    cardList.renderItems(values[1], values[0]._id);
  })
  .catch((err) => {
    console.log(err);
  });
