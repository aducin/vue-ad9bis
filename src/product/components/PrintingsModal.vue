<template>
  <b-modal
    :ok-disabled="description.length < 5"
    @ok="save"
    @cancel="hideModal"
    id="printingsModal"
    ref="printingsModal"
    title="Bootstrap-Vue"
  >
    <template slot="modal-title">
      <span v-bind:class="{colorSuccess: type === 'success', invalid: type === 'error'}">{{ labels.newFile }}</span>
    </template>
    <template slot="modal-cancel">
      <span>{{ buttons.close }}</span>
    </template>
    <template slot="modal-ok">
      <span>{{ buttons.save }}</span>
    </template>
    <div class="content">
      <div class="col-sm-3 float-left">
        <p class="left">{{ labels.fileName }}</p>
      </div>
      <div class="col-sm-9 float-right">
        <p class="left"><b>{{ name }}</b></p>
      </div>
      <div class="col-sm-3 float-left">
        <label class="labelMargin">{{ labels.fileDesc }}</label>
      </div>
      <div class="col-sm-9 float-right">
        <input v-model="description" :disabled="disabled" type="text" class="form-control" :placeholder="placeholder" />
      </div>
    </div>
  </b-modal>
</template>

<script>
import Labels from '../../labels'
import ProductService from '../../services/productService'

export default {
  name: 'PrintingsModal',
  data () {
    return {
      buttons: Labels.buttons,
      description: '',
      disabled: false,
      labels: Labels.product,
      message: null,
      placeholder: Labels.placeholders.description,
      service: ProductService,
      type: null
    }
  },
  methods: {
    hideModal (evt) {
      this.$emit('fileDelete')
      this.$refs.printingsModal.hide()
    },
    save (evt) {
      evt.preventDefault()
      this.disabled = true
      this.$emit('addFile', this.description)
    }
  },
  props: ['name']
}
</script>

<style scoped>
.content {
  height: 65px;
  width: 100%;
}
</style>
