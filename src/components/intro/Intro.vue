<script setup>
import ContentContainer from '../ContentContainer.vue';
</script>

<template>
  <div :class="$style.root">
    <ContentContainer>
    </ContentContainer>
  </div>
</template>

<style module>
.root {
  display: flex;
  width: 100%;
}
</style>