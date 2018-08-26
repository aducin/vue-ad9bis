<template>
  <div>
    <account-header></account-header>
    <account-detail></account-detail>
  </div>
</template>

<script>
import AccountDetail from './components/Detail.vue'
import AccountHeader from './components/Header.vue'

export default {
  name: 'Account',
  components: {
    'account-detail': AccountDetail,
    'account-header': AccountHeader
  },
  data () {
    return {
      msg: 'Account component'
    }
  }
}
</script>

<style scoped>

</style>
