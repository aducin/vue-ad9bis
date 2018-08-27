<template>
  <div>
    <h3 class="left">{{ labels.order.detailsHeader }} {{ orderData.id }} ({{ orderData.data.reference }}) -
      <span v-if="!orderData.db === 'new'"> {{ labels.order.db.new }}</span>
      <span v-else> {{ labels.order.db.old }}</span>
    </h3>
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
  </div>
</template>

<script>
import Labels from '../../labels'

export default {
  name: 'Customer',
  data () {
    return {
      labels: Labels
    }
  },
  props: ['orderData']
}
</script>

<style scoped>
  .gridRow {
    width: 80%;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
</style>
