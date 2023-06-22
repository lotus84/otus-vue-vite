<script setup>
import { ref } from 'vue';
import ContentContainer from './ContentContainer.vue';

const title = ref('Каталог товаров');
</script>

<template>
  <div :class="$style.root">
    <ContentContainer>
      <h2 :class="$style.title">{{ title }}</h2>

    </ContentContainer>
  </div>
</template>

<style module>
.root {
  display: flex;
  width: 100%;
  padding: 24px 0 64px;
}

.title {
  align-self: center;
  margin-bottom: 64px;
  color: var(--black-color);
  font-size: 28px;
  font-weight: 600;
  line-height: 150%;
  text-transform: uppercase;
}
</style>