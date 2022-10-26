export default class UserInfo {
  constructor({ username, subtitle, avatar }) {
    this._username = document.querySelector(username);
    this._subtitle = document.querySelector(subtitle);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._username.textContent,
      about: this._subtitle.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._username = name;
    this._subtitle = about;
    this._username.textContent = this._name;
    this._subtitle.textContent = this._about;
    this._avatar = avatar;
    this._avatar.src = this._avatar;
  }
}
