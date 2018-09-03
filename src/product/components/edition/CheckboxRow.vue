<template>
  <div class="innerContent row inputRow">
    <div class="col col-12 col-md-4 col-lg-3 left">
      <label class="labelMargin">{{ labels.edition.actions }}</label>
    </div>
    <div class="col col-12 col-md-8 col-lg-9 top8px">
      <p class="left">
        <input @change="setCheckbox('photos')" type="checkbox" :value="localPhotos" />
        <span class="left10px">{{ labels.edition.deletePhotos }}</span>
      </p>
      <p class="left">
        <input @change="setCheckbox('modified')" type="checkbox" :value="localModyfy" />
        <span class="left10px">{{ labels.edition.setModified }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import Labels from '../../../labels'

export default {
  name: 'CheckboxRow',
  data () {
    return {
      labels: Labels.product
    }
  },
  methods: {
    setCheckbox (type) {
      this.$emit('setCheckbox', type)
    }
  },
  props: ['photos', 'modyfy'],
  computed: {
    localModyfy: () => {
      return this.modyfy
    },
    localPhotos: () => {
      return this.photos
    }
  }
}
</script>

<style scoped>
.left10px {
  margin-left: 10px;
  position: relative;
  top: -2px;
}
@media only screen and (min-width: 767px) {
  .top8px {
    margin-top: 8px;
  }
}
</style>
