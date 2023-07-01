<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import BaseButton from './base/BaseButton.vue';
import IconCart from './icons/IconCart.vue';

const buttonText = ref('В корзину');

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['add-to-cart']);

function addToCart() {
  emit('add-to-cart', props.product, 1);
}
</script>

<template>
  <div :class="$style.root">
    <RouterLink :class="$style.link" :to="{ name: 'item', params: { id: props.product.id }}">
      <div :class="$style.imageBox">
        <img :src="props.product.image" alt="">
      </div>
      <h3 :class="$style.title">{{ props.product.title }}</h3>
      <span :class="$style.price">{{ props.product.price }}$</span>
    </RouterLink>
    <BaseButton :class="$style.addToCart" @click="addToCart()">
      <IconCart />
      {{ buttonText }}
    </BaseButton>
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

.addToCart {
  & svg {
    margin-right: 12px;
  }
}
</style>