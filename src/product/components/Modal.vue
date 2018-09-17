<template>
  <b-modal id="basicModal" ref="basicModal">
    <template slot="modal-title">
      <span v-bind:class="{colorSuccess: type === 'success', invalid: type === 'error'}">
        <span v-if="!display">{{ labels.modalTitle }}{{ data.id }}</span><span v-else>{{ display }}</span>
      </span>
    </template>
    <template slot="modal-footer">
      <div class="col col-12 col-sm-3 buttonRow">
        <button
          @click="handleSave"
          :disabled="disabled || display"
          class="btn btn-primary"
          v-bind:class="{notAllowed: disabled}"
        >{{ buttons.save }}</button>
      </div>
      <div class="col col-12 col-sm-3 buttonRow">
        <button @click="redirect('productEdition')" class="btn btn-primary">{{ buttons.edition }}</button>
      </div>
      <div class="col col-12 col-sm-3 buttonRow">
        <button @click="redirect('productHistory')" class="btn btn-primary">{{ buttons.history }}</button>
      </div>
      <div class="col col-12 col-sm-3 buttonRow">
        <button @click="close" class="btn btn-danger">{{ buttons.close }}</button>
      </div>
    </template>
    <div class="d-block text-center">
      <img
        :src="config.imageUrl + data.id + '-' + data.image + '-thickbox.jpg'"
        class="imgBorder marginImg"
        height="300"
        width="300"
      >
      <div class="row rowHeight">
        <div class="col-md-3 col-lg-2 left">
          <label class="labelMargin">{{ labels.edition.name }}</label>
        </div>
        <div class="col-md-9 col-lg-10">
          <input
            :disabled="display"
            @input="update"
            v-model="data.name"
            type="text"
            class="form-control" id="name"
            :placeholder="placeholders.name"
          />
        </div>
      </div>
      <div class="row rowHeight">
        <div class="col-md-3 col-lg-2 left">
          <label v-bind:class="{invalid: error.quantity}" class="labelMargin">{{ labels.edition.quantity }}</label>
        </div>
        <div class="col-md-9 col-lg-10">
          <input type="text"
            v-if="data.quantity"
            :disabled="display"
            @input="update"
            v-model="data.quantity.old"
            v-bind:class="{invalidBorder: error.quantity}"
            class="form-control center" id="quantity"
            :placeholder="placeholders.quantity"
          />
        </div>
      </div>
      <div v-if="data.quantity && data.quantity.new !== data.quantity.old" class="row rowInvalid">
        <div class="col-12 invalid right">
          <span>{{ labels.quantityNotEqual }}{{ data.quantity.new }}</span>
        </div>
      </div>
      <div class="row rowHeight">
        <div class="col-md-3 col-lg-2 left">
          <label v-bind:class="{invalid: error.price}" class="labelMargin">{{ labels.edition.price }}</label>
        </div>
        <div class="col-md-9 col-lg-10">
          <input type="text"
            v-if="data.price"
            :disabled="display || data.discount && (data.discount.new || data.discount.old)"
            @input="update"
            v-model="data.price.old"
            v-bind:class="{invalidBorder: error.price}"
            class="form-control center" id="price"
            :placeholder="placeholders.price"
          />
        </div>
      </div>
      <div v-if="data.discount && (data.discount.new || data.discount.old)" class="row">
        <div class="col-12 invalid right">
          <span>{{ labels.priceRealNew }}{{ data.priceReal.new }}{{ config.currency }}</span>
          <span>{{ labels.priceNew }}{{ data.price.new }}{{ config.currency }}</span>
          <span>{{ labels.basicDisabled }}</span>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import ProductService from '../../services/productService'
import universalMixin from '../../mixins/universal'
import Config from '../../config'
import Labels from '../../labels'

export default {
  name: 'ProductModal',
  mixins: [universalMixin],
  data () {
    return {
      config: Config,
      disabled: true,
      display: false,
      error: { quantity: false, price: false },
      labels: Labels.product,
      type: null
    }
  },
  props: ['data', 'list'],
  methods: {
    close () {
      this.$refs.basicModal.hide()
      this.$emit('closeModal')
    },
    handleSave () {
      ProductService.setUpdate({...this.date})
        .then(response => {
          this.type = response.data.success ? 'success' : 'error'
          this.display = response.data.reason
          if (response.data.success && this.list) {
            ProductService.nameSearch.next()
          }
        })
        .finally(() => this.setMessage())
    },
    redirect (type) {
      this.close()
      this.$router.push({ name: type, params: {id: this.data.id} })
    },
    setMessage () {
      setTimeout(() => {
        this.display = false
        this.close()
      }, this.config.timer)
    },
    update (e) {
      let curData = {...this.data}
      if (e.target.id === 'name') {
        curData.name = e.target.value
      } else if (e.target.id === 'quantity') {
        this.error.quantity = isNaN(e.target.value)
        curData.quantity = { new: e.target.value, old: e.target.value }
      } else if (e.target.id === 'price') {
        this.error.price = isNaN(e.target.value.replace(',', '.'))
        curData.price = { new: e.target.value, old: e.target.value }
      }
      this.disabled = this.error.quantity || this.error.price
      this.$store.dispatch('productData', { edition: 'basic', data: curData, list: this.list })
    }
  }
}
</script>

<style scoped>
button {
    margin-bottom: 10px;
    margin-right: 10px;
    width: 100px;
}
.invalid {
    margin-top: 5px;
}
.marginImg {
    margin-top: 10px;
    margin-bottom: 20px;
}
.row {
    width: 95%;
    margin: auto;
}
@media only screen and (max-width: 767px) {
  .labelMargin {
    margin-top: 5px;
  }
  .rowHeight {
    height: 60px;
  }
  .rowInvalid {
    height: 30px;
  }
}
@media only screen and (max-width: 767px) {
  .buttonRow {
    height: 50px;
  }
}
</style>
