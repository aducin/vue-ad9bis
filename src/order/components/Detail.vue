<template>
  <div>
    <h2 v-if="!orderAction">{{ msg }}</h2>
  </div>
</template>

<script>
export default {
  name: 'OrderDetail',
  data () {
    return {
      orderAction: this.action,
      msg: 'Wybierz akcję i numer zamówienia'
    }
  },
  props: ['action']
}
</script>

<style scoped>

</style>
