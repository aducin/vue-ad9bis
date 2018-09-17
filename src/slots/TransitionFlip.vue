<template>
  <transition appear
      mode="out-in"
      enter-active="enterTransition"
      enter-active-class="animated flipInX"
      leave-active-class="animated flipOutX"
    >
      <slot></slot>
    </transition>
</template>

<script>
export default {
  name: 'Flip'
}
</script>
