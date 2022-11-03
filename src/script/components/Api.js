export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getInitialCards = () => {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  };

  getUserInfo = () => {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  };

  changeUserInfo = (newInfo) => {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(newInfo),
    });
  };

  changeAvatar = (link) => {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });
  };
  
  postNewCard = (card) => {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      }),
    });
  };

  deleteCard = (cardId) => {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  };

  setLike = (cardId) => {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    });
  };

  deleteLike = (cardId) => {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  };
}
