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
    checkAction (dispatch) {
      if (this.$router.currentRoute.name !== 'order') {
        if (this.$store.state.token) {
          this.setAction()
        }
      } else if (dispatch) {
        this.$store.dispatch('orderEmpty')
      }
    },
    setAction () {
      let promise
      this.action = this.$router.currentRoute.name
      this.params = this.$route.params
      this.params.action = 'order'
      this.params.token = this.$store.state.token
      if (this.action === 'orderDetails') {
        promise = OrderService.getOrder(this.params)
      } else if (this.action === 'orderEven') {
        this.params.even = true
        promise = OrderService.setEven(this.params)
      }
      promise
        .then(response => {
          if (response.data.success !== false) {
            if (this.action === 'orderEven') {
              this.params.action = 'even'
            }
            this.params.data = response.data
            this.$store.dispatch(this.action, this.params)
          } else {
            throw new Error(response.data.reason)
          }
        })
        .catch(err => {
          this.$store.dispatch('orderEmpty')
          MessageService.error.next(err.message)
        })
    }
  },
  watch: {
    '$store.state.token' () {
      this.checkAction(false)
    },
    '$route' () {
      this.checkAction(true)
    }
  },
  created () {
    this.checkAction(false)
  },
  destroyed () {
    this.$store.dispatch('orderEmpty')
  }
}
</script>

<style scoped>

</style>
