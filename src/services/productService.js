import axios from 'axios'

import Config from '../config'

const url = Config.url
class ProductService {
  // constructor () {}

  getCategories () {
    let path = url + '?category=true'
    return axios.get(path)
  }
  getManufactorers () {
    let path = url + '?manufacturer=true'
    return axios.get(path)
  }
}

const serviceInstance = new ProductService()
Object.freeze(serviceInstance)

export default serviceInstance
