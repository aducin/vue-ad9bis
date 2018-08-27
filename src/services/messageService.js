import { Subject } from 'rxjs'

class MessageService {
  error = new Subject()
  success = new Subject()
  // constructor () {}
}

const serviceInstance = new MessageService()
Object.freeze(serviceInstance)

export default serviceInstance
