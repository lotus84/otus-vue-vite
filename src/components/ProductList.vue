<script setup>
import { ref } from 'vue';
import ContentContainer from './ContentContainer.vue';
import ProductItem from './ProductItem.vue';

defineProps({
  products: {
    type: Array,
    required: true,
  },
});

const title = ref('Каталог товаров');
const emptyCatalog = ref('Простите, по вашему запросу товаров сейчас нет.');
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
      <p v-if="products.length === 0" :class="$style.emptyCatalog">{{ emptyCatalog }}</p>
    </ContentContainer>
  </div>
</template>

<style module>
.root {
  display: flex;
  width: 100%;
  padding: 24px 0;
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

.emptyCatalog {
  margin: 0 auto;
  font-size: 24px;
  line-height: 150%;
  font-weight: 600;
  text-align: center;
}
</style>