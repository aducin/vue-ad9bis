<template>
  <div class="innerContent row inputRow">
    <div class="col col-12 col-md-7 col-lg-8 left">
      <label class="labelMargin">{{ labels.edition[name] }}</label>
    </div>
    <div class="col col-12 col-md-5 col-lg-4">
      <b-form-select v-if="name !== 'manufactorer'"
        @input="update()"
        v-model="data[name]"
        :options="config.options[name]"
        class="mb-3 dataWidth"
      >
      </b-form-select>
      <b-form-select v-if="name === 'manufactorer'"
        @input="update()"
        v-model="data.manufacturer"
        :options="productManufactorers"
        class="mb-3 dataWidth"
      >
      </b-form-select>
    </div>
  </div>
</template>

<script>
import Config from '../../../config'
import Labels from '../../../labels'

import { mapGetters } from 'vuex'

export default {
  name: 'SelectRow',
  data () {
    return {
      config: Config,
      labels: Labels.product
    }
  },
  methods: {
    update () {
      this.$store.dispatch('productData', { edition: 'edition', data: {...this.data} })
    }
  },
  props: ['data', 'name'],
  computed: mapGetters([
    'productManufactorers'
  ])
}
</script>

<style scoped>
</style>
