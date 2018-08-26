<template>
  <div>
    <product-header></product-header>
    <product-detail></product-detail>
  </div>
</template>

<script>
import ProductDetail from './components/Detail.vue'
import ProductHeader from './components/Header.vue'
import ProductService from '../services/productService'

export default {
  name: 'Product',
  components: {
    'product-detail': ProductDetail,
    'product-header': ProductHeader
  },
  methods: {
    getLists () {
      let categories = ProductService.getCategories()
      let manufactorers = ProductService.getManufactorers()
      Promise.all([categories, manufactorers])
        .then(response => {
          if (response[0].data.success && response[1].data.success) {
            let lists = {
              categories: this.setOption(response[0].data.list),
              manufactorers: this.setOption(response[1].data.list)
            }
            this.$store.commit('setProductLists', lists)
          } else {
            let reason = response[0].success ? response[1].data.reason : response[0].data.reason
            throw new Error(reason)
          }
        })
        .catch(err => {
          this.$store.commit('setError', err.message)
        })
    },
    setOption (list) {
      return list.map(el => {
        return {value: el.id, text: el.name}
      })
    }
  },
  created () {
    if (!this.$store.state.product.lists) {
      this.getLists()
    }
  }
}
</script>

<style scoped>

</style>
