<template>
  <div>
    <div class="innerContent inputRow row">
      <div class="col col-12 col-md-7 col-lg-8 left">
        <label class="labelMargin">{{ labels.edition[id] }}</label>
      </div>
      <div class="col col-12 col-md-5 col-lg-4">
        <input
          @input="update"
          v-model="data.price[type]"
          type="text"
          class="form-control center" :id="id"
          :placeholder="placeholders.price"
        />
      </div>
    </div>
    <div v-if="data.discount[type]" class="alertHeight innerContent row col col-12">
      <div class="alert alert-danger text-center" role="alert">
        <p>{{ labels[label] }} {{ data.priceReal[type] | floatFixed | currency }}{{ labels.discount }}
          <span v-if="data.discount[type].reductionType === 'percentage'">{{ data.discount[type].percentage }}%</span>
          <span v-else>{{ data.discount[type].reduction | floatFixed | currency }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Labels from '../../../labels'
export default {
  name: 'PriceEdition',
  data () {
    return {
      labels: Labels.product,
      placeholders: Labels.placeholders
    }
  },
  methods: {
    update (e) {
      this.$emit('update', e)
    }
  },
  props: ['data', 'id', 'label', 'tag', 'type']
}
</script>

<style scoped>
label {
  display: block;
  text-align: left;
}
@media only screen and (min-width: 610px) {
  .alertHeight {
    height: 50px;
  }
}
@media only screen and (max-width: 609px) {
  .alertHeight {
    height: 70px;
  }
}
</style>
