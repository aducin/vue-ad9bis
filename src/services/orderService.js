import axios from 'axios'

import Config from '../config'

class OrderService {
  token = ''
  // constructor () {}

  getOrder (params) {
    return axios.get(Config.url, {params})
  }
  setToken (token) {
    this.token = token
  }
}

const serviceInstance = new OrderService()
Object.freeze(serviceInstance)

export default serviceInstance
