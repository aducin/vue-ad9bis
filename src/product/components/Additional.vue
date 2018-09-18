<template>
  <flip-group v-if="!type">
    <modified key="1"></modified>
    <last-orders key="2"></last-orders>
    <printings key="3"></printings>
  </flip-group>
</template>

<script>
import FlipGroup from '../../slots/TransitionGroupFlip.vue'
import LastOrders from './LastOrders.vue'
import Modified from './Modified.vue'
import Printings from './Printings.vue'

export default {
  name: 'Additional',
  components: {
    'last-orders': LastOrders,
    'modified': Modified,
    'printings': Printings,
    'flip-group': FlipGroup
  },
  props: ['type']
}
</script>

<style scoped>
</style>
