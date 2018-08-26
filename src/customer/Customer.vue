<template>
  <div>
    <customer-header></customer-header>
    <customer-detail></customer-detail>
  </div>
</template>

<script>
import CustomerDetail from './components/Detail.vue'
import CustomerHeader from './components/Header.vue'

export default {
  name: 'Customer',
  components: {
    'customer-detail': CustomerDetail,
    'customer-header': CustomerHeader
  },
  data () {
    return {
      msg: 'Customer component'
    }
  }
}
</script>

<style scoped>

</style>
