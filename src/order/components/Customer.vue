<template>
  <div>
    <span v-if="orderData.action === 'even'">
      <h3 class="left marginBottom20px">{{ labels.order.evenHeader }} {{ id }} - {{ db }}</h3>
    </span>
    <span v-if="orderData.action === 'discount' || orderData.action === 'mail' || orderData.action === 'order'">
      <h3 class="left marginBottom20px">{{ labels.order.detailsHeader }} {{ id }} ({{ orderData.data.reference }}) - {{ db }}</h3>
      <div class="gridRow">
        <div class="marginTop">
          <div class="row"><label>{{ labels.order.customer }}</label></div>
          <div class="row"><label>{{ labels.order.email }}</label></div>
          <div class="row"><label>{{ labels.order.amount }}</label></div>
        </div>
        <div class="marginTop">
          <div class="row">
            <p><b>{{ orderData.customer.firstname }} {{ orderData.customer.lastname }}</b></p>
          </div>
          <div class="row">
            <p><b>{{ orderData.customer.email }}</b></p>
          </div>
          <div class="row">
            <p><b>{{ orderData.data.totalPaid }}{{ currency }}</b></p>
          </div>
        </div>
      </div>
    </span>
    <span v-if="orderData.action === 'voucher'">
      <h3 class="left marginBottom20px">{{ labels.order.voucherTitle }} {{ orderData.customer.firstname }} {{ orderData.customer.lastname }}</h3>
      <div class="gridRow">
        <div class="marginTop">
          <div class="row"><label>{{ labels.order.email }}</label></div>
          <div class="row"><label>{{ labels.order.lastVoucher }}</label></div>
        </div>
        <div class="marginTop">
          <div class="row">
            <p><b>{{ orderData.customer.email }}</b></p>
          </div>
          <div class="row">
            <p><b>{{ orderData.voucher }}</b></p>
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import Config from '../../config'
import Labels from '../../labels'

export default {
  name: 'Customer',
  data () {
    return {
      currency: Config.currency,
      labels: Labels
    }
  },
  props: ['db', 'id', 'orderData']
}
</script>

<style scoped>
  .gridRow {
    width: 80%;
    margin: auto;
    display: grid;
    grid-template-columns: 2fr 3fr;
  }
</style>
