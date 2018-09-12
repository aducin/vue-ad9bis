<template>
  <b-modal
    :ok-disabled="$v.$invalid || (!data.cashTime && !data.receiptTime)"
    @ok="handleSave"
    id="accountModal"
    ref="accountModal"
  >
    <template slot="modal-title">
      <span v-bind:class="{colorSuccess: type === 'success', invalid: type === 'error'}">
        <span v-if="!display && action === 'new'">{{ labels.modalNew }}</span>
        <span v-if="!display && action === 'edit'">{{ labels.modalEdit }}</span>
        <span v-else>{{ display }}</span>
      </span>
    </template>
    <div class="content">
      <single-select v-bind:data="data" name="type" type="types"></single-select>
      <single-select v-bind:data="data" name="closed" type="states"></single-select>
      <single-row v-bind:data="data" v-bind:show="display" name="recipient" text="name" type="big"></single-row>
      <single-row
        v-bind:data="data" v-bind:show="display" name="address" text="deliverynumber" type="big"
      ></single-row>
      <single-datepicker v-bind:data="data" name="cashTime" type="cashTimeData"></single-datepicker>
      <single-datepicker v-bind:data="data" name="receiptTime" type="receiptTimeData"></single-datepicker>
      <single-row v-bind:data="data" v-bind:show="display" name="amount" text="ammount" type="small"></single-row>
      <single-row v-bind:data="data" v-bind:show="display" name="receipt" text="number" type="small"></single-row>
      <single-row v-bind:data="data" v-bind:show="display" name="locs" text="number" type="small"></single-row>
      <single-row v-bind:data="data" v-bind:show="display" name="coach" text="number" type="small"></single-row>
      <single-row v-bind:data="data" v-bind:show="display" name="element" text="number" type="small"></single-row>
      <single-row v-bind:data="data" v-bind:show="display" name="accessories" text="number" type="small"></single-row>
      <single-row v-bind:data="data" v-bind:show="display" name="book" text="number" type="small"></single-row>
      <single-row v-bind:data="data" v-bind:show="display" name="car" text="number" type="small"></single-row>
      <single-row v-bind:data="data" v-bind:show="display" name="remarks" text="remarks" type="big"></single-row>
      <p>{{ $v.$invalid }}</p>
      <p>{{ data }}</p>
    </div>
    <template slot="modal-cancel">
      <span>{{ buttons.close }}</span>
    </template>
    <template slot="modal-ok">
      <span>{{ buttons.save }}</span>
    </template>
  </b-modal>
</template>

<script>
import Config from '../../config'
import Labels from '../../labels'
import SingleDatepicker from './modal/singleDatepicker.vue'
import SingleRow from './modal/singleRow.vue'
import SingleSelect from './modal/singleSelect.vue'
import { required, numeric } from 'vuelidate/lib/validators'
import { floatNumber } from '../../functions/floatNumber'
import { setDate } from '../../functions/setDate'

export default {
  name: 'AccountModal',
  data () {
    return {
      buttons: Labels.buttons,
      disable: true,
      display: false,
      labels: Labels.account,
      options: Config.options,
      placeholders: Labels.placeholders,
      type: null
    }
  },
  components: {
    'single-datepicker': SingleDatepicker,
    'single-row': SingleRow,
    'single-select': SingleSelect
  },
  methods: {
    handleSave () {
      console.log('saved clicked')
    },
    setDate (type, current) {
      this.data[type] = setDate(this.data[current])
    }
  },
  props: ['action', 'data'],
  validations: {
    data: {
      amount: { required, floatNumber },
      recipient: { required },
      type: { required, numeric },
      closed: { required, numeric },
      locs: { numeric },
      coach: { numeric },
      element: { numeric },
      accessories: { numeric },
      car: { numeric },
      book: { numeric }
    }
  }
}
</script>

<style scoped>
</style>
