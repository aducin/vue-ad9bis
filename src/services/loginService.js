import axios from 'axios'

import Config from '../config'

const url = Config.url
class LoginService {
  // constructor () {}

  checkToken (token) {
    return axios.post(url, {data: {action: 'tokenCheck', token}})
  }

  login (data) {
    return axios.post(url, {data})
  }
}

const serviceInstance = new LoginService()
Object.freeze(serviceInstance)

export default serviceInstance
