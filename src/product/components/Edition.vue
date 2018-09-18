<template>
  <div class="outerContent">
    <div v-if="data.id" class="content">
      <a :href="linkUrl + $route.params.id + '-' + data.url + '.html'" target="blank" class="pointer">
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
      <select-row v-bind:data="data" name="manufactorer" @update="updateData"></select-row>
      <select-row v-bind:data="data" name="active" @update="updateData"></select-row>
      <select-row v-bind:data="data" name="condition" @update="updateData"></select-row>
      <toggled-rows v-bind:data="data" @update="setCheckbox"></toggled-rows>
      <checkbox-row v-bind:photos="photos" v-bind:modyfy="modified" @setCheckbox="setCheckbox"></checkbox-row>
      <div class="row top30px">
        <div :class="{'col-md-3': restoreNameSearch, 'col-md-4': !restoreNameSearch}" class="col col-sm-12">
          <button @click="save" class="btn btn-primary buttons">{{ buttons.save }}</button>
        </div>
        <div :class="{'col-md-3': restoreNameSearch, 'col-md-4': !restoreNameSearch}" class="col col-sm-12">
          <router-link :to="`/product/${$route.params.id}/history`" class="btn btn-primary buttons">{{ buttons.history }}</router-link>
        </div>
        <div v-if="restoreNameSearch" class="col col-sm-12 col-md-3">
          <button @click="goBack(true)" class="btn btn-primary buttons">{{ buttons.restoreList }}</button>
        </div>
        <div :class="{'col-md-3': restoreNameSearch, 'col-md-4': !restoreNameSearch}" class="col col-sm-12">
          <button @click="goBack(false)" class="btn btn-danger buttons">{{ buttons.clear }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckboxRow from './edition/CheckboxRow.vue'
import PriceRow from './edition/PriceRow.vue'
import SelectRow from './edition/SelectRow.vue'
import SingleRow from './edition/SingleRow.vue'
import ToggledRow from './edition/ToggledRow.vue'
import labelsProductMixin from '../../mixins/labelsProduct'
import restoreNameMixin from '../../mixins/restoreName'
import universalMixin from '../../mixins/universal'

import MessageService from '../../services/messageService'
import ProductService from '../../services/productService'

import { mapGetters } from 'vuex'

export default {
  name: 'ProductEdition',
  mixins: [labelsProductMixin, restoreNameMixin, universalMixin],
  data () {
    return {
      categoriesDisplayed: false,
      modified: false,
      photos: false,
      photosDisplayed: false
    }
  },
  components: {
    'checkbox-row': CheckboxRow,
    'price-row': PriceRow,
    'select-row': SelectRow,
    'single-row': SingleRow,
    'toggled-rows': ToggledRow
  },
  methods: {
    getData () {
      ProductService.getEdition({ product: this.$route.params.id })
        .then(response => {
          if (response.data.success) {
            this.$store.dispatch('productData', { edition: 'edition', data: response.data })
          } else {
            throw new Error(response.data.reason)
          }
        })
        .catch(err => this.$store.commit('setError', err.message))
    },
    save () {
      let curObj = { ...this.data, deletePhoto: this.photos, modified: this.modified }
      window.scrollTo(0, 0)
      ProductService.setUpdate(curObj)
        .then(response => {
          if (response.data.success) {
            MessageService.success.next(response.data.reason)
          } else {
            throw new Error(response.data.reason)
          }
        })
        .catch(err => MessageService.error.next(err.message))
    },
    setCheckbox (type) {
      this[type] = !this[type]
    },
    updateData (e) {
      let curData = {...this.data}
      if (e.target.id !== 'priceNew' && e.target.id !== 'priceOld') {
        curData[e.target.id] = e.target.value
      } else {
        curData.price.new = e.target.id === 'priceNew' ? e.target.value : curData.price.new
        curData.price.old = e.target.id === 'priceOld' ? e.target.value : curData.price.old
      }
      this.$store.dispatch('productData', { edition: 'edition', data: curData })
    }
  },
  props: ['data'],
  computed: mapGetters([
    'productCategories',
    'productData'
  ]),
  watch: {
    '$route' () {
      this.getData()
    }
  },
  created () {
    this.getData()
    this.setRestore()
  }
}
</script>

<style scoped>
h3 {
  margin-bottom: 10px;
}
.top30px {
  margin-top: 30px;
}
</style>
