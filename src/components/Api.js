
class Api {
  constructor(options) {
    this._options = options;
  }

  _request(url, options = {}) {
    return fetch(url, options)
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)
  }

  getUserinfo() {
    return this._request(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers
    });
  }

  getInitialCards() {
    return this._request(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    });
  }

  editProfile(name,job) {
    return this._request(`${this._options.baseUrl}/users/me `, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    });
  }

  insertNewCard(name,link) {
    return this._request(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name,
        link
      })
    })
  }

  deleteCard(id) {
    return this._request(`${this._options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._options.headers
    })
  }
  
  deleteCardLike(id) {
    return this._request(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._options.headers
    })
  }

  addCardLike(id) {
    return this._request(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._options.headers
    })
  }

  editAvatar(link) {
    return this._request(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
       avatar: link
      })
    })
  }
}


export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '16ca8f27-70bc-4b74-b0f0-92ff98b44d07',
    'Content-Type': 'application/json'
  }
});
