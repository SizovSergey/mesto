
class Api {
  constructor(options) {
    this._options = options;

  }

  _customFetch(url, options = {}) {
    return fetch(url, options)
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)
  }

  getUserinfo() {
    return this._customFetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers
    });
  }

  getInitialCards() {
    return this._customFetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    });
  }

  editProfile(name,job) {
    return this._customFetch(`${this._options.baseUrl}/users/me `, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    });
  }

  insertNewCard(name,link) {
    return this._customFetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name,
        link
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
