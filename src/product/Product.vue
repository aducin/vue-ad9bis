<template>
  <div>
    <product-header></product-header>
    <transition
      mode="out-in"
      enter-active="enterTransition"
      enter-active-class="animated flipInX"
      leave-active-class="animated flipOutX">
      <product-detail v-if="productData.type === 'nameSearch'" v-bind:data="productData.list"></product-detail>
      <product-edition v-if="productData.type === 'edition'" v-bind:data="productData.data"></product-edition>
      <product-history v-if="productData.type === 'history'" v-bind:data="productData.history"></product-history>
    </transition>
    <p>{{ productData }}</p>
    <busy v-if="productLoading" class="marginAuto"></busy>
  </div>
</template>

<script>
import Circle from 'vue-loading-spinner/src/components/Circle4'
import ProductDetail from './components/Detail.vue'
import ProductEdition from './components/Edition.vue'
import ProductHeader from './components/Header.vue'
import ProductHistory from './components/History.vue'
import ProductService from '../services/productService'

import { mapGetters } from 'vuex'

export default {
  name: 'Product',
  data () {
    return {
      action: null,
      id: null,
      loading: false
    }
  },
  components: {
    'product-detail': ProductDetail,
    'product-edition': ProductEdition,
    'product-header': ProductHeader,
    'product-history': ProductHistory,
    'busy': Circle
  },
  methods: {
    checkAction () {
      let promise
      if (this.$router.currentRoute.params.id) {
        if (this.$router.currentRoute.name !== this.action || this.$router.currentRoute.params.id !== this.id) {
          this.action = this.$router.currentRoute.name
          this.id = this.$router.currentRoute.params.id
          this.$store.dispatch('productLoading')
          if (this.action === 'productEdition') {
            promise = ProductService.getEdition({ product: this.id })
          } else if (this.action === 'productHistory') {
            promise = ProductService.getHistory({ action: 'history', id: this.id })
          }
          promise
            .then(response => {
              if (response.data.success) {
                if (this.action === 'productEdition') {
                  this.$store.dispatch('productData', { edition: 'edition', data: response.data })
                } else if (this.action === 'productHistory') {
                  this.$store.dispatch('productHistory', { edition: 'history', list: response.data.list })
                }
              } else {
                throw new Error(response.data.reason)
              }
            })
            .catch(err => this.$store.commit('setError', err.message))
        }
      } else {
        if (this.action) {
          this.action = null
          this.id = null
          this.$store.commit('clearProduct')
        }
      }
    },
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
        .catch(err => this.$store.commit('setError', err.message))
    },
    setOption (list) {
      return list.map(el => {
        return {value: el.id, text: el.name}
      })
    }
  },
  computed: mapGetters([
    'productData',
    'productLoading'
  ]),
  watch: {
    '$route' () {
      this.checkAction()
    }
  },
  created () {
    if (!this.$store.state.product.lists) {
      this.getLists()
    }
    this.checkAction()
  },
  destroyed () {
    this.$store.commit('clearProduct')
  }
}
</script>

<style scoped>
</style>
