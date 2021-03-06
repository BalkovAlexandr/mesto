export default class Api {
  constructor({url,headers}) {
    this._url = url;
    this._token = headers['authorization'];
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
        headers: {
          authorization: this._token,
        }
      })
      .then(res => {
        return this._getResponseData(res);
      })
  } 

  updateUserInfo({name, about}) {
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: about,
        })
      })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  setNewAvatar(src) {
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: src.link
        })
      })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
        headers: {
          authorization: this._token,
        }
      })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  addCard({name, link}) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          link: link,
        })
      })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  addLikeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: this._token,
        }
      })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  removeCardLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
        }
      })
      .then(res => {
        return this._getResponseData(res);
      })
  }

   deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
        }
      })
      .then(res => {
        return this._getResponseData(res);
      })
  }
}
