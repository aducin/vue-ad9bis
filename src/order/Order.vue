<template>
  <div class="hello">
    <account-header></account-header>
    <account-detail></account-detail>
  </div>
</template>

<script>
import AccountDetail from './components/Detail.vue'
import AccountHeader from './components/Header.vue'

export default {
  name: 'Order',
  components: {
    'account-detail': AccountDetail,
    'account-header': AccountHeader
  }
}
</script>

<style scoped>

</style>
