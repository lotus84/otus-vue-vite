<script setup>
import { computed } from 'vue';
import { useCartStore } from '../stores/cart';
import BaseButton from './base/BaseButton.vue';
import IconCart from './icons/IconCart.vue';

const cart = 'Корзина';

const cartStore = useCartStore();

const isCartEmpty = computed(() => {
  return cartStore.cartItems.length === 0;
})

const totalItemsInCart = computed(() => {
  return cartStore.cartItems
          .map(item => item.count)
          .reduce((sum, count) => sum + count, 0);
});
</script>

<template>
  <BaseButton v-if="!isCartEmpty" :class="$style.root" type="button">
    <IconCart />
    {{ cart }}
    <span :class="$style.count">{{ totalItemsInCart }}</span>
  </BaseButton>
</template>

<style module>
.root {
  position: fixed;
  top: 164px;
  right: 20px;
  z-index: 100;

  & svg {
    margin-right: 12px;
  }
}

.count {
  position: absolute;
  top: -5px;
  right: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  min-height: 20px;
  padding: 0 3px;
  color: var(--kabul-color);
  font-size: 10px;
  font-weight: 400;
  line-height: 150%;
  border-radius: 50%;
  background-color: var(--orinoco-color);
}
</style>