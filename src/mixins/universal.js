import Config from '../config'
import Labels from '../labels'

const universalMixin = {
  data: function () {
    return {
      buttons: Labels.buttons,
      imageUrl: Config.imageUrl,
      link: Config.linkUrl + Config.linkSuffix,
      linkUrl: Config.linkUrl,
      options: Config.options,
      placeholders: Labels.placeholders,
      timer: Config.timer
    }
  }
}

export default universalMixin
