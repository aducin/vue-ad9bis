<template>
  <div>
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
  </div>
</template>

<script>
import Config from '../../../config'
import Labels from '../../../labels'

export default {
  name: 'ToggledRow',
  data () {
    return {
      categoriesDisplayed: false,
      config: Config,
      labels: Labels.product,
      photosDisplayed: false
    }
  },
  methods: {
    setCheckbox (e) {
      let curData = {...this.data}
      let index = this.data.productCategories.findIndex(el => parseInt(el) === parseInt(e.target.id))
      if (e.target.checked && index === -1) {
        curData.productCategories.push(parseInt(e.target.id))
      } else if (index !== -1) {
        curData.productCategories.splice(index, 1)
      }
      this.$store.dispatch('productData', { edition: 'edition', data: curData })
    }
  },
  props: ['data']
}
</script>

<style scoped>
  img {
    border: 1px solid #E5CFCF;
    border-radius: 10px;
    margin: 1px;
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
  @media only screen and (max-width: 767px) {
    .standardHeight {
      height: 50px !important;
    }
  }
</style>
