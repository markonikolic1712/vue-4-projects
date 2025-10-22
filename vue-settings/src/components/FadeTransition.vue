<template>
  <Transition mode="out-in" name="fade">
    <slot></slot>
  </Transition>
</template>

<script setup></script>

<style scoped>
/* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
