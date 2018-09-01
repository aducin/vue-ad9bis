import axios from 'axios'

import Config from '../config'

const url = Config.url
class ProductService {
  // constructor () {}

  getBasicId (id) {
    let path = url + '?basicProduct=' + id
    return axios.get(path)
  }
  getCategories () {
    let path = url + '?category=true'
    return axios.get(path)
  }
  getEdition (params) {
    return axios.get(url, {params})
  }
  getHistory (params) {
    return axios.get(url, {params})
  }
  getManufactorers () {
    let path = url + '?manufacturer=true'
    return axios.get(path)
  }
  getNameList (params) {
    return axios.get(url, {params})
  }
}

const serviceInstance = new ProductService()
Object.freeze(serviceInstance)

export default serviceInstance
