<template>
  <div class="backgroundHeader">
    <div class="detailContener">
      <h3 v-if="!orderData.action" class="left">{{ labels.detailsDefault }}</h3>
      <div v-else>
        <h3 class="left">{{ labels.detailsHeader }} {{ orderData.id }} ({{ orderData.data.reference }}) -
          <span v-if="!orderData.db === 'new'"> {{ labels.db.new }}</span>
          <span v-else> {{ labels.db.old }}</span>
        </h3>
        <div class="gridRow">
          <div class="marginTop">
            <div class="row"><label>{{ labels.customer }}</label></div>
            <div class="row"><label>{{ labels.email }}</label></div>
            <div class="row"><label>{{ labels.amount }}</label></div>
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
        <div class="tableContent">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th v-for="item in headers" :key="item">{{ item }}</th>
              </tr>
            </thead>
            <tbody class="table-striped">
              <tr v-for="item in orderData.card" :key="item.productId">
                <td><img :src="item.cover" height="70" width="70" class="imgBorder"></td>
                <td class="paddingTop">{{ item.productId }}</td>
                <td class="paddingTop"><a :href="item.linkRewrite" target="blank" class="pointer">{{ item.productName }}</a></td>
                <td class="paddingTop">{{ item.quantity.current }}</td>
                <td class="paddingTop">{{ item.quantity.toUpdate }}</td>
                <td class="paddingTop">{{ item.productQuantity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>{{ orderData.card }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Config from '../../config'
import Labels from '../../labels'

export default {
  name: 'OrderDetail',
  data () {
    return {
      currency: Config.currency,
      headers: Config.options.orderDetailHeaders,
      labels: Labels.order
    }
  },
  computed: mapGetters([
    'orderData'
  ])
}
</script>

<style scoped>
  .gridRow {
    width: 80%;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
  .imgBorder {
    border: 1px solid #BDBBBB;
    border-radius: 5px;
  }
  .marginTop {
    margin-top: 20px;
  }
  .paddingTop {
    padding-top: 32px;
  }
  .tableContent {
    width: 100%;
    margin: auto;
    margin-top: 20px;
  }
</style>
