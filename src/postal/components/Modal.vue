<template>
    <b-modal
      :ok-disabled="disable || $v.$invalid || newAmount === '0'"
      @ok="handleSave"
      id="postalModal"
      ref="postalModal"
    >
        <div class="content">
          <div>
            <div v-bind:class="{invalid: $v.newAmount.$error}" class="row">
              <label>{{ labels.ammountNow }}</label>
            </div>
            <div class="row">
              <label>{{ labels.amountAfterChange }}</label>
            </div>
          </div>
          <div>
            <div class="row">
              <input
              type="text"
              :disabled="disable || $v.$invalid"
              @input="$v.newAmount.$touch()"
              v-model="newAmount"
              v-bind:class="{invalidBorder: $v.newAmount.$error}"
              class="form-control floatRight smallerInput"
              :placeholder="placeholder"
            />
            </div>
            <div class="row">
              <h3 class="marginLeft">{{ currentAmount }}{{ currency }}</h3>
            </div>
          </div>
        </div>
        <template slot="modal-title">
          <span v-bind:class="{colorSuccess: type === 'success', invalid: type === 'error'}">{{ actionTitle }}</span>
        </template>
        <template slot="modal-cancel">
          <span>{{ buttons.close }}</span>
        </template>
        <template slot="modal-ok">
          <span>{{ buttons.save }}</span>
        </template>
    </b-modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import PostalService from '../../services/postalService'
import Config from '../../config'
import Labels from '../../labels'

const floatNumber = (value) => !isNaN(value.replace(',', '.'))

export default {
  name: 'PostalModal',
  data () {
    return {
      currency: Config.currency,
      disable: false,
      display: false,
      labels: Labels.postal,
      buttons: Labels.buttons,
      message: undefined,
      newAmount: '0',
      placeholder: Labels.placeholders.amount,
      title: undefined,
      type: undefined
    }
  },
  methods: {
    handleSave (evt) {
      evt.preventDefault()
      this.disable = true
      let data = {
        action: this.action,
        amount: this.currentAmount,
        currentAmount: this.amount,
        token: this.$store.state.token
      }
      PostalService.setPostal({data})
        .then(response => {
          this.type = response.data.success ? 'success' : 'error'
          this.message = response.data.reason
          this.display = true
          setTimeout(() => {
            this.disable = this.display = false
            this.message = this.type = undefined
            this.newAmount = '0'
            if (response.data.success) {
              this.$emit('refresh')
            }
            this.$refs.postalModal.hide()
          }, Config.timer)
        })
    }
  },
  computed: {
    actionTitle: function () {
      let title
      if (!this.display) {
        title = this.action === 'add' ? this.labels.add : this.labels.subtract
      } else {
        title = this.message
      }
      return title
    },
    currentAmount: function () {
      if (!floatNumber(this.newAmount)) {
        return this.amount
      } else {
        let amount = parseFloat(this.amount)
        let newAmount = this.newAmount ? parseFloat(this.newAmount.replace(',', '.')) : 0
        let result = this.action === 'add' ? amount + newAmount : amount - newAmount
        return result.toFixed(2)
      }
    }
  },
  props: ['action', 'amount'],
  validations: {
    newAmount: {
      required,
      floatNumber
    }
  }
}
</script>

<style scoped>
  .content {
    width: 80%;
    margin: auto;
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .marginLeft {
    margin-left: 30%;
  }
</style>
