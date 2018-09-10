<template>
  <div>
    <account-header @setData="getData"></account-header>
    <transition
      mode="out-in"
      enter-active="enterTransition"
      enter-active-class="animated flipInX"
      leave-active-class="animated flipOutX"
    >
      <account-detail v-if="!loading" v-bind:data=accounts></account-detail>
    </transition>
    <busy v-if="loading" class="marginAuto"></busy>
  </div>
</template>

<script>
import Circle from 'vue-loading-spinner/src/components/Circle4'
import AccountService from '../services/accountService'
import MessageService from '../services/messageService'
import AccountDetail from './components/Detail.vue'
import AccountHeader from './components/Header.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'Account',
  data () {
    return {
      loading: true
    }
  },
  components: {
    'account-detail': AccountDetail,
    'account-header': AccountHeader,
    'busy': Circle
  },
  methods: {
    getData (params = null) {
      if (this.$store.state.token) {
        this.loading = true
        AccountService.getAccounts(this.$store.state.token, params)
          .then(response => {
            if (response.data.success) {
              this.$store.dispatch('accountData', response.data)
            } else {
              throw new Error(response.data.reason)
            }
          })
          .catch(err => MessageService.error.next(err.message))
          .finally(() => {
            this.loading = false
          })
      }
    }
  },
  computed: mapGetters([
    'accounts'
  ]),
  watch: {
    '$store.state.token' () {
      this.getData()
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>

</style>
