<script setup>
import { ref } from 'vue';
import { cartProducts } from '../utils/cart';
import CartItem from './CartItem.vue';

const orderComposition = ref('Состав заказа');

function handleDeleteFromCart(productId) {
  const indexDeletedItem = cartProducts.findIndex((cartItem) => cartItem.item.id === productId);
  cartProducts.splice(indexDeletedItem, 1)
}
</script>

<template>
  <div v-if="cartProducts.length > 0" :class="$style.root">
    <p :class="$style.title">{{ orderComposition }}</p>
    <ul :class="$style.productList">
      <li v-for="item, index in cartProducts" :key="index" :class="$style.productItem">
        <CartItem :item="item.item" :count="item.count" @delete-product="handleDeleteFromCart" />
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