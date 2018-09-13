import axios from 'axios'
import { Observable, Subject } from 'rxjs'
import 'rxjs/add/observable/interval'

import Config from '../config'
const url = Config.url
class ProductService {
  nameSearch = new Subject()
  newestOrdersInterval = Observable.interval(Config.intervalOrders);
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
  getLastOrders () {
    let path = url + '?orders=true&last=true'
    return axios.get(path)
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
  modifyLastOrder (base, id, token) {
    let path = url + '/orders/last/' + base + '/' + id + '/' + token
    return axios.get(path)
  }
  setUpdate (data) {
    return axios.post(url, {data})
  }
}

const serviceInstance = new ProductService()
Object.freeze(serviceInstance)

export default serviceInstance
