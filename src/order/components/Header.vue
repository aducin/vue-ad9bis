<template>
  <div class="backgroundHeader">
    <div class="headerTitle">
      <h3 class="left">{{ labels.title }}</h3>
    </div>
    <div class="headerContainer">
      <div v-bind:class="{invalid: $v.selected.order.$error}" class="left absoluteLabel">
        <label>{{ labels.chooseOrder }}</label>
      </div>
      <div>
        <b-form-select
          v-model="selected.orderOption"
          :options="options.orders"
          @change="selected.actionOption = null"
          class="mb-3 floatLeft smallerInput"
        >
          <template slot="first">
            <option :value="null" disabled>-- {{ labels.choose }} --</option>
          </template>
        </b-form-select>
      </div>
      <div>
        <input
          type="text"
          :disabled="!selected.orderOption"
          @input="$v.selected.order.$touch()"
          v-model="selected.order"
          v-bind:class="{invalidBorder: $v.selected.order.$error}"
          class="form-control floatRight smallerInput"
          :placeholder="placeholders.chooseNumber"
        />
      </div>
      <div class="right absoluteButton first">
        <button
          @click="searchOrder"
          :disabled="!selected.orderOption || selected.order < 1 || $v.selected.order.$error"
          type="button"
          class="btn btn-primary absoluteWidth"
        >Wyszukaj</button>
      </div>
      <div v-bind:class="{invalid: $v.selected.action.$error}" class="left absoluteLabel second">
        <label>{{ labels.chooseAction }}</label>
      </div>
      <div>
        <b-form-select
          v-model="selected.actionOption"
          :options="options.actions"
          @change="selected.orderOption = null"
          class="mb-3 floatLeft smallerInput"
        >
          <template slot="first">
            <option :value="null" disabled>-- {{ labels.choose }} --</option>
          </template>
        </b-form-select>
      </div>
      <div>
        <input
          type="text"
          :disabled="!selected.actionOption"
          @input="$v.selected.action.$touch()"
          v-model="selected.action"
          v-bind:class="{invalidBorder: $v.selected.action.$error}"
          class="form-control floatRight smallerInput"
          :placeholder="placeholders.chooseNumber"
        />
      </div>
      <div class="right absoluteButton third">
        <button
          @click="searchAction"
          :disabled="!selected.actionOption || selected.action < 1 || $v.selected.action.$error"
          type="button"
          class="btn btn-primary absoluteWidth"
      >Wyszukaj</button>
      </div>
    </div>
  </div>
</template>

<script>
import { required, numeric } from 'vuelidate/lib/validators'
import Config from '../../config'
import Labels from '../../labels'

export default {
  name: 'OrderHeader',
  data () {
    return {
      labels: Labels.order,
      options: Config.options,
      placeholders: Labels.placeholders,
      selected: {
        action: null,
        actionOption: null,
        order: null,
        orderOption: null
      }
    }
  },
  methods: {
    handleAction () {
      this.$v.selected.action.$touch()
      this.selected.orderOption = null
    },
    handleOrder () {
      this.$v.selected.order.$touch()
      this.selected.actionOption = null
    },
    searchAction () {
    },
    searchOrder () {
      let db = this.selected.orderOption === 1 ? 'new' : 'old'
      this.$router.push({ name: 'orderDetails', params: {db, id: this.selected.order} })
    }
  },
  validations: {
    selected: {
      action: {
        required,
        numeric
      },
      order: {
        required,
        numeric
      }
    }
  }
}
</script>

<style scoped>
.headerContainer {
  margin: auto;
  margin-bottom: 40px;
  padding-bottom: 10px;
  width: 80%;
}
@media only screen and (max-width: 900px) and (min-width: 720px) {
    .absoluteButton {
      position: absolute;
    }
    .absoluteLabel {
      position: absolute;
      width: 200px;
    }
    .absoluteWidth {
      min-width: 220px;
    }
    .first {
      margin-top: 65px;
    }
    .headerContainer {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .second {
      margin-top: 110px;
    }
    .smallerInput {
      width: 85%;
      margin-top: 25px;
      margin-bottom: 55px;
    }
    .third {
      margin-top: 175px;
    }
  }
  @media only screen and (min-width: 901px) {
    .absoluteWidth {
      min-width: 100px;
    }
    .headerContainer {
      display: grid;
      grid-template-columns: 1.1fr 1.1fr 1.1fr 0.7fr;
    }
    .smallerInput {
      width: 85%;
    }
  }
  @media only screen and (max-width: 719px) {
    .absoluteWidth {
      min-width: 100%;
      margin-top: 12px;
      margin-bottom: 20px;
    }
  }
</style>
