<script setup>
import { ref } from 'vue';
import InfoToolbar from './InfoToolbar.vue';
import MainIntro from './main-intro/MainIntro.vue';
import ProductList from './ProductList.vue';
import BaseInput from './base/BaseInput.vue';

const placeholder = ref('Поиск товара');
const searchText = ref('');
let products = ref([]);

function filteredProducts() {
  return products.value.filter((product) =>
    product.title.toLowerCase().includes(searchText.value.toLowerCase()) ||
    product.price.toString().includes(searchText.value.toLowerCase())
  );
}

fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => products.value = data)
</script>

<template>
  <div>
    <InfoToolbar>
      <BaseInput v-model="searchText" :class="$style.search" type="search" :placeholder="placeholder" />
    </InfoToolbar>
    <MainIntro />
    <ProductList :products="filteredProducts()" />
  </div>
</template>

<style module>
.search {
  max-width: 200px;
}
</style>