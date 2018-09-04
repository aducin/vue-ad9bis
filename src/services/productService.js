import axios from 'axios'
import { Subject } from 'rxjs'

import Config from '../config'
const url = Config.url
class ProductService {
  nameSearch = new Subject()
  // constructor () {}

  deleteModified (id) {
    let path = url + '/modified/' + id
    return axios.delete(path)
  }
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
  getModified () {
    let path = url + '?modified=true'
    return axios.get(path)
  }
  getNameList (params) {
    return axios.get(url, {params})
  }
  setUpdate (data) {
    return axios.post(url, {data})
  }
}

const serviceInstance = new ProductService()
Object.freeze(serviceInstance)

export default serviceInstance
