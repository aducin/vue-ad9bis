import axios from 'axios'

import { Subject } from 'rxjs'

import Config from '../config'

class AccountService {
  activeRow = {}
  edition = new Subject()
  url = Config.url + '?accounts'
  // constructor () {}

  createXml (from, to, token) {
    let path = Config.url + '/jpk/' + token
    let params = {
      dateFrom: from,
      dateTo: to
    }
    return axios.post(path, { params }, Config.ajaxConfig)
  }

  getAccounts (token, params) {
    const getUrl = Config.url + '?accounts=true&token=' + token
    return axios.get(getUrl, {params})
  }

  modify (data) {
    return axios.put(this.url, data)
  }

  setActiveRow (obj) {
    this.activeRow = {...obj}
  }

  setNew (data) {
    return axios.post(this.url, data)
  }
}

const serviceInstance = new AccountService()
Object.seal(serviceInstance)

export default serviceInstance
