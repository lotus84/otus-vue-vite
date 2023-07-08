<script setup>
import { ref } from 'vue';
import { useCatalogStore } from '../stores/catalog';
import InfoToolbar from './InfoToolbar.vue';
import MainIntro from './main-intro/MainIntro.vue';
import ProductList from './ProductList.vue';
import BaseSearchInput from './base/BaseSearchInput.vue';

const placeholder = ref('Поиск товара');
const searchText = ref('');

const catalogStore = useCatalogStore();

let products = ref([]);

products.value = catalogStore.products;

function filteredProducts() {
  return products.value.filter((product) =>
    isNaN(Number(searchText.value.toLowerCase())) ?
    product.title.toLowerCase().includes(searchText.value.toLowerCase()) :
    product.price.toString().startsWith(searchText.value.toLowerCase())
  );
}
</script>

<template>
  <div>
    <InfoToolbar>
      <BaseSearchInput v-model="searchText" :class="$style.search" type="search" :placeholder="placeholder" />
    </InfoToolbar>
    <MainIntro />
    <ProductList v-if="!catalogStore.isLoading" :products="filteredProducts()" />
    <p v-else>Loading ...</p>
  </div>
</template>

<style module>
.search {
  max-width: 200px;
}
</style>