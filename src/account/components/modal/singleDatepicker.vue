<template>
  <div class="row rowHeight">
    <div class="col-12 col-sm-4 left">
      <label class="labelMargin">{{ labels.modal[name] }}</label>
    </div>
    <div class="col-12 col-sm-8">
      <date-picker
        v-model="data[type]"
        @change="setDate(name, type)"
        :editable="false"
        :first-day-of-week="1"
        :lang="settings"
        input-class="center dataWidth form-control width100"
        class="width100"
      ></date-picker>
    </div>
  </div>
</template>

<script>
import datepicker from '../../../datepicker'
import DatePicker from 'vue2-datepicker'
import Labels from '../../../labels'
import { setDate } from '../../../functions/setDate'

export default {
  name: 'SingleDatepicker',
  data () {
    return {
      labels: Labels.account,
      placeholders: Labels.placeholders,
      settings: datepicker
    }
  },
  components: {
    DatePicker
  },
  methods: {
    setDate (type, current) {
      this.data[type] = setDate(this.data[current])
    }
  },
  props: ['data', 'name', 'type']
}
</script>

<style scoped>
@media only screen and (min-width: 576px) {
  .labelMargin {
    margin-top: 5px;
  }
}
</style>
