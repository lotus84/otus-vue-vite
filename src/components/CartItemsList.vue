<script setup>
import { useCartStore } from '../stores/cart';
import { storeToRefs } from 'pinia';
import CartItem from './CartItem.vue';

const orderComposition = 'Состав заказа';

const cartStore = useCartStore();

const { cartItems } = storeToRefs(cartStore);
</script>

<template>
  <div v-if="cartItems.length > 0" :class="$style.root">
    <p :class="$style.title">{{ orderComposition }}</p>
    <ul :class="$style.productList">
      <li v-for="item in cartItems" :key="item.id" :class="$style.productItem">
        <CartItem :item="item" />
      </li>
    </ul>

  </div>
</template>

<style module>
.title {
  margin-bottom: 48px;
  color: var(--black-color);
  font-size: 28px;
  line-height: 150%;
  font-weight: 600;
}

.productList {
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 100%;
}

.productItem {
  position: relative;
  display: flex;
  width: 100%;

  &::before {
    position: absolute;
    top: -24px;
    left: 0;
    z-index: 1;
    display: flex;
    width: 100%;
    height: 1px;
    content: '';
    background-color: var(--silver-color);
  }
}
</style>