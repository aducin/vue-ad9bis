import axios from 'axios'

import Config from '../config'

class AccountService {
  // constructor () {}

  getAccounts (token) {
    let url = Config.url + '?accounts=true&token=' + token
    return axios.get(url)
  }
}

const serviceInstance = new AccountService()
Object.freeze(serviceInstance)

export default serviceInstance
