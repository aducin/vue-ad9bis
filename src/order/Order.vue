<template>
  <div class="hello">
    <account-header></account-header>
    <account-detail></account-detail>
  </div>
</template>

<script>
import MessageService from '../services/messageService'
import OrderService from '../services/orderService'
import AccountDetail from './components/Detail.vue'
import AccountHeader from './components/Header.vue'

export default {
  name: 'Order',
  data () {
    return {
      action: undefined,
      params: {}
    }
  },
  components: {
    'account-detail': AccountDetail,
    'account-header': AccountHeader
  },
  methods: {
    setAction () {
      this.action = this.$router.currentRoute.name
      this.params = this.$route.params
      if (this.action === 'orderDetails') {
        this.params.action = 'order'
        OrderService.getOrder(this.params)
          .then(response => {
            if (response.data.success !== false) {
              this.params.data = response.data
              this.$store.dispatch('orderData', this.params)
            } else {
              throw new Error(response.data.reason)
            }
          })
          .catch(err => {
            this.$store.dispatch('orderEmpty')
            MessageService.error.next(err.message)
          })
      }
    }
  },
  watch: {
    '$route' () {
      if (this.$router.currentRoute.name !== 'order') {
        this.setAction()
      } else {
        this.$store.dispatch('orderEmpty')
      }
    }
  },
  created () {
    if (this.$router.currentRoute.name !== 'order') {
      this.setAction()
    }
  }
}
</script>

<style scoped>

</style>
