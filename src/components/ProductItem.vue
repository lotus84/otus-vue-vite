<script setup>
import { ref } from 'vue';
import BaseButton from './base/BaseButton.vue';

const buttonText = ref('В корзину');

defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <a :class="$style.root" href="#">
    <div :class="$style.imageBox">
      <img :src="product.image" alt="">
    </div>
    <h3 :class="$style.title">{{ product.title }}</h3>
    <span :class="$style.price">{{ product.price }}$</span>
    <BaseButton>{{ buttonText }}</BaseButton>
  </a>
</template>

<style module>
.root {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px 20px;
  border-radius: 20px;
  background-color: var(--white-color);
  box-shadow: 0 0 30px 0 rgba(68, 68, 68, 0.05);
}

.imageBox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  margin-bottom: 16px;

  & img {
    max-width: 100%;
  }
}

.title {
  margin-bottom: auto;
  color: var(--black-color);
  font-size: 16px;
  line-height: 105%;
}

.price {
  margin: 16px 0;
  color: var(--black-color);
  font-size: 16px;
  font-weight: 600;
  line-height: 105%;
}
</style>