class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  returnResponse(res) {
    if (res.ok) {
      return res.json();
    }
  }

  //Profile
  defaultProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this.returnResponse);
  }
  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this.returnResponse);
  }
  updateProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this.returnResponse);
  }
  // Cards
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this.returnResponse);
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this.returnResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.returnResponse);
  }
  //Likes
  
  changeLikeCardStatus(cardId, isLiked){
    if (isLiked){
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`,{
        method: "DELETE",
        headers: this._headers,
      }).then(this.returnResponse);
    } else{
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`,{
        method: "PUT",
        headers: this._headers,
      }).then(this.returnResponse);
    }
  }
}

/* const baseUrl = 'https://kais3r.chickenkiller.com'; */

const baseUrl = 'http://localhost:8001';

const api = new Api({
  baseUrl: baseUrl,
  headers: {
    "Access-Control-Allow-Origin" : "*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  }
});



export default api;