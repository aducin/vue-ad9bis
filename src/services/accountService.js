import axios from 'axios'

import { Subject } from 'rxjs'

import Config from '../config'

class AccountService {
  edition = new Subject()
  // constructor () {}

  getAccounts (token, params) {
    let url = Config.url + '?accounts=true&token=' + token
    return axios.get(url, {params})
  }
}

const serviceInstance = new AccountService()
Object.freeze(serviceInstance)

export default serviceInstance
