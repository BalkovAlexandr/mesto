export default class UserInfo { 
  constructor(profileName, profileAchievements) { 
    this._name = document.querySelector(profileName); 
    this._achievements = document.querySelector(profileAchievements); 
  } 
   
  getUserInfo() { 
    const data = {};
    data.name = this._name.textContent; 
    data.achievements= this._achievements.textContent; 
    return data; 
  } 
   
  setUserInfo(values) { 
    this._name.textContent = values.name; 
    this._achievements.textContent = values.achievements; 
  }
} 
