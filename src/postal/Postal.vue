<template>
  <div>
    <postal-header @refresh="getData"></postal-header>
    <transition
      mode="out-in"
      enter-active="enterTransition"
      enter-active-class="animated flipInX"
      leave-active-class="animated flipOutX"
    >
      <postal-detail></postal-detail>
    </transition>
    <busy v-if="postalLoading" class="marginAuto"></busy>
  </div>
</template>

<script>
import Circle from 'vue-loading-spinner/src/components/Circle4'
import PostalDetail from './components/Detail.vue'
import PostalHeader from './components/Header.vue'
import PostalService from '../services/postalService'

import { mapGetters } from 'vuex'

export default {
  name: 'Postal',
  components: {
    'postal-detail': PostalDetail,
    'postal-header': PostalHeader,
    'busy': Circle
  },
  computed: mapGetters([
    'postalLoading'
  ]),
  methods: {
    getData () {
      this.$store.commit('setPostalLoading', true)
      this.loading = true
      PostalService.getPostal()
        .then(response => {
          if (response.data.success) {
            this.$store.commit('setPostalData', { amount: response.data.current, list: response.data.list })
          } else {
            throw new Error(response.data.reason)
          }
        })
        .catch(err => {
          this.$store.commit('setError', err.message)
        })
        .finally(() => {
          this.$store.commit('setPostalLoading', false)
        })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>

</style>
