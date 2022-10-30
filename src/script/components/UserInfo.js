export default class UserInfo {
  constructor({ profileTitle, profileSubtitle, profileImg }) {
    this._profileTitle = document.querySelector(profileTitle);
    this._profileSubtitle = document.querySelector(profileSubtitle);
    this._profileImg = document.querySelector(profileImg);
  }

  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      about: this._profileSubtitle.textContent,
    };
  }

  setUserInfo = ({ name, about, avatar, _id }) => {
    this._name = name;
    this._about = about;
    this._userId = _id;
    this._profileTitle.textContent = this._name;
    this._profileSubtitle.textContent = this._about;
    this._avatar = avatar;
    this._profileImg.src = this._avatar;
  };
}
