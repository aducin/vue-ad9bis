import axios from 'axios'

import Config from '../config'

class PostalService {
  // constructor () {}

  getPostal () {
    let url = Config.url + '?postal=true'
    return axios.get(url)
  }

  setPostal (data) {
    return axios.post(Config.url, data)
  }
}

const serviceInstance = new PostalService()
Object.freeze(serviceInstance)

export default serviceInstance
