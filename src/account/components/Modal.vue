<template>
  <b-modal
    :ok-disabled="$v.$invalid || (!data.cashTime && !data.receiptTime)"
    @ok="handleSave"
    id="accountModal"
    ref="accountModal"
  >
    <template slot="modal-title">
      <span v-bind:class="{colorSuccess: type === 'success', invalid: type === 'error'}">
        <span v-if="!display && action === 'add'">{{ labels.modalNew }}</span>
        <span v-if="!display && action === 'edit'">{{ labels.modalEdit }}</span>
        <span v-if="display">{{ display }}</span>
      </span>
    </template>
    <div class="content">
      <single-select :action="action" :data="data" :show="disable" name="type" type="types"></single-select>
      <single-select :action="action" :data="data" :show="disable" name="closed" type="states"></single-select>
      <single-row :data="data" :show="disable" name="recipient" text="name" type="big"></single-row>
      <single-row :data="data" :show="disable" name="address" text="deliverynumber" type="big"></single-row>
      <single-datepicker :data="data" name="cashTime" type="cashTimeData"></single-datepicker>
      <single-datepicker :data="data" name="receiptTime" type="receiptTimeData"></single-datepicker>
      <single-row :data="data" :show="disable" name="amount" text="ammount" type="small"></single-row>
      <single-row :data="data" :show="disable" name="receipt" text="number" type="small"></single-row>
      <single-row :data="data" :show="disable" name="locs" text="number" type="small"></single-row>
      <single-row :data="data" :show="disable" name="coach" text="number" type="small"></single-row>
      <single-row :data="data" :show="disable" name="element" text="number" type="small"></single-row>
      <single-row :data="data" :show="disable" name="accessories" text="number" type="small"></single-row>
      <single-row :data="data" :show="disable" name="book" text="number" type="small"></single-row>
      <single-row :data="data" :show="disable" name="car" text="number" type="small"></single-row>
      <single-row :data="data" :show="disable" name="remarks" text="remarks" type="big"></single-row>
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
import AccountService from '../../services/accountService'
import Config from '../../config'
import Labels from '../../labels'
import SingleDatepicker from './modal/singleDatepicker.vue'
import SingleRow from './modal/singleRow.vue'
import SingleSelect from './modal/singleSelect.vue'
import { accountValidator } from '../../states/accountModalValidator'
import { setDate } from '../../functions/setDate'

export default {
  name: 'AccountModal',
  data () {
    return {
      buttons: Labels.buttons,
      disable: false,
      display: false,
      labels: Labels.account,
      type: null
    }
  },
  components: {
    'single-datepicker': SingleDatepicker,
    'single-row': SingleRow,
    'single-select': SingleSelect
  },
  methods: {
    handleSave (evt) {
      evt.preventDefault()
      this.disable = true
      let finalObj = {...this.data, action: this.action, token: this.$store.state.token}
      let promise = this.action === 'add' ? AccountService.setNew(finalObj) : AccountService.modify(finalObj)
      promise
        .then(response => {
          this.type = response.data ? 'success' : 'error'
          this.display = response.data.reason
          setTimeout(() => {
            this.display = false
            this.disable = false
            this.$refs.accountModal.hide()
          }, Config.timer)
        })
    },
    setDate (type, current) {
      this.data[type] = setDate(this.data[current])
    }
  },
  props: ['action', 'data'],
  validations: {
    data: accountValidator
  }
}
</script>

<style scoped>
</style>
