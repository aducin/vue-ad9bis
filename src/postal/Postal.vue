<template>
  <div>
    <postal-header @refresh="getData"></postal-header>
    <flip>
      <postal-detail></postal-detail>
    </flip>
    <busy v-if="postalLoading" class="marginAuto"></busy>
  </div>
</template>

<script>
import Circle from 'vue-loading-spinner/src/components/Circle4'
import PostalDetail from './components/Detail.vue'
import PostalHeader from './components/Header.vue'
import PostalService from '../services/postalService'
import Flip from '../slots/TransitionFlip.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Postal',
  components: {
    'postal-detail': PostalDetail,
    'postal-header': PostalHeader,
    'busy': Circle,
    'flip': Flip
  },
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
  computed: mapGetters([
    'postalLoading'
  ]),
  created () {
    this.getData()
  }
}
</script>

<style scoped>

</style>
