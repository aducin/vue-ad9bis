<template>
  <div>
    <h2 v-if="!orderData.action">{{ labels.detailsDefault }}</h2>
    <p v-else>{{ orderData }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Labels from '../../labels'

export default {
  name: 'OrderDetail',
  data () {
    return {
      labels: Labels.order
    }
  },
  computed: mapGetters([
    'orderData'
  ])
}
</script>

<style scoped>

</style>
