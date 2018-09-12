import Config from '../config'
import Labels from '../labels'
import dateSettings from '../datepicker.js'

export const headerState = {
  action: null,
  editionDisabled: true,
  labels: Labels.account,
  modalData: {},
  options: Config.options,
  selected: {
    dateFrom: '',
    dateTo: '',
    state: null,
    type: null
  },
  settings: dateSettings
}
