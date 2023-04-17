export default class UserInfo {
  constructor(name, job, avatarSelector) {
    this._nameElement = document.querySelector(name);
    this._jobElement = document.querySelector(job);
    this._avatar = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatar.src
    };
  }

  setUserInfo(name,job, avatar) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }

  setAvataruser(avatar) {
    this._avatar.src = avatar;
  }
}

