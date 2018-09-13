<template>
  <div class="row rowHeight">
    <div class="left col-12 col-sm-4">
      <label class="labelMargin">{{ labels[name] }}</label>
    </div>
    <div class="col-12 col-sm-8">
      <b-form-select v-model="data[name]" :disabled="show" :options="options[type]" class="mb-3 dataWidth" >
        <template slot="first">
          <option v-if="action === 'add'" value="null" disabled>-- {{ labels.choose }} --</option>
        </template>
      </b-form-select>
    </div>
  </div>
</template>

<script>
import Config from '../../../config'
import Labels from '../../../labels'

export default {
  name: 'SingleRow',
  data () {
    return {
      labels: Labels.account,
      options: Config.options
    }
  },
  props: ['action', 'data', 'name', 'show', 'type']
}
</script>

<style scoped>
@media only screen and (min-width: 576px) {
  .labelMargin {
    margin-top: 5px;
  }
}
</style>
