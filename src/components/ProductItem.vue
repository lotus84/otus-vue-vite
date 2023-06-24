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
  <div :class="$style.root">
    <a :class="$style.link" href="#">
      <div :class="$style.imageBox">
      <img :src="product.image" alt="">
      </div>
      <h3 :class="$style.title">{{ product.title }}</h3>
      <span :class="$style.price">{{ product.price }}$</span>
    </a>
    <BaseButton>{{ buttonText }}</BaseButton>
  </div>
</template>

<style module>
.root {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px 20px;
  border-radius: 20px;
  background-color: var(--white-color);
  box-shadow: 0 0 30px 0 rgba(var(--charcoal-color), 0.05);
  transition: background-color var(--default-transition);

  &:hover {
    background-color: var(--loafer-color);
  }
}

.link {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
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