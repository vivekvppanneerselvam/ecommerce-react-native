import Auth from '../Auth'
import axios from 'axios'
import qs from 'qs'
import paypalConfig from '../../configs/paypalConfig'

const URL = 'http://localhost:3000'

const serverCall = (config) => {
  //header authorization
  if (Auth.user_token) {
    const token = Auth.getToken()
    config.headers = {
      "authorization": token
    }
  }
  //interceptors handle network error
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (!error.response) {
        error.response = {
          data: 'net work error',
          status: 500
        }
      }
      if (error.response.status === 401) {
        Auth.logout()
        // jumpTo('/login')
        throw error
      }
      return Promise.reject(error);
    });
  config.baseURL = URL
  return axios(config)
}
export default serverCall

export function login(email, password) {
  return new Promise(function (resolve, reject) {
    const body =
    {
      "credential": {
        "email": email,
        "password": password
      }
    }
    serverCall({ method: 'POST', url: '/login', data: body }).then(async res => {
      await Auth.setUserToken(res.data.user_token)
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export const getPaypalToken = () => {
  return axios({
    method: 'POST',
    url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    auth: {
      username: paypalConfig.username,
      password: paypalConfig.password
    },
    data: qs.stringify({ "grant_type": "client_credentials" })
  })
}