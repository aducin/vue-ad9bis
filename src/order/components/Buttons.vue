<template>
  <div>
    <div v-if="order.action === 'discount' || order.action === 'mail'" class="row">
      <div class="col col-sm-12 col-md-4">
        <a :href="`${mail}${$route.params.db}/${$route.params.id}/mail?action=${order.action}&result=display`" class="btn btn-primary buttons">{{ labels.buttons.showMail }}</a>
      </div>
      <div class="col col-sm-12 col-md-4">
        <button @click="sendEmail(order.action)" class="btn btn-primary buttons">{{ labels.buttons.sendMail }}</button>
      </div>
      <div class="col col-sm-12 col-md-4">
        <router-link to="/order" tag="button" class="btn btn-danger buttons">{{ labels.buttons.clear }}</router-link>
      </div>
    </div>
    <div v-if="order.action === 'even'" class="left margin">
      <router-link
        :to="`/order/${$route.params.db}/${$route.params.id}`"
        class="btn btn-primary buttons"
        >{{ labels.buttons.orderReturn }}</router-link>
      <router-link to="/order" tag="button" class="btn btn-danger buttons">{{ labels.buttons.clear }}</router-link>
    </div>
    <div v-if="order.action === 'order'">
      <div class="row">
        <div class="col col-sm-12 col-md-4">
          <router-link :to="`${$route.params.id}/even`" class="btn btn-primary buttons">{{ labels.buttons.even }}</router-link>
        </div>
        <div class="col col-sm-12 col-md-4">
          <router-link to="/order" tag="button" class="btn btn-danger buttons">{{ labels.buttons.clear }}</router-link>
        </div>
        <div class="col col-sm-12 col-md-4">
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
        leave-active-class="animated flipOutX">
        <div v-if="showNumber" class="row marginTop">
          <div class="col col-sm-12 col-md-4">
            <label class="marginLabel">{{ labels.order.deliveryNumberFill }}</label>
          </div>
          <div class="col col-sm-12 col-md-4">
            <input type="text" v-model="number" class="form-control inputs" :placeholder="labels.placeholders.number" />
          </div>
          <div class="col col-sm-12 col-md-4">
            <button
              :disabled="$v.$invalid"
              @click="sendEmail('deliveryNumber')"
              class="btn btn-primary buttons"
            >{{ labels.order.deliveryNumber }}</button>
          </div>
        </div>
      </transition>
    </div>
    <div v-if="order.action === 'voucher'" class="row">
      <div v-if="order.data.data" class="col col-12 col-md-12 col-lg-3 left margin5">
        <label>
          <span>{{ labels.order.voucherNumberShort }} <b>{{ voucherNumber }}</b></span>
          <font-awesome-icon
            v-b-tooltip.hover
            :title="labels.order.voucherNumberAdd"
            @click="changeVoucher(true)"
            icon="plus-circle"
            class="pointer marginLeft5px"
          />
          <font-awesome-icon
            v-b-tooltip.hover
            :title="labels.order.voucherNumberSubtract"
            @click="changeVoucher(false)"
            icon="minus-circle"
            class="pointer marginLeft5px"
          />
        </label>
      </div>
      <div v-if="!order.data.data" class="col col-12 col-md-8 col-lg-9 left margin5">
        <h3 class="left">{{ labels.order.noVoucher }}</h3>
      </div>
      <div v-if="order.data.data" class="col col-12 col-md-4 col-lg-3">
        <a
          :href="`${mail}${$route.params.db}/${$route.params.id}/mail?action=${order.action}&result=display&voucherNumber=${voucherNumber}`"
          class="btn btn-primary buttons"
          target="blank"
        >{{ labels.buttons.showMail }}</a>
      </div>
      <div v-if="order.data.data" class="col col-12 col-md-4 col-lg-3">
        <button @click="sendEmail(order.action)" class="btn btn-primary buttons">{{ labels.buttons.sendMail }}</button>
      </div>
      <div class="col col-12 col-md-4 col-lg-3">
          <router-link to="/order" tag="button" class="btn btn-danger buttons">{{ labels.buttons.clear }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import Config from '../../config'
import Labels from '../../labels'

export default {
  name: 'OrderDetail',
  data () {
    return {
      labels: Labels,
      mail: Config.mailSuffix,
      number: '(00)',
      showNumber: false,
      voucherNumber: 0
    }
  },
  methods: {
    changeVoucher (add) {
      if (add && this.voucherNumber < 5) {
        this.voucherNumber++
      } else if (add && this.voucherNumber === 5) {
        this.voucherNumber = 0
      } else if (!add && this.voucherNumber > 0) {
        this.voucherNumber--
      } else {
        this.voucherNumber = 5
      }
    },
    sendEmail (action) {
      this.$emit('email', action)
    }
  },
  props: ['order', 'id', 'voucher'],
  validations: {
    number: { required, minLength: minLength(10) }
  },
  watch: {
    '$store.state.order.voucher' () {
      this.voucherNumber = this.$store.state.order.voucher
    }
  }
}
</script>

<style scoped>
  .inputs {
    text-align: center;
    margin-bottom: 15px;
  }
  .margin {
      margin-top: 20px;
      margin-bottom: 20px;
  }
  .margin5 {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .marginLabel {
      margin-top: 5px;
  }
  .marginLeft5px {
    margin-left: 5px;
  }
  @media only screen and (max-width: 1199px) and (min-width: 767px) {
    .inputs {
      width: 90%;
    }
  }
  @media only screen and (min-width: 1200px) {
    .inputs {
      width: 75%;
    }
  }
  @media only screen and (max-width: 767px) {
    .marginTop {
      margin-top: 90px;
    }
  }
  @media only screen and (min-width: 768px) {
    .marginTop {
      margin-top: 20px;
    }
  }
</style>
