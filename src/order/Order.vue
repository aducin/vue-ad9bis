<template>
  <div class="hello">
    <account-header></account-header>
    <flip>
      <account-detail v-if="!loading"></account-detail>
    </flip>
    <busy v-if="loading" class="marginAuto"></busy>
  </div>
</template>

<script>
import Circle from 'vue-loading-spinner/src/components/Circle4'
import MessageService from '../services/messageService'
import OrderService from '../services/orderService'
import AccountDetail from './components/Detail.vue'
import AccountHeader from './components/Header.vue'
import Flip from '../slots/TransitionFlip.vue'

export default {
  name: 'Order',
  data () {
    return {
      action: null,
      loading: false,
      params: {}
    }
  },
  components: {
    'account-detail': AccountDetail,
    'account-header': AccountHeader,
    'busy': Circle,
    'flip': Flip
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
      this.loading = true
      if (this.action === 'orderDetails' || this.action === 'orderMail') {
        promise = OrderService.getOrder(this.params)
      } else if (this.action === 'orderDiscount') {
        this.params.discount = true
        promise = OrderService.getDiscount(this.params)
      } else if (this.action === 'orderEven') {
        this.params.even = true
        promise = OrderService.setEven(this.params)
      } else if (this.action === 'orderVoucher') {
        this.params.basic = true
        promise = OrderService.getOrder(this.params)
      }
      promise
        .then(response => {
          if (response.data.success !== false) {
            if (this.action === 'orderDiscount') {
              this.params.action = 'discount'
            } else if (this.action === 'orderEven') {
              this.params.action = 'even'
            } else if (this.action === 'orderMail') {
              this.params.action = 'mail'
            }
            if (this.action !== 'orderVoucher') {
              this.params.data = response.data
              this.$store.dispatch(this.action, this.params)
            } else {
              delete (this.params.basic)
              this.params.id = response.data.customer.id
              this.params.vouchers = true
              OrderService.getVoucher(this.params)
                .then(response => {
                  if (response.data.success !== false) {
                    this.params.action = 'voucher'
                    this.params.data = response.data
                    this.$store.dispatch(this.action, this.params)
                  } else {
                    throw new Error(response.data.reason)
                  }
                })
            }
          } else {
            throw new Error(response.data.reason)
          }
        })
        .catch(err => {
          this.$store.dispatch('orderEmpty')
          MessageService.error.next(err.message)
        })
        .finally(() => (this.loading = false))
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
