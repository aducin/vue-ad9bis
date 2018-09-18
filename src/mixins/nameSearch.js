import MessageService from '../services/messageService'
import ProductService from '../services/productService'

const nameSearchMixin = {
  data () {
    return {
      nameSearch: false
    }
  },
  methods: {
    searchingName (params) {
      ProductService.getNameList(params)
        .then(response => {
          if (response.data.success) {
            this.$store.dispatch('productLoading', true)
            this.$store.dispatch('productName', { list: response.data.list, edition: 'nameSearch' })
          } else {
            throw new Error(response.data.reason)
          }
        })
        .catch(err => {
          this.$store.dispatch('error')
          MessageService.error.next(err.message)
        })
        .finally(() => {
          this.nameSearch = false
        })
    }
  }
}

export default nameSearchMixin
