<template>
  <div>
    <div v-if="action === 'even'">
        <div class="left margin">
        <router-link
            :to="`/order/${$route.params.db}/${$route.params.id}`"
            class="btn btn-primary buttons"
        >{{ labels.buttons.orderReturn }}</router-link>
        <router-link to="/order" tag="button" class="btn btn-danger buttons">{{ labels.buttons.clear }}</router-link>
        </div>
    </div>
    <div v-if="action === 'order'">
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
        leave-active-class="animated flipOutX"
      >
        <div v-if="showNumber" class="row marginTop">
          <div class="col col-sm-12 col-md-4">
            <label class="marginLabel">{{ labels.order.deliveryNumberFill }}</label>
          </div>
          <div class="col col-sm-12 col-md-4">
            <input type="text" v-model="number" class="form-control buttons" :placeholder="labels.placeholders.number" />
          </div>
          <div class="col col-sm-12 col-md-4 ">
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
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import Labels from '../../labels'

export default {
  name: 'OrderDetail',
  data () {
    return {
      labels: Labels,
      number: '(00)',
      showNumber: false
    }
  },
  methods: {
    sendEmail (action) {
      this.$emit('email', action)  
    }
  },
  props: ['action', 'id'],
  validations: {
    number: {
      required,
      minLength: minLength(10)
    }
  },
}
</script>

<style>
  .buttons {
    text-align: center;
  }
  .margin {
      margin-top: 20px;
      margin-bottom: 20px;
  }
  .marginLabel {
      margin-top: 5px;
  }
  @media only screen and (max-width: 767px) {
    .buttons {
        margin-bottom: 15px;
        width: 100%;
    }
    .marginTop {
      margin-top: 90px;
    }
  }
  @media only screen and (min-width: 768px) {
    .buttons {
        margin-right: 30px;
        max-width: 180px;
        width: 90%;
    }
    .marginTop {
      margin-top: 20px;
    }
  }
</style>
