<script setup>
import { ref } from 'vue';
import ContentContainer from './ContentContainer.vue';
import ProductItem from './ProductItem.vue';

const title = ref('Каталог товаров');
const products = ref(null);
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => products.value = data)
</script>

<template>
  <div :class="$style.root">
    <ContentContainer>
      <h2 :class="$style.title">{{ title }}</h2>
      <ul :class="$style.list">
        <li
          v-for="product in products"
          :key="product.id"
          :class="$style.item"
        >
          <ProductItem :product="product" />
        </li>
      </ul>
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

.list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: stretch;
  justify-content: stretch;
  gap: 28px;
  width: 100%;
}

.item {
  display: flex;
  width: 100%;
}
</style>