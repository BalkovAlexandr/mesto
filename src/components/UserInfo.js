export default class UserInfo {
  constructor(name, achievements) {
    this._name = document.querySelector(name);
    this._achievements = document.querySelector(achievements);
  }
  
  getUserInfo() {
    const name = this._name.textContent;
    const achievements= this._achievements.textContent;
    return [name, achievements];
  }
  
  setUserInfo(newName, newAchievements) {
    this._name.textContent = newName;
    this._achievements.textContent = newAchievements;
  }
}