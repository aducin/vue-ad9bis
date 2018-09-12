import axios from 'axios'

import { Subject } from 'rxjs'

import Config from '../config'

class AccountService {
  activeRow = {}
  edition = new Subject()
  // constructor () {}

  getAccounts (token, params) {
    let url = Config.url + '?accounts=true&token=' + token
    return axios.get(url, {params})
  }

  setActiveRow (obj) {
    this.activeRow = {...obj}
  }
}

const serviceInstance = new AccountService()
Object.seal(serviceInstance)

export default serviceInstance
