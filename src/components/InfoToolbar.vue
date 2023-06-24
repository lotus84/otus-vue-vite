<script setup>
import ContentContainer from './ContentContainer.vue';
</script>

<template>
  <div :class="$style.root">
    <ContentContainer>
      <div :class="$style.wrapper">
        <slot />
      </div>
    </ContentContainer>
  </div>
</template>

<style module>
.root {
  display: flex;
  width: 100%;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 50px;
  width: 100%;
  padding: 24px 0;
}
</style>