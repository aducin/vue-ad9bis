<template>
  <div v-bind:class="[data.type === 'success' ? 'alert-success' : 'alert-danger']" class="alert">
    <p class="content">{{ data.content }}</p>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: ['data']
}
</script>

<style scoped>
  .content {
    font-size: 16px;
    padding-top: 10px;
  }
</style>
