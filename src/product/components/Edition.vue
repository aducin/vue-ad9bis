<template>
  <div class="content">
      <a :href="config.linkUrl + $route.params.id + '-' + data.url + '.html'" target="blank" class="pointer">
        <h3 class="left">{{ labels.editionTitle }}{{ $route.params.id }}</h3>
      </a>
      <single-row v-bind:data="data" type="name" @update="updateData"></single-row>
      <single-row v-bind:data="data" type="descriptionShort" @update="updateData"></single-row>
      <single-row v-bind:data="data" type="description" @update="updateData"></single-row>
      <single-row v-bind:data="data" type="url" @update="updateData"></single-row>
      <single-row v-bind:data="data" type="metaTitle" @update="updateData"></single-row>
      <single-row v-bind:data="data" type="metaDescription" @update="updateData"></single-row>
      <single-row v-bind:data="data" type="tags" @update="updateData"></single-row>
      <single-row v-bind:data="data" type="quantity" @update="updateData"></single-row>
      <price-row v-bind:data="data" id="priceNew" label="priceRealNew" type="new" @update="updateData"></price-row>
      <price-row v-bind:data="data" id="priceOld" label="priceRealOld" type="old" @update="updateData"></price-row>
      <div class="innerContent row inputRow">
        <div class="col col-12 col-md-7 col-lg-8 left">
          <label class="labelMargin">{{ labels.edition.manufactorer }}</label>
        </div>
        <div class="col col-12 col-md-5 col-lg-4">
          <b-form-select
            @input="updateSelect('manufacturer')"
            v-model="data.manufacturer"
            :options="productManufactorers"
            class="mb-3 dataWidth"
          >
            <template slot="first">
              <option :value="null">{{ labels.otherManufactorer }}</option>
            </template>
          </b-form-select>
        </div>
      </div>
      <div class="innerContent row inputRow">
        <div class="col col-12 col-md-7 col-lg-8 left">
          <label class="labelMargin">{{ labels.edition.active }}</label>
        </div>
        <div class="col col-12 col-md-5 col-lg-4">
          <b-form-select
            @input="updateSelect('active')"
            v-model="data.active"
            :options="config.options.active"
            class="mb-3 dataWidth"
          >
          </b-form-select>
        </div>
      </div>
      <div style="margin-top: 200px;" class="row">
        <p>{{ data }}</p>
      </div>
  </div>
</template>

<script>
import PriceRow from './edition/PriceRow.vue'
import SingleRow from './edition/SingleRow.vue'
import Config from '../../config'
import Labels from '../../labels'

import { mapGetters } from 'vuex'

export default {
  name: 'ProductEdition',
  data () {
    return {
      config: Config,
      labels: Labels.product,
      placeholders: Labels.placeholders
    }
  },
  components: {
    'price-row': PriceRow,
    'single-row': SingleRow
  },
  methods: {
    updateData (e) {
      let curData = {...this.data}
      if (e.target.id !== 'priceNew' && e.target.id !== 'priceOld') {
        curData[e.target.id] = e.target.value
      } else {
        curData.price.new = e.target.id === 'priceNew' ? e.target.value : curData.price.new
        curData.price.old = e.target.id === 'priceOld' ? e.target.value : curData.price.old
      }
      console.log(curData)
      this.$store.dispatch('productData', { edition: 'edition', data: curData })
    },
    updateSelect (name) {
      this.$store.dispatch('productData', { edition: 'edition', data: {...this.data} })
    }
  },
  props: ['data'],
  computed: mapGetters([
    'productCategories',
    'productManufactorers'
  ])
}
</script>

<style scoped>
h3 {
  margin-bottom: 10px;
}
.innerContent {
  margin: auto;
}
@media only screen and (min-width: 767px) {
  .innerContent {
    width: 80%;
  }
}
@media only screen and (max-width: 767px) {
  .innerContent {
    width: 100%;
  }
  .inputRow {
    height: 70px;
    padding-bottom: 20px;
  }
}
</style>
