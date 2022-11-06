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

  setUserInfo = (data) => {
    this._profileTitle.textContent = data.name;
    this._profileSubtitle.textContent = data.about;
    this.setUserAvatar(data);
  };

  setUserAvatar = (data) => {
    this._profileImg.src = data.avatar;
  }
}