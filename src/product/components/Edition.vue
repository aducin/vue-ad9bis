<template>
  <div class="content">
    <p>{{ data }}</p>
  </div>
</template>

<script>
import Config from '../../config'
import Labels from '../../labels'

export default {
  name: 'ProductEdition',
  data () {
    return {
      labels: Labels
    }
  },
  props: ['data']
}
</script>

<style scoped>
</style>
