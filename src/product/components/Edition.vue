<template>
  <div class="outerContent">
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
        <div class="innerContent row inputRow">
          <div class="col col-12 col-md-7 col-lg-8 left">
            <label class="labelMargin">{{ labels.edition.condition }}</label>
          </div>
          <div class="col col-12 col-md-5 col-lg-4">
            <b-form-select
              @input="updateSelect('condition')"
              v-model="data.condition"
              :options="config.options.condition"
              class="mb-3 dataWidth"
            >
            </b-form-select>
          </div>
        </div>
        <div
          v-bind:style="{ height: data.category.length * 32 + 'px' }"
          v-bind:class="{'standardHeight': !categoriesDisplayed}"
          class="innerContent row inputRow"
        >
          <div class="col col-12 col-md-4 col-lg-3 left">
            <label
              v-b-tooltip.hover
              :title="labels.edition.toggle"
              @click="categoriesDisplayed = !categoriesDisplayed"
              class="labelMargin pointer"
            >{{ labels.edition.categories }}</label>
          </div>
          <div class="col col-12 col-md-8 col-lg-9">
            <p v-if="!categoriesDisplayed" @click="categoriesDisplayed = !categoriesDisplayed" class="labelMargin left pointer">
              <i>{{ labels.edition.categoriesActive }}{{ data.productCategories.length }}</i>
            </p>
            <div v-if="categoriesDisplayed" class="top8px">
              <p v-for="item in data.category" :key="item.id" class="left">
                <input @change="setCheckbox" :id="item.id" type="checkbox" v-model="item.checked" />
                <span class="left10px">{{ item.metaTitle }}</span>
              </p>
            </div>
          </div>
        </div>
        <div
          v-bind:class="{'standardHeight': !photosDisplayed, 'photosHeight1Row': photosDisplayed && data.images.length < 5, 'photosHeight2Rows': photosDisplayed && data.images.length > 4}"
          class="innerContent row inputRow"
        >
          <div class="col col-12 col-md-4 col-lg-3 left">
            <label
              v-b-tooltip.hover
              :title="labels.edition.toggle"
              @click="photosDisplayed = !photosDisplayed"
              class="labelMargin pointer"
            >{{ labels.edition.photos }}</label>
          </div>
          <div class="col col-12 col-md-8 col-lg-9">
            <p v-if="!photosDisplayed" @click="photosDisplayed = !photosDisplayed" class="labelMargin left pointer">
              <i>{{ labels.edition.photosAmount }}{{ data.images.length }}</i>
            </p>
            <div v-if="photosDisplayed" class="top8px">
              <img v-for="item in data.images" :key="item" :src="item" height="75" width="75" class="float-left">
            </div>
          </div>
        </div>
        <div class="innerContent row inputRow">
          <div class="col col-12 col-md-4 col-lg-3 left">
            <label class="labelMargin">{{ labels.edition.actions }}</label>
          </div>
          <div class="col col-12 col-md-8 col-lg-9 top8px">
            <p class="left">
              <input type="checkbox" v-model="deletePhoto" />
              <span class="left10px">{{ labels.edition.deletePhotos }}</span>
            </p>
            <p class="left">
              <input type="checkbox" v-model="modified" />
              <span class="left10px">{{ labels.edition.setModified }}</span>
            </p>
          </div>
        </div>
        <div class="row top30px">
          <div class="col col-sm-12 col-md-4">
            <button @click="save" class="btn btn-primary buttons">{{ buttons.save }}</button>
          </div>
          <div class="col col-sm-12 col-md-4">
            <router-link :to="`/product/${$route.params.id}/history`" class="btn btn-primary buttons">{{ buttons.history }}</router-link>
          </div>
          <div class="col col-sm-12 col-md-4">
            <router-link to="/product" tag="button" class="btn btn-danger buttons">{{ buttons.clear }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PriceRow from './edition/PriceRow.vue'
import SingleRow from './edition/SingleRow.vue'
import Config from '../../config'
import Labels from '../../labels'

import MessageService from '../../services/messageService'
import ProductService from '../../services/productService'

import { mapGetters } from 'vuex'

export default {
  name: 'ProductEdition',
  data () {
    return {
      buttons: Labels.buttons,
      categoriesDisplayed: false,
      config: Config,
      deletePhoto: false,
      labels: Labels.product,
      photosDisplayed: false,
      placeholders: Labels.placeholders,
      modified: false
    }
  },
  components: {
    'price-row': PriceRow,
    'single-row': SingleRow
  },
  methods: {
    save () {
      let curObj = { ...this.data, deletePhoto: this.deletePhoto, modified: this.modified }
      window.scrollTo(0, 0)
      ProductService.setUpdate(curObj)
        .then(response => {
          if (response.data.success) {
            MessageService.success.next(response.data.reason)
          } else {
            throw new Error(response.data.reason)
          }
        })
        .catch(err => {
          MessageService.error.next(err.message)
        })
    },
    setCheckbox (e) {
      let index = this.data.productCategories.findIndex(el => parseInt(el) === parseInt(e.target.id))
      if (e.target.checked && index === -1) {
        this.data.productCategories.push(parseInt(e.target.id))
      } else if (index !== -1) {
        this.data.productCategories.splice(index, 1)
      }
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
img {
  border: 1px solid #E5CFCF;
  border-radius: 10px;
  margin: 1px;
}
.innerContent {
  margin: auto;
}
.left10px {
  margin-left: 10px;
  position: relative;
  top: -2px;
}
.photosHeight1Row {
  height: 95px;
}
.photosHeight2Rows {
  height: 190px;
}
.standardHeight {
  height: 40px !important;
}
.top30px {
  margin-top: 30px;
}
@media only screen and (min-width: 767px) {
  .innerContent {
    width: 80%;
  }
  .top8px {
    margin-top: 8px;
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
