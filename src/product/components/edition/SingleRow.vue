<template>
  <div class="innerContent row inputRow"
    v-bind:class="{inputRow: type !== 'description' && type !== 'quantity', 'inputQuantity': type === 'quantity', 'textAreaHeight textareaRow': type === 'description'}">
    <div v-bind:class="{'col-md-4 col-lg-3': type !== 'quantity', 'col-md-7 col-lg-8': type === 'quantity'}">
      <label class="labelMargin">{{ labels.edition[type] }}</label>
    </div>
    <div v-if="type !== 'description'"
        v-bind:class="{'col-md-8 col-lg-9': type !== 'quantity', 'col-md-5 col-lg-4': type === 'quantity'}">
      <input
        v-if="type !== 'quantity' && type !== 'tags'"
        @input="update"
        v-model="data[type]"
        type="text"
        class="form-control" :id="type"
        :placeholder="placeholders[type]"
      />
      <input
        v-if="type === 'tags'"
        @input="update"
        v-model="tagString"
        type="text"
        class="form-control" id="stringTag"
        :placeholder="placeholders.tags"
      />
      <span v-if="type === 'quantity'">
        <input
            @input="update"
            v-model="data.quantity.old"
            type="text"
            class="form-control center" id="singleQuantity"
            :placeholder="placeholders.quantity"
        />
        <p v-if="data.quantity.old === data.quantity.new" class="colorSuccess right">{{ labels.quantityEqual }}</p>
        <p v-else class="invalid right">{{ labels.quantityNotEqual }}{{ data.quantity.new }}</p>
      </span>
    </div>
    <div v-if="type === 'description'" class="col col-12 col-md-8 col-lg-9">
      <textarea
        @input="update"
        v-model="data[type]"
        class="form-control" :id="type"
        rows="5"
        :placeholder="placeholders[type]"
      ></textarea>
    </div>
  </div>
</template>

<script>
import Labels from '../../../labels'

export default {
  name: 'SingleEdition',
  data () {
    return {
      labels: Labels.product,
      placeholders: Labels.placeholders,
      tagString: ''
    }
  },
  methods: {
    setTagString (tagArray) {
      if (tagArray && tagArray.length > 0) {
        tagArray.forEach(el => {
          this.tagString += el.name + ', '
        })
        this.tagString = this.tagString.slice(0, this.tagString.length - 2)
      }
    },
    update (e) {
      this.$emit('update', e)
    }
  },
  props: ['data', 'tag', 'type'],
  created () {
    if (this.type === 'tags') {
      this.setTagString(this.data.productTags)
    }
  }
}
</script>

<style scoped>
label {
  display: block;
  text-align: left;
}
.textAreaHeight {
  min-height: 112px;
}
@media only screen and (min-width: 767px) {
  .inputQuantity {
    height: 50px;
  }
}
@media only screen and (max-width: 767px) {
  .inputQuantity {
    height: 70px;
    padding-bottom: 20px;
  }
  .textareaRow {
    min-height: 140px;
    padding-bottom: 20px;
  }
}
</style>
