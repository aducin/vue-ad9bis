<template>
  <div>
    <product-header :action="action"></product-header>
    <flip>
      <component
      v-if="action !== 'basic' && action !== 'nameSearch'"
      :is="action"
      :data="productData.data"
      :type="productData.type"></component>
    </flip>
    <flip>
      <productDetail
        v-if="(!action || action === 'additional') && (productData.type === 'nameSearch' || productData.type === 'basic')"
        v-bind:data="productData.list"
      ></productDetail>
    </flip>
    <productModal v-bind:data="productData.data" v-bind:list="productData.list" @closeModal="clear(true)"></productModal>
    <busy v-if="productLoading" class="marginAuto"></busy>
    <b-btn v-b-modal.basicModal ref="openModal" class="displayedNone">Open modal</b-btn>
  </div>
</template>

<script>
import Circle from 'vue-loading-spinner/src/components/Circle4'
import Additional from './components/Additional.vue'
import nameSearchMixin from '../mixins/nameSearch'
import ProductDetail from './components/Detail.vue'
import ProductEdition from './components/Edition.vue'
import ProductHeader from './components/Header.vue'
import ProductHistory from './components/History.vue'
import ProductModal from './components/Modal.vue'
import ProductService from '../services/productService'
import Flip from '../slots/TransitionFlip.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Product',
  mixins: [nameSearchMixin],
  data () {
    return {
      action: null,
      id: null,
      loading: false,
      subscription: null
    }
  },
  components: {
    ProductDetail,
    ProductEdition,
    ProductHistory,
    ProductModal,
    'product-header': ProductHeader,
    'additional': Additional,
    'busy': Circle,
    'flip': Flip
  },
  methods: {
    checkAction () {
      if (this.$router.currentRoute.params.id) {
        if (this.$router.currentRoute.name !== this.action || this.$router.currentRoute.params.id !== this.id) {
          this.action = this.$router.currentRoute.name
          this.id = this.$router.currentRoute.params.id
          this.$store.dispatch('productLoading')
        }
      } else {
        this.action !== 'additional' ? this.clear() : this.action = 'additional'
        if (localStorage.getItem('vue-nameParams')) {
          this.searchingName(JSON.parse(localStorage.getItem('vue-nameParams')))
        } else {
          ProductService.clearHeader.next()
        }
      }
      if (!this.$store.state.product.lists) {
        this.getLists()
      }
    },
    checkModal (state) {
      if (state.product.type === 'basic' && this.action !== state.product.type) {
        this.action = state.product.type
        this.$refs.openModal.click()
        // this.$refs.basicModal.show()
      }
    },
    clear (bool = false) {
      this.id = null
      if (bool) {
        this.action = 'additional'
      } else {
        this.action = this.productData.list && this.productData.list.length > 0 ? 'nameSearch' : 'additional'
      }
      if (this.productData.list && this.productData.list.length > 0) {
        this.$store.dispatch('productName', { list: this.productData.list, edition: 'nameSearch' })
      } else {
        this.$store.commit('clearProduct')
      }
    },
    getLists () {
      let categoriesJson = localStorage.getItem('vue-categories')
      let manufactorersJson = localStorage.getItem('vue-manufactorers')
      if (categoriesJson && manufactorersJson) {
        let categories = JSON.parse(categoriesJson)
        let manufactorers = JSON.parse(manufactorersJson)
        this.$store.commit('setProductLists', { categories, manufactorers })
      } else {
        let categories = ProductService.getCategories()
        let manufactorers = ProductService.getManufactorers()
        Promise.all([categories, manufactorers])
          .then(response => {
            if (response[0].data.success && response[1].data.success) {
              let lists = {
                categories: this.setOption(response[0].data.list),
                manufactorers: this.setOption(response[1].data.list)
              }
              localStorage.setItem('vue-categories', JSON.stringify(lists.categories))
              localStorage.setItem('vue-manufactorers', JSON.stringify(lists.manufactorers))
              this.$store.commit('setProductLists', lists)
            } else {
              let reason = response[0].success ? response[1].data.reason : response[0].data.reason
              throw new Error(reason)
            }
          })
          .catch(err => this.$store.commit('setError', err.message))
      }
    },
    setOption (list) {
      return list.map(el => {
        return {value: el.id, text: el.name}
      })
    }
  },
  computed: {
    ...mapGetters([
      'productData',
      'productLoading'
    ])
  },
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
    this.$store.watch(
      (state) => this.checkModal(state)
    )
    this.subscription = ProductService.newestOrdersInterval.subscribe(() => {
      this.$store.dispatch('lastOrdersLoading')
      ProductService.getLastOrders().then(response => {
        if (response.data.success) {
          this.$store.dispatch('lastOrders', { list: response.data.list, newest: response.data.newest })
        }
      })
    })
  },
  destroyed () {
    this.clear()
    this.subscription = null
    localStorage.removeItem('vue-nameParams')
  }
}
</script>
