<script setup>
</script>

<template>
  <div :class="$style.root">
    <slot />
  </div>
</template>

<style module>
.root {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: 1660px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>