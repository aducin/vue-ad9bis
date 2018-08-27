<template>
  <div class="backgroundHeader">
    <div class="detailContener">
      <h3 v-if="!orderData.action" class="left">{{ labels.order.detailsDefault }}</h3>
      <div v-if="orderData.action === 'even'">
          <p>{{ orderData.data }}</p>
      </div>
      <div v-if="orderData.action === 'order'">
        <order-customer v-bind:orderData="orderData"></order-customer>
        <order-table v-bind:card="orderData.card"></order-table>
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
          <transition mode="out-in" enter-active="enterTransition" enter-active-class="animated flipInX"
            leave-active-class="animated flipOutX">
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
import Customer from './Customer'
import Labels from '../../labels'
import Table from './Table'

export default {
  name: 'OrderDetail',
  data () {
    return {
      labels: Labels,
      number: '(00)',
      showNumber: false
    }
  },
  components: {
    'order-customer': Customer,
    'order-table': Table
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
  .marginTop {
    margin-top: 20px;
  }
</style>
