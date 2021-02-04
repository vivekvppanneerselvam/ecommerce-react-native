import AsyncStorage from '@react-native-community/async-storage';

class Auth {
  constructor() {
    // this.user_token = JSON.parse(localStorage.getItem('auth'))||{}
  }
  async getAuth() {
    try {
      const authJson = await AsyncStorage.getItem('auth')
      return authJson != null ? JSON.parse(authJson) : null
    } catch (e) {
      throw e;
    }
  }

  async getToken() {
    return await this.getAuth().token;
  }

  async getUserId() {
    console.log("this.getAuth().user_id", await this.getAuth())
    return this.getAuth().then((item) => {
      if (item) {
        return item.user_id
      }
    });
    // return this.user_token.user_id
  }
  async setUserToken(new_token) {
    try {
      const tokenJson = JSON.stringify(new_token)
      localStorage.setItem('auth', tokenJson)
      await AsyncStorage.setItem('auth', tokenJson)
    } catch (e) {
      throw e;
    }
  }
  async logout() {
    try {
      localStorage.removeItem('auth')
      await AsyncStorage.removeItem('auth')
      await AsyncStorage.removeItem('userToken');
    } catch (e) {
      throw e;
    }
  }
}
export default new Auth()