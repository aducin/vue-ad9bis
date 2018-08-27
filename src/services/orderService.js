import axios from 'axios'

import Config from '../config'

class OrderService {
  // constructor () {}

  getOrder (params) {
    return axios.get(Config.url, {params})
  }
  setEven (params) {
    return axios.get(Config.url, {params})
  }
}

const serviceInstance = new OrderService()
Object.freeze(serviceInstance)

export default serviceInstance
