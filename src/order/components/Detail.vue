<template>
  <div class="backgroundHeader">
    <div class="detailContener">
      <p v-if="orderData.action === 'discount'">{{ orderData }}</p>
      <h3 v-if="!orderData.action" class="left">{{ labels.order.detailsDefault }}</h3>
      <order-customer v-bind:db="db" v-bind:id="this.$route.params.id" v-bind:orderData="orderData"></order-customer>
      <order-table v-bind:data="orderData" v-bind:even="even"></order-table>
      <div v-if="orderData.action === 'even'">
        <order-buttons v-bind:action="orderData.action"></order-buttons>
      </div>
      <div v-if="orderData.action === 'order'">
        <div class="container marginTop">
          <order-buttons
            v-bind:action="orderData.action"
            @email="email"
          ></order-buttons>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Buttons from './Buttons'
import Customer from './Customer'
import Labels from '../../labels'
import Table from './Table'

export default {
  name: 'OrderDetail',
  data () {
    return {
      db: this.$route.params.db === 'new' ? Labels.order.db.new : Labels.order.db.old,
      even: this.$route.params.db === 'new' ? { base: '(NP)', second: '(SP)' } : { base: '(SP)', second: '(NP)' },
      labels: Labels
    }
  },
  components: {
    'order-buttons': Buttons,
    'order-customer': Customer,
    'order-table': Table
  },
  methods: {
    email (action) {
      console.log(action)
    }
  },
  computed: mapGetters([
    'orderData',
    'orderEven'
  ]),
  watch: {
    '$route.params' () {
      this.db = this.$route.params.db === 'new' ? Labels.order.db.new : Labels.order.db.old
      this.even = this.$route.params.db === 'new' ? { base: '(NP)', second: '(SP)' } : { base: '(SP)', second: '(NP)' }
    }
  }
}
</script>

<style scoped>
  .buttons {
    margin: auto;
    margin-bottom: 20px;
    max-width: 180px;
    text-align: center;
    width: 90%;
  }
  .marginTop {
    margin-top: 20px;
  }
</style>
