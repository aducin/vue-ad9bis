<template>
  <transition-group appear
      mode="out-in"
      enter-active="enterTransition"
      enter-active-class="animated flipInX"
      leave-active-class="animated flipOutX"
    >
      <slot></slot>
    </transition-group>
</template>

<script>
export default {
  name: 'FlipGroup'
}
</script>
