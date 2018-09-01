<template>
  <div class="marginTop">
    <h3 class="left marginBottom20px">{{ labels.summary }}</h3>
    <div class="row">
      <div class="col col-12 col-sm-2 col-md-3 col-lg-4"></div>
      <div class="col col-12 col-sm-8 col-md-6 col-lg-4">
          <div class="floatLeft">{{ labels.totalProduct }}</div>
          <div class="floatRight">{{ summary.data.totalProduct }}{{ currency }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col col-12 col-sm-2 col-md-3 col-lg-4"></div>
      <div class="col col-12 col-sm-8 col-md-6 col-lg-4">
          <div class="floatLeft">{{ labels.totalProductDiscount }}</div>
          <div class="floatRight invalid">{{ summary.data.totalProductDiscount }}{{ currency }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col col-12 col-sm-2 col-md-3 col-lg-4"></div>
      <div class="col col-12 col-sm-8 col-md-6 col-lg-4">
          <div class="floatLeft">{{ labels.totalPaid }}</div>
          <div class="floatRight">{{ summary.data.totalPaid }}{{ currency }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col col-12 col-sm-2 col-md-3 col-lg-4"></div>
      <div class="col col-12 col-sm-8 col-md-6 col-lg-4">
          <div class="floatLeft">{{ labels.totalPaidDiscount }}</div>
          <div class="floatRight invalid">{{ summary.data.totalPaidDiscount }}{{ currency }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Config from '../../config'
import Labels from '../../labels'

export default {
  name: 'Summary',
  data () {
    return {
      currency: Config.currency,
      labels: Labels.order
    }
  },
  props: ['summary']
}
</script>

<style scoped>
  .floatLeft {
      float: left;
  }
  .floatRight {
      float: right;
  }
  .marginTop {
    margin-top: 30px;
  }
</style>
