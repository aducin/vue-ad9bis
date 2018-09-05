<template>
  <div>
    <account-header></account-header>
    <transition
      mode="out-in"
      enter-active="enterTransition"
      enter-active-class="animated flipInX"
      leave-active-class="animated flipOutX"
    >
      <account-detail></account-detail>
    </transition>
    <busy v-if="loading" class="marginAuto"></busy>
    <p>{{ accounts }}</p>
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
  components: {
    'account-detail': AccountDetail,
    'account-header': AccountHeader,
    'busy': Circle
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    getData () {
      this.loading = true
      AccountService.getAccounts(this.$store.state.token)
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
  },
  computed: mapGetters([
    'accounts'
  ]),
  created () {
    this.getData()
  }
}
</script>

<style scoped>

</style>
