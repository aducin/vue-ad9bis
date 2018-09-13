<template>
  <div v-if="$v.data[name]" class="row rowHeight">
    <div
      v-bind:class="{'col-sm-7': type === 'small', 'col-sm-4': type === 'big', invalid: $v.data[name].$error}"
      class="left col-12"
    >
      <label class="labelMargin">{{ labels.modal[name] }}</label>
    </div>
    <div v-bind:class="{'col-sm-5': type === 'small', 'col-sm-8': type === 'big'}" class="col-12">
      <input
        :disabled="show"
        v-model="data[name]"
        @input="$v.data[name].$touch()"
        type="text"
        v-bind:class="{ invalidBorder: $v.data[name].$error }"
        class="center form-control dataWidth"
        :placeholder="placeholders[text]"
      />
    </div>
  </div>
</template>

<script>
import Labels from '../../../labels'
import { accountValidator } from '../../../states/accountModalValidator'

export default {
  name: 'SingleRow',
  data () {
    return {
      labels: Labels.account,
      placeholders: Labels.placeholders
    }
  },
  props: ['data', 'name', 'show', 'text', 'type'],
  validations: {
    data: accountValidator
  }
}
</script>

<style scoped>
@media only screen and (min-width: 576px) {
  .labelMargin {
    margin-top: 5px;
  }
}
</style>
