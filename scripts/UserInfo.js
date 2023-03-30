export default class UserInfo {
  constructor(name,job) {
    this._nameElement = document.querySelector(name);
  this._jobElement = document.querySelector(job);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    }
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._jobElement.textContent = data.job;
  }
}