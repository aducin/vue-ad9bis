import { required, numeric } from 'vuelidate/lib/validators'
import { floatNumber } from '../functions/floatNumber'

export const accountValidator = {
  amount: { required, floatNumber },
  recipient: { required },
  type: { required, numeric },
  closed: { required, numeric },
  locs: { numeric },
  coach: { numeric },
  element: { numeric },
  accessories: { numeric },
  car: { numeric },
  book: { numeric },
  address: { required: false },
  remarks: { required: false }
}
