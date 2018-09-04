<template>
  <div>
    <product-header></product-header>
    <transition-group
      mode="out-in"
      enter-active="enterTransition"
      enter-active-class="animated flipInX"
      leave-active-class="animated flipOutX">
      <product-detail key="1"
        v-if="(productData.type === 'nameSearch' || productData.type === 'basic') && productData.list"
        v-bind:data="productData.list"
      ></product-detail>
      <product-edition key="2"
        v-if="action === 'productEdition'"
        v-bind:data="productData.data"
      ></product-edition>
      <product-history v-if="action === 'productHistory'" key="3"></product-history>
      <product-modal key="4"
        v-bind:data="productData.data"
        v-bind:list="productData.list"
        @closeModal="clear"
      ></product-modal>
    </transition-group>
    <modified v-if="action === 'additional'"></modified>
    <busy v-if="productLoading" class="marginAuto"></busy>
    <b-btn v-b-modal.basicModal ref="openModal" class="displayedNone">Open modal</b-btn>
  </div>
</template>

<script>
import Circle from 'vue-loading-spinner/src/components/Circle4'
import Modified from './components/Modified.vue'
import ProductDetail from './components/Detail.vue'
import ProductEdition from './components/Edition.vue'
import ProductHeader from './components/Header.vue'
import ProductHistory from './components/History.vue'
import ProductModal from './components/Modal.vue'
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
    'product-modal': ProductModal,
    'modified': Modified,
    'busy': Circle
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
      }
    },
    checkModal (state) {
      if (state.product.type === 'basic' && this.action !== state.product.type) {
        this.action = state.product.type
        this.$refs.openModal.click()
        // this.$refs.basicModal.show()
      }
    },
    clear () {
      this.id = null
      this.action = this.productData.list && this.productData.list.length > 0 ? 'nameSearch' : 'additional'
      if (this.productData.list && this.productData.list.length > 0) {
        this.$store.dispatch('productName', { list: this.productData.list, edition: 'nameSearch' })
      } else {
        this.$store.commit('clearProduct')
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
  },
  destroyed () {
    this.clear()
  }
}
</script>

<style scoped>
</style>
