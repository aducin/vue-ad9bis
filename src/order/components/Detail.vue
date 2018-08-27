<template>
  <div class="backgroundHeader">
    <div class="detailContener">
      <h3 v-if="!orderData.action" class="left">{{ labels.order.detailsDefault }}</h3>
      <div v-if="orderData.action === 'even'">
          <p>{{ orderData.data }}</p>
      </div>
      <div v-if="orderData.action === 'order'">
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
                <td class="paddingTop">
                  <a :href="link + item.productId + '-' + item.linkRewrite + '.html'" target="blank" class="pointer">{{ item.productName }}</a>
                  </td>
                <td class="paddingTop">{{ item.quantity.current }}</td>
                <td class="paddingTop">{{ item.quantity.toUpdate }}</td>
                <td class="paddingTop">{{ item.productQuantity }}</td>
                <td class="paddingTopButton">
                  <a :href="'/product/' + item.productId + '/edition'" target="blank" class="btn btn-primary pointer" >{{ labels.order.edition }}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="container marginTop">
          <div class="row">
            <div class="col col-sm-6 col-md-4">
              <router-link :to="`${orderData.id}/even`" class="btn btn-primary buttons">{{ labels.buttons.even }}</router-link>
            </div>
            <div class="col col-sm-6 col-md-4">
              <router-link to="/order" tag="button" class="btn btn-danger buttons">{{ labels.buttons.clear }}</router-link>
            </div>
            <div class="col col-sm-6 col-md-4">
              <button @click="showNumber = !showNumber" class="btn btn-primary buttons">
                <span v-if="!showNumber">{{ labels.order.deliveryNumberFill }}</span>
                <span v-if="showNumber">{{ labels.order.deliveryHide }}</span>
              </button>
            </div>
          </div>
          <transition
            mode="out-in"
            enter-active="enterTransition"
            enter-active-class="animated flipInX"
            leave-active-class="animated flipOutX"
          >
            <div v-if="showNumber" class="row marginTop">
              <div class="col col-sm-6 col-md-4">
                <label>{{ labels.order.deliveryNumberFill }}</label>
              </div>
              <div class="col col-sm-6 col-md-4">
                <input type="text" v-model="number" class="form-control buttons" :placeholder="labels.placeholders.number" />
              </div>
              <div class="col col-sm-6 col-md-4">
                <button
                  :disabled="$v.$invalid"
                  @click="sendEmail('deliveryNumber')"
                  class="btn btn-primary buttons"
                >{{ labels.order.deliveryNumber }}</button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import Config from '../../config'
import Labels from '../../labels'

export default {
  name: 'OrderDetail',
  data () {
    return {
      currency: Config.currency,
      headers: Config.options.orderDetailHeaders,
      labels: Labels,
      link: Config.linkUrl + Config.linkSuffix,
      number: '(00)',
      showNumber: false
    }
  },
  methods: {
    sendEmail (action) {
      console.log(action)
    }
  },
  computed: mapGetters([
    'orderData',
    'orderEven'
  ]),
  validations: {
    number: {
      required,
      minLength: minLength(10)
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
    padding-top: 34px;
  }
  .paddingTopButton {
    padding-top: 29px;
  }
  .tableContent {
    width: 100%;
    margin: auto;
    margin-top: 10px;
  }
</style>
